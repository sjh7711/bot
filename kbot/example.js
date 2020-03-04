
//cmd("chmod -R 777 /data/data/com.kakao.talk/databases");
//var K = require("KBManager.js")("/data/data/com.kakao.talk/databases/KakaoTalk2.db");

/*
function calculator(r){
	var temp = eval(r.msg.substr(1).replace(/[^0-9*\-+%/*=\^&|!.~{}()[\]]/g, ""));
	if(temp!=undefined){
		r.replier.reply(temp);
	}
}

//a.charCodeAt(0)
const weiredstring1=String.fromCharCode(8203);//공백
const weiredstring2=String.fromCharCode(160);//띄워쓰기로
const weiredstring3=String.fromCharCode(8237);//공백
const weiredstring4=String.fromCharCode(8197);//띄워쓰기로
//replace(new RegExp(weiredstring1, "gi"), "")

/*
blankFunc=(r)=>{
if(r.msg.indexOf('제한시간')>-1){
	r.replier.reply(r.msg.split('\n')[0].replace(new RegExp(weiredstring1, "gi"),"").replace(new RegExp(weiredstring2, "gi")," ").replace(new RegExp(weiredstring3, "gi"),"").replace(new RegExp(weiredstring4, "gi"), " "));
	}
}
 */

/*
blankFunc=(r)=>{
if(r.msg.indexOf('제한시간')>-1){
	var re = r.msg.replace(/\(.+\)/,"").replace(/[^가-힣A-Za-z]/g," ").trim();
	r.replier.reply(re);
	}
}
*/
/*
D.execSQL("create table numtest (key integer, num integer)")
create table lotto (key integer primary key, room text, name text, date text, num integer, lotto text, count integer, class text )

]D.execSQL("alter table control add BASEBALL number")
]D.update("control", {BASEBALL:0})
]D.selectForString('control')
]D.update('control' , {name :'!계산',  시립대_단톡방 : 1, 시립대_전전컴_톡방 : 1, 오버워치 : 1, 시립대_자취생_생정 : 1, test :1, 단톡방 : 1, 짱구 : 1, 시립대_봇제작방 : 1, 푸드마켓 :1, 공익 : 1, BASEBALL : 0, blackjack : 0, 동후방 : 0 }, "name='!계산'")
]D.insert('control' , {name :'!온오프',  시립대_단톡방 : 0, 시립대_전전컴_톡방 : 0, 오버워치 : 0, 시립대_자취생_생정 : 0, test :1, 단톡방 : 0, 짱구 : 0, 시립대_봇제작방 : 0, 푸드마켓 :0, 공익 : 0, BASEBALL : 0, blackjack : 0, 동후방 : 0 })
]D.rawQuery("INSERT INTO chatdb SELECT * FROM cbot")
]D.execSQL("drop table botpoint")
]D.insert("cat", {name :"중용", gender : "남", age : 22})
]D.delete("cat", "name='중용'")
]D.delete("cat", "name='모모' and age='5'" )
]D.selectForString("cat", null, "age<4")
]D.selectForString("cat", "name, gender", "age<4")
]D.selectForString("cat", ["name", "gender"], "age<4")
]D.selectForString("cat","count(*)")
]D.selectForString("cat", null, "name=?",  [a]) //a='모모'
]D.update("cat", {age : 4} , "name='인문이'")
]D.create("cat", {name:"모모",gender:"남",age:4})
]D.update('blackjack', { win : 0, lose : 0, push : 0 , ddl : 0, ddw : 0, ddp : 0, blackjack : 0 , even : 0 , evenc : 0, insurc : 0, insur : 0, splitc : 0 , split : 0, sur : 0, allp : 0, insurw : 0 , fexit : 0 , bpush : 0, bank : 0 });
]D.selectForString('blackjack','name , bank' , "bank > 0")
]D.selectForString('blackjack','name ,room, bank' , "bank > 0")

->> abcd[class=adf]

var money = 10000000
var temp = D.selectForArray('blackjack', 'point, name , room');

for(var i in temp){
	D.update('blackjack', {point: temp[i][0] + money}, 'name=? and room = ?', [temp[i][1], temp[i][2]]);
}


.replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")
	
	
*/

