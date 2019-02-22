//소스불러오기및 리로딩
function reload() {
	try {
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
	    Api.replyRoom('test', "reloading 완료 / " + time + "s");
	}catch (e){
		Api.replier('test',e + "\n" + e.stack);
	}
}
//-------------------------------------------------------변수----------------------------------------------------------//
var D = require("DBManager.js")("D");
//menu:메뉴/res:식당/cele:전전컴채팅/cbot:봇제작방채팅/ctest:개인방채팅/cja:자생방채팅/cover:오버워치채팅/cagent:공익채팅
//D.selectForString("sqlite_master")
var T = require("ThreadManager.js");
//T.getThreadList()
var es=String.fromCharCode(8237).repeat(500);

//봇제작방용 변수
var flagbot = [0, 0]; //flag[0]=메뉴추가flag flag[1]=식당추가flag
var menuagreebot = 0; //메뉴추가동의 인원수
var resagreebot = 0; //식당추가동의 인원수
var menuoppbot = 0; //메뉴추가반대 인원수
var resoppbot = 0; //식당추가반대 인원수
var flagmenubot; //추가심사중인 메뉴
var flagresbot; //추가심사중인 식당
var sendermenubot = []; //메뉴추가에 동의한 사람
var senderresbot = []; //식당추가에 동의한 사람

//전전컴톡방용 변수
var flagele = [0, 0]; 
var menuagreeele = 0;
var resagreeele = 0;
var menuoppele = 0; 
var resoppele = 0; 
var flagmenuele; 
var flagresele; 
var sendermenuele = [];
var senderresele = [];

//개인방용 변수
var flagtest = [0, 0];
var menuagreetest = 0; 
var resagreetest = 0; 
var menuopptest = 0;
var resopptest = 0;
var flagmenutest; 
var flagrestest;
var sendermenutest = []; 
var senderrestest = []; 

//자생방용 변수
var flagja = [0, 0]; 
var menuagreeja = 0; 
var resagreeja = 0; 
var menuoppja = 0;
var resoppja = 0; 
var flagmenuja; 
var flagresja;
var sendermenuja = []; 
var senderresja = []; 

//봇제작방용 변수
var flagbot = [0, 0]; 
var menuagreebot = 0; 
var resagreebot = 0; 
var menuoppbot = 0; 
var resoppbot = 0;
var flagmenubot; 
var flagresbot;
var sendermenubot = []; 
var senderresbot = []; 

