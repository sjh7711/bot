youtube = function (r) {
	var search_word = r.msg.substr(5);
	if (r.msg[0] == "!") {
		var link = org.jsoup.Jsoup.connect("https://www.youtube.com/results?search_query=" + search_word + "&sp=CAASAhAB").get().select("div.yt-lockup-dismissable").select("div.yt-lockup-content");
	} else {
		if (r.msg[0] == "/") {
			var link = org.jsoup.Jsoup.connect("https://www.youtube.com/results?search_query=" + search_word + "&sp=CAMSAhAB").get().select("div.yt-lockup-dismissable").select("div.yt-lockup-content");
		}
	}
	if (String(link).length == 0) {
		var search_word = r.msg.substr(5);
		if (r.msg[0] == "!") {
			var link = org.jsoup.Jsoup.connect("https://www.youtube.com/results?search_query=" + search_word + "&sp=CAASAhAB").get().select("div.yt-lockup-dismissable").select("div.yt-lockup-content");
		} else {
			if (r.msg[0] == "/") {
				var link = org.jsoup.Jsoup.connect("https://www.youtube.com/results?search_query=" + search_word + "&sp=CAMSAhAB").get().select("div.yt-lockup-dismissable").select("div.yt-lockup-content");
			}
		}
		if (String(link).length == 0) {
			r.replier.reply("검색결과가 없습니다.");
			return;
		}
	}
	var link = link.get(0).select("h3.yt-lockup-title").select("a").attr("abs:href");
	r.replier.reply(link);
	return;
}


jfla = function (r) {
	var list = org.jsoup.Jsoup.connect("https://www.youtube.com/user/JFlaMusic/videos?view=0&sort=dd&shelf_id=0").get().select("a[dir=ltr]").toArray().slice(1).map(v => v.text() + "\n" + v.attr("abs:href"));
	r.replier.reply(list[0]);
	r.replier.reply("더보기" + es + "\n" + "노래 전체 모음\nhttps://music.youtube.com/playlist?list=PLrJ-VGAeEn8gzjavY0PXwGsMssB1DTUx7\n\n최근 목록\n" + list.slice(1).join("\n\n"));
}

music = function (r) {
	var list = org.jsoup.Jsoup.connect("https://music.bugs.co.kr/chart").get().select("#CHARTrealtime > table > tbody > tr").toArray().map(v=>String(v.select("th > p > a").text()))
	var rand = Math.floor(Math.random() * list.length);
	var search_word = list[rand];
	var trash = org.jsoup.Jsoup.connect("https://music.bugs.co.kr/genre/chart/kpop/rnh/total/day").get().select("p.title").toArray().map(v => String(v.text()));
	while (1) {
		if (trash.indexOf(String(search_word)) > -1) {
			var rand = Math.floor(Math.random() * list.length);
			var search_word = list[rand];
		} else {
			break;
		}
	}
	var link = org.jsoup.Jsoup.connect("https://www.youtube.com/results?search_query=" + search_word + "가사 &sp=CAASAhAB").get().select("div.yt-lockup-dismissable").select("div.yt-lockup-content").get(0).select("h3.yt-lockup-title").select("a").attr("abs:href");
	r.replier.reply(link);
	return;
}

naver = function (r) {
	var check = r.msg.substr(4);
	if (check.indexOf(10) >= 0){
		var text = org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?age=10s&where=main').get()
	} else if (check.indexOf(20) >= 0){
		var text = org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?age=20s&where=main').get()
	} else if (check.indexOf(30) >= 0){
		var text = org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?age=30s&where=main').get()
	}else if (check.indexOf(40) >= 0){
		var text = org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?age=40s&where=main').get()
	}else if (check.indexOf(50) >= 0){
		var text = org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?age=50s&where=main').get()
	} else {
		var text = org.jsoup.Jsoup.connect('https://datalab.naver.com/keyword/realtimeList.naver?age=all&where=main').get()
	}
	text1 = text.select('div.item_box').toArray().map((v,i)=>(i +1) +'. '+ v.select('span.item_title').text()).join('\n');
	text1 += es + '\n\n';
	text = text.select('div.item_box').toArray().map(v=> v.select('span.item_title').text() +'\nhttps://search.naver.com/search.naver?where=nexearch&query='+encodeURIComponent(v.select('span.item_title').text())).join('\n\n')
	r.replier.reply(text1+text);
}