//소스불러오기및 리로딩
var reloadcheck = 0;
function reload() {
	try {
		reloadcheck = 1;
		var Timer = new Date();
	    file = "storage/emulated/0/kbot/response.js";
	    checksum = org.jsoup.Jsoup.connect("https://github.com/sjh7711/bot/commits/master").get().select("div.repository-content>a").attr("href").split('commit/')[1];
	    conn = new java.net.URL("https://raw.githubusercontent.com/sjh7711/bot/"+checksum+"/response.js").openConnection();
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
	    var time = (new Date() - Timer) / 1000;
	    Api.replyRoom('test', "파일저장 완료 / " + time + "s");
	    T.interrupt();
	    Api.reload();
	    var time = (new Date() - Timer) / 1000;
	    reloadcheck = 0;
	    return "reloading 완료 / " + time + "s";
	}catch (e){
		Api.replyRoom('test', e + "\n" + e.stack);
	}
}
//패치노트
var Update = ['패치노트',
	'* 해외날씨 지원 및 일부 지역 날씨 오류 수정',
	'* 오버워치 배치를 보지 않았을 때 생기는 오류 수정',
	'* 날씨 방별로 기본 값을 다르게 수정',
	'* 날씨 도 단위 검색이 불가했던 문제 수정',
	'* 날씨 기능 추가',
	'* 추첨 기능 추가',
	'* 맛집 검색 기능 추가'
	]
//-------------------------------------------------------변수----------------------------------------------------------//
var D = require("DBManager.js")("D");
//menu:메뉴/res:식당
//D.selectForString("sqlite_master")
var T = require("ThreadManager.js");
//T.getThreadList()
var I = require("Interactive.js");

var es=String.fromCharCode(8237).repeat(500);

//추첨기 변수
var selnum = -1;
var selsender = "";
var sellist = [];
var seltime = "";

//공지 변수
var cookie1;
var cookie2;
var doc;

//봇제작방용 변수
var flagbot = [0, 0, 0, 0, 0, 0]; //flag[0]=메뉴추가flag flag[1]=식당추가flag //flag[2], flag[3] = 추첨기 //flag[4] = 반응속도

//전전컴톡방용 변수
var flagele = [0, 0, 0, 0, 0, 0]; 

//개인방용 변수
var flagtest = [0, 0, 0, 0, 0, 0];

//자생방용 변수
var flagja = [0, 0, 0, 0, 0, 0]; 

//오버워치용 변수
var flagover = [0, 0, 0, 0, 0, 0];

//공익방
var flagagent = [0, 0, 0, 0, 0, 0];

//--------------------------------------------------------------------Response-------------------------------------------------//
function response(room, msg, sender, isGroupChat, replier, imageDB) {
	
	if(reloadcheck == 1){
		return;
	}
	
	//Api.replyRoom('test', imageDB.getProfileImage());
	//if(imageDB.getImage()!=null){
	//	Api.replyRoom('test', imageDB.getImage())
	//}
	
	
	I.run(room, sender, msg);
	
	r = { replier: replier, msg: msg, sender: sender, room: room };
	
	if (room == 'test' || room == 'bot') {
		if (msg.indexOf("]") == 0) {
			try {
				replier.reply(eval(msg.substring(1)));
			} catch (e) {replier.reply(e + "\n" + e.stack);}
		}
	}
	
	try {
		var str = "";
		if (msg.indexOf("!날씨") == 0 || msg.indexOf("!ㄴㅆ") == 0 ) {
        	weather(r);
        }
        str += "!날씨\n"
        
		if (msg == "!로또" || msg == "!ㄹㄸ" ) {
            lotto(r);
        } 
        str += "!로또 / "

        if (msg.indexOf("!당첨") == 0 || msg.indexOf("!ㄷㅊ") == 0) {
            lottocheck(r);
        } 
        str += "!당첨\n";

        if (msg.indexOf("!메뉴") == 0 || msg.indexOf("!ㅁㄴ") == 0|| msg.indexOf("!메뉴추천") == 0|| msg.indexOf("!ㅁㄴㅊㅊ") == 0) {
            recom(r, "menu");
        } 
        str += "!메뉴 / "

        if (room != 'agent' || room != 'over') {
            if (msg.indexOf("!식당") == 0 || msg.indexOf("!ㅅㄷ") == 0|| msg.indexOf("!식당추천") == 0|| msg.indexOf("!ㅅㄷㅊㅊ") == 0) {recom(r, "res")}
            str += "!식당 / "
        } 
        
        if(msg.indexOf("!맛집")==0 || msg.indexOf("!ㅁㅈ")==0){
        	famous(r);
        } 
        str += "!맛집\n"
        	
        if (room != 'ja') {
            if (msg.indexOf("!최근채팅") == 0 || msg.indexOf("!ㅊㄱㅊㅌ") == 0) { recentchat(r)}
            str += "!최근채팅\n";
        }

        if (room == 'test' || room == 'bot') {
            if (msg.indexOf("!전체채팅") == 0 || msg.indexOf("!ㅈㅊㅊㅌ") == 0) { allchat(r)}
            str += "!전체채팅\n"
        } 
        
        if (msg.indexOf("!오버워치") == 0 || msg.indexOf("!ㅇㅂㅇㅊ") == 0) {
            overwatch(r);
        }
        str += "!오버워치\n";
        
        if (room == 'test' || room == 'bot') {
            if (msg.indexOf("!예정기능") == 0 || msg.indexOf("!ㅇㅈㄱㄴ") == 0) {replier.reply(D.selectForArray('willdo').join("\n"))}
            str += "!예정기능\n";
        }
        
        if (room == 'test' || room == 'agent' || room == 'bot') {
            if (msg.indexOf("!공지") == 0 || msg.indexOf("!ㄱㅈ") == 0) { notice(r)}
            str += "!공지\n";
        }
        
        if (room == 'test' || room == 'bot' || room == 'over' || room == 'agent' || room == 'ele'||room=='ja') {
        	if (msg =="!ㅊㅊ"|| msg == "!추첨" || this["flag" + r.room][2] == 1 || this["flag" + r.room][3] == 1) {sel(r)}
        	str += "!추첨\n";
        }
        
        if (msg =="!추첨종료"){
        	selexit(r);
        } 

        if (room == 'agent' || room =='test' || room == 'bot'){
        	if(msg.indexOf("!명단")==0 || msg.indexOf("!ㅁㄷ")==0){banklist(r);}
        	str += "!명단\n"
        } 

        if (msg == "!상태"){
        	checkstatus(r);
        } 
        str += "!상태\n"

        if (msg.indexOf('!건의 ')==0){
        	if(msg.substr(4).length < 3){
        		replier.reply("건의가 너무 짧습니다.");
        	}else{
        		Api.replyRoom('recom', room+" : "+sender+" : "+msg.substr(4));
        		replier.reply(sender+"님의 건의가 접수되었습니다.");
        	}
        }
        str += "!건의\n";
        
        if (msg=="/기능") {
            replier.reply("!기능으로 작동합니다");
        } 

        if (msg.indexOf("!기능 ") == 0) {
            func(r);
        } 
        
        if (sender == "시립봇") {} else { D.insert('chatdb', { time : time().hour+":"+time().minute+":"+time().second, name: sender, msg: msg, room : room}); }
        
        if (msg == "!기능") {
            replier.reply(str+es+"\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다"); 
        }
        
        if (msg == "!패치노트"){
        	temp = Update;
        	if(temp.length > 6){
        		temp[6] = temp[6]+es;
        	}
        	replier.reply(temp.join('\n'));
        }
        str += "!패치노트\n";
	} catch (e) {
        Api.replyRoom("test", e + "\n" + e.stack);
	}
}