//오버워치용 변수
var flagover = [0];
var menuagreeover = 0; 
var menuoppover = 0; 
var flagmenuover; 
var sendermenuover = []; 
//------------------------------------------------------기능함수---------------------------------------------------------//
//오버워치
function overWatch(r) {
    var name = r.msg.substr(6);//배틀태그가 담기는 공간
    name1 = name.replace("#", "-");
    var source = Utils.getWebText("https://playoverwatch.com/ko-kr/career/pc/" + name1);
        if (source.indexOf("u-align-center h5") == -1) {
        	r.replier.reply(name + "의 점수를 알 수 없습니다.");
		} else {
       		var score = source.split("u-align-center h5\">")[1].split("<")[0].trim();
        	var tier = source.split("rank-icons/rank-")[1].split("Tier.")[0];
        	var most = source.split("u-max-width-container career-section")[3];
        	var most1 = most.split("<div class=\"ProgressBar-title\">")[1].split("<")[0].trim();
        	var most2 = most.split("<div class=\"ProgressBar-title\">")[2].split("<")[0].trim();
        	var most3 = most.split("<div class=\"ProgressBar-title\">")[3].split("<")[0].trim();
    }
}
//--------------------------------------------------------------------Response-------------------------------------------------//
function response(room, msg, sender, isGroupChat, replier, imageDB) {
	r = { replier: replier, msg: msg, sender: sender, room: room };
	
	//eval
	if (room == 'test' || room == 'bot') {
		if (msg.indexOf("]") == 0) {
			try {
				replier.reply(eval(msg.substring(1)));
			} catch (e) {
			replier.reply(e + "\n" + e.stack);
			}
		}
	}
	
	try {
        if (room == 'test' || room == 'bot' || room == 'over' || room == 'agent' || room == 'ele') {
            if (msg.indexOf("!최근채팅") == 0 || msg.indexOf("!ㅊㄱㅊㅌ") == 0) {
                recentchat(r);
            }
        }
        
        if (room == 'test') {
            if (msg.indexOf("!전체채팅") == 0 || msg.indexOf("!ㅈㅊㅊㅌ") == 0) {
            	allchat(r);                
            }
        }
        
        if (room == 'agent' || room =='test' || room == 'bot'){
        	if(msg.indexOf("!명단")==0 || msg.indexOf("!ㅁㄷ")==0){
        		banklist(r);
        	}
        }

        
      //최근채팅저장
        if (msg.indexOf("/") == 0 || sender == "시립봇" || sender == "파이봇") {
        } else {
             D.insert('chatdb', { time : time().hour+":"+time().minute+":"+time().second, name: sender, msg: msg, room : room});
        }

        if (room == 'test' || room == 'bot') {
            if (msg.indexOf("!예정기능") == 0 || msg.indexOf("!ㅇㅈㄱㄴ") == 0) {
                replier.reply(D.selectForArray('willdo').join("\n"));
            }
        }

        if (room == 'test' || room == 'agent' || room == 'bot') {
            if (msg == "!날씨" || msg == "!ㄴㅆ" ) {
                getTimeWeather(room);
            }
        }
        
        if (room == 'test' || room == 'agent') {
            if (msg == "!ㅊㅊ" || msg == "!추첨" ) {
                sel(r);
            }
        }

        if (room == 'test' || room == 'agent' || room == 'bot') {
            if (msg.indexOf("!공지") == 0 || msg.indexOf("!ㄱㅈ") == 0) {
                notice(r);
            }
        }

        //로또
        if (msg == "!로또" || msg == "!ㄹㄸ" ) {
            lotto(r);
        }
        
        //당첨
        if (msg.indexOf("!당첨") == 0 || msg.indexOf("!ㄷㅊ") == 0) {
            lottocheck(r);
        }

        //맛집
        if(msg.indexOf("!맛집")==0 || msg.indexOf("!ㅁㅈ")==0){
    		famous(r);
    	}
        
        //오버워치
        if (msg.indexOf("!오버워치") == 0 || msg.indexOf("!ㅇㅂㅇㅊ") == 0) {
            overWatch(r);
        }
        
        //--------------------------------------------------------------------------------------식당/메뉴 -----------------------------------------
        if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (msg.indexOf("!메뉴추가 ") == 0 || msg.indexOf("!ㅁㄴㅊㄱ ") == 0) {
                add(r, "menu", "메뉴", 0);
            }
        }
        
        if (msg.indexOf("!메뉴추천") == 0 || msg.indexOf("!ㅁㄴㅊㅊ") == 0) {
            recom(r, "menu");
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
        
		if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (msg.indexOf("!식당추천") == 0 || msg.indexOf("!ㅅㄷㅊㅊ") == 0) {
                recom(r, "res");
            }
        }

        //식당동의합의
        if (room == 'test' || room == 'bot' || room == 'ja' || room == 'ele') {
            if (this["flag" + room][1] == 1) {
                agree(r, "res", "식당", 1);
            }
        }
        //--------------------------------------------------------------------------------------식당/메뉴 -----------------------------------------

        if (msg=="/기능") {
            replier.reply("!기능으로 작동합니다");
        }

        /*
        if (msg.indexOf("시발") >= 0 || msg.indexOf("ㅅㅂ") >= 0 || msg.indexOf("tq") >= 0 || msg.indexOf("쓰발") >= 0 || msg.indexOf("ㅆㅂ") >= 0 || msg.indexOf("존나") >= 0 || msg.indexOf("개새") >= 0 || msg.indexOf("병신") >= 0 || msg.indexOf("좆") >= 0) {
            replier.reply("욕은 안좋아");
        }*/

        //기능설명
        if (msg.indexOf("!기능 ") == 0) {
            func(r);
        }
        
        if (msg.indexOf('!건의')==0){
        	Api.replyRoom('recom', room+" : "+sender+" : "+msg.split(msg.split(' ')[0])[1])
        	replier.reply(sender+"님의 건의가 접수되었습니다.")
        }
        
        //-----------------------------------------------------개인채팅방------------------------------------------------
        if (room == "test") {
            if (msg == "!기능") {
                replier.reply("!로또\n!당첨\n!최근채팅\n!전체채팅\n!날씨\n!메뉴추천\n!메뉴추가\n!식당추천\n!식당추가\n!맛집\n!추첨\n!명단\n!오버워치\n!예정기능\n!공지\n!건의\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다");
            }
        }
        //-----------------------------------------------------시립대 봇제작방-----------------------------------------------------
        if (room == "bot") {
            if (msg == "!기능") {
                replier.reply("!로또\n!당첨\n!최근채팅\n!메뉴추천\n!메뉴추가\n!식당추천\n!식당추가\n!맛집\n!오버워치\n!예정기능\n!명단\n!건의\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다");
            }
        }
        //-------------------------------------------------------공익----------------------------------------------------
        if (room == 'agent') {
            if (msg == "!기능") {
                replier.reply("!공지\n!로또\n!당첨\n!최근채팅\n!메뉴추천\n!맛집\n!오버워치\n!날씨\n!추첨\n!명단\n!건의\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다");
            }
        }
        //-------------------------------------------------------전전컴톡방-----------------------------------------------------
        if (room == "ele") {
            if (msg == "!기능") {
                replier.reply("!로또\n!당첨\n!최근채팅\n!메뉴추천\n!메뉴추가\n!식당추천\n!식당추가\n!맛집\n!오버워치\n!예정기능\n!건의\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다");
            }
        }
        //--------------------------------------------------------자생방-----------------------------------------
        if (room == 'ja') {
            if (msg == "!기능") {
                replier.reply("!로또\n!당첨\n!메뉴추천\n!메뉴추가\n!식당추천\n!식당추가\n!맛집\n!오버워치\n!건의\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다");
            }
        }
        //-----------------------------------------------------오버워치방-----------------------------------------
        if (room == 'over') {
            if (msg == "!기능") {
                replier.reply("!로또\n!당첨\n!최근채팅\n!메뉴추천\n!맛집\n!오버워치\n!건의\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다");
            }
		}
	} catch (e) {
        Api.replyRoom("test", e + "\n" + e.stack);
	}
}











