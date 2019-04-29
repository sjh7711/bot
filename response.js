var reloadcheck = 0;
var D = require("DBManager.js")("D");
var T = require("ThreadManager.js");
var I = require("Interactive.js");
var control = D.selectForArray('control').map(v=>v[0]);
var controlPanel = D.selectForObject('control');
function reload(r) {
	try {
		if(r.sender == '봇배우는배주현' || r.sender == 'test'){
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
		    r.replier.reply("파일저장 완료 / " + time + "s\n" + new Date() );
		    T.interrupt();
		    Api.reload();
		    var time = (new Date() - Timer) / 1000;
		    reloadcheck = 0;
		    control = D.selectForArray('control').map(v=>v[0]);
		    controlPanel = D.selectForObject('control');
		    r.replier.reply("reloading 완료 / " + time + "s\n" + new Date());
		}
	}catch (e){
		Api.replyRoom('test', e + "\n" + e.stack);
	}
}
File = java.io.File;
var es=String.fromCharCode(8237).repeat(500);
var weiredstring1=String.fromCharCode(8203);//공백
var weiredstring2=String.fromCharCode(160);//띄워쓰기로
var weiredstring3=String.fromCharCode(8237);//공백
var weiredstring4=String.fromCharCode(8197);//띄워쓰기로
//replace(new RegExp(weiredstring1, "gi"), "")
var statustime = 0;
Flag=(function(){
	   var list={};
	   var Flag={};
	   Flag.set=function(flag,room,value){
	      if(list[flag]===undefined){ 
	         list[flag]={};
	         list[flag][room]=value;
	      }else list[flag][room]=value;
	   }
	   Flag.get=function(flag,room){
	      return (list[flag] && list[flag][room]) || 0;
	   }
	   return Flag;
	})();
