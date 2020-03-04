moonlist = function () {
	try {
		var badlist = readFile("/sdcard/badlist.txt");
		var goodlist = readFile("/sdcard/goodlist.txt");
		var hour = time().hour
		var min = time().minute
		var sec = time().second
		var day = time().date
		var bad = org.jsoup.Jsoup.connect("https://www1.president.go.kr/petitions/585683").get().select("#cont_view > div.cs_area > div.new_contents > div > div.petitionsView_left > div > h2 > span").text();
		var good = org.jsoup.Jsoup.connect("https://www1.president.go.kr/petitions/584936").get().select("#cont_view > div.cs_area > div.new_contents > div > div.petitionsView_left > div > h2 > span").text();
		
		badlist += '\n' + day + " " + hour + ":" + min + ":" + sec + " " + bad
		goodlist += '\n' + day + " " + hour + ":" + min + ":" + sec + " " + good
		writeFile("badlist.txt", badlist);
		writeFile("goodlist.txt", goodlist);
	} catch (e) {
		Api.replyRoom("관리", e + "\n" + e.stack);
	}
}

compare = function (a, b) {
	return a - b;
}
	
own = function (obj) {
	return Object.getOwnPropertyNames(obj);
}

cloneObject = function (obj) {
	return JSON.parse(JSON.stringify(obj));
}

thread = function (r) {
	r.replier.reply(T.getThreadList().join("\n"));
}

db = function (r) {
	r.replier.reply(D.selectForString("sqlite_master"));
}

checkroom = function (r) {
	var i = 1;
	r.replier.reply('인식된 방 개수 : ' + Api.getRoomList().length + '\n' + Api.getRoomList().map(v=> i++ + '. ' + v).join("\n"));
}

suggestion = function (r) {
	if (r.msg.length < 7) {
		r.replier.reply("건의가 너무 짧습니다.");
	} else {
		Api.replyRoom("test", r.room + " : " + r.sender + " : " + r.msg.substr(4));
		r.replier.reply(r.sender + "님의 건의가 접수되었습니다.");
	}
}

roomnamelist = function (r) {
	var name = r.msg.substr(4)
	if(name.length > 0){
		var temp = D.selectForArray("baseball", 'name', "room = ? and name like ?", [r.room, "%" + name.split('').join('%') + "%"], {orderBy: "name"}).map((v,i)=> (i+1) + '. ' + v).join('\n') + '\n\n*이 명단은 한 번이상 이 방에서 채팅을 친 목록입니다. 현재 방에 없을 수도 있습니다.'
		r.replier.reply('명단' + es + '\n' + temp)
	} else {
		r.replier.reply('명단' + es + '\n' + D.selectForArray("baseball", 'name', "room = ?", [r.room], {orderBy: "name"}).map((v,i)=> (i+1) + '. ' + v).join('\n') + '\n\n*이 명단은 한 번이상 이 방에서 채팅을 친 목록입니다. 현재 방에 없을 수도 있습니다.')
	}
}	

globaltime = function(r) {
	if(r.msg.substr(4).length > 0) {
		var link = "https://m.search.daum.net/search?q=" + r.msg.substr(4) + "시간"
		var temp = org.jsoup.Jsoup.connect(link).get();
		var check = temp.select("#wTimeColl > div.coll_tit > h2").text();
		if( String(check) == "해외시간" ){
			var loc1 = temp.select("#worldtimeTopNationCity").text();
			var loc1day = temp.select("#worldtimeTopCityDate").text();
			var loc1PMAM = temp.select("#worldtimeTopCityisAm").text();
			var loc1hour = temp.select("#worldtimeTopCityHour").text();
			var loc1min = temp.select("#worldtimeTopCityMinute").text();
			var loc1sec = temp.select("#worldtimeTopCitySecond").text();
			var loc1time = loc1 + "\n" + loc1day + " " + loc1PMAM + " " + loc1hour + ":" + loc1min + ":" + loc1sec
			
			var loc2 = temp.select("#worldtimeBottomNationCity").text();
			var loc2day = temp.select("#worldtimeBottomCityDate").text();
			var loc2PMAM = temp.select("#worldtimeBottomCityisAM").text();
			var loc2hour = temp.select("#worldtimeBottomCityHour").text();
			var loc2min = temp.select("#worldtimeBottomCityMinute").text();
			var loc2sec = temp.select("#worldtimeBottomCitySecond").text();
			
			var loc2time = loc2 + "\n" + loc2day + " " + loc2PMAM + " " + loc2hour + ":" + loc2min + ":" + loc2sec
			
			var timediff = temp.select("#wTimeColl > div.coll_cont > div > div.wrap_parallax > div").text()
			
			r.replier.reply(loc1time + "\n  [" + timediff + ']\n' + loc2time)
		} else {
			r.replier.reply("없는 지역입니다.");
			return;
		}
	} else {
		r.replier.reply(time().now)
	}
}
	