//------------------------------------------------------------------ 함수------------------------------------------------------

function func(r) {
    if (r.msg.split(" ")[1] == "최근채팅") {
        r.replier.reply("최근채팅 6개를 출력합니다. !최근채팅16 과 같이 입력하면 16개를 불러오고 최대 16개까지 조회가 가능합니다. !최근채팅16 닉네임 과 같이 입력하면 해당 닉네임의 최근 16개 채팅을 보여줍니다. 불필요한 띄워쓰기가 들어가거나 이름이 잘못되면 출력이 안될 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "전체채팅") {
        r.replier.reply("방 구별없이 최근채팅 12개를 출력합니다. !최근채팅16 과 같이 입력하면 16개를 불러옵니다. DB에 저장된 마지막 데이터까지 조회가 가능합니다. !최근채팅16 닉네임 과 같이 입력하면 해당 닉네임의 최근 16개 채팅을 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "오버워치") {
        r.replier.reply("!오버워치 똥개#5468와 같이 입력하면 티어,점수,경쟁전에서 가장 많이 플레이한 영웅 4명을 확인할 수 있습니다.\n배치를 치지 않은 경우, 프로필이 비공개인 경우, 배틀태그를 입력하지 않은 경우, 대소문자를 정확하게 구분하지 않은 경우엔 정보를 알 수 없습니다.");
    } else if (r.msg.split(" ")[1] == "로또") {
        r.replier.reply("로또번호를 추천해줍니다. !당첨으로 토요일에 로또번호 추첨이 끝나면 결과를 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "당첨") {
        r.replier.reply("매주 토요일에 로또번호가 발표가 되면 지난 일주일간 뽑았던 번호가 몇등인지 알 수 있습니다. !당첨 닉네임 과 같이 입력하면 자기가 뽑은 번호만 확인 할 수 있습니다."+es+"\n3개 : 5등 / 4개 : 4등 / 5개 : 3등 / 5개+보너스 : 2등 / 6개 : 1등");
    } else if (r.msg.split(" ")[1] == "메뉴") {
        r.replier.reply("먹을 음식을 추천해 줍니다. !메뉴 3과 같이 입력하면 메뉴를 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "식당") {
        r.replier.reply("시립대 주변 식당을 추천해 줍니다. !식당 3과 같이 입력하면 식당을 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "예정기능") {
        r.replier.reply("앞으로 만들어질 예정/오류수정예정/추가기능 등등 개선될 내용입니다. 본인방에서 작동하지 않을 기능도 있습니다.");
    } else if (r.msg.split(" ")[1] == "공지") {
        r.replier.reply("최근 5개의 공지를 띄워줍니다. !공지 15 과 같이 입력하면 공지 15개를 보여주고 최대 15개까지 조회가능합니다. 해당 공지의 번호를 !공지 xxx 이렇게 입력하시면 내용과 댓글을 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "날씨") {
        r.replier.reply("!날씨 지역명으로 검색가능하며 경우에 따라 선택을 해야할 수도 있습니다. 기본값은 해당 방과 가장 관련있는 지역입니다.");
    } else if (r.msg.split(" ")[1] == "건의") {
        r.replier.reply("건의를 받습니다. !건의 건의내용 으로 입력하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "추첨") {
        r.replier.reply("!추첨을 입력하면 참여한 사람 몇 명을 뽑을 건지 입력할 수 있습니다. 입력 후에는 참가를 입력하면 참가가 가능하고, 추첨을 제안한 사람이 !마감을 입력하면 당첨자가 바로 발표됩니다. 90초 뒤에 !추첨종료로 종료가 가능합니다.");
    } else if (r.msg.split(" ")[1] == "명단") {
        r.replier.reply("푸드뱅크 명단을 보여줍니다. !명단 만월 처럼 입력하면 만월노인요양원의 검색 결과가 나옵니다.\n!명단추가 복지센터 055645XXXX 처럼 입력하면 추가되고 !명단삭제 복지센터 처럼 입력하면 목록이 삭제됩니다. 삭제할땐 반드시 제대로 된 기관명을 입력해야합니다.");
    } else if (r.msg.split(" ")[1] == "맛집") {
        r.replier.reply("검색한 지역의 맛집을 알려줍니다. !맛집 지역명 으로 검색하면 됩니다.");
    }
}

/*
if (room == 'test' || room == 'bot' || room == 'over' || room == 'agent' || room == 'ele'||room=='ja') {
	if (msg =="!반응속도" || msg =="!ㅂㅇㅅㄷ") {
		T.register("reactionSpeed",()=>{
			var now;
			while(1){
				if(this["flag" + room][4] == 0){
					replier.reply("8초안에 반응속도 확인을 시작합니다. 먼저 . 을 입력하는 사람이 이깁니다.");
					var rand = 1+Math.floor(Math.random() * 7000);
					java.lang.Thread.sleep(rand);
					this["flag" + room][4] = 1;
					replier.reply('시작!');
					msg="";
					now = new Date().getTime();
				}
				var reactiontime = new Date().getTime();
				if(this["flag" + room][4] == 1 && msg == '.' && (reactiontime - now - 250 > 0) ){
					r.replier.reply(sender+"님의 반응 속도 : "+ (reactiontime-now-250)/1000 +'초');
					this["flag" + room][4] = 0;
					break;
				}
				if(((new Date().getTime())-now) > 20000){
					break;
				}
			}
		}).start();
	}
}*/

function checkstatus(r){
	var bm = Api.getContext().registerReceiver(null,new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED));
	var temperature = bm.getIntExtra("temperature",0)/10 + '℃'
	var level = bm.getIntExtra("level",0) + "%"
	var status =["Unknown","Charging","Discharging","Not charging","Full"][bm.getIntExtra("status",1)-1]
	var voltage = bm.getIntExtra("voltage",0)/1000 + "V"
	
	var stat1 = readFile().substr(5).split(" ");
	java.lang.Thread.sleep(1000);
	var stat2 = readFile().substr(5).split(" ");        
	var user = stat2[0]-stat1[0];
	var system = stat2[1]-stat1[1];
	var nice = stat2[2]-stat1[2];
	var idle = stat2[3]-stat1[3];
	var total = user+system+nice+idle;
	var idlePerc = (1-idle/total)*100

	batteryStatusStr = "배터리 상태\n"+"온도 : " + temperature +"\n충전률 : "+level + "\n상태 : " + status + "\n전압 : " + voltage + "\n기기 상태\n쓰레드 수 : "+T.getThreadList().length + "\nCPU : "+ Math.floor(idlePerc*100)/100 +"%" 
	r.replier.reply(batteryStatusStr);
}

function weather(r){
	I.register("weatherSelect",r.room,r.sender,function(input){
		try{
			var want = r.msg.substr(4);
			var link1 = ""; // 날씨 검색화면
			var link2 = 'https://m.weather.naver.com/m/main.nhn?regionCode=03220111'; //네이버날씨기본주소
			var check = link2.indexOf('weather'); //link2 String에 weather이 있는지 검사
			var where = "통영시 무전동";
			if(r.room == 'ja' || r.room == 'ele'|| r.room == 'bot'){
				link2= 'https://m.weather.naver.com/m/main.nhn?regionCode=09230104';
				check = link2.indexOf('weather');
				where = "서울시립대";
			}
			if(want.length > 0){ //!날씨 ~뒤에 뭔가가 있을 때
	        	link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+want+"+날씨").get();
	    		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
	    		var	check = link2.indexOf('weather');
	    		where = want; // 지역명
	    		var temp = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query="+want+"+날씨").get().select('div.sort_box._areaSelectLayer').select('div.select_lst._selectLayerLists').select('a').toArray() //같은 이름의 지역이 있는지 확인
	    		
	    		 if (temp.length > 1){ //같은 이름의 지역이 2곳 이상일 때
		        	var i=0; //name의 번호에 필요
		        	var name = temp.map(v=> (1+i++) +". "+ v.text()); //장소명들
		        	var msg;
		        	r.replier.reply("지역을 선택하세요\n"+name.join('\n'));
		        	msg=input.getMsg()*1;
		        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
		        		var targetNum=msg-1;
		        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+name[targetNum].substr(3)+"+날씨").get();//위에서 받은 정보로 날씨 검색
		        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
		        		where = name[targetNum].substr(3);
		        	}else{
		        		r.replier.reply("검색이 불가능합니다.");
		        		return;
		        	}
				}else if (check == -1){ //네이버에 날씨검색이 바로 안될 때
		        	var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q="+want).get().select('div.wrap_place').select('div.wrap_cont').toArray(); // 다음에서 해당하는 곳의 주소를 가져옴
		        	var i = 0;
		        	var name = temp.map(v=>(1+i++)+". "+v.select('a').first().text().replace(' 펼치기/접기',''));// want로 daum에 검색한 곳들의 이름들
		        	if(name.length == 0){
		        		r.replier.reply("검색이 불가능합니다.");
		        		return;
		        	}
		        	var loc = temp.map(v=>{vv=String(v.select('dd.cont').text());return vv.substr(0,vv.lastIndexOf("동")+1)});  //각 이름들의 주소
		        	var msg;
		        	r.replier.reply("장소를 선택하세요\n"+name.join("\n"));
		        	msg=input.getMsg()*1;
		        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
		        		var targetNum=msg-1
		        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+loc[targetNum]+"+날씨").get();
		        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
		        		where = name[targetNum].substr(3) ;
		        		check = link2.indexOf('weather');
		        		if(check == -1){
		        			r.replier.reply("검색이 불가능합니다.");
							return;
		        		}
		        	}
				} else if(want.indexOf('제주')>-1) { //특별한 제주 ^^
					var name = ['1. 제주' , '2. 서귀포'];
					var msg;
	    			r.replier.reply("지역을 선택하세요\n"+name.join('\n'));
		        	msg=input.getMsg()*1;
		        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
		        		var targetNum=msg-1;
		        		want += " "+name[targetNum].substr(3);
		        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+want+"+날씨").get();
			    		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
			    		check = link2.indexOf('weather');
		        		where = name[targetNum].substr(3);
		        	}
				} else if(link2=="http://m.weather.naver.com"){//도단위 검색일 때
					var i = 0;
	    			var name = link1.select('div.lcl_lst').select('span.lcl_name').toArray().map(v=>(1+i++)+". "+v.text());
	    			var msg;
	    			r.replier.reply("지역을 선택하세요\n"+name.join('\n'));
		        	msg=input.getMsg()*1;
		        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
		        		var targetNum=msg-1;
		        		var link3 = link1.select('div.lcl_lst').select('a').get(targetNum).attr("abs:href");
		        		link1 = org.jsoup.Jsoup.connect(link3).get();
		        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
		        		check = link2.indexOf('weather');
		        		where = name[targetNum].substr(3) ;
		        	}else{
		        		r.replier.reply("검색이 불가능합니다.");
		        		return;
		        	}
		        }
			}
			
			if(check > 0){
				var doc = org.jsoup.Jsoup.connect(link2).get();
				var sky = doc.select('div.weather_icon.sp_icon_60').toArray().map(v=> v.text());
				var degree = doc.select('div._cnWtrHourlyChartData').select('div[data-tab=0]').text().split(',').slice();
				var rain = doc.select('div._cnWtrHourlyChartData').select('div[data-tab=1]').text().split(',').slice();
				var wind = doc.select('div._cnWtrHourlyChartData').select('div[data-tab=2]').text().split(',').slice();
				var wet = doc.select('div._cnWtrHourlyChartData').select('div[data-tab=3]').text().split(',').slice();
				//var direction = doc.select('tr.row.row_icon._cnWtrHourlyChart[data-tab=2]').text().split(' ').slice();
				
				var where1 = "";
				if(want.length > 0 ){
					var where1 = "("+doc.select('div.section_location').select('strong').text()+")";
				}
				if( String(doc).indexOf('Weathernews') > 0 || String(doc).indexOf('The Weather Channel') > 0 || String(doc).indexOf('accuweather') > 0){
					var clock = doc.select('span.th_text').text().replace('시', '').split(' 내일')[0].split(' ').slice().concat('0','1','2','4','5','6','7','8','9');
					var clock1 = clock.length;
					if (clock1 > 16){
						clock1 = 16;
					}
					var res =where+where1+" 날씨\n";
					res += "-------------날씨-------------\n"
						res += "시간 기온 강수 습도 바람    날씨\n [h]   [℃]  [%]  [%] [m/s]    상태\n";
						for (var i = 1 ; i < clock1 ; i++) {
							res += " "+String(clock[i]).extension("0",2)+"    ";
							res += String(degree[i]).extension(" ",2)+"    ";
							res += String(rain[i]).extension(" ",2)+"   ";
							res += String(wet[i]).extension(" ", 2)+"   ";
							res += String(wind[i]).extension(" ",2)+" ";
							res += String(sky[i]).extension("ㅤ",5)+"\n";
							//res += String(direction[i]).extension("   ",3)+" ";
							if(i==5){
								res +=es;
							}
						}
						res += "\n"+link2;
				} else {
					var clock = doc.select('span.th_text').text().replace('시', '').split(' 내일')[0].split(' ').slice().concat('0','3','6','9','12','15','18','21','0','3','6','9','12','15','18','21','24');
					var clock1 = doc.select('span.th_text').text().split(' 내일')[0].split(' ').slice().length;
					var uv1 = doc.select('li.uv').select('em').text();
					var uv = doc.select('li.uv').select('span').text().replace(uv1, " ("+uv1+")");
					var index = doc.select('strong.title').text().replace('최근 검색한 곳','').split(' ').map(v=>String(v).replace(/온도/g, "온도 : ").replace(/지수/g, "지수 : "))
					var sun1 = doc.select('li.sun_item').select('div.day').select('span').get(0).text() +" : "+ doc.select('li.sun_item').select('div.time').get(0).text();
					var sun2 = doc.select('li.sun_item').select('div.day').select('span').get(1).text() +" : "+ doc.select('li.sun_item').select('div.time').get(1).text();
					var link3 = link2+'&default=air';
					var doc1 = org.jsoup.Jsoup.connect(link3).get();
					var pollution = doc1.select('li.pollution_item').toArray().map(v=>{vv=String(v.select('span.number').select('em').text()); vvv=String(v.select('span.title').text()); return vvv +" : "+ v.select('span.number').text().replace(vv, " "+vv)});
					var dust = doc1.select('div.dust_graph_number').toArray().map(v=>v.text().replace('먼지', '먼지 :')+"㎍/㎥");
					
					var res =where+where1+" 날씨\n"+"ㅤㅤ<종합정보 → 전체보기>\n";
					res += "-------미세먼지/자외선--------\n";
					res += dust.join("\n")+"\n";
					res += "자외선 : "+uv+"\n";
					res += "-------------날씨-------------\n"
					res += "시간ㅤ기상ㅤ기온 강수 습도 바람\n [h] ㅤ상태    [℃]  [%]  [%] [m/s]\n";
					for (var i = 0 ; i < clock1+9 ; i++) {
						res += " "+String(clock[i]).extension("0",2)+" ";
						res += String(sky[i]).extensionRight("ㅤ",4)+"  ";
						res += String(degree[i]).extension(" ",2)+"   ";
						res += String(rain[i]).extension(" ",2)+"   ";
						res += String(wet[i]).extension(" ", 2)+"   ";
						res += String(wind[i]).extension(" ",2)+"\n";
						//res += String(direction[i]).extension("   ",3)+" ";
						if(i==5){
							res +=es;
						}
					}
					res += "------------기타지수------------\n"+pollution.join("\n")+"\n";
					res += "------------일상지수------------\n"+index.join("\n");
					res += "\n------------일출&일몰-----------\n"+sun1+"\n"+sun2;
					res += "\n"+link2;
				}
				r.replier.reply(res);
			}
		}catch(e){r.replier.reply(e+"\n"+e.stack)}
    })
}
T.register("weatherClockCheck",()=>{
	while(true){
		if( 8 == new Date().getHours() ){
			r={msg : '!날씨', room : 'agent',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(5*1000);
			r={msg : '!날씨', room : 'bot',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(5*1000);
			r={msg : '!날씨', room : 'ele',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(5*1000);
			r={msg : '!날씨', room : 'test',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(5*1000);
			r={msg : '!날씨', room : 'ja',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(60*60*1000); //60분
		}
		java.lang.Thread.sleep(60*1000); //1분
	}
}).start();


//오버워치
function overwatch(r) {
	try{
		var name = r.msg.substr(6).replace("#", "-");;//배틀태그가 담기는 공간
	    var source = org.jsoup.Jsoup.connect('https://playoverwatch.com/ko-kr/career/pc/'+name).header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36").get();
	    if (source.select('div.u-align-center').text().indexOf('이 프로필은 비공개입니다.')>0 ) {
	    	r.replier.reply(r.msg.substr(6) + "의 정보를 알 수 없습니다.");
		} else {
			var temp = source.select('div.masthead');
			if(String(temp.select('div.u-align-center')).length==0){
				var score = "Unranked";
				var tier = "Unranked";
			}else if (String(temp.select('div.u-align-center')).length>0) {
				var score = temp.select('div.u-align-center').get(0).text();
		        var tier = temp.select('div.competitive-rank').get(0).toString().split('rank-icons/rank-')[1].split('Tier')[0];
			}else {
				var score = "알 수 없습니다."
				var tier = "Unranked";
			}

	        //var quickplaytime = source.select('div.progress-category.toggle-display').get(0);
			
			var compplaytime = source.select('div.progress-category.toggle-display').get(7);
			var compwinrate = source.select('div.progress-category.toggle-display').get(10);
			var compkilldeath = source.select('div.progress-category.toggle-display').get(11);
			
	        var res = "닉네임 : "+r.msg.substr(6)+"\n점수 : "+score+"\n티어 : "+tier+"\n\n많이 플레이한 영웅 TOP4"+es;
	        
	        for(var i = 0 ; i < 4 ; i++ ){
	        	var most = compplaytime.select('div.ProgressBar-title').get(i).text();
	        	res+="\n\n"+(i+1)+"."+most;
	            var mosttime = compplaytime.select('div.ProgressBar-description').get(i).text();
	        	res+="\n  플레이 시간 : "+mosttime;
	            var mostwinrate = compwinrate.select("div.ProgressBar-textWrapper:contains("+most+")").select('div.ProgressBar-description').text();  if(mostwinrate.indexOf("%")==-1){mostwinrate+='%'};
	            res+="\n  승률 : "+mostwinrate;
	            var mostkilldeath = compkilldeath.select("div.ProgressBar-textWrapper:contains("+most+")").select('div.ProgressBar-description').text();
	            res+="\n  목숨당처치 : "+mostkilldeath;
	        }
	        r.replier.reply(res);
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

function famous(r){
	try{
		var name = r.msg.split(" ")[1];
		var firsturl = "https://m.search.naver.com/search.naver?query="+name+"맛집&where=m&sm=mtp_hty.top";
		var url = undefined;
		url = org.jsoup.Jsoup.connect(firsturl).get().select('a.btn_sort');
		if(url.toArray()[0] == undefined){
			r.replier.reply("실제로 있는 지역을 입력하세요.");
		}else{
			url = url.get(1).attr("abs:href");
			var doc = org.jsoup.Jsoup.connect(url).get();
			var temptext = doc.select('li.list_item').toArray().map(v=>v.select("span.name").text() + " : " +v.select("div.txt").text() );
			if (temptext.length > 3){
				temptext[2]=temptext[2]+es;
			}
			temptext = temptext.join('\n\n');
			
			r.replier.reply(temptext);
		}
    }catch(e){
    	Api.replyRoom('test',e+"\n"+e.stack);
		}
	
}

function banklist(r){
	try{
		var name = r.msg.split(" ")[1];
		var phone = r.msg.split(" ")[2];
		var cmd = r.msg.split("!명단")[1].split(" ")[0];
		if(typeof name == 'string' && typeof cmd == '추가' && typeof phone == 'string'){
			D.insert("bankls", {name :name, phone:phone});
			r.replier.reply(D.selectForString('bankls'));
		}else if(typeof name == 'string' && typeof cmd == '삭제'){
			D.delete("bankls", "name=?", [name]);
			r.replier.reply(D.selectForString('bankls'));
		} else if(typeof name == 'string'){
			var temp=D.selectForArray('bankls',null,'name like ?','%'+name+'%');
			for(var i=0;i<temp.length;i++){
				temp[i]=temp[i].join(" : ")
				if(i==3){
					temp[2]=temp[2]+es;
				}
			}
			r.replier.reply("      기관명      |      전화번호\n----------------------------------\n"+temp.join("\n\n"));
		} else {
			var temp=D.selectForArray('bankls');
			for(var i=0;i<temp.length;i++){
				temp[i]=temp[i].join(" : ")
				if(i==3){
					temp[2]=temp[2]+es;
				}
			}
			r.replier.reply("      기관명      |      전화번호\n----------------------------------\n"+temp.join("\n\n"));
		}
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}


//추첨기
function sel(r){ //flag[2]==0&&flag[3]==0 -> 초기상태  // flag[2]==1&&flag[3]==0 -> 추첨이 시작함 // flag[2]==1&&flag[3]==1 -> 추첨인원 모집  // flag[2]==0&&flag[3] ==1 -> 당첨자 발표
	try{
		var list1 = [];
		
		if ((this["flag" + r.room][2] == 1 || this["flag" + r.room][3] == 1) && r.msg == '!추첨'){
			r.replier.reply('현재 추첨이 진행중입니다.')
		}

		if (this["flag" + r.room][2] == 0 && this["flag" + r.room][3] == 0){
			r.replier.reply("뽑힐 인원 수를 입력해주세요. 5명까지 가능합니다. 참여엔 제한이 없습니다. 90초 이후에 !추첨종료 로 종료가 가능합니다.");
			seltime = new Date().getTime();
			selsender = r.sender;
			this["flag" + r.room][2] = 1;
		}
		
		if(selsender == r.sender && r.msg < 5 && 0 < r.msg && this["flag" + r.room][2] == 1 && this["flag" + r.room][3] == 0){
			selnum = r.msg;
			r.replier.reply(selnum+"명을 뽑습니다. 참여할 사람은 참가 를 입력해주세요. 추첨을 제안한 사람이 !마감을 입력하면 마감됩니다.");
			this["flag" + r.room][3]=1;
		}
		
		if (r.msg == '참가' && this["flag" + r.room][2] == 1 && this["flag" + r.room][3] == 1){
			if(sellist.indexOf(r.sender)==-1){
				sellist.push(r.sender);
				r.replier.reply(r.sender+"님이 참가하셨습니다. 현재 "+sellist.length+'명');
			}
		}
		
	   if(r.msg == '!마감' && r.sender == selsender && this["flag" + r.room][2] == 1 && this["flag" + r.room][3] == 1){
	    	this["flag" + r.room][2]=0;
	    	r.replier.reply('3');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply('2');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply('1');
	    	java.lang.Thread.sleep(1000);
	    }
	   
	    if ( this["flag" + r.room][2] == 0 && this["flag" + r.room][3] == 1 ){
	    	if(sellist.length == 0){
	    		list1=['아무도 참가하지 않았습니다.'];
	    	}
	    	if(sellist.length <= selnum){
	    		list1=sellist;
	    	} else {
	    		for (var i = 0; i < selnum; i++) {
	            	var rad = Math.floor(Math.random() * sellist.length);
	            	if (list1.indexOf(sellist[rad]) == -1){//중복이면 거른다
	            		list1.push(sellist.splice(rad, 1));
	            	}
	            }
	    	}
	    	r.replier.reply("당첨자 : "+list1.join(", "));
	    	this["flag" + r.room][3] = 0;
	    	selnum = -1;
	    	selsender = "";
	    	sellist=[];
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

function selexit(r){
	try{
		var selexittime = new Date().getTime();
		if( seltime + 1000*60*1.5 < selexittime){
			selnum = -1;
			selsender = "";
			sellist=[];
			this["flag" + r.room][2] = 0;
			this["flag" + r.room][3] = 0;
			r.replier.reply("추첨을 종료했습니다. 새로운 추첨이 가능합니다.")
		} else {
			var temp = new Date().getTime();
			r.replier.reply((90000 - (temp - seltime))/1000 + "초 뒤에 !추첨종료가 가능합니다.")
		}
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}


//최근채팅
function recentchat(r) {
	try{
		var temp1 = r.msg.substr(5); // 개수
	    if(temp1.length!=0){
	    	temp1 = temp1.split(" ")[0];
	    }
	    var temp2 = r.msg.substr(r.msg.split(" ")[0].length+1);//닉
	    var num = 6;
	    var flag = 0;
	    	
	    var tempchat = D.selectForArray('chatdb', ['time', 'name', 'msg' ] , 'room=?', r.room);
		var templeng = tempchat.length;
	    if(6 > templeng){
			num = templeng;
		}
	    
		if(temp1.length > 0 &&  temp2.length > 0){
			var tempchat = D.selectForArray('chatdb', ['time', 'msg'] , 'name=? and room=?', [temp2, r.room]);
			var templeng = tempchat.length;
			if(templeng==0){
				r.replier.reply(temp2+"의 채팅이 없습니다.");
				return;
			} else {
				if(0 < temp1*1 && temp1*1 < 17 ) {
					var num = temp1*1;
					if(tempchat.length<temp1*1){
						num = templeng;
					}
				}
				flag = 1;
			}
		} else if (0 < temp1*1 && temp1*1 < 17) {
			var tempchat = D.selectForArray('chatdb', ['time', 'name', 'msg' ] , 'room=?', r.room);
			var templeng = tempchat.length;
			var num = Math.floor( temp1*1 );
			if(tempchat.length<temp1*1){
				num = templeng;
			}
		} else if(temp2.length > 0) {
			var tempchat = D.selectForArray('chatdb', ['time', 'msg'] , 'name=? and room=?', [temp2, r.room]);
			var templeng = tempchat.length;
			if(templeng==0){
				r.replier.reply(temp2+"의 채팅이 없습니다.");
				return;
			} else {
				flag = 1;
			}
		}
		
		
		var temp = [];
		if(flag==1){
			temp[0]=temp2+"님의 채팅내역\n"; 
		}
	    if (0 < num && num < 17) {
	        for (var i = tempchat.length - num; i < tempchat.length; i++) {
	        	if( i - tempchat.length + num == 2){
	        		temp.push(tempchat[i].join(" | ")+es);
	        	} else {
	        		temp.push(tempchat[i].join(" | "));
	        	}
	        }
	    }
	    r.replier.reply(temp.join("\n"));
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}


function allchat(r) { 
	try{
		var temp1 = r.msg.substr(5); 
	    if(temp1.length!=0){
	    	temp1 = temp1.split(" ")[0];
	    }
	    var temp2 = r.msg.substr(r.msg.split(" ")[0].length+1);//닉
	    var flag = 0;
	    var num = 12;
	    	
	    var tempchat = D.selectForArray('chatdb');
	    
		if(temp1.length > 0 &&  temp2.length > 0){
			var tempchat = D.selectForArray('chatdb', ['time', 'msg', 'room'] , 'name=?', [temp2]);
			var templeng = tempchat.length;
			if(templeng==0){
				r.replier.reply(temp2+"의 채팅이 없습니다.")
				return;
			} else {
				var num = Math.floor( temp1*1 );
				flag = 1;
			}
		} else if(temp2.length > 0) {
			var tempchat = D.selectForArray('chatdb', ['time', 'msg', 'room'] , 'name=?', [temp2]);
			var templeng = tempchat.length;
			if(templeng==0){
				r.replier.reply(temp2+"의 채팅이 없습니다.")
				return;
			} else {
				var num = Math.floor( temp1*1 );
				flag = 1;
			}
		}
		if(temp1.length > 0){
			var num = Math.floor( temp1*1 );
		}
		if(num > tempchat.length){
			num = tempchat.length;
		}
		
		var temp = [];
		if(flag==1){
			temp[0]=temp2+"님의 채팅내역\n"; 
		}
	    for (var i = tempchat.length - num; i < tempchat.length; i++) {
	    	if( i - tempchat.length + num == 2){
	    		temp.push(tempchat[i].join(" | ")+es);
	    	} else {
	    		temp.push(tempchat[i].join(" | "));
	    	}
	    }
	    r.replier.reply(temp.join("\n"));
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}   
}

//리스트에서 추천하기(1개 or 여러개)
function recom(r, name) { //name : DB이름
	try{
		var num = r.msg.split(" ")[1]; //num : 추천받고 싶은개수
	    var list = D.selectForArray(name);
	    if (num == undefined) {//1개만 추천
	        var rad = Math.floor(Math.random() * list.length);
	        r.replier.reply(list[rad]);
	    }
	    if (0 < num && num < 9) {//추천할 메뉴가 1개  ~ 8개이하일때
	        var templist = list.slice(); //list의 복사본을 만든다.
	        var listmul = []; //listmul : 랜덤으로 뽑힐 메뉴들이 담기는 공간
	        for (var i = 0; i < num; i++) {
	            var rad = Math.floor(Math.random() * templist.length);//rad : 뽑힌 메뉴
	            listmul.push(templist.splice(rad, 1));//rad 번째 메뉴가 뽑혀서 listmul에 담김
	        }
	        r.replier.reply(listmul.join(", "));
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}



//로또
function lotto(r) {
	try{
		var templotto = []; //로또번호 담길곳
	    for (var i = 0; i < 100; i++) {
	        var rad = Math.floor(1 + Math.random() * 45); //rad : 1~45중에 뽑히는 숫자
	        if (templotto.indexOf(rad) == -1) {//중복이면 거른다
	            templotto.push(rad);
	        }
	        if (templotto.length == 6) {//6개까지
	            break;
	        }
	    }
	    r.replier.reply(templotto.sort(compare).join(", "));
	    
		var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
		var num = raw.select('h4').text().split('회')[0]*1+1;
		
		var today = new Date();
		var year   = today.getFullYear();
		var month  = today.getMonth() + 1;
		var date   = today.getDate();
		var hour   = today.getHours();
		var minute = today.getMinutes();
		
		date = date < 10 ? '0' + date : date;
		hour = hour < 10 ? '0' + hour : hour;
		minute = minute < 10 ? '0' + minute : minute;
		
	    D.insert('lotto', {room : r.room, sender : r.sender, year: year, month: month, date:date, hour:hour, minute:minute, num:num, num1:templotto[0],num2:templotto[1],num3:templotto[2],num4:templotto[3],num5:templotto[4],num6:templotto[5]});
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

function lottocheck(r) {
	try{
		var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
		var lastnum = raw.select('h4').text().split('회')[0];
		var win = raw.select('p').get(1).text().split(" ").slice();
		var bonus = raw.select('p').get(2).text();
		var date = raw.select('p').get(0).text().replace("(","").replace(" 추첨)","").slice();

		var temp=D.selectForArray('lottoresult','num');
		
		if(temp[temp.length-1]!=lastnum*1){
			var lottodata = D.selectForArray('lotto',null,'num=?', [lastnum]);
			for(var i=0;i<lottodata.length;i++){
				var count = 0;
				for(var j=0;j<6;j++){
					for(var k=0;k<6;k++){
						if(lottodata[i][j+8]==win[k]){
							count+=1;
							break;
						}
					}
					if(count == 5){
						for(var k=0;k<6;k++){
							if(lottodata[i][j+8]==bonus){
								count+=2;
								break;
							}	
						}
					}
				}
				lottodata[i].push(count);
				if(count==0||count==1||count==2){
					lottodata[i].push('꽝');
				}else if(count==3){
					lottodata[i].push('5등');
				}else if(count==4){
					lottodata[i].push('4등');
				}else if(count==5){
					lottodata[i].push('3등');
				}else if(count==7){
					lottodata[i].push('2등');
				}else if(count==6){
					lottodata[i].push('1등');
				}
				D.insert('lottoresult', {room : lottodata[i][0], sender : lottodata[i][1], year: lottodata[i][2], month: lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7], num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:lottodata[i][14],class:lottodata[i][15]});
			}
		}
		
		var temp = D.selectForArray('lottoresult',null,'room=? and num=?', [r.room, lastnum]);
		var result=date+" "+lastnum+"회차\n당첨번호 : "+win[0]+" "+win[1]+" "+win[2]+" "+win[3]+" "+win[4]+" "+win[5]+"/"+bonus+"\n\n"+es;
		if ( temp.length == 0 ){
			r.replier.reply(result+'저번주에 로또 번호를 뽑은 사람이 아무도 없습니다.');
		} else if ( typeof r.msg.split(" ")[1] != 'undefined' ) { 
			var temp = D.selectForArray('lottoresult',null,'room=? and sender=?', [r.room ,r.msg.split(" ")[1]]);
			if ( temp.length == 0 ){
				r.replier.reply(result+r.msg.split(" ")[1]+"님은 저번주에 로또번호를 뽑은 적이 없습니다.");
			}else{
				for(var i=0; i<temp.length; i++){
					result+=temp[i][1]+"|생성:"+temp[i][2]+"."+temp[i][3]+"."+temp[i][4]+" "+temp[i][5]+":"+temp[i][6]+" \n"+temp[i][8]+" "+temp[i][9]+" "+temp[i][10]+" "+temp[i][11]+" "+temp[i][12]+" "+temp[i][13]+" | "+temp[i][15]+"\n\n";
				}
				r.replier.reply(result);
			}
		} else{
			for(var i=0; i<temp.length; i++){
				result+=temp[i][1]+"|생성:"+temp[i][2]+"."+temp[i][3]+"."+temp[i][4]+" "+temp[i][5]+":"+temp[i][6]+" \n"+temp[i][8]+" "+temp[i][9]+" "+temp[i][10]+" "+temp[i][11]+" "+temp[i][12]+" "+temp[i][13]+" | "+temp[i][15]+"\n\n";
			}
			r.replier.reply(result);
		}
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}



function notice(r){
	try{
		if(cookie1==undefined||cookie2==undefined){
			cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();
		}
		
	    doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
	    .cookies(cookie2).cookies(cookie1).get().select('tbody');
	    
	    if(doc==undefined){
	    	cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();
			
			doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
	    	.cookies(cookie2).cookies(cookie1).get().select('tbody');
		}
	    
	    var temptext = doc.select("tr.num").toArray().map(v=>"번호:"+v.select("td.num").get(0).text()+"   날짜:"+v.select("td.date").text()+"\n"+v.select("td.title>a").first().ownText());
	    var text = [];
	    var count = r.msg.split(" ")[1];
	    var lastnum = doc.select("tr.num").get(14).select("td.num").get(0).text();
	    
	    if(lastnum-1<count){
	    	var firstnum = doc.select("tr.num").get(0).select("td.num").get(0).text();
	        var wantnum = firstnum-count;
	    	var docnum = doc.select("tr.num").get(wantnum).select("td.num").get(0).text();
	    	var doctitle = doc.select("a:first-child").get(wantnum).ownText();
	    	var doclink = doc.select("a:first-child").get(wantnum).attr("abs:href");
	    	
	    	var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(cookie2).cookies(cookie1).get();
	    	
	    	var text = org.jsoup.Jsoup.connect(doclink).cookies(cookie2).cookies(cookie1).get().select("div.content").eachText().toArray()[0];
	    	var repl = org.jsoup.Jsoup.connect(doclink).cookies(cookie2).cookies(cookie1).get().select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n");
	    	
	    	r.replier.reply(docnum+" : "+doctitle+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
	    }else if(0<count&&count<16){
	    	for(i=0;i<count;i++){
	    		text.push(temptext[i]);
	    	}
	    	r.replier.reply(text.join("\n\n"));
	    }else{
	    	for(i=0;i<5;i++){
	    		text.push(temptext[i]);
	    	}
	    	r.replier.reply(text.join("\n\n"));
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

//공지체크기
function noticecheck(){
	try{
		if(cookie1==undefined||cookie2==undefined){
			cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();
		}
	
    	var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
    	.cookies(cookie2).cookies(cookie1).get().select('tbody');
    
    	if(doc==undefined){
    		cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();
		
			var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
    		.cookies(cookie2).cookies(cookie1).get().select('tbody');
		}
		
    	var docnum = doc.select("tr.num").get(0).select("td.num").get(0).text();//제일 최근공지가 뭔지 확인
    	var doctitle = doc.select("a:first-child").get(0).ownText();
    	
		if(docnum!=D.selectForArray('notice', 'num')[0][0] || doctitle!=D.selectForArray('notice', 'msg')[0][0]){//저장된 공지의 번호
	    	var doclink = doc.select("a:first-child").get(0).attr("abs:href");
	    	
	    	var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(cookie2).cookies(cookie1).get();
	    	
	    	var text = org.jsoup.Jsoup.connect(doclink).cookies(cookie2).cookies(cookie1).get().select("div.content").eachText().toArray()[0];
	    	var repl = org.jsoup.Jsoup.connect(doclink).cookies(cookie2).cookies(cookie1).get().select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n");
	    	
			Api.replyRoom("test","새공지!\n"+docnum+" : "+doctitle+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
			Api.replyRoom("agent","새공지!\n"+docnum+" : "+doctitle+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
			D.update('notice', { num: docnum, msg: doctitle });
		}
	}catch(e){
		Log.e(e+"\n"+e.stack+'\n');
	}
};
T.register("noticeCheck",()=>{
	while(true){
		java.lang.Thread.sleep(2*50*1000); //100초
		noticecheck();
	}
}).start();


function readFile() {
    var filedir = new java.io.File("/proc/stat");
    try {
        var br = new java.io.BufferedReader(new java.io.FileReader(filedir));
        var readStr = "";
        var str = null;
        while (((str = br.readLine()) != null)) {
            readStr += str + "\n";
        }
        br.close();
        return readStr.trim();
    }
    catch (e) {
    	Api.replyRoom('test',e+"\n"+e.stack);
    }
}


//time
function time() {
	var today = new Date();
	var dayNames = ['(일요일)', '(월요일)', '(화요일)', '(수요일)', '(목요일)', '(금요일)', '(토요일)'];
	var day = dayNames[today.getDay()];
	
	var year   = today.getFullYear(),
	month  = today.getMonth() + 1,
	date   = today.getDate(),
	hour   = today.getHours(),
	minute = today.getMinutes(),
	second = today.getSeconds();
	ampm   = hour >= 12 ? 'PM' : 'AM';
	
	hour1 = hour % 12;
	hour1 = hour ? hour : 12;
	
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	
	var now = year + '년 ' + month + '월 ' + date + '일 ' + day + ' ' + hour + ':' + minute + ':' + second + ' ' + ampm;
	
	return { now : now , year : year, month : month , date : date, day : day, hour : hour , minute : minute , second : second, ampm : ampm , hour1: hour1};
}
//sort에 필요한 compare
function compare(a, b) {
    return a - b;
}


String.prototype.rmspace=function(){
	return this.toString().replace(/^\s*/,"").replace(/\s*$/,"");
}
String.prototype.rmtag=function(){
	return this.toString().replace(/<[^>]+>/g,"");
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
String.prototype.URLEncode=function(){
	 return java.net.URLEncoder.encode(this.toString(),"UTF-8");
}
String.prototype.XMLEncode=function(){
	var res=""
	for(var i=0;i<this.toString().length;i++){
		res+="&#x"+java.lang.String.format("%04x",java.lang.Integer(this.toString().charCodeAt(i)))+";";
	}
	return res;
}
String.prototype.qtmark=function(){
	return this.toString().replace(/'/g,"''");
}
String.prototype.cut=function (line) {
    var str = this.toString();
    str = str.split("\n");
    //str[line - 1] += Array(500).join(String.fromCharCode(8237));
    str[line - 1] += String.fromCharCode(8237).repeat(500);
    str = str.join("\n");
    return str;
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
String.getRandomLowerCase=function(len){
	len = len||1;
	if(len<0) return false;
	var res="";
	for(var i=0;i<len;i++) res+=String.fromCharCode(97+Math.floor(Math.random()*26));
	return res;
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
Date.prototype.toDateString=function(sep){
	sep = (sep==undefined) ? '-' : sep;
	return String(this.getFullYear()).extension("0",4)+sep+String(this.getMonth()+1).extension("0",2)+sep+String(this.getDate()).extension("0",2);
}
Date.prototype.toTimeString=function(sep){
	sep = (sep==undefined) ? ':' : sep;
		return String(this.getHours()).extension("0",2)+sep+String(this.getMinutes()).extension("0",2)+sep+String(this.getSeconds()).extension("0",2);
}


//안쓰는변수
/*
var menuagreebot = 0; //메뉴추가동의 인원수
var resagreebot = 0; //식당추가동의 인원수
var menuoppbot = 0; //메뉴추가반대 인원수
var resoppbot = 0; //식당추가반대 인원수
var flagmenubot; //추가심사중인 메뉴
var flagresbot; //추가심사중인 식당
var sendermenubot = []; //메뉴추가에 동의한 사람
var senderresbot = []; //식당추가에 동의한 사람
/*

//안쓰는함수
/*
//리스트에 추가하기
function add(r, name, name1, num) { // name : DB 이름 / num : flag number
    var temp = r.msg.split(" ")[1];
    var list = D.selectForArray(name);
    if (D.selectForArray(name, null, "name=?", [temp]).length == 0) {
    	Api.replyRoom("recom", r.sender+" : "+name1+"건의 : "+temp);
        r.replier.reply(temp.이가() + " 건의되었습니다.");
        if (this["flag" + r.room][num] == 1 ) {
            r.replier.reply("진행중인 합의가 있습니다. 건의만 됩니다.");
        }
        if (this["flag" + r.room][num] == 0 ) {
            r.replier.reply(name1+"찬성을 3명이 입력하면 리스트에 추가되고 "+name1+"반대를 3명이 입력하면 기각됩니다. 투표는 1회만 가능합니다.");
            this["flag" + name + r.room] = temp;
            this["flag" + r.room][num] = 1;
        }
    } else {
        r.replier.reply(temp.은는() + " 이미있는 " + name1 + "입니다.");
    }
}

//리스트 추가 다수 동의
function agree(r, name, name1, num) { //name : DB 이름("menu", "res"...) / name1 : DB의 한글이름("메뉴", "식당"..) / num : flag number
    list = D.selectForArray(name);
    if (r.msg == name1+'찬성') {
        if (this["sender" + name + r.room].indexOf(r.sender) == -1) {
            this[name + "agree" + r.room] += 1;
            r.replier.reply(name1+"찬성 : "+this[name + "agree" + r.room] + "/3");
            this["sender" + name + r.room].push(r.sender);
        }
    } else if (r.msg == name1+'반대') {
        if (this["sender" + name + r.room].indexOf(r.sender) == -1) {
            this[name + "opp" + r.room] += 1;
            r.replier.reply(name1+"반대 : "+this[name + "opp" + r.room] + "/3");
            this["sender" + name + r.room].push(r.sender);
        }
    }
    if (this[name + "agree" + r.room] == 3) {
        var temp = this["flag" + name + r.room];
        D.insert(name, { name: temp });
        r.replier.reply(name1 + "에 " + this["flag" + name + r.room].이가() + " 추가되었습니다.");
        clear(r, name, num);
    } else if (this[name + "opp" + r.room] == 3) {
    	r.replier.reply(this["flag" + name + r.room].이가() + " 반대되었습니다.");
    	clear(r, name, num);
    }
}

//추가 초기화함수
function clear(r, name, num) {
    this["flag" + r.room][num] = 0;
    this["sender" + name + r.room] = undefined;
    this["flag" + name + r.room] = undefined;
    this[name + "agree" + r.room] = 0;
    this[name + "opp" + r.room] = 0;
}
*/

/*
        if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (msg.indexOf("!메뉴추가 ") == 0 || msg.indexOf("!ㅁㄴㅊㄱ ") == 0) {
                add(r, "menu", "메뉴", 0);
            }
        }
        //메뉴동의합의
        if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (this["flag" + room][0] == 1) {
                agree(r, "menu", "메뉴", 0);
            }
        }

        if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (msg.indexOf("!식당추가 ") == 0 || msg.indexOf("!ㅅㄷㅊㄱ ") == 0) {
                add(r, "res", "식당", 1);
            }
        }
		
        //식당동의합의
        if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (this["flag" + room][1] == 1) {
                agree(r, "res", "식당", 1);
            }
        }
*/

/*
    if (r.msg.split(" ")[1] == "식당추가") {
        r.replier.reply("시립대 주변의 추가되었으면하는 식당을 추천해주세요. 3명의 합의가 있으면 바로 추가 될 수 있습니다.\nex)!식당추가 789비어");
    }
if (r.msg.split(" ")[1] == "메뉴추가") {
        r.replier.reply("추가되었으면하는 음식을 추천해주세요. 3명의 합의가 있으면 바로 추가 될 수 있습니다.\nex)!메뉴추가 메뉴이름");
    }
    */