function blankFunc(r){}
function blankFunc1(r){}
/*
]D.execSQL("alter table control add BASEBALL number")
]D.update("control", {BASEBALL:0})
]D.selectForString('control')
]D.update('control' , {name :'!계산',  시립대_단톡방 : 1, 시립대_전전컴_톡방 : 1, 오버워치 : 1, 시립대_자취생_생정 : 1, test :1, 단톡방 : 1, 짱구 : 1, 시립대_봇제작방 : 1, 푸드마켓 :1, 공익 : 1, BASEBALL : 0}, "name='!계산'")
]D.insert('control' , {name :'!온오프',  시립대_단톡방 : 0, 시립대_전전컴_톡방 : 0, 오버워치 : 0, 시립대_자취생_생정 : 0, test :1, 단톡방 : 0, 짱구 : 0, 시립대_봇제작방 : 0, 푸드마켓 :0, 공익 : 0, BASEBALL : 0})
*/
var featureList = ['!날씨', '!로또통계', '!종합로또통계', '!행복회로','/로또','!로또','!당첨','!메뉴','!식당','!맛집','!유튜브','!노래','!제이플라','!번역','!최근채팅','!전체채팅','!오버워치','!주사위','!공지','!명단','!업무','!방','!쓰레드','!디비','!건의','!블랙잭','!야구','!추첨'];
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function response(room, msg, sender, isGroupChat, replier, imageDB) {
		
	r = { replier: replier, msg: msg, sender: sender, room: room};
	
	if (room == 'test' || room == '시립대 봇제작방') {
		if (msg.indexOf("]") == 0) {
			try {
				replier.reply(eval(msg.substring(1)));
				return;
			} catch (e) {replier.reply(e + "\n" + e.stack);}
		}
		
		try {
			blankFunc(r);
		} catch (e) {replier.reply(e + "\n" + e.stack);}
	}
	
	try {
		blankFunc1(r);
	} catch (e) {replier.reply(e + "\n" + e.stack);}
	
	if (sender != "시립봇") {
		D.insert('chatdb', { time : time().hour+":"+time().minute+":"+time().second, name: sender, msg: msg, room : room});
	}
	
	if( sender != 'C봇' && (msg.indexOf('주현') > -1 || msg.indexOf('피치') > -1 || msg.indexOf('종화') > -1 )){
		Api.replyRoom('test', room+ ' | ' + sender +'\n' + msg);
	}
	
	if( reloadcheck == 1  ){
		return;
	}
	
	var feature = -1;
	for(var i in control){
		if( msg.indexOf(control[i]) == 0 ){
			feature = i;
			break;
		}
	}
	
	if(feature != -1){
		var work = controlPanel[feature][room.replace(/ /g, '_')];
	}
	
	I.run(room, sender, msg);
	
	try {
		if ( msg.indexOf("!날씨") == 0 && work == 1 ) {
        	weather(r);
        	return;
        }
        
        if (msg == "!로또통계" && work == 1 ){
        	bestlotto(r);
        	return;
    	}
           
        if (msg.indexOf("!행복회로") == 0 && work == 1 ) {
            flottocheck(r);
            return;
        } 
            
		if (msg.indexOf("!로또") == 0 && work == 1) {
            lotto(r);
            return;
        } 
		
		if (msg.indexOf("/로또") == 0 && work == 1) {
            testlotto(r);
            return;
        }

        if (msg.indexOf("!당첨") == 0 && work == 1) {
            lottocheck(r);
            return;
        } 
        
        if (msg == "!종합로또통계" && work == 1 ){
        	allbestlotto(r);
        	return;
        }
        
        if (msg == "!내로또" && work == 1){
        	mylotto(r);
        	return;
        }
    	
        if (msg.indexOf("!메뉴") == 0 && work == 1) {
            recom(r, "menu");
            return;
        } 
        
        if (msg.indexOf("!식당") == 0 && work == 1) {
        	recom(r, "res");
        	return;
        }

        if(msg.indexOf("!맛집")==0 && work == 1){
        	famous(r);
        	return;
        } 
        
        if((msg.indexOf('!유튜브')==0 || msg.indexOf('/유튜브')==0 ) && work == 1){
        	youtube(r);
        	return;
        }
        
        if(msg=='!노래' && work == 1 ){
        	music(r);
        	return;
        }
        
        if(msg.indexOf('!제이플라')==0 && work == 1 ){
        	jfla(r);
        	return;
        }
        
        if (msg.indexOf("!최근채팅") == 0 && work == 1) {
        	recentchat(r);
        	return;
        }
        
        if (msg.indexOf("!전체채팅") == 0 && work == 1) {
        	if (room == '시립대 봇제작방' && msg.indexOf(',') > 0 && msg.split(',').length == 3 && (msg.split(',')[2] == '시립대 단톡방' || msg.split(',')[2] =='시립대 전전컴 톡방'|| msg.split(',')[2] =='시립대 봇제작방')){
        	} else if (room == 'test'){
        	} else {
        		return;
        	}
        	allchat(r);
        	return;
        }
        
        if (msg.indexOf("!오버워치") == 0 && work == 1) {
            overwatch(r);
            return;
        }
        
        if(msg.indexOf('!주사위') == 0 && work == 1 ){
        	randomnumber(r);
        	return;
        }
        
        if(msg.indexOf('!번역') == 0 && work == 1 ){
        	translation(r);
        	return;
        }
        
        if (msg.indexOf("!공지") == 0 && work == 1) {
        	notice(r);
        	return;
        }
        
        if(msg.indexOf("!명단")==0 && work == 1){
        	banklist(r);
        	return;
        }
        
    	if(msg.indexOf("!업무")==0 && work == 1){
    		foodbank(r);
    		return;
    	}
    	
    	if (msg.indexOf('!건의 ')==0 && work == 1 ){
        	suggestion(r);
        }
        
    	if (msg == "!방" && work == 1 ){
    		checkroom(r);
    		return;
    	}
    	
    	if(msg =="!쓰레드" && work == 1 ){
    		thread(r);
    		return;
    	}
    	
    	if(msg=="!디비" && work == 1 ){
    		db(r);
    		return;
    	}
    	
    	if(msg =="!로딩" && work == 1 ){
    		reload(r);
    		return;
    	}
    	
    	if (msg.indexOf("!기능 ") == 0 ) {
            func(r);
            return;
        } 
        
        if (msg=="/기능") {
            replier.reply("!기능으로 작동합니다 "+es+'\n'+funcCheck(r)+'자세한 기능 설명을 원하면 !기능 [기능명] 으로 검색해주세요.');
            return;
        } 
        
        if (msg == "!기능") {
        	replier.reply(funcCheck(r)+es+"\n설명이 필요하면 !기능 [기능명]으로 확인하세요."); 
            return;
        }
        
        if (msg == "!기능리로드" && work == 1){
        	controlReload(r);
        	return;
        }
        
        if (msg.indexOf("!온오프")==0 && work == 1){
        	controlEdit(r);
        	return;
        }
        
        if (msg == "!상태"){
        	checkstatus(r);
        	return;
        }
    	
    	if ( (msg == "!추첨" && work == 1) || ( Flag.get("sel0", r.room) == 1 || Flag.get("sel1", r.room) == 1 ) && ( !isNaN(msg) || msg == '참가' || msg == '!마감' ) ) {
        	sel(r); 
        	return;
        }
    	
        /*if( D.selectForArray('blackjack', 'name', 'room=?', room) == undefined || D.selectForArray('blackjack', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) == -1 ){
    		D.insert('blackjack', {name : sender, room : room, point : 10000000, win : 0, lose : 0});
    	}*/
        
        if ( (msg == "!블랙잭" && work == 1) || ( Flag.get('gameinfo', r.room) != 0 && (  !isNaN(msg) || msg == '참가' || msg == '시작' || msg == '!블랙잭종료' || msg == '힛' || msg == '스테이') )){
        	blackjack(r);
        }
        
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if( D.selectForArray('baseball', 'name', 'room=?', room) == undefined || D.selectForArray('baseball', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) == -1){
    		D.insert('baseball', {name : sender, point : 100000, room : room, win : 0, lose : 0, solowin : 0});
    	}
        
    	if( (msg == "!야구" && work == 0) || (msg == "!야구방" && work == 1) ){
    		replier.reply('https://open.kakao.com/o/gQwX2Shb 로 입장해주세요. 중복되지 않는 자신만의 닉네임을 설정하셔야됩니다. 중복되는 닉네임으로 게임을 진핼할 경우 제재당할 수 있습니다.');
    		return;
    	}
    	
    	if ((msg == "!야구" && work == 1) || ( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && ( !isNaN(msg) || msg == '참가' || msg == '시작' || msg == '!강제종료' || msg == '!힌트' || msg == '!패스') ) ){
        	baseball(r);
        }
    	
    	if( msg == "!전적초기화" && D.selectForArray('baseball', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) > -1  && work == 1 ){
    		D.update('baseball', {point : 100000, win : 0, lose : 0, solowin : 0}, 'name=? and room=?', [sender, room] );
    		replier.reply(sender+'님의 정보가 초기화 되었습니다.');
    		return;
    	}
    	
    	if(msg == '!정보' && work == 1 ){
    		inform(r);
    	}
    	
    	if(msg == '!랭킹' && work == 1 ){
    		var i = 1;
    		replier.reply('전체 순위\n'+es+D.selectForArray('baseball', ['name','point'], 'room=?', r.room, {orderBy:"point desc"}).map(v=> i++ +'. ' +v[0]+' '+v[1]).join('\n'));
    		return;
    	}
    	
    	if(msg.indexOf('!') == 0){
        	calculator(r);
        }
    	
    	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	} catch (e) {
        Api.replyRoom("test", e + "\n" + e.stack);
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function func(r) {
    if (r.msg.split(" ")[1] == "최근채팅") {
        r.replier.reply("최근채팅 6개를 출력합니다. [!최근채팅16]과 같이 입력하면 16개를 불러오고 최대 16개까지 조회가 가능합니다. [!최근채팅16 닉네임] 과 같이 입력하면 해당 닉네임의 최근 16개 채팅을 보여줍니다. 불필요한 띄워쓰기가 들어가거나 이름이 잘못되면 출력이 안될 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "오버워치") {
        r.replier.reply("[!오버워치 똥개#5468]와 같이 입력하면 티어,점수,경쟁전에서 가장 많이 플레이한 영웅 4명을 확인할 수 있습니다.\n배치를 치지 않은 경우, 프로필이 비공개인 경우, 배틀태그를 입력하지 않은 경우, 대소문자를 정확하게 구분하지 않은 경우엔 정보를 알 수 없습니다.");
    } else if (r.msg.split(" ")[1] == "로또") {
        r.replier.reply("로또번호를 추천해줍니다. [!로또 5] 와 같이 5장까지는 뽑은 번호를 바로 알려주고 5장 초과 100장 이하의 경우 뽑은 데이터는 저장되고 별도로 알려주지는 않습니다. [!당첨]으로 토요일에 로또번호 추첨이 끝나면 결과를 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "당첨") {
        r.replier.reply("매주 토요일에 로또번호가 발표가 되면 지난 일주일간 뽑았던 번호가 몇등인지 알 수 있습니다. [!당첨 닉네임] 과 같이 입력하면 자기가 뽑은 번호만 확인 할 수 있습니다."+es+"\n3개 : 5등 / 4개 : 4등 / 5개 : 3등 / 5개+보너스 : 2등 / 6개 : 1등");
    } else if (r.msg.split(" ")[1] == "로또통계") {
        r.replier.reply("지금까지 뽑았던 로또의 당첨내역을 모두 확인할 수 있습니다.");
    }  else if (r.msg.split(" ")[1] == "행복회로") {
        r.replier.reply("이번주에 뽑은 번호가 저번주에 뽑았다면 몇 등일지 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "메뉴") {
        r.replier.reply("먹을 음식을 추천해 줍니다. [!메뉴 3]과 같이 입력하면 메뉴를 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "식당") {
        r.replier.reply("시립대 주변 식당을 추천해 줍니다. [!식당 3]과 같이 입력하면 식당을 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "유튜브") {
        r.replier.reply("[!유튜브 제목] 과 같이 검색하면 유튜브 링크를 보여줍니다. 기본값은 관련성이 가장 높은 영상이지만 원하는 영상이 나오지 않을 경우 [/유튜브 제목] 과 같이 검색하면 조회수가 가장 높은 영상을 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "노래") {
        r.replier.reply("벅스 TOP100 중 한 곡을 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "제이플라") {
        r.replier.reply("최신 제이플라 노래를 보여줍니다.");
    } else if (r.msg.split(" ")[1] == "공지") {
        r.replier.reply("최근 5개의 공지를 띄워줍니다. [!공지 15] 과 같이 입력하면 공지 15개를 보여주고 최대 15개까지 조회가능합니다. 해당 공지의 번호를 [!공지 823] 이렇게 입력하시면 내용과 댓글을 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "날씨") {
        r.replier.reply("[!날씨 지역명]으로 검색가능하며 경우에 따라 선택을 해야할 수도 있습니다. 기본값은 해당 방과 가장 관련있는 지역입니다.");
    } else if (r.msg.split(" ")[1] == "건의") {
        r.replier.reply("건의를 받습니다. [!건의 건의내용] 으로 입력하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "추첨") {
        r.replier.reply("[!추첨]을 입력하면 몇 명을 뽑을 건지 입력할 수 있습니다. 숫자만 입력하면 됩니다. 입력 후에는 누구든지 [참가] 를 입력하면 참가가 가능하고, 추첨을 제안한 사람이 [!마감 ]을 입력하면 당첨자가 바로 발표됩니다.\n추첨이 진행중일 땐 다른 추첨이 불가능합니다. 누구든 [!추첨]이 입력된 후 90초 이후엔 [!마감]이 가능합니다.");
    } else if (r.msg.split(" ")[1] == "명단") {
        r.replier.reply("푸드뱅크 명단을 보여줍니다. [!명단 만월] 처럼 입력하면 만월노인요양원의 검색 결과가 나옵니다.");
    } else if (r.msg.split(" ")[1] == "맛집") {
        r.replier.reply("검색한 지역의 맛집을 알려줍니다. [!맛집 지역명] 으로 검색하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "야구"){
    	r.replier.reply('숫자야구 룰\n'+es+'\n\
여러분들은 [!야구] 를 통해 게임을 시작 할 수 있으며 [!야구] 를  외친 사람은 자동으로 참가가 됩니다.\
[참가] 를 입력하면 참가가 가능하고 [!야구] 를 외친 사람이 [시작] 이라고 입력하면 게임을 시작합니다.\n\
참가한 순서대로 맞출 수 있는 기회가 부여됩니다. 숫자는 중복되지 않는 0~9까지의 숫자입니다. 맞출 숫자가 1325라고 가정합니다.\n\
[1246]이라고 질문을 합니다. 1은 위치와 숫자가 같으므로 스트라이크, 2는 위치는 다르지만 포함은 되어있으니 볼입니다. 4와 6은 아무것도 해당되지 않습니다.\n\
단서를 통해 정답인 1325를 맞추면 됩니다. 참가비는 1000point입니다. 1000point아래로 내려가면 별도의 안내가 있을 예정입니다.\n\
최대 3인까지 가능하며 혼자서도 가능하지만 전적은 기록되지 않습니다.\n\
[!정보]를 통해 자신의 각종 정보를 확인할 수 있습니다.\n\
[!랭킹]을 통해 point가 가장 많은 순서대로 등수 조회가 가능합니다.\n\
[!강제종료]를 통해 게임을 강제로 종료할 수 있습니다. 혼자 플레이 중인 경우 아무나 종료 가능하고 2인 이상일 경우 현재 참가중인 플레이어 중에서만 강제종료가 가능합니다.\n\
[!패스]를 통해 상대방이 30초 이상 답하지 않을 경우 그 다음 턴으로 차례를 넘길 수 있습니다.\n\
[!힌트]를 통해 8번째 턴 부터 500포인트를 사용하여 숫자 하나에 대한 정보를 얻을 수 있습니다. 힌트를 쓰는 즉시 포인트는 차감되기 때문에 강제종료를 하더라도 포인트는 돌아오지 않습니다. 신중하게 사용해주세요.\n\
[!야구방]을 통해 야구 전용방에 들어갈 수 있습니다.')
    } else if (r.msg.split(" ")[1] == "주사위"){
    	r.replier.reply("기본값은 1~100이고 [!주사위 200] 처럼하면 1~200까지, [!주사위 2 200] 처럼하면 2부터 200까지 랜덤한 숫자를 뽑습니다.");
    } else if (r.msg.split(" ")[1] == "포토"){
    	r.replier.reply("[!포토 사진이름]으로 검색하면 구글 이미지 검색 첫번째 사진을 보여줍니다.");
    }
}
function calculator(r){
	var temp = eval(r.msg.substr(1).replace(/[^0-9*\-+%/*=\^&|!.~{}()[\]]/g, ""));
	if(temp!=undefined){
		r.replier.reply(temp);
	}
}


function translation(r){
	var tempmsg = r.msg.substr(7);
	var templan0 = r.msg.substr(4).split(',')[0][0];
	var templan1 = r.msg.substr(4).split(',')[0][1];
	if (templan0 == '영'){
		templan0 = 'en';
	} else if (templan0 =='한'){
		templan0 = 'ko';
	} else if (templan0 =='일'){
		templan0 = 'ja';
	} else {
		r.replier.reply('번역할 수 없습니다.');
		return;
	}
	if (templan1 == '영'){
		templan1 = 'en';
	} else if (templan1 =='한'){
		templan1 = 'ko';
	} else if (templan1 =='일'){
		templan1 = 'ja';
	} else {
		r.replier.reply('번역할 수 없습니다.');
		return;
	}
	if(templan0 == templan1 ){
		r.replier.reply('번역할 수 없습니다.');
		return;
	}
	
	r.replier.reply(Api.papagoTranslate(templan0,templan1,tempmsg));
}
function controlReload(r){
	control = D.selectForArray('control').map(v=>v[0]);
	controlPanel = D.selectForObject('control');
	r.replier.reply('기능 리로드 완료');
}

function controlEdit(r){
	controlPanel = D.selectForObject('control');
	control = D.selectForArray('control').map(v=>v[0]);
	
	var temp = r.msg.split(',');
	var feature = -1;
	for(var i in control){
		if( temp[1].indexOf(control[i]) == 0 ){
			feature = i;
			break;
		}
	}
	
	if(feature != -1){
		var tempf = controlPanel[feature];
		if( temp[3] == 'on' ){
			tempf[temp[2].replace(/ /g, '_')] = 1;
		} else if ( temp[3] == 'off' ){
			tempf[temp[2].replace(/ /g, '_')] = 0;
		} else {
			r.replier.reply('잘못입력했습니다.');
			return;
		}
		D.update("control", tempf , "name=?", [control[feature]]);
	} else {
		r.replier.reply('잘못입력했습니다.');
		return;
	}
	controlReload(r);
	r.replier.reply("수정 완료");
}

function thread(r){
	r.replier.reply(T.getThreadList().join('\n'));
}

function db(r){
	r.replier.reply(D.selectForString("sqlite_master"));
}

function checkroom(r){
	r.replier.reply(Api.getRoomList().slice().join('\n'));
}

function suggestion(r){
	if(r.msg.substr(4).length < 3){
		r.replier.reply("건의가 너무 짧습니다.");
	}else{
		Api.replyRoom('test', r.room+" : "+r.sender+" : "+r.msg.substr(4));
		r.replier.reply(r.sender+"님의 건의가 접수되었습니다.");
	}
}


function blackjack(r){
	if( Flag.get('gameinfo', r.room) == 0 ){
		var gameinfo = {
				start : 0,
				start1 : 0,
				start2 : 0,
				start3 : 0
		}
		Flag.set('gameinfo', r.room, gameinfo);
	} else {
		var gameinfo = Flag.get('gameinfo', r.room);
	}
	
	//강제종료
	if( ( gameinfo.start == 1 || gameinfo.start1 == 1 || gameinfo.start2 ==  1 || gameinfo.start3 ==  1) && r.msg == '!블랙잭종료' ){
		var gameinfo = {
				start : 0,
				start1 : 0,
				start2 : 0,
				start3 : 0
		};
		Flag.set("gameinfo", r.room , gameinfo);
		r.replier.reply('게임이 종료되었습니다. 새로운 게임이 가능합니다.');
		return;
	}
	
	//
	if( r.msg == '!블랙잭'){
		if( gameinfo.start == 0 && gameinfo.start1 == 0 &&  gameinfo.start2 ==  0 &&  gameinfo.start3 ==  0 && Number(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])) >= 10000  ){
			r.replier.reply('블랙잭을 시작합니다. 참여할 사람은 [참가] 를 입력해주세요.');
			var gameinfo = {
					suggest : r.sender,
					starttime : new Date().getTime(),
					playerlist : [],
					betlist : [],
					burstcount : 0,
					staycount : 0,
					endcount : 0,
					start : 1,
					start1 : 0,
					start2 : 0,
					start3 : 0,
			};
			gameinfo.dealer = {
					card : [],
					sum : 0
			};
			gameinfo.playerlist.push(r.sender);
			gameinfo.player0 = {
					name : r.sender,
					card : [],
					bet : 0,
					sum : 0,
					splitcount : 0,
					insurance : 0,
					state : 0
			};
			Flag.set("gameinfo", r.room , gameinfo);
			r.replier.reply(r.sender+"님("+Number(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room]))+')이 참가하셨습니다. 현재 1명');
		}else if( Number(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])) < 10000 ){
			r.replier.reply('포인트가 부족합니다.')
		}
		else {
			r.replier.reply('게임이 진행중입니다.');
			return;
		}
	}
	
	if (r.msg == '참가' &&  gameinfo.start == 1 ){//참가모집중
        if( Number(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])) >= 10000 ){
        	if(gameinfo.playercount == 1 && gameinfo.player0.name[0] != r.sender ){
    			gameinfo.playerlist.push(r.sender);
        		gameinfo.player1 = {
    					name : r.sender,
    					card : [],
    					bet : 0,
    					sum : 0,
    					splitcount : 0,
    					insurance : 0,
    					state : 0
    					
    				}
        	} else if ( gameinfo.player0.name[0] != r.sender && gameinfo.player1.name[0] != r.sender) {
    			gameinfo.playerlist.push(r.sender);
        		gameinfo.player2 = {
    					name : r.sender,
    					card : [],
    					bet : 0,
    					sum : 0,
    					splitcount : 0,
    					insurance : 0,
    					state : 0
    				}
        	}
            r.replier.reply(r.sender+"님("+Number(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room]))+")이 참가하셨습니다. 현재 "+temp.length+'명');
        } else if (Number(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])) < 10000 ){
        	r.replier.reply('돈이 부족합니다.');
        	return;
        }
    }
	
	if ( gameinfo.start == 1 && (gameinfo.playerlist.length == 3 || (r.msg == '시작' && gameinfo.playerlist.indexOf(r.sender) > -1 )) ){
		var figure = ['♣','♠','♦','♥'];
		var num = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
		var temp = [];
		var cards = [];
		for(var i = 0 ; i< 4 ; i++){
			for(var j = 0 ; j < 13 ; j++){
				temp.push([figure[i], num[j]]);
			}
		}
		for(var i = 0 ; i < 52 ; i++){
			var rand = Math.floor(Math.random()*temp.length);
			cards.push(temp.splice(rand, 1)[0]);
		}
		Flag.set('cards', r.room, cards);//카드셔플
		
		for( var j = 0 ; j < 2 ; j++){
			var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
			gameinfo.dealer.card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
		}
		gameinfo.start = 0;
		gameinfo.start1 = 1;
		r.replier.reply(gameinfo.playerlist.length+'명이 참가했습니다. 게임을 시작합니다. 1만원 이상 50만원 이하로 배팅액을 정해주세요.');	
	}
	
	var num = gameinfo.playerlist.indexOf(r.sender);
	
	if( gameinfo.start1 == 1 &&  gameinfo.betlist.length < gameinfo.playerlist.length ){
		if( !isNaN(r.msg) && Number(r.msg)>9999 && Number(r.msg)<500001 && gameinfo.playerlist.indexOf(r.sender) > -1 && gameinfo.betlist.indexOf(r.sender) == -1 && gameinfo['player'+num].bet == 0 ){
			for( var j = 0 ; j < 2 ; j++){
				var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
				gameinfo['player'+num].card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			}
			gameinfo['player'+num].bet = Number(r.msg);
			r.replier.reply(r.sender+'님이 '+gameinfo['player'+num].bet+'원을 배팅했습니다.');
			gameinfo.betlist.push(r.sender);
		}
	}
	
	if( gameinfo.betlist.length == gameinfo.playerlist.length && gameinfo.start1==1){
		r.replier.reply('딜러의 카드 : ' + gameinfo.dealer.card[0].join(' ') + ' | ? ' );
		for( var i in gameinfo.playerlist){
			r.replier.reply(gameinfo['player'+i].name+'의 카드 : ' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | '));
		}
		gameinfo.start1 = 0;
		gameinfo.start2 = 1;
	}
	
	if( gameinfo.start2 == 1 && gameinfo.playerlist.length > 0 ){
		if( r.msg == '스플릿'){
			
		}
		if( r.msg == '힛' && num != -1 && gameinfo['player'+num].state == 0 ) {
			var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
			gameinfo['player'+num].card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			r.replier.reply(gameinfo['player'+num].name+'의 카드 : ' + gameinfo['player'+num].card.map(v=>v.join(' ')).join(' | '));
			var temp = gameinfo['player'+num].card.map(v=>v[1]);
			var sum = 0;
			for(var i in temp){
				if( temp[i] == 'A' ){
					sum += 1
				} else if( isNaN(temp[i])){
					sum += 10;
				} else {
					sum += Number(temp[i]);
				}
			}
			for(var i in temp) {
				if(temp[i] == 'A'){
					temp[i] = 1; 
					if(sum <= 11) {
						temp[i] = 11; 
						break;
					}
				} else if ( isNaN(temp[i])){
					temp[i] = 10; 
				}
			}
			var sum = 0;
			for(var i in temp) {
				sum+=temp[i]
			}
			if(sum > 21){
				r.replier.reply(r.sender+'님의 버스트.');
				gameinfo['player'+num].state = 1;
				gameinfo.endcount +=1;
				gameinfo['player'+num].sum = sum;
			}
		}
		
		if( (r.msg == '스탠드' || r.msg == '스테이')  && gameinfo['player'+num].name==r.sender ){
			r.replier.reply(gameinfo['player'+num].name+'님의 스테이.');
			var temp = gameinfo['player'+num].card.map(v=>v[1]);
			var sum = 0;
			for(var i in temp){
				if( temp[i] == 'A' ){
					sum += 1
				} else if( isNaN(temp[i])){
					sum += 10;
				} else {
					sum += Number(temp[i]);
				}
			}
			for(var i in temp) {
				if(temp[i] == 'A'){
					temp[i] = 1; 
					if(sum <= 11) {
						temp[i] = 11; 
						break;
					}
				} else if ( isNaN(temp[i])){
					temp[i] = 10; 
				}
			}
			var sum = 0;
			for(var i in temp) {
				sum+=temp[i];
			}
			gameinfo['player'+num].sum = sum;
			gameinfo['player'+num].state = 2;
			gameinfo.endcount +=1;
		}
	}
	
	if( gameinfo.endcount == gameinfo.playerlist.length && gameinfo.start2 == 1 ){
		while(1){
			var temp = gameinfo.dealer.card.map(v=>v[1]);;
			var sum = 0;
			for(var i in temp){
				if( temp[i] == 'A' ){
					sum += 1
				} else if( isNaN(temp[i])){
					sum += 10;
				} else {
					sum += Number(temp[i]);
				}
			}
			for(var i in temp) {
				if(temp[i] == 'A'){
					temp[i] = 1; 
					if(sum <= 11) {
						temp[i] = 11; 
						break;
					}
				} else if ( isNaN(temp[i])){
					temp[i] = 10; 
				}
			}
			var sum = 0;
			for(var i in temp) {
				sum+=temp[i]
			}
			
			if(sum < 17){
				var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
				gameinfo.dealer.card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			} else{
				gameinfo.dealer.sum = sum;
				break;
			}
		}
				
		var str = '';
		
		if( gameinfo.dealer.sum > 21 ){
			for( var i in gameinfo.playerlist){
				if(gameinfo['player'+i].state = 1){
					str += gameinfo['player'+i].name + '님의 패배\n';
				} else {
					str += gameinfo['player'+i].name + '님의 승리\n';
				}
			}
		} else if( gameinfo.dealer.sum < 22 ){
			for( var i in gameinfo.playerlist){
				if(gameinfo['player'+i].state = 1){
					str += gameinfo['player'+i].name + '님의 패배\n';
				} else {
					if( gameinfo.dealer.sum < gameinfo['player'+i].sum ){
						str += gameinfo['player'+i].name + '님의 승리\n'; 
					} else {
						str += gameinfo['player'+i].name + '님의 패배\n'; 
					}
				}
			}
		}
		r.replier.reply('딜러의 카드를  공개합니다.\n' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + ' (' + gameinfo.dealer.sum+ ')\n' +str );		
		Flag.get('gameinfo', r.room).start2 = 0;
		}
	}
	//var temppoint = Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] ))-Flag.get('blackjack', r.room)[num][1];
	//D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
}


function funcCheck(r){
	var str='';
	for(var i in control) {
		if(controlPanel[i][r.room.replace(/ /g, '_')] ==1) {
			str += control[i] + '  ' ;
		}
	}
	var str1='';
	var j = 1;
	for(var i in featureList) {
        if( str.indexOf(featureList[i]) > -1 ) {
        	if( Math.floor( str1.length / 20) == j){
        		str1 += '\n';
        		j+=1;
        	}
        	str1 += featureList[i] + ' / ';
        }
	}
	str1 += '\n';
	str1 = str1.split(' / \n').join('\n');
	return str1;
}

function music(r) {
	var rand = Math.floor(Math.random()*100);
	var list = org.jsoup.Jsoup.connect('https://m.bugs.co.kr/chart').get().select('td.check').toArray().map(v=>v.toString().split('title="')[1].split('"')[0]);
	var search_word = list[rand];
	var trash = org.jsoup.Jsoup.connect('https://music.bugs.co.kr/genre/chart/kpop/rnh/total/day').get().select('p.title').toArray().map(v=>String(v.text()));
	while(1){
		if(trash.indexOf(String(search_word))>-1){
			rand = Math.floor(Math.random()*100);
			search_word = list[rand];
		} else {
			break;
		}
	}
	var link=org.jsoup.Jsoup.connect('https://www.youtube.com/results?search_query='+search_word+'&sp=CAASAhAB').get().select('div.yt-lockup-dismissable').select('div.yt-lockup-content').get(0).select('h3.yt-lockup-title').select('a').attr("abs:href");
	r.replier.reply(link);
	return;
}

function youtube(r) {//조회수
	var search_word = r.msg.substr(5);
	if(r.msg.split(' ')[0]=='!yt'){
		search_word = r.msg.substr(4);
	}
	if(r.msg[0] == '!'){//관련성
		var link=org.jsoup.Jsoup.connect('https://www.youtube.com/results?search_query='+search_word+'&sp=CAASAhAB').get().select('div.yt-lockup-dismissable').select('div.yt-lockup-content');
	} else if (r.msg[0] == '/'){//조회수
		var link=org.jsoup.Jsoup.connect('https://www.youtube.com/results?search_query='+search_word+'&sp=CAMSAhAB').get().select('div.yt-lockup-dismissable').select('div.yt-lockup-content');
		
	}
	if(String(link).length == 0 ){//CAASAhAB : 관련성  //CAMSAhAB : 조회수
		r.replier.reply('검색결과가 없습니다.');
		return;
	}
	var link=link.get(0).select('h3.yt-lockup-title').select('a').attr("abs:href");
	r.replier.reply(link);
	return;
}

function jfla(r){
	var list=org.jsoup.Jsoup.connect('https://www.youtube.com/user/JFlaMusic/videos?view=0&sort=dd&shelf_id=0').get().select('a:contains(cover by)').toArray().map(v=>v.text()+'\n'+v.attr("abs:href"));
	r.replier.reply(list[0]);
	r.replier.reply('더보기'+es+'\n'+'노래 전체 모음\nhttps://music.youtube.com/playlist?list=PLrJ-VGAeEn8gzjavY0PXwGsMssB1DTUx7\n\n최근 목록\n'+list.slice(1).join('\n\n'));
}

function baseball(r){
	if(Flag.get('supposelist', r.room) == 0 && r.msg == '!힌트' && Flag.get('baseball', r.room)[Flag.get('k', r.room)] == r.sender ){
		r.replier.reply('힌트를 쓰려면 8턴이 지나야 합니다.');
		return;
	}
	if(Flag.get('supposelist', r.room) != 0){
		if( r.msg == '!힌트' && Flag.get('supposelist', r.room).split('\n').length-1 > 7  && Flag.get('baseball', r.room)[Flag.get('k', r.room)] == r.sender){
			var str = '';
			str += Flag.get('baseball', r.room)[Flag.get('k', r.room)]+' | '+Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room] ))+' → ';
			var temppoint = Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room] ))-500;
			D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room]);
			str += Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room] ));
			
			var rand = Math.floor(Math.random()*4);
			var answer = ['_','_','_','_'];
			answer[rand] = Flag.get('answer', r.room)[rand];
			r.replier.reply('Hint!\n'+str+'\n'+answer.join(' '));
			return;
		} else if(r.msg == '!힌트' && Flag.get('supposelist', r.room).split('\n').length-1 < 8  && Flag.get('baseball', r.room)[Flag.get('k', r.room)] == r.sender ){
			r.replier.reply('힌트를 쓰려면 '+ (9 - Number(Flag.get('supposelist', r.room).split('\n').length))  + '턴이 지나야 합니다.');
			return;
		}
	}
	
	
	if( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && r.msg == '!강제종료' && Flag.get('baseball', r.room).length > 1 ){
		for(var i=0 ; i<Flag.get('baseball', r.room).length ; i++ ){
			if(r.sender == Flag.get('baseball', r.room)[i]){
				Flag.set('start', r.room, 0);
				Flag.set('start1', r.room, 0);
				Flag.set('start2', r.room, 0);
				Flag.set('supposelist', r.room, '');
				r.replier.reply('게임이 종료되었습니다. 새로운 게임이 가능합니다.');
				return;
			}
		}
		if((Flag.get('baseballtime', r.room ) + 1000*8*60 ) < new Date().getTime() ){
			Flag.set('start', r.room, 0);
			Flag.set('start1', r.room, 0);
			Flag.set('start2', r.room, 0);
			Flag.set('supposelist', r.room, '');
			r.replier.reply('게임이 종료되었습니다. 새로운 게임이 가능합니다.');
			return;
		}else {
			r.replier.reply( (Math.floor( (Flag.get('baseballtime', r.room ) + 1000*60*8 - new Date().getTime()) / 1000 )) + '초 뒤에 강제종료가 가능합니다.');
			return;
		}
	}
	
	if( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && r.msg == '!강제종료' && Flag.get('baseball', r.room).length == 1 ){
		Flag.set('start', r.room, 0);
		Flag.set('start1', r.room, 0);
		Flag.set('start2', r.room, 0);
		Flag.set('supposelist', r.room, '');
		r.replier.reply('게임이 종료되었습니다. 새로운 게임이 가능합니다.');
		return;
	}

	if( r.msg == '!야구'){
		if(Flag.get('start', r.room) == 0 && Flag.get('start1', r.room) == 0 &&  Flag.get('start2', r.room) ==  0 && Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])) >= 1000  ){
			r.replier.reply('게임을 시작합니다. 참여할 사람은 [참가] 를 입력해주세요.');
			Flag.set('baseballtime', r.room, new Date().getTime());
			Flag.set("start", r.room, 1);
			Flag.set("suggest", r.room, r.sender);
			var temp = [r.sender];
			Flag.set("baseball", r.room , temp);
			r.replier.reply(r.sender+"님("+Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room]))+")이 참가하셨습니다. 현재 "+temp.length+'명');
		}else if( Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])) < 1000 ){
			r.replier.reply('포인트가 부족합니다. [!전적초기화]를 통해 전적을 초기화 하세요.')
		}
		else {
			r.replier.reply('게임이 진행중입니다.');
			return;
		}
	}
	
	if (r.msg == '참가' && Flag.get("start", r.room) == 1 ){
        if( Flag.get('baseball', r.room).indexOf(r.sender)==-1 && Flag.get('baseball', r.room).length < 3 && Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])) >= 1000 ){//||
            var temp = Flag.get('baseball', r.room);
            temp.push(r.sender);
            Flag.set("baseball", r.room , temp);
            r.replier.reply(r.sender+"님("+Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room]))+")이 참가하셨습니다. 현재 "+temp.length+'명');
        } else if (Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])) < 1000 ){
        	r.replier.reply('포인트가 부족합니다. [!전적초기화]를 통해 전적을 초기화 하세요.');
        	return;
        }
    }
	
	if ( Flag.get("start", r.room) == 1 && (Flag.get('baseball', r.room).length == 3 || (r.msg == '시작' && Flag.get('suggest', r.room) ==r.sender)) ){
		if(Flag.get('baseball', r.room).length > 0 ){
			r.replier.reply(Flag.get('baseball', r.room).length+'명이 참가했습니다. 게임을 시작합니다. 4자리 숫자만 입력하세요.');
			Flag.set('start', r.room, 0);
			Flag.set('start1', r.room, 1);
		}
	}
	
	if(Flag.get('start1', r.room) == 1) {
		var baseballnum1 = [0,1,2,3,4,5,6,7,8,9];
		var list1 = [];
		for(var i=0;i<4;i++){
			var rand = Math.floor(Math.random()*baseballnum1.length);
			list1.push(baseballnum1.splice(rand,1))
		}
		Flag.set('answer',r.room, list1);
		
		Flag.get('baseball', r.room).length;
		var k = 0;
		Flag.set('k', r.room, k);
		Flag.set('start1', r.room, 0);
		r.replier.reply(Flag.get('baseball', r.room)[Flag.get('k', r.room)] + '님 차례입니다.');
		Flag.set('start2', r.room, 1);
		Flag.set('passtime', r.room, new Date().getTime());
		return;
	}
	
	if(Flag.get('start2', r.room) == 1 && Flag.get('baseball', r.room)[Flag.get('k', r.room)]==r.sender) {
		if(r.msg < 0 ){
			r.replier.reply('양수를 입력하세요');
			return;
		}
		if(r.msg.indexOf('e') > -1){
			return;
		}
		if(isNaN(r.msg)==true){
			r.replier.reply('숫자가 아닙니다.');
			return;
		}else if( r.msg.split('').length != 4  || Math.floor(r.msg) < 100 ){
			r.replier.reply('4자리 숫자만 입력해주세요.')
			return;
		}
		var number = String(r.msg).split('');
		var checkcount = 0;
		for(var i=0; i<number.length; i++){
			for(var j=0; j<number.length; j++){
				if(number[i]==number[j]){
					checkcount+=1;
				}
			}
		}
		if (checkcount > 4 ){ 
			r.replier.reply('중복되는 숫자가 있습니다.');
			return;
		}else{
			var temp = Flag.get('supposelist', r.room);
			if(temp!=0){
				var temp = Flag.get('supposelist', r.room);
			}else{
				var temp='';
			}
			
			temp += r.msg+' ';
			Flag.set('supposelist', r.room, temp);
			
			var number = r.msg.split('');
			var scount=0;
			var bcount=0;
			var temp = Flag.get('answer',r.room).slice();
			
			for(var i=0;i<4;i++){
				if(number[i]==temp[i]){
					scount+=1;
					temp[i]=-1;
				}
				
				for(var j=0; j<temp.length; j++){
					if(number[i]==temp[j] && temp[i]!=-1){
						bcount+=1;
					}
				}
			}
			
			if(scount == 4){
				var str = '';
				for(var i=0;i<Flag.get('baseball', r.room).length;i++){
					if(Flag.get('baseball', r.room)[i] != r.sender){
						str += Flag.get('baseball', r.room)[i]+' | '+Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] ))+' → ';
						var temppoint = Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] ))-1000;
						D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
						str += Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )) + ' \n';
					} else {
						str += Flag.get('baseball', r.room)[i]+' | '+Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] ))+' → ';
						var temppoint = Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0])+Number(Flag.get('baseball', r.room).length*1100) - 1000;
						D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
						str += Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )) + ' \n';
					}
				}
				
				r.replier.reply(str+'     <'+r.sender+'님 정답!>');
				
				if(Flag.get('baseball', r.room).length > 1){
					var tempwin = Number(D.selectForArray('baseball', 'win',  'name=? and room=?', [r.sender, r.room])[0])+1;
					D.update('baseball', {win : tempwin }, 'name=? and room=?', [r.sender, r.room]);
					
					for(var i=0;i<Flag.get('baseball', r.room).length;i++){
						if(Flag.get('baseball', r.room)[i] != r.sender){
							var templose = Number(D.selectForArray('baseball', 'lose', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]))+1;
							D.update('baseball', {lose : templose }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
						}
					}
				} else {
					var tempwin = Number(D.selectForArray('baseball', 'solowin',  'name=? and room=?', [r.sender, r.room])[0])+1;
					D.update('baseball', {solowin : tempwin }, 'name=? and room=?', [r.sender, r.room]);
				}
				Flag.set('supposelist', r.room, '');
				Flag.set('start2', r.room, 0);
				return;
			} else {
				
				var temp = Flag.get('supposelist', r.room);
				temp += scount+'S / '+bcount+'B';
				Flag.set('supposelist', r.room, temp);
	            
				r.replier.reply(Flag.get('supposelist', r.room));
				
				var temp = Flag.get('supposelist', r.room);
				temp += '\n';
				Flag.set('supposelist', r.room, temp);

			}
			
			var k = Flag.get('k', r.room) + 1;
			if(k >= Flag.get('baseball', r.room).length){
				k=0;
			}
			Flag.set('k', r.room, k);
			r.replier.reply(Flag.get('baseball', r.room)[Flag.get('k', r.room)] + '님 차례입니다.');
			Flag.set('passtime', r.room, new Date().getTime());
		}
	} else if(Flag.get('start2', r.room) == 1 && Flag.get('baseball', r.room)[Flag.get('k', r.room)]!=r.sender && r.msg == '!패스' ) {
		for( var i = 0 ; i < Flag.get('baseball', r.room).length ; i++){
			if( r.sender == Flag.get('baseball', r.room)[i] ){
				if(((Flag.get('passtime', r.room ) + 1000*1*30 ) < new Date().getTime() )){
					var k = Flag.get('k', r.room) + 1;
					if(k >= Flag.get('baseball', r.room).length){
						k=0;
					}
					Flag.set('k', r.room, k);
					r.replier.reply(Flag.get('baseball', r.room)[Flag.get('k', r.room)] + '님 차례입니다.');
					Flag.set('passtime', r.room, new Date().getTime());
				}
				else {
					r.replier.reply( (Math.floor( (Flag.get('passtime', r.room ) + 1000*30*1 - new Date().getTime()) / 1000 )) + '초 뒤에 패스가 가능합니다.');
					return;
				}
			}
		}
	}
}

function checkimage(r){
	Flag.set('imagelist', r.room, File("/sdcard/FTP").listFiles());
	var temp = [];
	for(i=Flag.get('imagelist', r.room).length-1;i>-1;i--){
		if(String(Flag.get('imagelist', r.room)[i]).indexOf(r.msg.substr(6))>-1) {
			temp.push(Flag.get('imagelist', r.room)[i]);
		}
	}
	if(temp.length == 0){
		r.replier.reply('검색결과가 없습니다.');
		return;
	}
	Flag.set('imagelist', r.room, temp);
	var i = 1;
	r.replier.reply('파일 개수 : '+Flag.get('imagelist', r.room).length+'\n'+Flag.get('imagelist', r.room).map(v=> (i++)+'. ' + String(v).substr(12)).join('\n'));
}

function loadimage(r){
	if(Flag.get('image', r.room)==0){
		Flag.set('imagelist', r.room, File("/sdcard/FTP").listFiles());
		var temp = [];
		for(i=Flag.get('imagelist', r.room).length-1;i>-1;i--){
			if(String(Flag.get('imagelist', r.room)[i]).indexOf(r.msg.substr(4))>-1) {
				temp.push(Flag.get('imagelist', r.room)[i]);
			}
		}
		if(temp.length == 0){
			r.replier.reply('검색결과가 없습니다.');
			return;
		}
		Flag.set('imagelist', r.room, temp);
		var i = 1;
		r.replier.reply('파일 개수 : '+Flag.get('imagelist', r.room).length+'\n번호를 선택하세요.\n'+Flag.get('imagelist', r.room).map(v=> (i++)+'. ' + String(v).substr(12)).join('\n'));
		Flag.set('image', r.room, 1);
	} else if ( Flag.get('image', r.room)== 1){
		if(!isNaN(r.msg)){
			r.replier.reply('https://codebeautify.org/base64-to-image-converter');
			r.replier.reply(read64(String(Flag.get('imagelist', r.room)[Number(r.msg)-1]) ) );
			Flag.set('image', r.room, 0);
		} else {
			r.replier.reply('숫자를 입력하세요.');
			Flag.set('image', r.room, 0);
		}
	}
}
/*
function googleimage(r){
	var raw = org.jsoup.Jsoup.connect('https://www.google.com/search?q='+r.msg.substr(4)+'&tbm=isch&sa=X&ved=0ahUKEwiOifW47s_hAhWmGqYKHTRJC7QQ_AUIDigB&biw=1562&bih=776').get();
	var link=JSON.parse(raw.select('div.rg_meta.notranslate').get(0).text()).ou;
	r.replier.reply(link);
}
*/
function deleteimage(r){
	var temp = java.io.File("/sdcard/FTP").listFiles();
	var delist = [];
	for(i=0;i<temp.length;i++){
		if(String(temp[i]).indexOf(r.msg.substr(6))>-1) {
			File(temp[i]).delete();
			delist.push(temp[i]);
		}
	}
	r.replier.reply(delist.length+'개 삭제 완료\n'+delist.join('\n'));
}

function inform(r){
	if(D.selectForArray('baseball',null,'name=? and room=?',[r.sender, r.room])!=undefined){
		var wincount = Number(D.selectForArray('baseball', 'win','name=? and room=?',[r.sender, r.room]));
		var losecount = Number(D.selectForArray('baseball', 'lose','name=? and room=?',[r.sender, r.room]));
		r.replier.reply(r.sender+'님의 정보'
		+'\n순위 : '+(Number(D.selectForArray('baseball',['name','point'], 'room=?', [r.room], {orderBy:"point desc"}).map(v=>v[0]).indexOf(r.sender))+1) + '등'
		+'\n포인트 : '+D.selectForArray('baseball', 'point','name=? and room=?',[r.sender, r.room])
		+'\n전적 : '+wincount+'승 / '+losecount+'패'
		+'\n승률 : '+ Math.floor( wincount / (losecount + wincount)*1000)/10 + "%");
		return;
	}else {
		r.replier.reply('알 수 없습니다.');
		return;
	}
}

function randomnumber(r){
	var num1 = Number(r.msg.split(' ')[1]);
	var num2 = Number(r.msg.split(' ')[2]);
	if(num1 < 0 || num2 < 0 ){
		r.replier.reply('양수만 입력하세요');
		return;
	}
	if (isNaN(num1) && isNaN(num2)){
		num2=100;
		num1=1;
	}
	if (!isNaN(num1) && isNaN(num2)){
		num2=num1;
		num1=1;
	}
	if(num2==num1){
		r.replier.reply(num1);
		return;
	}
	 if( !isNaN(num1) && !isNaN(num2) && (num1 < num2)){
		r.replier.reply(num1 + Math.floor(Math.random() * ( num2 - num1 + 1 ) ));
	} else {
		r.replier.reply('잘못 입력했습니다.');
	}
}

function saveImage(r){
	file = 'storage/emulated/0/FTP/'+r.sender.replace(/ /g, '')+"."+r.room.replace(/ /g, '')+"-"+time().year+"."+time().month+"."+time().date+time().day+"."+time().hour+"."+time().minute+"."+time().second+".jpg";
	write64(file, r.imageDB.getImage());
	Api.replyRoom('test', 'Image saved|'+r.room+'-'+r.sender);
}
//new File("/sdcard/kakaotalkbot").listFiles().slice().join("\n")
//File = new java.io.file

function read64(file) {
	   var is=new java.io.FileInputStream(file);
	   var os=new java.io.ByteArrayOutputStream();
	   var len=0;
	   var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE,1000)
	   while((len=is.read(buf))!=-1){
	      os.write(buf,0,len);
	   }
	   is.close();
	   os.close();
	   var fileArray=os.toByteArray();
	   var str=new java.lang.String(org.apache.commons.codec.binary.Base64.encodeBase64(fileArray));
	   return str;
	}
	
function write64(file,base64) {
	   var base64Array=new java.lang.String(base64).getBytes();
	   var fileArray=org.apache.commons.codec.binary.Base64.decodeBase64(base64Array);
	   var is=new java.io.ByteArrayInputStream(fileArray);
	   var os=new java.io.FileOutputStream(file);
	   var len=0;
	   var buf=java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE,1000)
	   while((len=is.read(buf))!=-1){
	      os.write(buf,0,len);
	   }
	   is.close();
	   os.close();
	}
	
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

	batteryStatusStr = "배터리 상태\n"+"온도 : " + temperature +"\n충전률 : "+level + "\n상태 : " + status + "\n전압 : " + voltage + "\n기기 상태\n쓰레드 수 : "+T.getThreadList().length + "\nCPU : "+ Math.floor(idlePerc*100)/100 +"%";
	r.replier.reply(batteryStatusStr);
}

function weather(r){
	I.register("weatherSelect"+r.sender,r.room,r.sender,function(input){
		try{
			var want = r.msg.substr(4);
			var link1 = ""; // 날씨 검색화면
			var link2 = 'https://m.weather.naver.com/m/main.nhn?regionCode=03220111'; //네이버날씨기본주소
			var check = link2.indexOf('weather'); //link2 String에 weather이 있는지 검사
			var where = "통영시 무전동";
			if(r.room == '시립대 자취생 생정' || r.room == '시립대 전전컴 톡방'|| r.room == '시립대 봇제작방'|| r.room == '시립대 단톡방'){
				link2= 'https://m.weather.naver.com/m/main.nhn?regionCode=09230104';
				check = link2.indexOf('weather');
				where = "서울시립대";
			}
			if(want.length > 0){ //!날씨 ~뒤에 뭔가가 있을 때
	        	link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+want+"+날씨").get();
	    		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
	    		var	check = link2.indexOf('weather');
	    		where = want; // 지역명
	    		var temp = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=날씨+"+want).get().select('div.sort_box._areaSelectLayer').select('div.select_lst._selectLayerLists').select('a').toArray() //같은 이름의 지역이 있는지 확인
	    		
	    		if ( temp.length > 1 || (check == -1 && link2 != 'http://m.weather.naver.com/m/nation.nhn')){ //네이버에 날씨검색이 바로 안될 때 1
	    			if (temp.length > 1){ //네이버에서 같은 이름의 지역이 2곳 이상일 때 ex) 고성, 광주
			        	var i=0; //name의 번호에 필요
			        	var navername = temp.map(v=> (1+i++) +". "+ v.text()+' '); //장소명들
	    			}
		        	var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q="+want).get();
		        	if(String(temp).indexOf('addressColl') > -1){
		        		if(String(temp).indexOf('지번주소') > -1){//구체적인주소 죽림5로 56, 중림로 10
		        			var name0 = temp.select('div.mg_cont.clear').select('dl.dl_comm').select('span.txt_address').select('span.f_l').text();
		        			var name1 = temp.select('div.mg_cont.clear').select('div.wrap_tit').select('span.f_etit').text();
		        			var i = 1;
		        			var name2 = temp.select('div.mg_cont.clear').select('div.wrap_relspace').select('a').toArray().map(v=>(1+i++)+". "+v.text().replace('..', ''));
		        			if(name2.length > 0){
		        				var name = [];
		        				name.push('1. ' + name1);
		        				name = name.concat(name2);
		        				var msg;
					        	r.replier.reply("장소를 선택하세요\n"+name.join("\n"));
					        	msg=input.getMsg()*1;
					        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
					        		var targetNum=msg-1;
					        		var want = name[targetNum].split('. ')[1];
					        		var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q="+want).get();
					        		var name0 = temp.select('div.mg_cont.clear').select('dl.dl_comm').select('span.txt_address').select('span.f_l').text();
				        			var name1 = temp.select('div.mg_cont.clear').select('div.wrap_tit').select('span.f_etit').text();
					        	}
		        			}
		        			var wantplace="";
			        		var temp = name0;
				        	var loc = temp.substr(0, temp.lastIndexOf("면 ")+1);
				        	var loc1 = temp.substr(0, temp.lastIndexOf("읍 ")+1);
				        	var loc2 = temp.substr(0, temp.lastIndexOf("동 ")+1);  //각 이름들의 주소
				        	var loc3 = temp.substr(0, temp.lastIndexOf("가 ")+1);
				        	if( loc.length > 0){
			        			wantplace=loc;
			        		} else if (loc1.length > 0){
			        			wantplace = loc1;
			        		} else if(loc2.length > 0){
			        			wantplace = loc2;
			        		} else if(loc3.length > 0){
			        			wantplace = loc3;
			        		} else {
			        			var temp = name1;
					        	var loc = temp.substr(0, temp.lastIndexOf("면 ")+1);
					        	var loc1 = temp.substr(0, temp.lastIndexOf("읍 ")+1);
					        	var loc2 = temp.substr(0, temp.lastIndexOf("구 ")+1);
					        	var loc3 = temp.substr(0, temp.lastIndexOf("시 ")+1);
					        	if( loc.length > 0){
				        			wantplace=loc;
				        		} else if (loc1.length > 0){
				        			wantplace = loc1;
				        		} else if(loc2.length > 0){
				        			wantplace = loc2;
				        		} else if(loc3.length > 0){
				        			wantplace = loc3;
				        		}
			        		}
				        	link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+"+wantplace).get();
				        	link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
				        	check = link2.indexOf('weather');
				        	where = want;
				        	if(check == -1 || String(temp).length == 0){
			        			r.replier.reply("검색이 불가능합니다.");
								return;
			        		}
		        		}else{//와룡, 영산, 같은 주소가 여러군데 일 때  중구
		        			var name = [];
			        		name.push('1. '+temp.select('div.mg_cont.clear.admin_area').select('div.wrap_tit').select('span').text()+' ');
			        		var i = 1;
			        		name = name.concat(temp.select('div.mg_cont.clear.admin_area').select('div.wrap_relspace').select('a').toArray().map(v=>(1+i++)+". "+v.text().replace('..', '')+' '));
			        		if(navername != undefined){
			        			if(navername.length > name.length){
				        			name = navername;
				        		}
			        		}
			        		var msg;
				        	r.replier.reply("장소를 선택하세요\n"+name.join("\n"));
				        	msg=input.getMsg()*1;
				        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
				        		var targetNum=msg-1;
				        		var wantplace="";
				        		var temp = name[targetNum].substr(3);
				        		var loc = temp.substr(0, temp.lastIndexOf("면 ")+1);
					        	var loc1 = temp.substr(0, temp.lastIndexOf("읍 ")+1);
					        	var loc2 = temp.substr(0, temp.lastIndexOf("동 ")+1);  //각 이름들의 주소
					        	var loc3 = temp.substr(0, temp.lastIndexOf("가 ")+1);
					        	var loc4 = temp.substr(0, temp.lastIndexOf("군 ")+1);
					        	var loc5 = temp.substr(0, temp.lastIndexOf("구 ")+1);
				        		if( loc.length > 0){
				        			wantplace=loc;
				        		} else if (loc1.length > 0){
				        			wantplace = loc1;
				        		} else if(loc2.length > 0){
				        			wantplace = loc2;
				        		} else if(loc3.length > 0){
				        			wantplace = loc3;
				        		} else if(loc4.length > 0){
				        			wantplace = loc4;
				        		} else if(loc5.length > 0){
				        			wantplace = loc5;
				        		}
				        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+"+wantplace).get();
				        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
				        		check = link2.indexOf('weather');
				        		where = name[targetNum].substr(3);
				        	}
		        		}
		        	}else{//읍내면 , 북극
		        		temp=temp.select('div.wrap_place').select('div.wrap_cont').toArray(); // 다음에서 해당하는 곳의 주소를 가져옴
			        	var i = 0;
			        	var name = temp.map(v=>(1+i++)+". "+v.select('a').first().text().replace(' 펼치기/접기',''));// want로 daum에 검색한 곳들의 이름들
			        	if(name.length == 0){
			        		r.replier.reply("검색이 불가능합니다.");
			        		return;
			        	}
			        	var loc = temp.map(v=>{vv=String(v.select('dd.cont').text());return vv.substr(0,vv.lastIndexOf("면 ")+1)});
			        	var loc1 = temp.map(v=>{vv=String(v.select('dd.cont').text());return vv.substr(0,vv.lastIndexOf("읍 ")+1)});
			        	var loc2 = temp.map(v=>{vv=String(v.select('dd.cont').text());return vv.substr(0,vv.lastIndexOf("동 ")+1)});  //각 이름들의 주소
			        	var loc3 = temp.map(v=>{vv=String(v.select('dd.cont').text());return vv.substr(0,vv.lastIndexOf("가 ")+1)});
			        	var msg;
			        	r.replier.reply("장소를 선택하세요\n"+name.join("\n"));
			        	msg=input.getMsg()*1;
			        	if(!isNaN(msg) && msg>=1 && msg<=name.length ){
			        		var targetNum=msg-1;
			        		var wantplace="";
			        		if( loc[targetNum].length > 0){
			        			wantplace=loc[targetNum];
			        		} else if (loc1[targetNum].length > 0){
			        			wantplace = loc1[targetNum];
			        		} else if(loc2[targetNum].length > 0){
			        			wantplace = loc2[targetNum];
			        		} else if(loc3[targetNum].length > 0){
			        			wantplace = loc3[targetNum];
			        		}
			        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+"+wantplace).get();
			        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
			        		where = name[targetNum].substr(3) ;
			        		check = link2.indexOf('weather');
			        	}
		        	}
				} else if (link2 == 'http://m.weather.naver.com/m/nation.nhn') { // 바로 검색이 안될 때 2 ex) 독도, 죽림리
					var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q="+want).get();
					if(String(temp).indexOf('addressColl') > -1){
						var name = [];
		        		name.push('1. '+temp.select('div.mg_cont.clear.admin_area').select('div.wrap_tit').select('span').text());
		        		var i = 1;
		        		name = name.concat(temp.select('div.mg_cont.clear.admin_area').select('div.wrap_relspace').select('a').toArray().map(v=>(1+i++)+". "+v.text()));
		        		if(name.length==1){
		        			var targetNum=0;
		        		}else if (name.length>1){
		        			var msg;
				        	r.replier.reply("장소를 선택하세요\n"+name.join("\n"));
				        	msg=input.getMsg()*1;
				        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
				        		var targetNum=msg-1;
				        	}
		        		}
		        		var wantplace="";
		        		var temp = name[targetNum].split('. ')[1];
			        	var loc = temp.substr(0, temp.lastIndexOf("면 ")+1);
			        	var loc1 = temp.substr(0, temp.lastIndexOf("읍 ")+1);
			        	var loc2 = temp.substr(0, temp.lastIndexOf("동 ")+1);  //각 이름들의 주소
			        	var loc3 = temp.substr(0, temp.lastIndexOf("가 ")+1);
			        	if( loc.length > 0){
		        			wantplace=loc;
		        		} else if (loc1.length > 0){
		        			wantplace = loc1;
		        		} else if(loc2.length > 0){
		        			wantplace = loc2;
		        		} else if(loc3.length > 0){
		        			wantplace = loc3;
		        		}
			        	link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+"+wantplace).get();
			        	link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
			        	check = link2.indexOf('weather');
			        	where = name[targetNum].split('. ')[1];
			        	if(check == -1 || String(temp).length == 0){
		        			r.replier.reply("검색이 불가능합니다.");
							return;
		        		}
	        		}
		        } else if(link2=="http://m.weather.naver.com"){//도단위 검색일 때 ex) 제주도 , 경남
					var i = 0;
	    			var name = link1.select('div.lcl_lst').select('span.lcl_name').toArray().map(v=>(1+i++)+". "+v.text());
	    			var msg;
	    			r.replier.reply("지역을 선택하세요\n"+name.join('\n'));
		        	msg=input.getMsg()*1;
		        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
		        		var targetNum=msg-1;
		        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+"+name[targetNum].substr(3)).get();
		        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
		        		check = link2.indexOf('weather');
		        		where = name[targetNum].substr(3) ;
		        	}
		        }
			}
			
			if(link2.indexOf('regionCode')==-1){
				r.replier.reply("검색이 불가능합니다.");
        		return;
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
					var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
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
					var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
					var clock1 = clock.length;
					var uv1 = doc.select('li.uv').select('em').text();
					var uv = doc.select('li.uv').select('span').text().replace(uv1, " ("+uv1+")");
					var index = doc.select('strong.title').text().replace('최근 검색한 곳','').split(' ').map(v=>String(v).replace(/온도/g, "온도 : ").replace(/지수/g, "지수 : "))
					var sun1 = doc.select('li.sun_item').select('div.day').select('span').get(0).text() +" : "+ doc.select('li.sun_item').select('div.time').get(0).text();
					var sun2 = doc.select('li.sun_item').select('div.day').select('span').get(1).text() +" : "+ doc.select('li.sun_item').select('div.time').get(1).text();
					var link3 = link2+'&default=air';
					var doc1 = org.jsoup.Jsoup.connect(link3).get();
					var pollution = doc1.select('li.pollution_item').toArray().map(v=>{vv=String(v.select('span.number').select('em').text()); vvv=String(v.select('span.title').text()); return vvv +" : "+ v.select('span.number').text().replace(vv, " "+vv)});
					var dust = doc1.select('div.chart_item').toArray().map(v=>v.select('div.dust_graph_number').text().replace('먼지', '먼지 :')+"㎍/㎥" + "("+v.select('div.dust_graph_text').text()+")");
					if(sky.slice(0,7).map(v=>String(v)).indexOf("비") > -1 ){
						r.replier.reply('★비소식이 있습니다. 우산을 챙기세요★');
					}
					var res =where+where1+" 날씨\n"+"ㅤㅤ<종합정보 → 전체보기>\n";
					res += "-------미세먼지/자외선--------\n";
					res += dust.join("\n")+"\n";
					res += "자외선 : "+uv+"\n";
					res += "-------------날씨-------------\n"
					res += "시간ㅤ기상ㅤ기온 강수 습도 바람\n [h] ㅤ상태    [℃]  [%]  [%] [m/s]\n";
					for (var i = 0 ; i < clock1 ; i++) {
						res += " "+String(clock[i]).extension("0",2)+" ";
						res += String(sky[i]).extensionRight("ㅤ",4)+"  ";
						res += String(degree[i]).extension(" ",2)+"   ";
						res += String(rain[i]).extension(" ",2)+"   ";
						res += String(wet[i]).extension(" ", 2)+"   ";
						res += String(wind[i]).extension(" ",2)+"\n";
						//res += String(direction[i]).extension("   ",3)+" ";
						if(i==6){
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
var WCC = T.register("weatherClockCheck",()=>{
	while(true){
		if( 7 == new Date().getHours() ){
			r={msg : '!날씨', room : '푸드마켓',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨', room : '시립대 전전컴 톡방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨', room : '시립대 자취생 생정',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨', room : '시립대 단톡방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 공릉동', room : '단톡방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨', room : '단톡방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 강북구 수유 1동', room : '단톡방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 부산 대연동', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 진해 석동', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 광주 오룡동', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(60*60*1000);	//60분
		}
		java.lang.Thread.sleep(59*1000); //59초
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
			if(String(source.select('div.masthead').select('div.u-align-center')).length==0 ){
				var score = "Unranked";
				var tier = "Unranked";
			}else if (String(source.select('div.masthead').select('div.u-align-center')).length>0) {
				var score = source.select('div.masthead').select('div.u-align-center').get(0).text();
		        var tier = source.select('div.masthead').select('div.competitive-rank').get(0).toString().split('rank-icons/rank-')[1].split('Tier')[0];
			}else {
				var score = "알 수 없습니다."
				var tier = "Unranked";
			}

	        //var quickplaytime = source.select('div.progress-category.toggle-display').get(0);
			
			var compplaytime = source.select('div.progress-category.toggle-display').get(7);
			var compwinrate = source.select('div.progress-category.toggle-display').get(10);
			var compkilldeath = source.select('div.progress-category.toggle-display').get(11);
			
	        var res = "닉네임 : "+r.msg.substr(6)+"\n점수 : "+score+"\n티어 : "+tier+"\n\n많이 플레이한 영웅 TOP5"+es;
	        
	        var num = compplaytime.select('div.ProgressBar-title').toArray().length;
	        
	        if(num>4){
	        	num=5;
	        }
	        
	        for(var i = 0 ; i < num ; i++ ){
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
			r.replier.reply("검색 결과가 없습니다.");
		}else{
			url = url.get(1).attr("abs:href");
			var doc = org.jsoup.Jsoup.connect(url).get();
			var temptext = doc.select('li.list_item').toArray().map(v=>v.select("span.name").text() + " : " +v.select("div.txt.ellp1").text() + '\n태그 : ' + String(v.select("span.tag").text()).replace(/ /g, "/" ) );
			if (temptext.length > 3){
				temptext[2]=temptext[2]+es;
			}
			temptext = temptext.join('\n\n');
			temptext = temptext + '\n' + url ;
			r.replier.reply(temptext);
		}
    }catch(e){
    	Api.replyRoom('test',e+"\n"+e.stack);
		}
}

function banklist(r){
	try{
		var name = r.msg.split(" ")[1];
		if(typeof name == 'string'){
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

function foodbank(r){
	try{
		var name = r.msg.split(" ")[1];
		if(typeof name == 'string'){
			var temp=D.selectForArray('foodbank',null,'name like ? or manager like ? or tel like ? or phone like ? or fax like ? or email like ? or addr like ?', ['%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%']);
			var str = temp.map(v=>v[0]+'\n\n'+v[1]+'\n\n번호 : '+v[2]+'\n\n휴대폰 : '+v[3]+'\n\n팩스 : '+v[4]+'\n\n'+v[5]+'\n\n'+v[6]  ).join('\n-----------------\n');
			r.replier.reply(str);
		} else {
			var temp=D.selectForArray('foodbank',null,'name like ? or manager like ? or tel like ? or phone like ? or fax like ? or email like ? or addr like ?', ['%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%','%'+name+'%']);
			var str = temp.map(v=>v[0]+'\n\n'+v[1]+'\n\n번호 : '+v[2]+'\n\n휴대폰 : '+v[3]+'\n\n팩스 : '+v[4]+'\n\n'+v[5]+'\n\n'+v[6]  ).join('\n-----------------\n');
			r.replier.reply(str);
		}
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}


//추첨기
function sel(r){ //flag[2]==0&&flag[3]==0 -> 초기상태  // flag[2]==1&&flag[3]==0 -> 추첨이 시작함 // flag[2]==1&&flag[3]==1 -> 추첨인원 모집  // flag[2]==0&&flag[3] ==1 -> 당첨자 발표
	try{
		if ((Flag.get("sel0", r.room) == 1 || Flag.get("sel1", r.room) == 1) && r.msg == '!추첨'){
			r.replier.reply('현재 추첨이 진행중입니다.')
		}

		if (Flag.get("sel0", r.room) == 0 && Flag.get("sel1", r.room) == 0){
			r.replier.reply("뽑힐 인원 수를 입력해주세요. 숫자만 입력하면 됩니다. ex) 1\n최대 5명까지 가능합니다. 참여엔 제한이 없습니다.");
			Flag.set('seltime', r.room, new Date().getTime());
			Flag.set("selsender", r.room , r.sender);
			Flag.set("sel0", r.room, 1);
		}
		
		if(Flag.get("selsender", r.room) == r.sender && r.msg < 6 && 0 < r.msg && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 0){
			Flag.set("selnum", r.room , r.msg)
			r.replier.reply(Flag.get("selnum", r.room)+"명을 뽑습니다. 참여할 사람은 [참가] 를 입력해주세요. 추첨을 제안한 사람이 [!마감] 을 입력하면 마감됩니다. 90초 이후엔 누구든 [!마감]으로 마감할 수 있습니다.");
			Flag.set("sel1", r.room, 1);
		}
		
		if (r.msg == '참가' && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 1){
	         if( Flag.get('sellist', r.room) == 0 || Flag.get('sellist', r.room).indexOf(r.sender)==-1){
	            var temp;
	            if(Flag.get('sellist', r.room) == 0){
	               temp=[];
	            }
	            else{
	               temp=Flag.get('sellist', r.room);
	            }
	            
	            temp.push(r.sender);
	            Flag.set("sellist", r.room , temp);
	            r.replier.reply(r.sender+"님이 참가하셨습니다. 현재 "+temp.length+'명');
	         }
	      }
		
		var selexittime = new Date().getTime();
		
		if(r.msg == '!마감' && r.sender != Flag.get("selsender", r.room) && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 1){
	    	if( Flag.get('seltime', r.room) + 1000*60*1.5 > selexittime ){
	    		var temp = new Date().getTime();
				r.replier.reply(r.sender+'님은 '+(90000 - (temp - Flag.get('seltime', r.room)))/1000 + "초 뒤에 마감이 가능합니다. 현재는 추첨을 제안한 사람만 마감이 가능합니다.");
	    	} else {
	    		Flag.set("sel0", r.room, 0);
	    		if(Flag.get('sellist', r.room) == 0){
		    		r.replier.reply('아무도 참가하지 않았습니다.');
		    		Flag.set("sel1", r.room, 0);
			    	Flag.set("selnum", r.room, -1);
			    	Flag.set("selsender", r.room, "");
			    	Flag.set("sellist", r.room, [])
			    	return;
		    	}
	    	}
		} else if(r.msg == '!마감' && r.sender == Flag.get("selsender", r.room) && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 1){
			Flag.set("sel0", r.room, 0);
			if(Flag.get('sellist', r.room) == 0){
	    		r.replier.reply('아무도 참가하지 않았습니다.');
	    		Flag.set("sel1", r.room, 0);
		    	Flag.set("selnum", r.room, -1);
		    	Flag.set("selsender", r.room, "");
		    	Flag.set("sellist", r.room, [])
	    		return;
	    	}
	    }
	   
	    if ( Flag.get("sel0", r.room) == 0 && Flag.get("sel1", r.room) == 1 ){
	    	if(Flag.get('sellist', r.room).length <= Flag.get("selnum", r.room)){
	    		var list1 = Flag.get('sellist', r.room);
	    	} else {
	    		for (var i = 0; i < Flag.get("selnum", r.room); i++) {
	    			var list1 = [];
	            	var rad = Math.floor(Math.random() * Flag.get('sellist', r.room).length);
	            	if (list1.indexOf(Flag.get('sellist', r.room)[rad]) == -1){//중복이면 거른다
	            		list1.push(Flag.get('sellist', r.room).splice(rad, 1));
	            	}
	            }
	    	}
	    	
	    	if(Flag.get('selend', r.room)==1){
	    		return;
	    	}
	    	Flag.set('selend', r.room, 1);
	    	r.replier.reply('3');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply('2');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply('1');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply("당첨자 : "+list1.join(", "));
	    	Flag.set("sel1", r.room, 0);
	    	Flag.set("selnum", r.room, -1);
	    	Flag.set("selsender", r.room, "");
	    	Flag.set("sellist", r.room, [])
	    	Flag.set('selend', r.room, 0);
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

//최근채팅
function recentchat(r) {
	try{
		var temp = r.msg.substr(5);
		var temp1 = '';//개수
		var temp2 = '';//이름
		if(temp.length > 0 && temp.indexOf(' ') > -1 && temp.indexOf(' ') <= 2){
			temp1 = temp.split(' ')[0];
			temp2 = temp.substr(temp.indexOf(' ')+1);//닉
		}
		
		if(temp1==''){
			temp1 = 6;
		}
		if( 0 < Number(temp) ){
			temp1 = temp;
		}
	    
	    var list = [r.room];
	    var list1 = 'room=?';
	    var list2 = ['time'];
	    var list3 = 'WHERE room=\''+r.room+'\'';
	    
	    if (temp2 == ''){
	    	list2.push('name');
	    }
	    list2.push('msg');
	    
	    
	    if (temp2 != ''){
	    	list1 += ' and name=?';
	    	list.push(temp2);
	    	list3 += ' and name=\'' + temp2 + '\'';
	    }
	    
	    var templeng = D.selectForArray("chatdb","count(*)",list1,list)[0][0];
	    if(templeng == 0){
			r.replier.reply("검색된 내용이 없습니다.");
			return;
		} else {
			if ( 0 < temp1 && 17 > temp1){
				var num = Number(temp1);
			} else {
				var num = 6;
			}
			if(templeng < num){
				num = templeng;
			}
    	}
	    
	    var tempchat = D.rawQuery("SELECT "+ list2.join(',') +" FROM chatdb " + list3 + " limit " + num + " offset " + String(templeng - num) )
		
	    var temp = [];
		if(temp2 != ''){
			temp[0]=temp2+"의 채팅"; 
		}
		
		for (var i in tempchat) {
			temp.push(tempchat[i].join(' | '));
		}
		if (tempchat.length > 3){
			temp[2] += es;
		}
		r.replier.reply(temp.join("\n"));
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}


function allchat(r) { 
	try{
		var temp = r.msg.substr(5);
		var temp1 = '';
		var temp2 = '';
		var temp3 = '';
		if(temp.indexOf(',')>-1){
			var temp1 = temp.split(',')[0]; // 개수
			var temp2 = temp.split(',')[1]; // 이름
			var temp3 = temp.split(',')[2]; // 방
		}
		if(temp1==''){
			temp1 = 12;
		}
		if(Number(temp)>0){
			temp1 = temp;
		}
	    
	    var list = [];
	    var list1 = '';
	    var list2 = ['time'];
	    var list3 = '';
	    if (temp2 == ''){
	    	list2.push('name');
	    }
	    if (temp3 == ''){
	    	list2.push('room');
	    }
	    list2.push('msg');
	    
	    if (temp2 != ''){
	    	list1 += 'name=? ';
	    	list.push(temp2);
	    	list3 += 'WHERE name=\'' + temp2 + '\'';
	    }
	    if (temp3 != ''){
	    	if(list1 != ''){
	    		list1 += 'and room=?';
	    		list3 += 'and room=\'' + temp3 + '\'';
	    	} else{
	    		list1 += 'room=?';
	    		list3 += 'WHERE room=\'' + temp3 + '\'';
	    	}
	    	list.push(temp3);
	    }
	    
	    var templeng = D.selectForArray("chatdb","count(*)",list1,list)[0][0];
	    if(templeng == 0){
			r.replier.reply("검색된 내용이 없습니다.");
			return;
		} else {
			var num = temp1*1;
			if(templeng < num){
				num = templeng;
			}
    	}
	    
	    var tempchat = D.rawQuery("SELECT "+ list2.join(',') +" FROM chatdb " + list3 + " limit " + num + " offset " + String(templeng - num) )
    	
		var temp = [];
	    temp[0]='길이:'+num+'\n';
		if(temp2 != ''){
			temp[0]=temp[0]+temp2+"의 채팅"; 
		}
		if(temp3 != ''){
			temp[0]=temp[0]+"("+temp3+")\n"; 
		} else {
			temp[0]=temp[0]+"\n"; 
		}
		
		for (var i in tempchat) {
			temp.push(tempchat[i].join(' | '));
		}
		if (tempchat.length > 3){
			temp[3] += es;
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

function mylotto(r){
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var temp = D.selectForArray('lotto', null, 'room = ? and sender = ? and num = ?' , [r.room , r.sender, num]);
	if(temp.length == 0 ){
		result = '뽑은 번호가 없습니다';
	}else {
		var result = r.sender+"님이 이번주에 뽑은 로또번호 | "+num+"회차\n"+es+"\n";
		for(var i=0; i<temp.length; i++){
			result+= (i+1)+". | " + "생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+"\n\n";
		}
	}
	r.replier.reply(result);
}

function allbestlotto(r) {
	var result = "명예의 전당 | ";
	var temp = D.selectForArray('lottoresult', null, 'count > 2 ', null , {orderBy:"class asc"});
	var all = D.selectForArray('lottoresult', "count(*)");
	var five = D.selectForArray('lottoresult', "count(*)", 'count == 3');
	var four = D.selectForArray('lottoresult', "count(*)", 'count == 4 ');
	var three = D.selectForArray('lottoresult', "count(*)", 'count == 5 ');
	var two = D.selectForArray('lottoresult', "count(*)", 'count == 7 ');
	var one = D.selectForArray('lottoresult', "count(*)", 'count == 6');
	result+='로또 뽑은 횟수 : '+all+'\n';
	result+='1등 확률 : '+Math.floor(one/all*100000000000)/1000000000+"%("+one+")"+"\n";
	result+='2등 확률 : '+Math.floor(two/all*100000000000)/1000000000+"%("+two+")"+"\n";
	result+='3등 확률 : '+Math.floor(three/all*100000000000)/1000000000+"%("+three+")"+"\n";
	result+='4등 확률 : '+Math.floor(four/all*100000000000)/1000000000+"%("+four+")"+"\n";
	result+='5등 확률 : '+Math.floor(five/all*100000000000)/1000000000+"%("+five+")";
	
	if ( r.room == 'test'){
		result += "\n"+es+"\n";
		for(var i=0; i<temp.length; i++){
			result+= temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+ ' '+temp[i][7] + "회차\n\n";
		}
	}
	if (result.length > 100000){
		result = result.substr(0,100000);
	}
	r.replier.reply(result);
}

function bestlotto(r) {
	var result = "명예의 전당 | ";
	var temp = D.selectForArray('lottoresult', null, 'count > 2 ', null , {orderBy:"class asc"});
	var all = D.selectForArray('lottoresult', "count(*)");
	var five = D.selectForArray('lottoresult', "count(*)", 'count == 3');
	var four = D.selectForArray('lottoresult', "count(*)", 'count == 4 ');
	var three = D.selectForArray('lottoresult', "count(*)", 'count == 5 ');
	var two = D.selectForArray('lottoresult', "count(*)", 'count == 7 ');
	var one = D.selectForArray('lottoresult', "count(*)", 'count == 6');
	result+='로또 뽑은 횟수 : '+all+'\n';
	result+='1등 확률 : '+Math.floor(one/all*100000000000)/1000000000+"%("+one+")"+"\n";
	result+='2등 확률 : '+Math.floor(two/all*100000000000)/1000000000+"%("+two+")"+"\n";
	result+='3등 확률 : '+Math.floor(three/all*100000000000)/1000000000+"%("+three+")"+"\n";
	result+='4등 확률 : '+Math.floor(four/all*100000000000)/1000000000+"%("+four+")"+"\n";
	result+='5등 확률 : '+Math.floor(five/all*100000000000)/1000000000+"%("+five+")"+"\n"+es+"\n";
	
	for(var i=0; i<temp.length; i++){
		result+= temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+ ' '+temp[i][7] + "회차\n\n";
	}
	if (result.length > 20000){
		result = result.substr(0,20000);
	}
	r.replier.reply(result);
}

function testlotto(r){
	var cycle = 1;
	if( r.msg.substr(4) > 0 && r.msg.substr(4) < 10001 ){
		cycle = Number(r.msg.substr(4));
	}
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var str = '';
	for(var j = 0 ; j < cycle; j++){
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
	    templotto.sort(compare);
	    
	    if(cycle < 6){
	    	str += Number(j+1)+'. | '+templotto.map(v=>String(v).extension(" ",2)).join(", ")+'\n';
	    }
	    
	    
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
	str+= r.sender+'님이 '+cycle+'개의 로또를 뽑았습니다.';
	r.replier.reply(str);
}

//로또
function lotto(r) {
	try{
		var cycle = 1;
		if( r.msg.substr(4) > 0 && r.msg.substr(4) < 101 ){
			cycle = Number(r.msg.substr(4));
		}
		var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
		var num = raw.select('h4').text().split('회')[0]*1+1;
		var str = '';
		for(var j = 0 ; j < cycle; j++){
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
		    templotto.sort(compare);
		    
		    if(cycle < 6){
		    	str += Number(j+1)+'. | '+templotto.map(v=>String(v).extension(" ",2)).join(", ")+'\n';
		    }
		    
		    
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
		str+= r.sender+'님이 '+cycle+'개의 로또를 뽑았습니다.';
		r.replier.reply(str);
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

function flottocheck(r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var lastnum = Number(raw.select('h4').text().split('회')[0]) + 1;
	var win = raw.select('p').get(1).text().split(" ").slice();
	var bonus = raw.select('p').get(2).text();
	var date = raw.select('p').get(0).text().replace("(","").replace(" 추첨)","").slice();
	var lottodata = D.selectForArray('lotto',null,'num=? and sender=? and room=?', [lastnum, r.sender, r.room]);
	var failcount=0;
	var str1='\n';
	var first = 0;
	var str2='\n';
	var second = 0;
	var str3='\n';
	var third = 0;
	var str4='\n';
	var fourth = 0;
	var str5='\n';
	var fifth = 0;
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
		if(count==0||count==1||count==2){
			failcount += 1;
		}else if(count==3){
			str5+= lottodata[i].slice(2,5).join('.')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			fifth += 1;
		}else if(count==4){
			str4+= lottodata[i].slice(2,5).join('.')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			fourth += 1;
		}else if(count==5){
			str3+= lottodata[i].slice(2,5).join('.')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			third += 1;
		}else if(count==7){
			str2+= lottodata[i].slice(2,5).join('.')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			second += 1;
		}else if(count==6){
			str1+= lottodata[i].slice(2,5).join('.')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			first += 1;
		}
	}
	
	var all = lottodata.length;
	if(all == 0){
		r.replier.reply('로또를 뽑은 뒤 다시 시도하세요.');
		return;
	}
	var result = '';
	result+='1등 확률 : '+Math.floor(first/all*100000000000)/1000000000+"%("+first+")"+"\n";
	result+='2등 확률 : '+Math.floor(second/all*100000000000)/1000000000+"%("+second+")"+"\n";
	result+='3등 확률 : '+Math.floor(third/all*100000000000)/1000000000+"%("+third+")"+"\n";
	result+='4등 확률 : '+Math.floor(fourth/all*100000000000)/1000000000+"%("+fourth+")"+"\n";
	result+='5등 확률 : '+Math.floor(fifth/all*100000000000)/1000000000+"%("+fifth+")"+'\n\n'+es;
	result+='저번주 당첨 번호\n'+win.join(' ')+' / '+bonus+'\n\n';
	
	
	r.replier.reply(r.sender+'님의 이번주 번호가 저번주 번호라면?(개수 : '+lottodata.length+')\n'+result+
			'1등 개수 : '+first+'\n'+str1+'\n'+
			'2등 개수 : '+second+'\n'+str2+'\n'+
			'3등 개수 : '+third+'\n'+str3+'\n'+
			'4등 개수 : '+fourth+'\n'+str4+'\n'+
			'5등 개수 : '+fifth+'\n'+str5+'\n'+
			'꽝 개수 : '+failcount+'\n'
			);
}

function lottocheck(r) {
	try{
		var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
		var lastnum = raw.select('h4').text().split('회')[0];
		var win = raw.select('p').get(1).text().split(" ").slice();
		var bonus = raw.select('p').get(2).text();
		var date = raw.select('p').get(0).text().replace("(","").replace(" 추첨)","").slice();

		var temp=D.selectForArray('lottoresult', 'num', "num=?", [lastnum]).length;
		
		if(temp == 0 ){
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
		
		var result=date+" "+lastnum+"회차\n당첨번호 : "+win.join(' ')+"/"+bonus+"\n";
		var fail = '';
		
		var first = '';
		var second = '';
		var third = '';
		var fourth = '';
		var fifth = '';
		
		if( r.msg == "!당첨"){
			var temp = D.selectForArray('lottoresult',null,'room=? and num=?', [r.room, lastnum]);
			if ( temp.length == 0 ){
				r.replier.reply(result+'저번주에 로또 번호를 뽑은 사람이 아무도 없습니다.');
				return;
			}
		} else if ( r.msg.substr(4).length > 0){
			var temp = D.selectForArray('lottoresult',null,'room=? and sender=?', [r.room , r.msg.substr(4)]);
			if ( temp.length == 0 ){
				r.replier.reply(result+r.msg.substr(4)+"님은 저번주에 로또번호를 뽑은 적이 없습니다.");
				return;
			}
		}
		
		for(var i=0; i<temp.length; i++){
			if( temp[i][14] < 3){
				fail+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 3) {
				fifth+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 4) {
				fourth+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 5) {
				third+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 6) {
				first+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 7) {
				second+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} 
		}
		result = result+'뽑은 개수 : '+temp.length+'\n'+es+'\n1등\n'+first+'\n2등\n'+second+'\n3등\n'+third+'\n4등\n'+fourth+'\n5등\n'+fifth;
		if(fail.length > 50000){
			r.replier.reply(result);
		} else {
			r.replier.reply(result+'\n꽝\n'+fail);
		}
		
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}



function notice(r){
	try{
		if(Flag.get('cookie1', 'test') == 0 || Flag.get('cookie2', 'test') == 0){
			var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();
	
			Flag.set('cookie1', 'test', cookie1);
			Flag.set('cookie2', 'test', cookie2);
		}
		
		var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
	    .cookies(Flag.get('cookie2', 'test')).cookies(Flag.get('cookie1', 'test')).get().select('tbody');

	    var temptext = doc.select("tr.num").toArray().map(v=>"번호:"+v.select("td.num").get(0).text()+"   날짜:"+v.select("td.date").text()+"\n"+v.select("td.title>a").first().ownText());
	    var text = [];
	    var count = r.msg.split(" ")[1];
	    var lastnum = doc.select("tr.num").get(14).select("td.num").get(0).text();
	    
	    if(lastnum-1<count){
	    	var firstnum = doc.select("tr.num").get(0).select("td.num").get(0).text();
	        var wantnum = firstnum-count;
	    	var docnum = doc.select("tr.num").get(wantnum).select("td.num").get(0).text();
	    	var doctitle = doc.select("tr.num").select("a:first-child").get(wantnum).ownText();
	    	var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
	    	
	    	var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get('cookie2', 'test')).cookies(Flag.get('cookie1', 'test')).get();
	    	
	    	var text = String(subdoc.select("div.content").toArray()[0]).replace(/<br>/g, '\n').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').trim().replace(/^ +/gm,"").replace(/\n\n\n/g, '\n').replace(/\n\n\n/g, '\n');
	    	var repl = subdoc.select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, '');
	    	
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
		if(Flag.get('cookie1', 'test') == 0 || Flag.get('cookie2', 'test') == 0){
			var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();

			Flag.set('cookie1', 'test', cookie1);
			Flag.set('cookie2', 'test', cookie2);
		}
		
		var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
	    .cookies(Flag.get('cookie2', 'test')).cookies(Flag.get('cookie1', 'test')).get().select('tbody');
		
    	var docnum = doc.select("tr.num").toArray().map(v=>v.select('td.num').get(0).text());
    	var doctitle = doc.select("tr.num").toArray().map(v=>v.select('a:first-child').get(0).ownText());
    	
    	var difcount = 0;
    	
    	for(var i=0; i<15;i++){
    		for(var j=i; j<15; j++){
    			if(D.selectForArray('notice')[i][1].indexOf(doctitle[j]) == 0){
    				break;
    			}else{
    				difcount += 1;
        			var wantnum = j;
        			break;
        		}
    		}
    		if(difcount > 0){
    			break;
    		}
    	}
    	
		if(difcount > 0){
			D.delete('notice');
	    	for(var i=0; i<15;i++){
	    		D.insert('notice', {num : docnum[i], msg : doctitle[i]});
	    	}
			var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
	    	
	    	var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get('cookie2', 'test')).cookies(Flag.get('cookie1', 'test')).get();
	    	
	    	var text = String(subdoc.select("div.content").toArray()[0]).replace(/<br>/g, '\n').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').trim().replace(/^ +/gm,"").replace(/\n\n\n/g, '\n').replace(/\n\n\n/g, '\n');
	    	var repl = subdoc.select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, '');;
	    	
			Api.replyRoom("test","새공지!\n"+docnum[wantnum]+" : "+doctitle[wantnum]+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
			Api.replyRoom("푸드마켓","새공지!\n"+docnum[wantnum]+" : "+doctitle[wantnum]+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
		}
	}catch(e){
		Log.e(e+"\n"+e.stack+'\n');
	}
};
var NC = T.register("noticeCheck",()=>{
	while(true){
		java.lang.Thread.sleep(50*1000); //50초
		noticecheck();
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


own=function(obj){
	return Object.getOwnPropertyNames(Api);
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