lyrics = function (r) {
	var temp = org.jsoup.Jsoup.connect("https://www.melon.com/search/total/index.htm?q=" + r.msg.substr(4) + "&section=&linkOrText=T&ipath=srch_form").get().select("div.tb_list.d_song_list.songTypeOne").select("tr>td");
	if (String(temp).length == 0) {
		var temp = org.jsoup.Jsoup.connect("https://www.google.com/search?ei=u7v0XKb3B9mAr7wPuoq2kAk&q=" + r.msg.substr(4) + " 가사").get();
		var temp1 = temp.select("div.SPZz6b").select("span").toArray();
		if (temp1.length == 0) {
			r.replier.reply("정보를 제공할 수 없습니다.");
			return;
		}
		var artist = temp1[1].text();
		var title = temp1[0].text();
		var musicLyrics1 = String(temp.select("div.Oh5wg").select("div[jsname=rdVbIe]>div:not(.OULBYb)"));
		var musicLyrics2 = String(temp.select("div.Oh5wg").select("div[jsname=wq5Syf]"));
		musicLyrics = (musicLyrics1 + musicLyrics2).replace(/<br>/g, "").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").replace(/&gt;/g, ">").replace(/^ +/gm, "").trim();
	} else {
		var musicCode = String(temp.get(0)).split("value=\"")[1].split("\"")[0];
		var musicData = org.jsoup.Jsoup.connect("https://www.melon.com/song/detail.htm?songId=" + musicCode).get();
		var artist = musicData.select("div.info>div.artist").text();
		var title = musicData.select("div.info>div.song_name").text().replace("곡명 ", "");
		var musicLyrics = String(musicData.select("div.lyric")).replace(/<br>/g, "").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").replace(/&gt;/g, ">").replace(/^ +/gm, "").trim();
		if (musicLyrics.length == 0) {
			var temp = org.jsoup.Jsoup.connect("https://www.google.com/search?ei=u7v0XKb3B9mAr7wPuoq2kAk&q=" + r.msg.substr(4) + " 가사").get();
			var temp1 = temp.select("div.SPZz6b").select("span").toArray();
			if (temp1.length == 0) {
				r.replier.reply("정보를 제공할 수 없습니다.");
				return;
			}
			var artist = temp1[1].text();
			var title = temp1[0].text();
			var musicLyrics1 = String(temp.select("div.Oh5wg").select("div[jsname=rdVbIe]>div:not(.OULBYb)"));
			var musicLyrics2 = String(temp.select("div.Oh5wg").select("div[jsname=wq5Syf]"));
			musicLyrics = (musicLyrics1 + musicLyrics2).replace(/<br>/g, "").replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, " ").replace(/&gt;/g, ">").replace(/^ +/gm, "").trim();
		}
	}
	r.replier.reply(r.msg.substr(4) + "의 검색 결과" + es + "\n제목 : " + title + "\n아티스트 : " + artist + "\n\n" + musicLyrics);
}


vs = function (r) {
	if ( (r.room == "단톡" ||r.room == "시갤" || r.room == "기타" || r.room == "전컴" || r.room == "옵치"|| r.room == "관리") && (r.sender != "시립봇") ){
		var temp = r.msg.split("vs");
		var num = Math.floor((temp.length) * Math.random());
		r.replier.reply(temp[num].trim());
	}
}

