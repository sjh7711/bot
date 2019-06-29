foodbank = function (r) {
	var name = r.msg.split(" ")[1];
	if (typeof name == "string") {
		var temp = D.selectForArray("foodbank", null, "name like ? or manager like ? or tel like ? or phone like ? or fax like ? or email like ? or addr like ?", ["%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%"]);
		var str = temp.map(v => v[0] + "\n\n" + v[1] + "\n\n번호 : " + v[2] + "\n\n휴대폰 : " + v[3] + "\n\n팩스 : " + v[4] + "\n\n" + v[5] + "\n\n" + v[6]).join("\n-----------------\n");
		r.replier.reply(str);
	} else {
		var temp = D.selectForArray("foodbank", null, "name like ? or manager like ? or tel like ? or phone like ? or fax like ? or email like ? or addr like ?", ["%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%", "%" + name + "%"]);
		var str = temp.map(v => v[0] + "\n\n" + v[1] + "\n\n번호 : " + v[2] + "\n\n휴대폰 : " + v[3] + "\n\n팩스 : " + v[4] + "\n\n" + v[5] + "\n\n" + v[6]).join("\n-----------------\n");
		r.replier.reply(str);
	}
}

banklist = function (r) {
	var name = r.msg.split(" ")[1];
	if (typeof name == "string") {
		var temp = D.selectForArray("bankls", null, "name like ?", "%" + name + "%");
		for (var i = 0; i < temp.length; i++) {
			temp[i] = temp[i].join(" : ");
			if (i == 3) {
				temp[2] = temp[2] + es;
			}
		}
		r.replier.reply("      기관명      |      전화번호\n----------------------------------\n" + temp.join("\n\n"));
	} else {
		var temp = D.selectForArray("bankls");
		for (var i = 0; i < temp.length; i++) {
			temp[i] = temp[i].join(" : ");
			if (i == 3) {
				temp[2] = temp[2] + es;
			}
		}
		r.replier.reply("      기관명      |      전화번호\n----------------------------------\n" + temp.join("\n\n"));
	}
}