//-------------------------------------------------------------변경안할 함수------------------------------------------------------
//기능설명
function func(r) {
    if (r.msg.split(" ")[1] == "최근채팅") {
        r.replier.reply("최근채팅 6개를 출력합니다. !최근채팅16 와 같이 입력하면 16개를 불러오고 최대 16개까지 조회가능합니다. !최근채팅16 닉네임 과 같이 입력하면 해당 닉네임의 최근 16개 채팅을 보여줍니다. 불필요한 띄워쓰기가 들어가거나 이름이 잘못되면 출력이 안될 수 있습니다.");
    }
    if (r.msg.split(" ")[1] == "오버워치") {
        r.replier.reply("!오버워치 똥개#5468와 같이 입력하면 티어,점수,경쟁전 모스트 3까지 보여줍니다.\n배치를 치지 않은 경우, 프로필이 비공개인 경우, 배틀태그를 입력하지 않은 경우, 대소문자를 정확하게 구분하지 않은 경우엔 정보를 알 수 없습니다.");
    }
    if (r.msg.split(" ")[1] == "로또") {
        r.replier.reply("로또번호를 추천해줍니다. !당첨으로 토요일에 로또번호 추첨이 끝나면 결과를 확인할 수 있습니다.");
    }
    if (r.msg.split(" ")[1] == "당첨") {
        r.replier.reply("지난 회차에 뽑았던 당첨번호들이 몇 등인지 알려줍니다. !당첨 닉네임 과 같이 입력하면 자기가 뽑은 번호만 확인 할 수 있습니다.\n3개 : 5등 / 4개 : 4등 / 5개 : 3등 / 5개+보너스 : 2등 / 6개 : 1등");
    }
    if (r.msg.split(" ")[1] == "메뉴추천") {
        r.replier.reply("먹을 음식을 추천해 줍니다. !메뉴추천 3과 같이 입력하면 메뉴를 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    }
    if (r.msg.split(" ")[1] == "메뉴추가") {
        r.replier.reply("추가되었으면하는 음식을 추천해주세요. 3명의 합의가 있으면 바로 추가 될 수 있습니다.\nex)!메뉴추가 메뉴이름");
    }
    if (r.msg.split(" ")[1] == "식당추천") {
        r.replier.reply("시립대 주변 식당을 추천해 줍니다. !식당추천 3과 같이 입력하면 식당를 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    }
    if (r.msg.split(" ")[1] == "식당추가") {
        r.replier.reply("시립대 주변의 추가되었으면하는 식당을 추천해주세요. 3명의 합의가 있으면 바로 추가 될 수 있습니다.\nex)!식당추가 789비어");
    }
    if (r.msg.split(" ")[1] == "예정기능") {
        r.replier.reply("앞으로 만들어질 예정/오류수정예정/추가기능 등등 개선될 내용입니다. 본인방에서 작동하지 않는 기능도 있습니다.");
    }
    if (r.msg.split(" ")[1] == "공지") {
        r.replier.reply("최근 5개의 공지를 띄워줍니다. !공지 15 와 같이 입력하면 공지 15개를 보여주고 최대 15개까지 조회가능합니다. 해당 공지의 번호를 !공지 xxx 이렇게 입력하시면 내용과 댓글을 확인할 수 있습니다.");
    }
    if (r.msg.split(" ")[1] == "날씨") {
        r.replier.reply("무전동 날씨를 보여줍니다");
    }
    if (r.msg.split(" ")[1] == "건의") {
        r.replier.reply("건의를 받습니다.");
    }
    if (r.msg.split(" ")[1] == "추첨") {
        r.replier.reply("일할사람을 뽑습니다. 컴퓨터 담당은 1명만 뽑힙니다.");
    }
    if (r.msg.split(" ")[1] == "명단") {
        r.replier.reply("푸드뱅크 명단을 보여줍니다. !명단 만월 처럼 입력하면 만월노인요양원의 검색 결과가 나옵니다.\n!명단추가 복지센터 055645XXXX 처럼 입력하면 추가되고 !명단삭제 복지센터 처럼 입력하면 목록이 삭제됩니다. 삭제할땐 반드시 제대로 된 기관명을 입력해야합니다.");
    }
    if (r.msg.split(" ")[1] == "맛집") {
        r.replier.reply("검색한 지역의 맛집을 알려줍니다.");
    }
}

function famous(r){
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
}

function banklist(r){
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
}

var flaga = 0;
var flagb = 0;
//추첨기
function sel(r){
	var list = [];
	var list1 = [];
	
	var num = -1;
	if (flaga == 0 && flagb == 0){
		r.replier.reply("참여할 인원 수를 !숫자 로 입력해주세요.");
	}
	if(r.msg.split("!")[1]=='number' && r.msg.split("!")[1] < 5 && 0 < r.msg.split("!")[1] && flaga == 0 && flagb == 0){
		num = r.msg.split("!")[1];
		flaga = 1;
		r.replier.reply(num+'명이 추첨에 참여합니다. 참여할 사람은 !참가 를 입력해주세요');
	}
    if (list.length != num){
    	if (r.msg == '!참가' && flaga == 1 && flagb == 0){
    		list.push(r.sender);
    	}
    } else if(list.length == num){
    	flagb = 1;
    }
    if ( flagb == 1 ){
    	for (var i = 0; i < list.length; i++) {
        	var rad = Math.floor(Math.random() * list.length);
        	if (list1.indexOf(list[rad]) == -1){//중복이면 거른다
        		list1.push(list.splice(rad, 1));
        	}
        }
    	r.replier.reply(list1.join(", "));
    	flaga=0;
    	flagb=0;
    }
}

//최근채팅
function recentchat(r) { //name : DB이름
    var temp1 = undefined;
    temp1 = r.msg.split("!최근채팅")[1]; // 개수
    if (temp1 == undefined){
    	temp1 = r.msg.split("!ㅊㄱㅊㅌ")[1]; // 개수
    }
    temp1 = temp1.split(" ")[0];
    var temp3= r.msg.split(" ")[0];
    var temp2 = r.msg.split(temp3+" ")[1];//닉
    var num = 6;
    var flag = 0;
    	
    var tempchat = D.selectForArray('chatdb', ['time', 'name', 'msg' ] , 'room=?', r.room);
	var templeng = tempchat.length;
	if(templeng > 7) {
		for ( i = templeng - 7; i < templeng ; i ++ ){
			tempchat[i] = tempchat[i].join(" | ");
		}
	} else {
		for ( i = 0; i < templeng ; i ++ ){
			tempchat[i] = tempchat[i].join(" | ");
		}
	}
    if(6 > templeng){
		num = templeng;
	}
    
    
	if(typeof temp1 == 'string' && typeof temp2 == 'string'){
		var tempchat = D.selectForArray('chatdb', ['time', 'msg'] , 'name=? and room=?', [temp2, r.room]);
		var templeng = tempchat.length;
		if(templeng==0){
			tempchat=[temp2+"의 채팅이 없습니다."];
			num = 1;
		} else {
			if(templeng > 16) {
				for ( i = templeng - 16; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			} else {
				for ( i = 0; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			}
			if(0 < temp1*1 && temp1*1 < 17 ) {
				num = temp1*1;
				if(tempchat.length<temp1*1){
					num = templeng;
				}
			}
			flag = 1;
		}
	} else if (0 < temp1*1 && temp1*1 < 17) {
		var tempchat = D.selectForArray('chatdb', ['time', 'name', 'msg' ] , 'room=?', r.room);
		var templeng = tempchat.length;
		if(templeng > 16) {
			for ( i = templeng - 16; i < templeng ; i ++ ){
				tempchat[i] = tempchat[i].join(" | ");
			}
		} else {
			for ( i = 0; i < templeng ; i ++ ){
				tempchat[i] = tempchat[i].join(" | ");
			}
		}
		num = Math.floor( temp1*1 );
		if(tempchat.length<temp1*1){
			num = templeng;
		}
	} else if(typeof temp2 == 'string') {
		var tempchat = D.selectForArray('chatdb', ['time', 'msg'] , 'name=? and room=?', [temp2, r.room]);
		var templeng = tempchat.length;
		if(templeng==0){
			tempchat=[temp2+"의 채팅이 없습니다."];
			num = 1;
		} else {
			if(templeng > 16) {
				for ( i = templeng - 16; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			} else {
				for ( i = 0; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			}
			flag = 1;
		}
	}
	
	var temp = [];//뽑은 채팅을 담을 공간
	if(flag==1){
		temp[0]=temp2+"님의 채팅내역\n"; 
	}
    if (0 < num && num < 17) {
        for (var i = tempchat.length - num; i < tempchat.length; i++) {
        	if( i - tempchat.length + num == 2){
        		temp.push(tempchat[i]+es);
        	} else {
        		temp.push(tempchat[i]);
        	}
            //불러온 파일에서 채팅 옮겨담기
        }
    }
    r.replier.reply(temp.join("\n"));
}


function allchat(r) { //name : DB이름
    var temp1 = undefined;
    temp1 = r.msg.split("!전체채팅")[1]; // 개수
    if (temp1 == undefined){
    	temp1 = r.msg.split("!ㅈㅊㅊㅌ")[1]; // 개수
    }
    temp1 = temp1.split(" ")[0];
    var temp3= r.msg.split(" ")[0];
    var temp2 = r.msg.split(temp3+" ")[1];//닉
    var num = 12;
    var flag = 0;
    	
    var tempchat = D.selectForArray('chatdb');
	var templeng = tempchat.length;
	if(templeng > 12) {
		for ( i = templeng - 12; i < templeng ; i ++ ){
			tempchat[i] = tempchat[i].join(" | ");
		}
	} else {
		for ( i = 0; i < templeng ; i ++ ){
			tempchat[i] = tempchat[i].join(" | ");
		}
	}
    if(13 > templeng){
		num = templeng;
	}
    
	if(typeof temp1 == 'string' && typeof temp2 == 'string'){
		var tempchat = D.selectForArray('chatdb', ['time', 'msg', 'room'] , 'name=?', [temp2]);
		var templeng = tempchat.length;
		if(templeng==0){
			tempchat=[temp2+"의 채팅이 없습니다."];
			num = 1;
		} else {
			if(templeng > 100) {
				for ( i = templeng - 100; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			} else {
				for ( i = 0; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			}
			if(0 < temp1*1 && temp1*1 < 101 ) {
				num = temp1*1;
				if(tempchat.length<temp1*1){
					num = templeng;
				}
			}
			flag = 1;
		}
	} else if (0 < temp1*1 && temp1*1 < 101) {
		var tempchat = D.selectForArray('chatdb');
		var templeng = tempchat.length;
		if(templeng > 100) {
			for ( i = templeng - 100; i < templeng ; i ++ ){
				tempchat[i] = tempchat[i].join(" | ");
			}
		} else {
			for ( i = 0; i < templeng ; i ++ ){
				tempchat[i] = tempchat[i].join(" | ");
			}
		}
		num = Math.floor( temp1*1 );
		if(tempchat.length<temp1*1){
			num = templeng;
		}
	} else if(typeof temp2 == 'string') {
		var tempchat = D.selectForArray('chatdb', ['time', 'msg', 'room'] , 'name=?', [temp2]);
		var templeng = tempchat.length;
		if(templeng==0){
			tempchat=[temp2+"의 채팅이 없습니다."];
			num = 1;
		} else {
			if(templeng > 100) {
				for ( i = templeng - 100; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			} else {
				for ( i = 0; i < templeng ; i ++ ){
					tempchat[i] = tempchat[i].join(" | ");
				}
			}
			flag = 1;
		}
	}
	
	var temp = [];//뽑은 채팅을 담을 공간
	if(flag==1){
		temp[0]=temp2+"님의 채팅내역\n"; 
	}
    if (0 < num && num < 101) {
        for (var i = tempchat.length - num; i < tempchat.length; i++) {
        	if( i - tempchat.length + num == 2){
        		temp.push(tempchat[i]+es);
        	} else {
        		temp.push(tempchat[i]);
        	}
            //불러온 파일에서 채팅 옮겨담기
        }
    }
    r.replier.reply(temp.join("\n"));
}

//리스트에서 추천하기(1개 or 여러개)
function recom(r, name) { //name : DB이름
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
}

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

//로또
function lotto(r) {
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
}

function lottocheck(r) {
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
}

var cookie1;
var cookie2;
var doc;

function notice(r){
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

const weatherSet = ({1:"맑음ㅤㅤ", 2:"구름약간", 3:"구름조금", 4:"구름보통", 5:"구름다수", 6:"구름많음", 7:"흐림ㅤㅤ", 8:"흐림ㅤㅤ", 11:"안개ㅤㅤ", 12:"비ㅤㅤㅤ", 13:"비ㅤㅤㅤ", 14:"비ㅤㅤㅤ", 15:"번개ㅤㅤ", 16:"번개ㅤㅤ", 17:"번개ㅤㅤ", 18:"비ㅤㅤㅤ", 19:"눈ㅤㅤㅤ", 20:"눈ㅤㅤㅤ", 21:"눈ㅤㅤㅤ", 22:"눈ㅤㅤㅤ", 23:"눈ㅤㅤㅤ", 24:"우박ㅤㅤ", 25:"25ㅤㅤ", 26:"26ㅤㅤ", 29:"진눈깨비", 30:"폭염ㅤㅤ", 31:"한파ㅤㅤ", 32:"바람ㅤㅤ", 33:"맑음ㅤㅤ", 34:"구름약간", 35:"구름조금", 36:"구름보통", 37:"구름다수", 38:"구름많음", 39:"비ㅤㅤㅤ", 40:"비ㅤㅤㅤ", 41:"번개ㅤㅤ", 42:"번개ㅤㅤ", 43:"눈ㅤㅤㅤ", 44:"눈ㅤㅤㅤ"});

//날씨
function getTimeWeather(room) {
	var url = 'https://www.accuweather.com/ko/kr/mujeon-dong/1873980/hourly-weather-forecast/1873980'
	
	var rawData = org.jsoup.Jsoup.connect(url).userAgent("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19").get();
    var data = rawData.select(".hourly-table").select(".overview-hourly");
    var timeData = data.select("thead div:not(.icon-weather)").eachText().toArray().map(v => {
        var r = /^(\d+)오(.)$/.exec(v);
        return Number(r[1]) + ((r[2] == "후") - (r[1] == "12")) * 12;
    }
    );
    var weatherData = data.select("thead div.icon-weather").eachAttr("class").toArray().map(v => /i\-(\d+)\-s/.exec(v)[1]);
    var tempData = data.select("tbody tr").get(0).select("td").eachText().toArray().map(v => v.split("\xb0")[0]);
    var stempData = data.select("tbody tr").get(1).select("td").eachText().toArray().map(v => v.split("\xb0")[0]);
    var windData = [];
    for(var i = 0 ; i< 8 ; i++){
    	windData.push(data.select("tbody tr").get(2).select("td>span").eachText().toArray().slice()[i].split(' ')[0])
    	}
    windData = windData.map(v=>  Math.floor(v*1000/3600*10)/10);
    
    var windData1 = [];
    for(var i = 0 ; i< 8 ; i++){
    	windData1.push(data.select("tbody tr").get(2).select("td>span").eachText().toArray().slice()[i].split(' ')[1])
    	}
    var res = "";
    for (var i in timeData) {
        res += String(timeData[i]).extension("0", 2) + "시 ";
        res += (weatherSet[weatherData[i]] || weatherData[i]) + " ";
        res += String(tempData[i]).extension(" ", 2) + "(" + String(stempData[i]).extension(" ", 2) + ") ";
        res += windData[i] + " " + windData1[i] + "\n";
    }
    
    res += es;

    var next = rawData.select(".control-bar").get(0).select("a.right-float").attr("href");
    
    var rawData = org.jsoup.Jsoup.connect(next).userAgent("Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19").get();
    var data = rawData.select(".hourly-table").select(".overview-hourly");
    var timeData = data.select("thead div:not(.icon-weather)").eachText().toArray().map(v => {
        var r = /^(\d+)오(.)$/.exec(v);
        return Number(r[1]) + ((r[2] == "후") - (r[1] == "12")) * 12;
    }
    );
    var weatherData = data.select("thead div.icon-weather").eachAttr("class").toArray().map(v => /i\-(\d+)\-s/.exec(v)[1]);
    var tempData = data.select("tbody tr").get(0).select("td").eachText().toArray().map(v => v.split("\xb0")[0]);
    var stempData = data.select("tbody tr").get(1).select("td").eachText().toArray().map(v => v.split("\xb0")[0]);
    var windData = [];
    for(var i = 0 ; i< 8 ; i++){
    	windData.push(data.select("tbody tr").get(2).select("td>span").eachText().toArray().slice()[i].split(' ')[0])
    	}
    windData = windData.map(v=>  Math.floor(v*1000/3600*10)/10);
    
    var windData1 = [];
    for(var i = 0 ; i< 8 ; i++){
    	windData1.push(data.select("tbody tr").get(2).select("td>span").eachText().toArray().slice()[i].split(' ')[1])
    	}
    for (var i in timeData) {
        res += String(timeData[i]).extension("0", 2) + "시 ";
        res += (weatherSet[weatherData[i]] || weatherData[i]) + " ";
        res += String(tempData[i]).extension(" ", 2) + "(" + String(stempData[i]).extension(" ", 2) + ") ";
        res += windData[i] + " " + windData1[i] + "\n";
    }
    Api.replyRoom(room,"통영시 무전동 날씨\n시간   날씨  온도(체감) 바람(m/s)\n"+res);
    
};
T.register("weatherClockCheck",()=>{
	while(true){
		if( 8 == new Date().getHours() ){
			getTimeWeather('agent');
			java.lang.Thread.sleep(60*60*1000); //60분
		}
		java.lang.Thread.sleep(60*1000); //1분
	}
}).start();


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