translation = function (r) {
	var tempmsg = r.msg.substr(7);
	var templan0 = r.msg.substr(4).split(",")[0][0];
	var templan1 = r.msg.substr(4).split(",")[0][1];
	if (templan0 == "영") {
		templan0 = "en";
	} else {
		if (templan0 == "한") {
			templan0 = "ko";
		} else {
			if (templan0 == "일") {
				templan0 = "ja";
			} else {
				r.replier.reply("번역할 수 없습니다.");
				return;
			}
		}
	}
	if (templan1 == "영") {
		templan1 = "en";
	} else {
		if (templan1 == "한") {
			templan1 = "ko";
		} else {
			if (templan1 == "일") {
				templan1 = "ja";
			} else {
				r.replier.reply("번역할 수 없습니다.");
				return;
			}
		}
	}
	if (templan0 == templan1) {
		r.replier.reply("번역할 수 없습니다.");
		return;
	}
	r.replier.reply(Api.papagoTranslate(templan0, templan1, tempmsg));
}


randomnumber = function (r) {
	var num1 = Number(r.msg.split(" ")[1]);
	var num2 = Number(r.msg.split(" ")[2]);
	if (num1 < 0 || num2 < 0) {
		r.replier.reply("양수만 입력하세요");
		return;
	}
	if (isNaN(num1) && isNaN(num2)) {
		num2 = 100;
		num1 = 1;
	}
	if (!isNaN(num1) && isNaN(num2)) {
		num2 = num1;
		num1 = 1;
	}
	if (num2 == num1) {
		r.replier.reply(num1);
		return;
	}
	if (!isNaN(num1) && !isNaN(num2) && (num1 < num2)) {
		r.replier.reply(num1 + Math.floor(Math.random() * (num2 - num1 + 1)));
	} else {
		r.replier.reply("잘못 입력했습니다.");
	}
}


time = function () {
	var today = new Date();
	var dayNames = ["(일요일)", "(월요일)", "(화요일)", "(수요일)", "(목요일)", "(금요일)", "(토요일)"];
	var day = dayNames[today.getDay()];
	var year = today.getFullYear(), month = today.getMonth() + 1, date = today.getDate(), hour = today.getHours(), minute = today.getMinutes(), second = today.getSeconds();
	ampm = hour >= 12 ? "PM" : "AM";
	hour1 = hour % 12;
	if(String(hour1) == 0){
		hour1 = '12'
	}
	hour1 = hour1 < 10 ? "0" + hour1 : hour1;
	hour = hour < 10 ? "0" + hour : hour;
	minute = minute < 10 ? "0" + minute : minute;
	second = second < 10 ? "0" + second : second;
	var now = year + "년 " + month + "월 " + date + "일 " + day + " " + hour1 + ":" + minute + ":" + second + " " + ampm;
	return {now: now, year: year, month: month, date: date, day: day, hour: hour, minute: minute, second: second, ampm: ampm, hour1: hour1};
}


githubload = function (r) {
	if (r.sender == "봇배우는배주현" || r.sender == "test") {
		backup(r);
		file = "storage/emulated/0/kbot/response.js";
		checksum = org.jsoup.Jsoup.connect("https://github.com/sjh7711/bot/commits/master").get().select("div.repository-content>a").attr("href").split("commit/")[1];
		conn = new java.net.URL("https://raw.githubusercontent.com/sjh7711/bot/" + checksum + "/response.js").openConnection();
		br = new java.io.BufferedReader(new java.io.InputStreamReader(conn.getInputStream()));
		str = "";
		tmp = null;
		while ((tmp = br.readLine()) != null) {
			str += tmp + "\n";
		}
		var filedir = new java.io.File(file);
		var bw = new java.io.BufferedWriter(new java.io.FileWriter(filedir));
		bw.write(str.toString());
		bw.close();
		Api.replyRoom(r.room, "Filesave success / " + ((new Date() - Timer) / 1000) + "s\n" + new Date());
	}
}


read64 = function (file) {
	var is = new java.io.FileInputStream(file);
	var os = new java.io.ByteArrayOutputStream();
	var len = 0;
	var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1000);
	while ((len = is.read(buf)) != -1) {
		os.write(buf, 0, len);
	}
	is.close();
	os.close();
	var fileArray = os.toByteArray();
	var str = new java.lang.String(android.util.Base64.encodeToString(fileArray, android.util.Base64.DEFAULT));
	return str;
}