noticecheck = function () {
	if (Flag.get("cookie1", "test") == 0 || Flag.get("cookie2", "test") == 0) {
		var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html").method(org.jsoup.Connection.Method.GET).execute().cookies();
		var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1).data("mb_id", "tyfb1377").data("mb_password", "1q2w3e4r").data("x", "30").data("y", "30").method(org.jsoup.Connection.Method.POST).execute().cookies();
		Flag.set("cookie1", "test", cookie1);
		Flag.set("cookie2", "test", cookie2);
	}
	var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01").cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get().select("tbody");
	var docnum = doc.select("tr.num").toArray().map(v => v.select("td.num").get(0).text());
	var doctitle = doc.select("tr.num").toArray().map(v => v.select("a:first-child").get(0).ownText());
	if (docnum[0] > D.selectForArray("notice")[0][0]) {
		for (var i = 0; i < docnum[0] - D.selectForArray("notice")[0][0]; i++) {
			var doclink = doc.select("tr.num").select("a:first-child").get(i).attr("abs:href");
			var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get();
			var doctime = String(subdoc.select("div.sum > span.date").text());
			var text = String(subdoc.select("div.content").toArray()[0]).replace(/amp;/g, "").replace(/<br>/g, "\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").trim().replace(/^ +/gm, "").replace(/\n\n\n/g, "\n").replace(/\n\n\n/g, "\n");
			var repl = subdoc.select("div.comment_area").eachText().toArray().join("\n\n").replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, "");
			Api.replyRoom("test", "새공지!\n" + doctime + "\n" + docnum[i] + " : " + doctitle[i] + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
			Api.replyRoom("푸드마켓", "새공지!\n" + doctime + "\n" + docnum[i] + " : " + doctitle[i] + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
		}
		D.delete("notice");
		for (var i = 0; i < 15; i++) {
			D.insert("notice", {num: docnum[i], msg: doctitle[i]});
		}
		return;
	}
	var difcount = 0;
	for (var i = 0; i < 15; i++) {
		for (var j = i; j < 15; j++) {
			if (D.selectForArray("notice")[i][1].indexOf(doctitle[j]) == 0) {
				break;
			} else {
				difcount += 1;
				var wantnum = j;
				break;
			}
		}
		if (difcount > 0) {
			break;
		}
	}
	if (difcount > 0) {
		var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
		var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get();
		var doctime = String(subdoc.select("div.sum > span.date").text());
		var text = String(subdoc.select("div.content").toArray()[0]).replace(/amp;/g, "").replace(/<br>/g, "\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").trim().replace(/^ +/gm, "").replace(/\n\n\n/g, "\n").replace(/\n\n\n/g, "\n");
		var repl = subdoc.select("div.comment_area").eachText().toArray().join("\n\n").replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, "");
		Api.replyRoom("test", "새공지!\n" + doctime + "\n" + docnum[wantnum] + " : " + doctitle[wantnum] + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
		Api.replyRoom("푸드마켓", "새공지!\n" + doctime + "\n" + docnum[wantnum] + " : " + doctitle[wantnum] + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
		D.delete("notice");
		for (var i = 0; i < 15; i++) {
			D.insert("notice", {num: docnum[i], msg: doctitle[i]});
		}
	}
}


notice = function (r) {
	if (Flag.get("cookie1", "test") == 0 || Flag.get("cookie2", "test") == 0) {
		var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html").method(org.jsoup.Connection.Method.GET).execute().cookies();
		var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1).data("mb_id", "tyfb1377").data("mb_password", "1q2w3e4r").data("x", "30").data("y", "30").method(org.jsoup.Connection.Method.POST).execute().cookies();
		Flag.set("cookie1", "test", cookie1);
		Flag.set("cookie2", "test", cookie2);
	}
	var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01").cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get().select("tbody");
	var temptext = doc.select("tr.num").toArray().map(v => "번호:" + v.select("td.num").get(0).text() + "   날짜:" + v.select("td.date").text() + "\n" + v.select("td.title>a").first().ownText());
	var text = [];
	var count = r.msg.split(" ")[1];
	var lastnum = doc.select("tr.num").get(14).select("td.num").get(0).text();
	if (lastnum - 1 < count) {
		var firstnum = doc.select("tr.num").get(0).select("td.num").get(0).text();
		var wantnum = firstnum - count;
		var docnum = doc.select("tr.num").get(wantnum).select("td.num").get(0).text();
		var doctitle = doc.select("tr.num").select("a:first-child").get(wantnum).ownText();
		var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
		var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get();
		var doctime = String(subdoc.select("div.sum > span.date").text());
		var text = String(subdoc.select("div.content").toArray()[0]).replace(/<br>/g, "\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").trim().replace(/^ +/gm, "").replace(/\n\n\n/g, "\n").replace(/\n\n\n/g, "\n");
		var repl = subdoc.select("div.comment_area").eachText().toArray().join("\n\n").replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, "");
		r.replier.reply(doctime + "\n" + docnum + " : " + doctitle + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
	} else {
		if (0 < count && count < 16) {
			for (i = 0; i < count; i++) {
				text.push(temptext[i]);
			}
			r.replier.reply(text.join("\n\n"));
		} else {
			for (i = 0; i < 5; i++) {
				text.push(temptext[i]);
			}
			r.replier.reply(text.join("\n\n"));
		}
	}
}

donatecheck = function() {
	var id = "tycwc";
	var pw = "gngn12";

	var cookiea = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login.php?url=%2F").method(org.jsoup.Connection.Method.GET).execute().cookies();
	var cookieb = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login_check.php").cookies(cookiea).data("mb_id", id).data("mb_password", pw).data("x", "48").data("y", "38").method(org.jsoup.Connection.Method.POST).execute().cookies();

	var doc = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/board.php?bo_table=support_apply").cookies(cookieb).cookies(cookiea).get().select('tbody').select('tbody>tr>td>form>table>tbody>tr>td>span').get(0).text();

	if(D.selectForArray('donate')[0][0] != doc ){
		Api.replyRoom('test', '새후원을 확인해주세요!');
		Api.replyRoom('후원확인', '새후원을 확인해주세요!');
	}
}

donateedit = function(r) {
	var id = "tycwc";
	var pw = "gngn12";

	var cookiea = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login.php?url=%2F").method(org.jsoup.Connection.Method.GET).execute().cookies();
	var cookieb = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login_check.php").cookies(cookiea).data("mb_id", id).data("mb_password", pw).data("x", "48").data("y", "38").method(org.jsoup.Connection.Method.POST).execute().cookies();

	var doc = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/board.php?bo_table=support_apply").cookies(cookieb).cookies(cookiea).get().select('tbody').select('tbody>tr>td>form>table>tbody>tr>td>span').get(0).text();
	if(D.selectForArray('donate')[0][0] != doc ){
		D.update('donate', {num : Number(doc)});
		Api.replyRoom('test', '새후원을 확인했습니다.');
		Api.replyRoom('후원확인', '새후원을 확인했습니다.');
	}
}