/*
!온오프,!날씨,fa,on
 */


/* hash set 
var templott = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	for(i=0;i<6;i++) {
	v = e()
	if(templott[v%45] == 0) {
	templott[v%45] = v
	continue
	}
	else
	{
	//해쉬값비교
	loopval = 0
	while(true) {
	if(loopval>45) break;
	if(templott[(v+loopval)%45]==0) {
	templott[(v+loopval)%45] = v
	break
	}
	else if(templott[(v+loopval)%45]==v) {
	i--;
	break
	}
	else {
	loopval++;
	}
	}
	}
	}
	var templotto = [0,0,0,0,0,0];
	x=0;
	for(i=0;i<templott.length;i++) {
		if(templott[i] != 0) templotto[x++] = templott[i]
	}

*/\

/*  excel to json

import xlrd
from collections import OrderedDict
import json

excel_file_path = 'D:\dd.xlsx'


wb = xlrd.open_workbook(excel_file_path)
sh = wb.sheet_by_index(0)

data_list = []

for rownum in range(1, sh.nrows):
    data = OrderedDict()
    row_values = sh.row_values(rownum)
    data['column1'] = row_values[0]
    data['column2'] = row_values[1]
    data_list.append(data)



j = json.dumps(data_list, ensure_ascii=False)  #한글 정상표시를 위해 필수


with open('data.json', 'w+') as f:
     f.write(j)
     
     */ //파이썬코드
     
     
//우편번호찾기 / 컬럼 1 이름 / 컬럼 2 주소

// cc = '' ; for(var i in aa) { doc=org.jsoup.Jsoup.connect('https://m.search.naver.com/search.naver?query='+aa[i].column2).get().select('div._3UffpxPikV > em').text() ; cc += aa[i].column1 + ' 귀하\n' +aa[i].column2 +'\n'+ doc + '\n\n'  }

