var reloadcheck = 0;
var stop = 0;
if(ObjKeep.get("reboottime")==null){
	ObjKeep.keep("reboottime",new Date().getTime());
}
var reloadtime = new Date().getTime();
var calculating = 0;
var D = require("DBManager.js")("D");
//cmd("chmod -R 777 /data/data/com.kakao.talk/databases");
//var K = require("KBManager.js")("/data/data/com.kakao.talk/databases/KakaoTalk2.db");
var T = require("ThreadManager.js");
var I = require("Interactive.js");
var control = D.selectForArray('control').map(v=>v[0]);
var controlPanel = D.selectForObject('control');
File = java.io.File;
function readFile(file) {
    var filedir = new java.io.File(file);
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
function reload(r) {
	if(r.sender == '봇배우는배주현' || r.sender == 'test'){
		reloadcheck = 1;
		reloadtime = new Date().getTime();
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
	    Api.replyRoom(r.room ,"파일저장 완료 / " + ((new Date() - Timer) / 1000) + "s\n" + new Date() );
	    T.interruptAll();
	    Api.reload();
	    reloadcheck = 0;
	    control = D.selectForArray('control').map(v=>v[0]);
	    controlPanel = D.selectForObject('control');
	    Api.replyRoom(r.room , "Response reloading 완료 / " + ((new Date() - Timer) / 1000) + "s\n" + new Date());
	    var functions = File("/sdcard/kbot/functions").listFiles();
	    for(var i in functions){
	    	eval(readFile(functions[i]));
	    }
	    Api.replyRoom(r.room , "Function reloading 완료 / " + ((new Date() - Timer) / 1000) + "s\n" + new Date());
	}
}
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
const funccList = ['!날씨', '!로또통계', '!종합로또통계', '!행복회로','/로또','!로또','!당첨','!메뉴','!식당','!맛집','!유튜브','!노래','!제이플라','!번역','!최근채팅','!전체채팅','!사진조회', '!사진삭제', '!사진목록', '!오버워치','!주사위','!공지','!명단','!업무','!방','!쓰레드','!디비','!건의','!블랙잭','!야구','!추첨'];
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function response(room, msg, sender, isGroupChat, replier, imageDB) {
	
	var r = { replier: replier, msg: msg, sender: sender, room: room, imageDB :imageDB};
	
	I.run(room, sender, msg);
	
	try {
		if (room == 'test' || room == '시립대 봇제작방') {
			if (msg.indexOf("]") == 0) {
				replier.reply(String(eval(msg.substring(1))).encoding());
				return;	
			}
			blankFunc(r);
		}
	} catch (e) {
        replier.reply( e + "\n" + e.stack);
	}
	
	try {
		blankFunc1(r);
		
		if (sender != "시립봇") {
			D.insert('chatdb', { time : time().hour+":"+time().minute+":"+time().second, name: sender, msg: msg, room : room});
		}
		
		if (msg == "사진을 보냈습니다."){
			saveImage(r);
		}
	
		if( msg.indexOf('주현') > -1 || msg.indexOf('피치') > -1 || msg.indexOf('\uc885\ud654') > -1 ){
			Api.replyRoom('test', room+ ' | ' + sender +'\n' + msg);
		}
	
		if( reloadcheck == 1  ){
			return;
		}
	
		var funcc = -1;
		
		for(var i in control){
			if( msg.indexOf(control[i]) == 0 ){
				funcc = i;
				break;
			}
		}
	
		if(funcc != -1){
			var work = controlPanel[funcc][room.replace(/ /g, '_')];
		}
		
		if( stop == 1 ){
			return;
		} 
		
		if ((msg.indexOf("!사진조회") == 0 && work == 1) || Flag.get('image', r.room)== 1){
			loadimage(r);
		}
		
		if (msg.indexOf("!사진목록") == 0 && work == 1){
			checkimage(r);
		}
		
		if (msg.indexOf("!사진삭제") == 0 && work == 1){
			deleteimage(r);
		}
		
		if (msg == '!로딩' && work == 1){
    		reload(r);
    		return;
	    }
		
		if (msg == '!리부트' && work == 1){
			replier.reply('Rebooting...');
			cmd('reboot');
	    }
		
		if ( msg.indexOf("!날씨") == 0 && work == 1) {
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
        
        if ( msg.indexOf("!전체채팅") == 0 && work == 1 && room != 'test'  && msg.indexOf(',') > 0 && msg.split(',').length == 3 && (msg.split(',')[2] == '시립대 단톡방' || msg.split(',')[2] =='시립대 전전컴 톡방'|| msg.split(',')[2] =='시립대 봇제작방')){
    		allchat(r);
    		return;
    	}
        
        if (msg.indexOf("!전체채팅") == 0 && work == 1) {
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
    	
        if( D.selectForArray('blackjack', 'name', 'room=?', room) == undefined || D.selectForArray('blackjack', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) == -1 ){
    		D.insert('blackjack', {name : sender  , room : room, point : 10000000, win : 0, lose : 0, push : 0 , ddl : 0, ddw : 0, ddp : 0, blackjack : 0 , even : 0 , evenc : 0, insurc : 0, insur : 0, splitc : 0 , split : 0, sur : 0, allp : 0, insurw : 0 , fexit : 0 , bpush : 0 });
    	}
        
        if( (msg == "!블랙잭" && work == 0) || (msg == "!블랙잭방" && work == 1) ){
    		replier.reply('https://open.kakao.com/o/grdPBAnb 로 입장해주세요. 중복되지 않는 자신만의 닉네임을 설정하셔야됩니다. 중복되는 닉네임으로 게임을 진핼할 경우 제재당할 수 있습니다.');
    		return;
    	}
        
        if ( (msg == "!블랙잭" && work == 1) || ( Flag.get('gameinfo', r.room) != 0 && (  !isNaN(msg) || msg == '참가' || msg == 'ㅊㄱ' || msg == '시작' || msg == 'ㅅㅈ'  || msg == '!블랙잭종료' || msg == '힛'|| msg == 'ㅎ' || msg == '스테이'|| msg == 'ㅅㅌㅇ'|| msg == '서렌더'|| msg == 'ㅅㄹㄷ'|| msg == '더블다운'|| msg == 'ㄷㅂㄷㅇ'|| msg == '스플릿'|| msg == 'ㅅㅍㄹ') )){
        	blackjack(r);
        }
        
        if(msg == '!블랙잭정보' && work == 1 ){
    		blackinform(r);
    		return;
    	}
        
        if(msg.indexOf('!블랙잭지급') == 0 && room == 'test' ){
        	givemoney(r);
        	return;
        }
    	
    	if(msg == '!블랙잭랭킹' && work == 1 ){
    		var i = 1;
    		replier.reply('전체 순위\n'+es+D.selectForArray('blackjack', ['name', 'point' , 'allp', 'win', 'blackjack', 'ddw', 'bpush', 'push', 'ddp', 'lose', 'ddl', 'sur', 'fexit'] , 'room=?', room, {orderBy:"point desc"}).map(v=> String(i++).extension(' ',2)+'. ' + String(v[1]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,").extension(' ',11)+'원' + ' - ' + String(v[0]).extensionRight('ㅤ',10) +'\n'+ '승 : ' + String( Math.floor((v[3]+v[4]+v[5]-v[6])/v[2]*1000)/10 ).extension(' ',2)+'% | 무 : ' + String( Math.floor((v[6]+v[7]+v[8])/v[2]*1000)/10 ).extension(' ',2)+'% | 패 : '+ String( Math.floor((v[9]+v[10]+v[11])/v[2]*1000)/10 ).extension(' ',2)+'% | 外 : ' +  String( Math.floor((v[12])/v[2]*1000)/10 ).extension(' ',2)+'%').join('\n\n').replace(/NaN%/g, 'X'));
    		return;
    	}
        
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if( D.selectForArray('baseball', 'name', 'room=?', room) == undefined || D.selectForArray('baseball', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) == -1){
    		D.insert('baseball', {name : sender, point : 100000, room : room, win : 0, lose : 0, solowin : 0, clear : 2});
    	}
        
    	if( (msg == "!야구" && work == 0) || msg == "!야구방" ){
    		replier.reply('https://open.kakao.com/o/gQwX2Shb 로 입장해주세요. 중복되지 않는 자신만의 닉네임을 설정하셔야됩니다. 중복되는 닉네임으로 게임을 진핼할 경우 제재당할 수 있습니다.');
    		return;
    	}
    	
    	if ((msg == "!야구" && work == 1) || ( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && ( !isNaN(msg) || msg == '참가' || msg == '시작' || msg == '!야구종료' || msg == '!힌트' || msg == '!패스') ) ){
        	baseball(r);
        }
    	
    	if( msg == "!전적초기화" && D.selectForArray('baseball', 'clear', 'room=? and name = ?', [room, sender]) > 0 && work == 1 ){
    		var point = D.selectForArray('baseball', 'point', 'room=? and name = ?', [room, sender])[0][0]-2000;
    		var clear = D.selectForArray('baseball', 'clear', 'room=? and name = ?', [room, sender])[0][0]-1;
    		D.update('baseball', {point : point, win : 0, lose : 0, solowin : 0, clear : clear}, 'name=? and room=?', [sender, room] );
    		replier.reply(sender+'님의 정보가 초기화 되었습니다.');
    		inform(r);
    		return;
    	}
    	
    	if(msg == '!야구정보' && work == 1 ){
    		inform(r);
    		return;
    	}
    	
    	if(msg == '!야구랭킹' && work == 1 ){
    		var i = 1;
    		replier.reply('전체 순위\n'+es+D.selectForArray('baseball', ['point', 'win', 'lose', 'solowin', 'name'], 'room=?', r.room, {orderBy:"point desc"}).map(v=> String(i++).extension(' ',2) +'. [' +String(v[0]).extension(' ',6)+'P '+String(v[1]).extension(' ',2)+'승 '+ String(v[2]).extension(' ',2)+'패 ' +String(v[3]).extension(' ',3)+'S/P ] ' +String(v[4])).join('\n'));
    		return;
    	}
    	
    	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	} catch (e) {
        Api.replyRoom("test", e + "\n" + e.stack);
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function controlReload(r){
	control = D.selectForArray('control').map(v=>v[0]);
	controlPanel = D.selectForObject('control');
	r.replier.reply('기능 리로드 완료');
}

function controlEdit(r){
	controlPanel = D.selectForObject('control');
	control = D.selectForArray('control').map(v=>v[0]);
	
	var temp = r.msg.split(',');
	var funcc = -1;
	for(var i in control){
		if( temp[1].indexOf(control[i]) == 0 ){
			funcc = i;
			break;
		}
	}
	
	if(funcc != -1){
		var tempf = controlPanel[funcc];
		if( temp[3] == 'on' ){
			tempf[temp[2].replace(/ /g, '_')] = 1;
		} else if ( temp[3] == 'off' ){
			tempf[temp[2].replace(/ /g, '_')] = 0;
		} else {
			r.replier.reply('잘못입력했습니다.');
			return;
		}
		D.update("control", tempf , "name=?", [control[funcc]]);
	} else {
		r.replier.reply('잘못입력했습니다.');
		return;
	}
	controlReload(r);
	r.replier.reply("수정 완료");
}

function givemoney(r){
	var data = r.msg.substr(7).split(',');
	var money = Number(data[0]);
	var who = data[1];
	var room = data[2];
	var temp = D.selectForArray('blackjack', 'point', 'name=? and room = ?', [who, room])[0][0];
	D.update('blackjack', {point: temp + money}, 'name=? and room = ?', [who, room]);
	r.replier.reply(room+'방의' + who+'님의 포인트변동\n'+ temp + ' → ' + D.selectForArray('blackjack', 'point', 'name=? and room = ?', [who, room])[0][0])
	Api.replyRoom(room, who+'님의 포인트변동\n'+ temp + ' → ' + D.selectForArray('blackjack', 'point', 'name=? and room = ?', [who, room])[0][0] );
}

function blackjacksum(temp){
	var sum = 0;
	var acount = 0;
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
			acount += 1;
			if(sum <= 11 && acount == 1) {
				temp[i] = 11;
			}
		} else if ( isNaN(temp[i])){
			temp[i] = 10; 
		}
	}
	var sum = 0;
	for(var i in temp) {
		sum+=Number(temp[i])
	}
	return sum;
}

function cloneObject(obj) {
	  return JSON.parse(JSON.stringify(obj));
	}


function blackjack(r){
	if( Flag.get('gameinfo', r.room) == 0 ){
		var gameinfo = {start : 0,start1 : 0,start2 : 0,start3 : 0,start4 : 0}
		Flag.set('gameinfo', r.room, gameinfo);
	} else {
		var gameinfo = Flag.get('gameinfo', r.room);
	}
	
	if( ( gameinfo.start == 1 || gameinfo.start1 == 1 || gameinfo.start2 ==  1 || gameinfo.start3 ==  1) && r.msg == '!블랙잭종료' ){
		for(var i in gameinfo.playerlist){
			var temppoint = D.selectForArray('blackjack', 'fexit', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
			D.update('blackjack', {fexit : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
			var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
			D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
		}
		if(gameinfo.splitdata.length > 0 ){
			var temppoint = D.selectForArray('blackjack', 'fexit', 'name=? and room=?', [gameinfo.splitdata[i].name, r.room])[0][0]+1;
			D.update('blackjack', {fexit : temppoint }, 'name=? and room=?', [gameinfo.splitdata[i].name, r.room] );
			var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.splitdata[i].name, r.room])[0][0]+1;
			D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.splitdata[i].name, r.room] );
		}
		var gameinfo = {start : 0,start1 : 0,start2 : 0,start3 : 0,start4 : 0}
		Flag.set('gameinfo', r.room, gameinfo);
		r.replier.reply('게임이 종료되었습니다. 새로운 게임이 가능합니다.');
		return;
	}
	
	if (gameinfo.start4 == 1){
		return;
	}

	if( r.msg == '!블랙잭'){
		if( gameinfo.start == 0 && gameinfo.start1 == 0 &&  gameinfo.start2 ==  0 &&  gameinfo.start3 ==  0 && D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] >= 10000  ){
			r.replier.reply('BLACKJACK 시작. 참가하려면 [참가]를 입력하세요. 시작하려면 [시작]을 입력하세요.\n[힛/스테이/더블다운/스플릿/서렌더]');
			var gameinfo = {starttime : new Date().getTime(),playerlist : [],betlist : [],insurlist : [],blackjacklist : [],splitdata : [],splitcount : 0,endcount : 0,start : 1,start1 : 0,start2 : 0,start3 : 0,start4 : 0};
			gameinfo.dealer = {card : [],sum : 0,state : 0};
			gameinfo.playerlist.push(r.sender);
			gameinfo.player0 = {name : r.sender,card : [],bet : 0,sum : 0,insurance : 0,state : 0,end : 0,splitcount : 0};
			Flag.set("gameinfo", r.room , gameinfo);
			r.replier.reply(r.sender+"님("+String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+')이 참가합니다. 현재 1명');
		}else if( D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] < 10000 ){
			r.replier.reply('포인트가 부족합니다.')
		}
		else {
			r.replier.reply('게임이 진행중입니다.');
			return;
		}
	}
	
	if(gameinfo.start == 0 && gameinfo.start1 == 0 &&  gameinfo.start2 ==  0 &&  gameinfo.start3 ==  0){
		return;
	}
	
	if ( (r.msg == '참가' || r.msg == 'ㅊㄱ') &&  gameinfo.start == 1 && gameinfo.playerlist.indexOf(r.sender) == -1 ){//참가모집중
        if( D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] >= 10000 ){
    		gameinfo['player'+gameinfo.playerlist.length] = {name : r.sender,card : [],bet : 0,sum : 0,insurance : 0,state : 0,end : 0,splitcount : 0}
        	gameinfo.playerlist.push(r.sender);
            r.replier.reply(r.sender+"님("+String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+")이 참가합니다. 현재 "+gameinfo.playerlist.length+'명');
        } else if (D.selectForArray('blackjack', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] < 10000 ){
        	r.replier.reply('포인트가 부족합니다.');
        	return;
        }
    }
	
	if ( gameinfo.start == 1 && (gameinfo.playerlist.length == 5 || ((r.msg == '시작' || r.msg == 'ㅅㅈ')  && gameinfo.playerlist.indexOf(r.sender) > -1 )) ){
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
		r.replier.reply(gameinfo.playerlist.length+'명이 참가합니다. 게임시작!\n1만원 ~ 50만원 배팅하세요.');	
	}
	
	if(gameinfo.playerlist.length > 0){
		var num = gameinfo.playerlist.indexOf(r.sender);
	}
	
	if( num == -1 ){
		return;
	}
	
	if( gameinfo.start1 == 1 &&  gameinfo.betlist.length < gameinfo.playerlist.length && /^\d+$/.test(r.msg) && gameinfo.betlist.indexOf(r.sender) == -1 && gameinfo['player'+num].bet == 0){
		if ( (Number(r.msg)>9999 && Number(r.msg)<500001) || (Number(r.msg)>0 && Number(r.msg)<51)){
			if(Number(r.msg)>0 && Number(r.msg)<51){
				r.msg = Number(r.msg*10000);
			}
			for( var j = 0 ; j < 2 ; j++){
				var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
				gameinfo['player'+num].card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			}
			gameinfo['player'+num].bet = Number(r.msg);
			gameinfo.betlist.push(r.sender);
			r.replier.reply(gameinfo['player'+num].name+'님이 '+String(gameinfo['player'+num].bet).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'원을 배팅.  ('+gameinfo.betlist.length+'/'+gameinfo.playerlist.length+')');
		} else {
			r.replier.reply('배팅금은 1만원 ~ 50만원 입니다.');
		}
	}
	
	if( gameinfo.betlist.length == gameinfo.playerlist.length && gameinfo.start1==1){
		var str = '';
		for( var i in gameinfo.playerlist){
			var temp = gameinfo['player'+i].card.map(v=>v[1]);
			var sum = blackjacksum(temp);
			gameinfo['player'+i].sum = sum;
		}
		str += '딜러의 카드 : ' + gameinfo.dealer.card[0].join(' ') + ' | ? \n';
		for( var i in gameinfo.playerlist){
			str += gameinfo['player'+i].name+'의 카드 : ' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ') + '\n';
		}
		r.replier.reply(str.trim());
		for( var i in gameinfo.playerlist){
			if(gameinfo['player'+i].sum == 21){
				gameinfo['player'+i].state = 4;
				gameinfo.blackjacklist.push(gameinfo['player'+i].name);
				gameinfo.endcount +=1;
				var temp = D.selectForArray('blackjack', 'blackjack', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
				D.update('blackjack', {blackjack : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				r.replier.reply(gameinfo['player'+i].name + '님의 BlackJack!'+'  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')');
			}
		}
		if(gameinfo.dealer.card[0][1] == 'A'){
			for(var i in gameinfo.playerlist){
				var temp = D.selectForArray('blackjack', 'insurc', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
				D.update('blackjack', {insurc : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
			}
			r.replier.reply('Insurance를 하려면 1을, 안하려면 0을 입력하세요.');
			if(gameinfo.blackjacklist.length > 0){
				for(var i in gameinfo.blackjacklist){
					var temp = D.selectForArray('blackjack', 'evenc', 'name=? and room=?', [gameinfo.blackjacklist[i], r.room])[0][0]+1;
					D.update('blackjack', {evenc : temp }, 'name=? and room=?', [gameinfo.blackjacklist[i], r.room] );
				}
				r.replier.reply('BlackJack인 분 중 EvenMoney를 하려면 1을, 안하려면 0을 입력하세요.');
			}
			gameinfo.start1 = 0;
			gameinfo.start3 = 1;
		} else if( gameinfo.dealer.card[0][1] == '10' ||gameinfo.dealer.card[0][1] == 'J' ||gameinfo.dealer.card[0][1] == 'Q' ||gameinfo.dealer.card[0][1] == 'K' ){
			var temp = gameinfo.dealer.card.map(v=>v[1]);
			var sum = blackjacksum(temp);
			if(sum == 21 ){
				gameinfo.dealer.sum = sum;
				gameinfo.dealer.state = 1;
				var str = '';
				var str1 = '';
				gameinfo.start4 = 1;
				java.lang.Thread.sleep(1500);
				gameinfo.start4 = 0;
				str += '딜러의 BlackJack!\n';
				str += '⤷[' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + '] ('+gameinfo.dealer.sum +')';
				r.replier.reply( str );
				var str = '';
				for( var i in gameinfo.playerlist){
					var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
					var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room] )[0][0];
					if(gameinfo['player'+i].sum == 21 && gameinfo['player'+i].state == 4){
						str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						var temppoint = temppoint1;
						var temp = D.selectForArray('blackjack', 'bpush', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
						D.update('blackjack', {bpush : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
					} else {
						str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
						var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
						D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
					}
					D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
					str1 += gameinfo['player'+i].name+'\n'+String(temppoint1).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+' → ' + String(temppoint).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n';
				}
				gameinfo.start1 = 0;
				gameinfo.start3 = 0;
				r.replier.reply( str.trim() + '\n\n' + str1.trim() );
			} else {
				r.replier.reply('딜러는 BlackJack이 아닙니다.');
				gameinfo.start1 = 0;
				gameinfo.start2 = 1;
			}
		} else {
			gameinfo.start1 = 0;
			gameinfo.start2 = 1;
		}
	}
	
	if ( gameinfo.start3 == 1 && !isNaN(r.msg) && gameinfo.playerlist.indexOf(r.sender) != -1 && gameinfo.insurlist.length < gameinfo.playerlist.length  ){
		if( r.msg == 0 || r.msg == 1 ){
			gameinfo.insurlist.push(r.sender);
			gameinfo['player'+num].insurance = r.msg;
			if(r.msg != '0'){
				if (gameinfo.blackjacklist.indexOf(r.sender) == -1 ){
					var temp = D.selectForArray('blackjack', 'insur', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
					D.update('blackjack', {insur : temp }, 'name=? and room=?', [gameinfo['player'+num].name , r.room] );
					r.replier.reply(gameinfo['player'+num].name+'님의 Insurance ('+gameinfo.insurlist.length + ' / ' +  gameinfo.playerlist.length+')');
				} else{
					var temp = D.selectForArray('blackjack', 'even', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
					D.update('blackjack', {even : temp }, 'name=? and room=?', [gameinfo['player'+num].name, r.room] );
					r.replier.reply(gameinfo['player'+num].name+'님의 EvenMoney ('+gameinfo.insurlist.length + ' / ' +  gameinfo.playerlist.length+')');
				}
			} else if ( r.msg == '0'){
				r.replier.reply('('+gameinfo.insurlist.length + ' / ' +  gameinfo.playerlist.length+')');
			}
			if(gameinfo.insurlist.length == gameinfo.playerlist.length){
				var str = '';
				var str1 = '';
				var temp = gameinfo.dealer.card.map(v=>v[1]);
				var sum = blackjacksum(temp);
				if(sum == 21 ){
					gameinfo.dealer.sum = sum;
					gameinfo.dealer.state = 1;
					gameinfo.start4 = 1;
					java.lang.Thread.sleep(1500);
					gameinfo.start4 = 0;
					str += '딜러의 BlackJack!\n';
					str += '딜러 ('+gameinfo.dealer.sum +')\n⤷[' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + ']\n';
					for( var i in gameinfo.playerlist){
						if( gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 1){
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : EvenMoney\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						} else if( gameinfo['player'+i].state == 4){
							var temp = D.selectForArray('blackjack', 'bpush', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {bpush : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : BlackJack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						} else {
							var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						}
					}
					for(var i in gameinfo.playerlist){
						var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
						D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						var temp = D.selectForArray('blackjack', 'insurw', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
						D.update('blackjack', {insurw : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room] )[0][0];
						if (gameinfo['player'+i].insurance == 1 && gameinfo.blackjacklist.indexOf(r.sender) != -1) {//블랙잭 & 이븐머니
							var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
						} else if (gameinfo['player'+i].insurance == 0 && gameinfo.blackjacklist.indexOf(r.sender) == -1) {//블랙잭x & 보험x
							var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
						} else {//블랙잭 x & 보험 o -> 본전
							var temppoint = temppoint1
						}
						D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						str1 += gameinfo['player'+i].name+'\n'+String(temppoint1).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(temppoint).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n';
					}
					gameinfo.start1 = 0;
					gameinfo.start3 = 0;
					r.replier.reply( str.trim() + '\n\n' + str1.trim() );
				} else {
					str1 += '딜러는 BlackJack이 아닙니다.\n'
					for(var i in gameinfo.playerlist){
						var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room] )[0][0];
						if (gameinfo['player'+i].insurance == 1 && gameinfo.blackjacklist.indexOf(r.sender) != -1) {//블랙잭 & 이븐머니
							var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
						} else if (gameinfo['player'+i].insurance == 1 && gameinfo.blackjacklist.indexOf(r.sender) == -1) {//블랙잭x & 보험o -> 보험금 잃음
							var temppoint = temppoint1-Number(gameinfo['player'+i].bet/2);
						} else {//그 외 그대로진행
							var temppoint = temppoint1
						}
						D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						str1 += '\n'+gameinfo['player'+i].name+'\n'+String(temppoint1).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(temppoint).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n';
					}
					str1 += '\n딜러의 카드 : ' + gameinfo.dealer.card[0].join(' ') + ' | ? \n';
					for( var i in gameinfo.playerlist){
						str1 += gameinfo['player'+i].name+'의 카드 : ' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ') + '\n';
					}
					r.replier.reply( str1.trim() );
					gameinfo.start1 = 0;
					gameinfo.start3 = 0;
					gameinfo.start2 = 1;
				}
			}
		} else {
			r.replier.reply('0 : 동의 안함 | 1 : 동의함');
		}
	}
	
	if( gameinfo.start2 == 1 && gameinfo.playerlist.length > 0  && num != -1 && gameinfo['player'+num].state == 0 ){
		if( r.msg == '서렌더' || r.msg == 'ㅅㄹㄷ'){
			var temp = gameinfo['player'+num].card.map(v=>v[1]);
			var sum = blackjacksum(temp);
			gameinfo['player'+num].sum = sum;
			gameinfo['player'+num].state = 5;
			gameinfo['player'+num].end = 1;
			gameinfo.endcount +=1;
			r.replier.reply(gameinfo['player'+num].name+'님의 Surrender'+'  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')');
		}
		
		if( (r.msg == '힛' || r.msg == 'ㅎ') && gameinfo['player'+num].state == 0 && gameinfo['player'+num].state==0 ) {
			var str = '';
			var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
			gameinfo['player'+num].card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			var temp = gameinfo['player'+num].card.map(v=>v[1]);
			var sum = blackjacksum(temp);
			str += gameinfo['player'+num].name+'의 카드\n' + gameinfo['player'+num].card.map(v=>v.join(' ')).join(' | ');
			if(sum > 21){
				gameinfo['player'+num].state = 1;
				gameinfo.endcount +=1;
				gameinfo['player'+num].sum = sum;
				gameinfo['player'+num].end = 1;
				str += '\n'+gameinfo['player'+num].name+'님의 Bust';
				str += '  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')';
			} else if ( sum == 21){
				gameinfo['player'+num].sum = sum;
				gameinfo.endcount +=1;
				gameinfo['player'+num].state = 2;
				gameinfo['player'+num].end = 1;
				str += '\n'+gameinfo['player'+num].name+'님의 Stay';
				str += '  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')';
			}
			r.replier.reply(str);
		}
		if( r.msg == '더블다운' || r.msg == 'ㄷㅂㄷㅇ' ){
			if(gameinfo['player'+num].card.length==2){
				var str = gameinfo['player'+num].name+'님의 DoubleDown\n';
				gameinfo['player'+num].state = 6;
				var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
				gameinfo['player'+num].card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
				var temp = gameinfo['player'+num].card.map(v=>v[1]);
				var sum = blackjacksum(temp);
				gameinfo['player'+num].sum = sum;
				gameinfo.endcount +=1;
				if(sum > 21){
					str += gameinfo['player'+num].name+'의 카드\n' + gameinfo['player'+num].card.map(v=>v.join(' ')).join(' | ')+'\n'+ gameinfo['player'+num].name+'님의 Bust.';
					str += '  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')';
					gameinfo['player'+num].state = 7;
					gameinfo['player'+num].end = 1;
				} else {
					str += gameinfo['player'+num].name+'의 카드\n' + gameinfo['player'+num].card.slice(0,2).map(v=>v.join(' ')).join(' | ') + ' | ?';
					str += '  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')';
					gameinfo['player'+num].end = 1;
				}
				r.replier.reply(str);
			} else{
				r.replier.reply('DoubleDown이 불가능합니다.');
				return;
			}
		}
		if( (r.msg == 'ㅅㅌㅇ' || r.msg == '스테이')  && gameinfo['player'+num].state==0 ){
			var temp = gameinfo['player'+num].card.map(v=>v[1]);
			var sum = blackjacksum(temp);
			gameinfo['player'+num].sum = sum;
			gameinfo['player'+num].state = 2;
			gameinfo['player'+num].end = 1;
			gameinfo.endcount +=1;
			r.replier.reply(gameinfo['player'+num].name+'님의 Stay'+'  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')');
		}
	}
	
	if(gameinfo['player'+num].card.length == 2 &&gameinfo['player'+num].card[0][1] == gameinfo['player'+num].card[1][1] && gameinfo['player'+num].splitcount < 3 ){
		if( gameinfo['player'+num].end == 0 ) {
			var temp = D.selectForArray('blackjack', 'splitc', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
			D.update('blackjack', {splitc : temp }, 'name=? and room=?', [gameinfo['player'+num].name, r.room] );
		}
		if( r.msg == '스플릿' || r.msg == 'ㅅㅍㄹ' ){
			var temp = D.selectForArray('blackjack', 'split', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
			D.update('blackjack', {split : temp }, 'name=? and room=?', [gameinfo['player'+num].name, r.room] );
			if(gameinfo['player'+num].card[0][1] == 'A' && gameinfo['player'+num].splitcount == 0){
				gameinfo['player'+num].splitcount += 3;
			} else if (gameinfo['player'+num].card[0][1] == 'A'){
				r.replier.reply('스플릿이 불가능합니다');
				return;
			} else {
				gameinfo['player'+num].splitcount+= 1;
			}
			gameinfo.splitcount += 1;
			var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
			gameinfo.splitdata.push({
					name : r.sender,
					card : [gameinfo['player'+num].card.splice(1,1)[0], Flag.get('cards', r.room).splice(rand,1)[0]],
					bet : gameinfo['player'+num].bet,
					sum : 0,
					insurance : 0,
					state : 0,
					splitcount : gameinfo['player'+num].splitcount,
					end : 0
				})
			for(var i in gameinfo.splitdata.filter(v=>v.name == r.sender)){
				gameinfo.splitdata.filter(v=>v.name == r.sender)[i].splitcount = gameinfo['player'+num].splitcount;
			}
			var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
			gameinfo['player'+num].card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			var str = '';
			str += r.sender+'님의 Split  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')\n';
			str += gameinfo['player'+num].name+'의 카드 : ' + gameinfo['player'+num].card.map(v=>v.join(' ')).join(' | ');
			var temp = gameinfo['player'+num].card.map(v=>v[1]);
			var sum = blackjacksum(temp);
			gameinfo['player'+num].sum = sum;
			if(gameinfo['player'+num].sum == 21){
				gameinfo['player'+num].state = 2;
				gameinfo.endcount +=1;
				gameinfo['player'+num].end = 1;
				str += '\n'+gameinfo['player'+num].name + '님의 Stay!'+'  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')';
				r.replier.reply(str);
				while(1){
					if(gameinfo['player'+num].end == 1 && gameinfo.splitdata.filter(v=>v.name == r.sender).filter(v=>v.end == 0)[0].end == 0){
						gameinfo.splitdata.push( cloneObject(gameinfo['player'+num]) );
						gameinfo['player'+num]= null;
						gameinfo['player'+num]= cloneObject(gameinfo.splitdata.filter(v=>v.name == r.sender).filter(v=>v.end == 0)[0]);
						var temp = [];
						var breakc = 0;
						for(var i in gameinfo.splitdata){
							if( gameinfo.splitdata[i].name == r.sender && breakc == 0){
								breakc += 1;
							} else {
								temp.push(gameinfo.splitdata[i])
							}
						}
						gameinfo.splitdata = temp;
						var str = '';
						str += gameinfo['player'+num].name+'의 카드\n' + gameinfo['player'+num].card.map(v=>v.join(' ')).join(' | ');
						var temp = gameinfo['player'+num].card.map(v=>v[1]);
						var sum = blackjacksum(temp);
						gameinfo['player'+num].sum = sum;
						if(gameinfo['player'+num].sum == 21){
							gameinfo['player'+num].state = 2;
							gameinfo.endcount +=1;
							gameinfo['player'+num].end = 1;
							str += '\n'+gameinfo['player'+num].name + '님의 Stay!'+'  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')';
							r.replier.reply(str);
						} else {
							r.replier.reply(str);
							break;
						}
					} else {
						break;
					}
				}
			} else {
				r.replier.reply(str);
			}
		}
	} else if ( (r.msg == '스플릿' || r.msg == 'ㅅㅍㄹ') && gameinfo['player'+num].splitcount > 3) {
		r.replier.reply('Split을 더 이상 할 수 없습니다.');
		return;
	} else if ( r.msg == '스플릿' || r.msg == 'ㅅㅍㄹ') {
		r.replier.reply('Split을 할 수 있는 패가 아닙니다.');
		return;
	}
	
	if( gameinfo.splitdata.filter(v=>v.name == r.sender).filter(v=>v.end == 0).length > 0 && gameinfo['player'+num].state > 0 ){
		while(1){
			if(gameinfo['player'+num].end == 1 && gameinfo.splitdata.filter(v=>v.name == r.sender).filter(v=>v.end == 0).length > 0 ){
				gameinfo.splitdata.push( cloneObject(gameinfo['player'+num]) );
				gameinfo['player'+num]= null;
				gameinfo['player'+num]= cloneObject(gameinfo.splitdata.filter(v=>v.name == r.sender).filter(v=>v.end == 0)[0]);
				var temp = [];
				var breakc = 0;
				for(var i in gameinfo.splitdata){
					if( gameinfo.splitdata[i].name == r.sender && breakc == 0){
						breakc += 1;
					} else {
						temp.push(gameinfo.splitdata[i])
					}
				}
				gameinfo.splitdata = temp;
				var str = '';
				str += gameinfo['player'+num].name+'의 카드\n' + gameinfo['player'+num].card.map(v=>v.join(' ')).join(' | ');
				var temp = gameinfo['player'+num].card.map(v=>v[1]);
				var sum = blackjacksum(temp);
				gameinfo['player'+num].sum = sum;
				if(gameinfo['player'+num].sum == 21){
					gameinfo['player'+num].state = 2;
					gameinfo.endcount +=1;
					gameinfo['player'+num].end = 1;
					str += '\n'+gameinfo['player'+num].name + '님의 Stay!';
					str += '  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')'
					r.replier.reply(str);
				} else {
					r.replier.reply(str);
					break;
				}
			} else {
				break;
			}
		}
	}
	
	if( gameinfo.endcount == (gameinfo.playerlist.length + gameinfo.splitcount) && gameinfo.start2 == 1){
		blackjackend(r, gameinfo);
	}
}

function blackjackend(r, gameinfo){
	r.replier.reply('게임종료!');
	gameinfo.start4 = 1;
	java.lang.Thread.sleep(1500);
	gameinfo.start4 = 0;
	while(1){
		var str = '';
		var temp = gameinfo.dealer.card.map(v=>v[1]);
		var sum = blackjacksum(temp);
		gameinfo.dealer.sum = sum;
		str += '딜러의 카드 ('+gameinfo.dealer.sum +')\n⤷[' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + ']';
		if(sum > 21){
			str += '\n딜러의 Bust';
		}
		r.replier.reply(str);
		gameinfo.start4 = 1;
		java.lang.Thread.sleep(2000);
		gameinfo.start4 = 0;
		if(sum < 17){
			var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
			gameinfo.dealer.card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
		} else{
			gameinfo.dealer.sum = sum;
			break;
		}
	}
	var str = '';
	if (gameinfo.dealer.state == 0){
		if( gameinfo.dealer.sum > 21 ){
			for( var i in gameinfo.playerlist){
				var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0];
				if(gameinfo['player'+i].state == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 0){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet*1.5);
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : EvenMoney\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
				} else if (gameinfo['player'+i].state == 5){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Surrender\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet/2);
					var temp = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {sur : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo['player'+i].state == 6){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownWin\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet * 2);
					var temp = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {ddw : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo['player'+i].state == 7){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownLose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet * 2);
					var temp = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {ddl : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else {
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Win\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {win : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				}
				D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				str += String(temppoint1).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
				if( gameinfo['player'+i].splitcount > 0 ){
					var temp = gameinfo.splitdata.filter(v=>v.name == gameinfo['player'+i].name);
					for(var j in temp) {
						var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [temp[j].name, r.room])[0][0];
						if(temp[j].state == 1){
							str += temp[j].name+'님 ('+temp[j].sum+') : Lose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {lose : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if (temp[j].state == 4 && temp[j].insurance == 0){
							str += temp[j].name+'님 ('+temp[j].sum+') : Blackjack\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet*1.5);
						} else if (temp[j].state == 4 && temp[j].insurance == 1 ){
							str += temp[j].name+'님 ('+temp[j].sum+') : EvenMoney\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
						} else if (temp[j].state == 5){
							str += temp[j].name+'님 ('+temp[j].sum+') : Surrender\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet/2);
							var tempc = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {sur : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if (temp[j].state == 6){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownWin\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet * 2);
							var tempc = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {ddw : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if (temp[j].state == 7){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownLose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet * 2);
							var tempc = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {ddl : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else {
							str += temp[j].name+'님 ('+temp[j].sum+') : Win\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {win : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						}
						D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						str += String(temppoint1).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
					}
				}
			}
		} else if( gameinfo.dealer.sum < 22 ){
			var even = 0;
			for( var i in gameinfo.playerlist){
				var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0];
				if(gameinfo['player'+i].state == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo['player'+i].state == 5){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Surrender\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet/2);
					var temp = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {sur : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				}  else if (gameinfo['player'+i].state == 6 && gameinfo.dealer.sum < gameinfo['player'+i].sum){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownWin\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet*2);
					var temp = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {ddw : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo['player'+i].state == 6 && gameinfo.dealer.sum == gameinfo['player'+i].sum){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownPush\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var temp = D.selectForArray('blackjack', 'ddp', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {ddp : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if ((gameinfo['player'+i].state == 6 && gameinfo.dealer.sum > gameinfo['player'+i].sum) || gameinfo['player'+i].state == 7 ){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownLose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet*2);
					var temp = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {ddl : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 0){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet*1.5);
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : EvenMoney\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var even = D.selectForArray('blackjack', 'bet', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0];
				} else if (gameinfo['player'+i].state == 4 && gameinfo.dealer.sum == gameinfo['player'+i].sum) {
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var temp = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {push : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if( gameinfo.dealer.sum < gameinfo['player'+i].sum && gameinfo['player'+i].state != 1 ){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Win\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {win : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else if (gameinfo.dealer.sum == gameinfo['player'+i].sum){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var temp = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {push : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				} else {
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
					D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
				}
				D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				str += String(Number(temppoint1-even)).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
				var even = 0;
				if( gameinfo['player'+i].splitcount > 0 ){
					var temp = gameinfo.splitdata.filter(v=>v.name == gameinfo['player'+i].name);
					for(var j in temp) {
						var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [temp[j].name, r.room])[0][0];
						if(temp[j].state == 1){
							str += temp[j].name+'님 ('+temp[j].sum+') : Lose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {lose : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if (temp[j].state == 5) {
							str += temp[j].name+'님 ('+temp[j].sum+') : Surrender\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet/2);
							var tempc = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {sur : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						}  else if (temp[j].state == 6 && gameinfo.dealer.sum < temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownWin\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet*2);
							var tempc = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {ddw : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if (temp[j].state == 6 && gameinfo.dealer.sum == temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownPush\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
							var tempc = D.selectForArray('blackjack', 'ddp', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {ddp : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if ( (temp[j].state == 6 && gameinfo.dealer.sum > temp[j].sum ) || temp[j].state == 7){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownLose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet*2);
							var tempc = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {ddl : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						}  else if (temp[j].state == 4 && temp[j].insurance == 0){
							str += temp[j].name+'님 ('+temp[j].sum+') : Blackjack\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet*1.5);
						} else if (temp[j].state == 4 && temp[j].insurance == 1 ){
							str += temp[j].name+'님 ('+temp[j].sum+') : EvenMoney\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var even = D.selectForArray('blackjack', 'bet', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0];
							var temppoint = temppoint1;
						} else if (gameinfo['player'+i].state == 4 && gameinfo.dealer.sum == gameinfo['player'+i].sum) {
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
							var tempc = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {push : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if( gameinfo.dealer.sum < temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : Win\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {win : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else if (gameinfo.dealer.sum == temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : Push\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
							var tempc = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {push : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						} else {
							str += temp[j].name+'님 ('+temp[j].sum+') : Lose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
							D.update('blackjack', {lose : tempc }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
						}
						D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						str += String(Number(temppoint1-even)).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
					}
				}
			}
		}
	}
	
	for(var i in gameinfo.playerlist){
		var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.playerlist[i], r.room])[0][0]+1;
		D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.playerlist[i], r.room] );
	}
	
	for(var i in gameinfo.splitdata){
		var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.splitdata[i].name, r.room])[0][0]+1;
		D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.splitdata[i].name, r.room] );
	}
	
	r.replier.reply( str.trim() );
	gameinfo.start2 = 0;
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
	if(r.msg.length < 7 ){
		r.replier.reply("건의가 너무 짧습니다.");
	}else{
		Api.replyRoom('test', r.room+" : "+r.sender+" : "+r.msg.substr(4));
		r.replier.reply(r.sender+"님의 건의가 접수되었습니다.");
	}
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
	for(var i in funccList) {
        if( str.indexOf(funccList[i]) > -1 ) {
        	if( Math.floor( str1.length / 20) == j){
        		str1 += '\n';
        		j+=1;
        	}
        	str1 += funccList[i] + ' / ';
        }
	}
	str1 += '\n';
	str1 = str1.split(' / \n').join('\n');
	return str1;
}

function jfla(r){
	var list=org.jsoup.Jsoup.connect('https://www.youtube.com/user/JFlaMusic/videos?view=0&sort=dd&shelf_id=0').get().select('a:contains(cover by)').toArray().map(v=>v.text()+'\n'+v.attr("abs:href"));
	r.replier.reply(list[0]);
	r.replier.reply('더보기'+es+'\n'+'노래 전체 모음\nhttps://music.youtube.com/playlist?list=PLrJ-VGAeEn8gzjavY0PXwGsMssB1DTUx7\n\n최근 목록\n'+list.slice(1).join('\n\n'));
}

function isread (is) {
    var br = new java.io.BufferedReader(new java.io.InputStreamReader(is));
    var readStr = "";
    var str = null;
    while (((str = br.readLine()) != null)) {
        readStr += str + "\n";
    }
    br.close();
    return readStr.trim();
}

function cmd(dir){
	var p = java.lang.Runtime.getRuntime().exec('su -c ""'+dir+'""');
    p.waitFor();
    var r = p.getInputStream() || p.getErrorStream();
    return isread(r);
}

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
	hour1 = hour1 < 10 ? '0' + hour1 : hour1;
	
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	
	var now = year + '년 ' + month + '월 ' + date + '일 ' + day + ' ' + hour1 + ':' + minute + ':' + second + ' ' + ampm;
	
	return { now : now , year : year, month : month , date : date, day : day, hour : hour , minute : minute , second : second, ampm : ampm , hour1: hour1};
}

function compare(a, b) {
    return a - b;
}

function saveImage(r) {
    if (r.imageDB.getImage()) {
        var i = String(r.imageDB.getImage());
        var file = 'storage/emulated/0/KakaoTalkDownload/'+r.sender.replace(/ /g, '')+"."+r.room.replace(/ /g, '')+"-"+time().year+"."+time().month+"."+time().date+time().day+"."+time().hour+"."+time().minute+"."+time().second+".jpg";
    	write64(file, i);
    	Api.replyRoom('test', 'Image saved|'+r.room+'-'+r.sender);
    }
}


own=function(obj){
	return Object.getOwnPropertyNames(obj);
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

/*
function calculator(r){
	var temp = eval(r.msg.substr(1).replace(/[^0-9*\-+%/*=\^&|!.~{}()[\]]/g, ""));
	if(temp!=undefined){
		r.replier.reply(temp);
	}
}

const es=String.fromCharCode(8237).repeat(500);
//a.charCodeAt(0)
const weiredstring1=String.fromCharCode(8203);//공백
const weiredstring2=String.fromCharCode(160);//띄워쓰기로
const weiredstring3=String.fromCharCode(8237);//공백
const weiredstring4=String.fromCharCode(8197);//띄워쓰기로
//replace(new RegExp(weiredstring1, "gi"), "")


]D.execSQL("alter table control add BASEBALL number")
]D.update("control", {BASEBALL:0})
]D.selectForString('control')
]D.update('control' , {name :'!계산',  시립대_단톡방 : 1, 시립대_전전컴_톡방 : 1, 오버워치 : 1, 시립대_자취생_생정 : 1, test :1, 단톡방 : 1, 짱구 : 1, 시립대_봇제작방 : 1, 푸드마켓 :1, 공익 : 1, BASEBALL : 0}, "name='!계산'")
]D.insert('control' , {name :'!온오프',  시립대_단톡방 : 0, 시립대_전전컴_톡방 : 0, 오버워치 : 0, 시립대_자취생_생정 : 0, test :1, 단톡방 : 0, 짱구 : 0, 시립대_봇제작방 : 0, 푸드마켓 :0, 공익 : 0, BASEBALL : 0})
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
*/