toUTF16 = function (codePoint) {
	var TEN_BITS = parseInt("1111111111", 2);
	u = function (codeUnit) {
		return "\\u" + codeUnit.toString(16).toUpperCase();
	};
	if (codePoint <= 65535) {
		return u(codePoint);
	}
	codePoint -= 65536;
	var leadSurrogate = 55296 + (codePoint >> 10);
	var tailSurrogate = 56320 + (codePoint & TEN_BITS);
	return u(leadSurrogate) + u(tailSurrogate);
}

String.prototype.moneyUnit=function(){
	var v=Number(this);
	if(v>-1){
		return ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원').replace(' 0만', '');
	} else {
		return v;
	}
}

String.prototype.replaceAmp=function(){
	var res=this.toString();
	var tmp;
	while(tmp=/&#x....;/.exec(res)){
		res=res.replace(tmp[0],String.fromCharCode(parseInt(tmp[0].substr(3,4),16)));
	}
	while(tmp=/&#..;/.exec(res)){
		res=res.replace(tmp[0],String.fromCharCode(parseInt(tmp[0].substr(2,2))));
	}
	return res.replace(/&nbsp;/g,"\t").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&");
}
String.prototype.replaceAmp2=function(){
	var res=this.toString();
	var tmp;
	while(tmp=/&#x....;/.exec(res)){
		res=res.replace(tmp[0],String.fromCharCode(parseInt(tmp[0].substr(3,4),16)));
	}
	return res.replace(/&nbsp;/g,"\t").replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&").replace(/<br>/g,"\n");
}
String.prototype.indexOfs=function(){  
	var res = -1;
	for (var i = 0; i < arguments.length; i++) {
		var tmp=this.toString().indexOf(arguments[i]);
		if(tmp==-1) continue;
		else if(res==-1) res=tmp;
		else if(tmp<res) res=this.toString().indexOf(arguments[i]);
	}
	return res;
}
String.prototype.includess=function(){
	for (var i = 0; i < arguments.length; i++) {
		if(this.toString().includes(arguments[i])) return true;
	}
	return false;
}
String.prototype.replaces=function(target){
	var res=this.toString();
	for (var i = 1; i < arguments.length; i++) {
		res=res.replace(arguments[i],target);
	}
	return res;
}
String.prototype.encoding=function(){
 return this.replace(/\\u([\da-fA-F]{4})/g,(m,p1)=>String.fromCharCode(parseInt(p1,16)));
}

String.prototype.받침=function(){
	var lastCharCode=this.toString().charCodeAt(this.toString().length-1);
	if(lastCharCode>="가".charCodeAt(0) && lastCharCode<="힣".charCodeAt(0)){
		if((lastCharCode-"가".charCodeAt(0))%28==0) return false;
		else return true;
	}else return false;
	
}
String.prototype.은는=function(){
	return this.toString().받침() ? this.toString()+"은" : this.toString()+"는"; 
}
String.prototype.이가=function(){
	return this.toString().받침() ? this.toString()+"이" : this.toString()+"가"; 
}
String.prototype.과와=function(){
	return this.toString().받침() ? this.toString()+"과" : this.toString()+"와"; 
}
String.prototype.을를=function(){
	return this.toString().받침() ? this.toString()+"을" : this.toString()+"를"; 
}
String.prototype.조사=function(받침있음, 받침없음){
	return this.toString().받침() ? this.toString()+받침있음 : this.toString()+받침없음;
}

String.format=function(str,arg){
	if(str.charAt(str.length-1).toLowerCase()=='d') return String(new java.lang.String.format(str,new java.lang.Integer(arg)));
	return String(new java.lang.String.format(str,arg));	
}
String.prototype.extension=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return char.repeat(addLength)+this.toString();
}
String.prototype.extensionRight=function(char,length){
	const addLength = (length-this.toString().length >= 0) ? length-this.toString().length : 0; 
	return this.toString()+char.repeat(addLength);
}