/*
bread = function (r) {
	var name = r.msg.split(" ")[1];
	if (typeof name == "string") {
		var temp = D.selectForArray("bread", null, "name like ?", "%" + name.split('').join('%') + "%");
		for (var i = 0; i < temp.length; i++) {
			if(temp[i][2].length > 0){
				temp[i] = temp[i][0] + ' : ' + temp[i][1] + '\n특이사항 : ' + temp[i][2];
			} else {
				temp[i] = temp[i][0] + ' : ' + temp[i][1]
			}
			if (i == 3) {
				temp[2] = temp[2] + es;
			}
		}
		r.replier.reply(temp.join("\n\n"));
	} else {
		var temp = D.selectForArray("bread");
		for (var i = 0; i < temp.length; i++) {
			if(temp[i][2].length > 0){
				temp[i] = temp[i][0] + ' : ' + temp[i][1] + '\n특이사항 : ' + temp[i][2];
			} else {
				temp[i] = temp[i][0] + ' : ' + temp[i][1]
			}
			if (i == 3) {
				temp[2] = temp[2] + es;
			}
		}
		r.replier.reply(temp.join("\n\n"));
	}
}

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
		var temp = D.selectForArray("bankls", null, "name like ?", "%" + name.split('').join('%') + "%");
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
	if(doc < 1){
		var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html").method(org.jsoup.Connection.Method.GET).execute().cookies();
		var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1).data("mb_id", "tyfb1377").data("mb_password", "1q2w3e4r").data("x", "30").data("y", "30").method(org.jsoup.Connection.Method.POST).execute().cookies();
		Flag.set("cookie1", "test", cookie1);
		Flag.set("cookie2", "test", cookie2);
		var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01").cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get().select("tbody");
	}
	var docnum = doc.select("tr.num").toArray().map(v => v.select("td.num").get(0).text());
	var doctitle = doc.select("tr.num").toArray().map(v => v.select("a:first-child").get(0).ownText());
	if (docnum[0] > D.selectForArray("notice")[0][0]) {
		for (var i = 0; i < docnum[0] - D.selectForArray("notice")[0][0]; i++) {
			var doclink = doc.select("tr.num").select("a:first-child").get(i).attr("abs:href");
			var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get();
			var doctime = String(subdoc.select("div.sum > span.date").text());
			var text = String(subdoc.select("div.content").toArray()[0]).replace(/amp;/g, "").replace(/<br>/g, "\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").trim().replace(/^ +/gm, "").replace(/\n\n\n/g, "\n").replace(/\n\n\n/g, "\n");
			var repl = subdoc.select("div.comment_area").eachText().toArray().join("\n\n").replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, "");
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
	if(doc < 1){
		var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html").method(org.jsoup.Connection.Method.GET).execute().cookies();
		var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1).data("mb_id", "tyfb1377").data("mb_password", "1q2w3e4r").data("x", "30").data("y", "30").method(org.jsoup.Connection.Method.POST).execute().cookies();
		Flag.set("cookie1", "test", cookie1);
		Flag.set("cookie2", "test", cookie2);
		var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01").cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get().select("tbody");
	}
	var count = r.msg.substr(4,r.msg.length);
	var lastnum = doc.select("tr.num").get(14).select("td.num").get(0).text();
	if ( isNaN(count) ){
		if(count.indexOf('/') != -1){
			var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01&sca=&sop=and&sfl=wr_subject%7C%7Cwr_content&stx=" + count.split('/')[0] + "&sop=and&x=0&y=0").cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get().select("tbody");
			var firstnum = doc.select("tr.num").get(0).select("td.num").get(0).text();
			var wantnum = firstnum - count.split('/')[1];
			var docnum = doc.select("tr.num").get(wantnum).select("td.num").get(0).text();
			var doctitle = doc.select("tr.num").select("a:first-child").get(wantnum).ownText();
			var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
			var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get();
			var doctime = String(subdoc.select("div.sum > span.date").text());
			var text = String(subdoc.select("div.content").toArray()[0]).replace(/amp;/g, "").replace(/<br>/g, "\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").trim().replace(/^ +/gm, "").replace(/\n\n\n/g, "\n").replace(/\n\n\n/g, "\n");
			var repl = subdoc.select("div.comment_area").eachText().toArray().join("\n\n").replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, "");
			r.replier.reply(doctime + "\n" + docnum + " : " + doctitle + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
		} else {
			var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01&sca=&sop=and&sfl=wr_subject%7C%7Cwr_content&stx=" + count + "&sop=and&x=0&y=0").cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get().select("tbody");
			var temptext = doc.select("tr.num").toArray().map(v => "번호:" + v.select("td.num").get(0).text() + "   날짜:" + v.select("td.date").text() + "\n" + v.select("td.title>a").first().ownText());
			var text = [];
			for (i = 0; i < 15; i++) {
				text.push(temptext[i]);
				if( i == 4) {
					text.push(es);
				}
			}
			r.replier.reply(text.join("\n\n"));
		}
	} else if (Number(lastnum) - 1 < count && count < Number(lastnum) + 15 ) {
		var firstnum = doc.select("tr.num").get(0).select("td.num").get(0).text();
		var wantnum = firstnum - count;
		var docnum = doc.select("tr.num").get(wantnum).select("td.num").get(0).text();
		var doctitle = doc.select("tr.num").select("a:first-child").get(wantnum).ownText();
		var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
		var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get("cookie2", "test")).cookies(Flag.get("cookie1", "test")).get();
		var doctime = String(subdoc.select("div.sum > span.date").text());
		var text = String(subdoc.select("div.content").toArray()[0]).replace(/amp;/g, "").replace(/<br>/g, "\n").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").trim().replace(/^ +/gm, "").replace(/\n\n\n/g, "\n").replace(/\n\n\n/g, "\n");
		var repl = subdoc.select("div.comment_area").eachText().toArray().join("\n\n").replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, "");
		r.replier.reply(doctime + "\n" + docnum + " : " + doctitle + "\n----------------------------------\n" + es + text + "\n----------------------------------\n" + repl + "\n----------------------------------\n" + doclink);
	} else {
		var temptext = doc.select("tr.num").toArray().map(v => "번호:" + v.select("td.num").get(0).text() + "   날짜:" + v.select("td.date").text() + "\n" + v.select("td.title>a").first().ownText());
		var text = [];
		if (0 < count && count < 16) {
			for (i = 0; i < count; i++) {
				text.push(temptext[i]);
				if( i == 4) {
					text.push(es);
				}
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

donatelist = function(r) {
	var id = "tycwc";
	var pw = "gngn12";

	var cookiea = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login.php?url=%2F").method(org.jsoup.Connection.Method.GET).execute().cookies();
	var cookieb = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login_check.php").cookies(cookiea).data("mb_id", id).data("mb_password", pw).data("x", "48").data("y", "38").method(org.jsoup.Connection.Method.POST).execute().cookies();
	
	var doc = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/board.php?bo_table=support_apply").cookies(cookieb).cookies(cookiea).get().select(' table > tbody > tr > td > form > table > tbody').select('tr[align=center]').toArray().map(v=>v.select('td[width=40] > span').text() + ' | '+ v.select('td[width=50]:first-child>span').text() +'. ' +String(v.select('td>nobr').text()).replace('[내용보기]', '')).join('\n')
	r.replier.reply(doc)
}

donateDetail = function(r) {
	var wantnum = Math.floor(Number(r.msg.substr(4)));
	var id = "tycwc";
	var pw = "gngn12";

	var cookiea = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login.php?url=%2F").method(org.jsoup.Connection.Method.GET).execute().cookies();
	var cookieb = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login_check.php").cookies(cookiea).data("mb_id", id).data("mb_password", pw).data("x", "48").data("y", "38").method(org.jsoup.Connection.Method.POST).execute().cookies();
	
	var firstnum = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/board.php?bo_table=support_apply").cookies(cookieb).cookies(cookiea).get().select('tbody').select('tbody>tr>td>form>table>tbody>tr>td>span').get(0).text();
	var firstnum = Number(firstnum)
	if(wantnum > firstnum || wantnum + 15 < firstnum) {
		r.replier.reply('올바른 숫자를 입력해주세요.');
		return;
	} else {
		var link = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/board.php?bo_table=support_apply").cookies(cookieb).cookies(cookiea).get().select(' table > tbody > tr > td > form > table > tbody').select('tr[align=center]').select('tr').get(Number(firstnum-wantnum)).select(' nobr > a:nth-child(2)').attr("abs:href");
		var doc = org.jsoup.Jsoup.connect(link).cookies(cookieb).cookies(cookiea).get().select('table > tbody > tr > td > table > tbody').select('td[height=30]').toArray().map(v=>String(v.ownText()).replace(':','').trim())
		var res = '신청일자 : '+doc[0];
		res+='\n이름(단체)명 : '+doc[1];
		res+='\n성별 : '+doc[2];
		res+='\n생년월일 : '+doc[3];
		res+='\n이메일 : '+doc[4];
		res+='\n직업 : '+doc[5];
		res+='\n우편번호 : '+doc[6];
		res+='\n자택주소 : '+doc[7];
		res+='\n전화번호 : '+doc[8];
		res+='\n휴대전화 : '+doc[9];
		res+='\n후원구분 : '+doc[10];
		res+='\n후원금 : '+doc[11];
		res+='\n후원방법 : '+doc[12];
		res+='\n후원동기 : '+doc[13];
		res+='\n\n'+ org.jsoup.Jsoup.connect(link).cookies(cookieb).cookies(cookiea).get().select('#writeContents').text()
		r.replier.reply(res);
	}
}

donatecheck = function() {
	var id = "tycwc";
	var pw = "gngn12";

	var cookiea = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login.php?url=%2F").method(org.jsoup.Connection.Method.GET).execute().cookies();
	var cookieb = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/login_check.php").cookies(cookiea).data("mb_id", id).data("mb_password", pw).data("x", "48").data("y", "38").method(org.jsoup.Connection.Method.POST).execute().cookies();

	var doc = org.jsoup.Jsoup.connect("http://www.tycwc.or.kr/bbs/board.php?bo_table=support_apply").cookies(cookieb).cookies(cookiea).get().select('tbody').select('tbody>tr>td>form>table>tbody>tr>td>span').get(0).text();

	if(D.selectForArray('donate')[0][0] != doc ){
		Api.replyRoom('후원', '새후원을 확인해주세요!');
		Api.replyRoom('봇관리', '새후원을 확인해주세요!');
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
		Api.replyRoom('봇관리', '새후원을 확인했습니다.');
		Api.replyRoom('후원', '새후원을 확인했습니다.');
	}
}
*/