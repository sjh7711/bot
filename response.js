var reloadcheck = 0;
var stop = 0;
File = java.io.File;
if(ObjKeep.get("reboottime")==null){
	ObjKeep.keep("reboottime",new Date().getTime());
}
var reloadtime = new Date().getTime();
var calculating = 0;
var D = require("DBManager.js")("D");
var T = require("ThreadManager.js");
var I = require("Interactive.js");
var control = D.selectForArray('control').map(v=>v[0]);
var controlPanel = D.selectForObject('control');
const es=String.fromCharCode(8237).repeat(500);
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
function writeFile(file, str) {
    var filedir = new java.io.File("/sdcard/kbotbackup/" + file);
    try {
        var bw = new java.io.BufferedWriter(new java.io.FileWriter(filedir));
        bw.write(str.toString());
        bw.close();
    }
    catch (e) {
        Log.e(e + "\n" + e.stack);
        throw e;
    }
}
function backup(r){
	var folder = time().now.replace(/ /g, '_');
	File('/sdcard/kbotbackup/'+folder).mkdir();
	var backup = File("/sdcard/kbot/functions").listFiles();
	for (var i in backup){
		writeFile(folder+'/'+String(backup[i]).substr(23)+'_'+time().now.replace(/ /g, '_'), readFile(backup[i]));
	}
	var response = "/sdcard/kbot/response.js";
	writeFile(folder+'/'+'response.js_'+time().now.replace(/ /g, '_'), readFile(response));
	Api.replyRoom(r.room, '전체 Backup 완료');
}

var funccheck = 0;
if(funccheck == 0 ){
	T.interruptAll();
	for(var i in File("/sdcard/kbot/functions").listFiles()){eval( readFile(File("/sdcard/kbot/functions").listFiles()[i]))};
	funccheck = 1;
}
function freload(r){
	backup(r);
	T.interruptAll();
	for(var i in File("/sdcard/kbot/functions").listFiles()){eval( readFile(File("/sdcard/kbot/functions").listFiles()[i]))}
	Api.replyRoom(r.room , "Function reloading 완료");
}

function reload(r) {
	if(r.sender == '봇배우는배주현' || r.sender == 'test'){
		backup(r);
		var Timer = new Date();
		Api.replyRoom(r.room , "Reloading Start\n" + new Date() );
		reloadcheck = 1;
		reloadtime = new Date().getTime();
	    T.interruptAll();
	    Api.reload();
	    reloadcheck = 0;
	    control = D.selectForArray('control').map(v=>v[0]);
	    controlPanel = D.selectForObject('control');
	    Api.replyRoom(r.room , "Reloading End / " + ((new Date() - Timer) / 1000) + "s\n" + new Date() );
	}
}

function blankFunc(r){}
function blankFunc1(r){}

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

function functionreload (r){
	if(r.sender == 'test' || r.sender == '봇배우는배주현'){
		if(Flag.get('freloadcheck', r.room)==0){
			Flag.set('function', r.room, File("/sdcard/kbot/functions").listFiles());
			var temp = [];
			for(var i in Flag.get('function', r.room)){
				if(String(Flag.get('function', r.room)[i]).indexOf(r.msg.substr(6))>-1) {
					temp.push(Flag.get('function', r.room)[i]);
				}
			}
			if(temp.length == 0){
				r.replier.reply('검색결과가 없습니다.');
				return;
			}
			Flag.set('function', r.room, temp);
			var i = 1;
			r.replier.reply('함수 개수 : '+Flag.get('function', r.room).length+'\n번호를 선택하세요.\n'+Flag.get('function', r.room).map(v=> (i++)+'. ' + String(v).substr(23)).join('\n'));
			Flag.set('freloadcheck', r.room, 1);
		} else if ( Flag.get('freloadcheck', r.room)== 1){
			if(!isNaN(r.msg)){
				var folder = time().now.replace(/ /g, '_');
				File('/sdcard/kbotbackup/'+folder).mkdir();
				var backup = Flag.get('function', r.room)[Number(r.msg)-1];
				writeFile(folder+'/'+String(Flag.get('function', r.room)[Number(r.msg)-1]).substr(23)+'_'+time().now.replace(/ /g, '_'), readFile(backup));
				Api.replyRoom(r.room, String(Flag.get('function', r.room)[Number(r.msg)-1]).substr(23)+' Backup 완료');
				eval( readFile(Flag.get('function', r.room)[Number(r.msg)-1] ));
				r.replier.reply(String(Flag.get('function', r.room)[Number(r.msg)-1]).substr(23) + ' Reloading 완료');
				Flag.set('freloadcheck', r.room, 0);
			} else {
				r.replier.reply('숫자를 입력하세요.');
				Flag.set('freloadcheck', r.room, 0);
			}
		}
	}
}

function saveImage(r) {
    if (r.imageDB.getImage()) {
        var i = String(r.imageDB.getImage());
        var file = 'storage/emulated/0/KakaoTalkDownload/'+r.sender.replace(/ /g, '')+"."+r.room.replace(/ /g, '')+"-"+time().year+"."+time().month+"."+time().date+time().day+"."+time().hour+"."+time().minute+"."+time().second+".jpg";
    	write64(file, i);
    	Api.replyRoom('test', 'Image saved|'+r.room+'-'+r.sender);
    }
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

function cmd (dir){
	var p = java.lang.Runtime.getRuntime().exec('su -c ""'+dir+'""');
  p.waitFor();
  var r = p.getInputStream() || p.getErrorStream();
  return isread(r);
}

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
			
			if (msg == '!test'){
				replier.reply(String(eval( readFile("/sdcard/kbot/evalpad.js") )).encoding());
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
		
		if (msg == '!로딩' && work == 1){
    		reload(r);
    		return;
	    }
		
		if (msg =='!로드' && work == 1){
			freload(r);
			return;
		}
		
		if (msg.indexOf("!함수로딩") == 0 && work == 1 || Flag.get('freloadcheck', r.room)== 1){
			functionreload(r);
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
		
		if (msg == '!리부트' && work == 1){
			replier.reply('Rebooting...');
			cmd('reboot');
	    }
		
		if ( msg.indexOf("!날씨") == 0 && work == 1) {
        	weather(r);
        	return;
        }
		
		if (msg =='!로또확률'){
        	replier.reply('1등 확률 : 0.000012277380399898834%\n2등 확률 : 0.000073664282399393%\n3등 확률 : 0.002799238607098869%\n4등 확률 : 0.1364256480218281%\n5등 확률 : 2.2222222222222223%');
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
    		D.insert('blackjack', {name : sender  , room : room, point : 10000000, win : 0, lose : 0, push : 0 , ddl : 0, ddw : 0, ddp : 0, blackjack : 0 , even : 0 , evenc : 0, insurc : 0, insur : 0, splitc : 0 , split : 0, sur : 0, allp : 0, insurw : 0 , fexit : 0 , bpush : 0, bank : 0, autobet : 0 });
    	}
        
        if (msg.indexOf('!블랙잭자동배팅')==0){
        	if(r.msg.length > 9 && /^\d+$/.test(r.msg.split(' ')[1])){
				var betting = r.msg.split(' ')[1]
    			if ( (Number(betting)>9999 && Number(betting)<500001) || (Number(betting)>0 && Number(betting)<51)){
    				if(Number(betting)>0 && Number(betting)<51){
    					betting = Number(betting*10000);
    				}
    				D.update('blackjack', {autobet : betting}, 'room=? and name = ?', [room, sender]);
    			} else {
    				r.replier.reply('배팅금액은 1만원~50만원 입니다.')
    			}
			}
        	r.replier.reply(r.sender+'님의 블랙잭 자동 배팅액은 '+D.selectForArray('blackjack', 'autobet', 'room=? and name = ?', [room, sender])[0][0]+'원 입니다.');
        	return;
        }
        
        if( (msg == "!블랙잭" && work == 0) || (msg == "!블랙잭방" && work == 1) ){
    		replier.reply('https://open.kakao.com/o/grdPBAnb 로 입장해주세요. 중복되지 않는 자신만의 닉네임을 설정하셔야됩니다. 중복되는 닉네임으로 게임을 진핼할 경우 제재당할 수 있습니다.');
    		return;
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
    		replier.reply('전체 순위\n'+es+D.selectForArray('blackjack', ['name', 'point' , 'allp', 'win', 'blackjack', 'ddw', 'bpush', 'push', 'ddp', 'lose', 'ddl', 'sur', 'fexit'] , 'room=?', room, {orderBy:"point desc"}).map(v=> String(i++).extension(' ',2)+'. ' + String(v[1]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,").extension(' ',11)+'원' + ' - ' + String(v[0]).extensionRight('ㅤ',10) +'\nㅤ→ '+ '승 : ' + String( Math.floor((v[3]+v[4]+v[5]-v[6])/v[2]*1000)/10 ).extension(' ',2)+'% | 무 : ' + String( Math.floor((v[6]+v[7]+v[8])/v[2]*1000)/10 ).extension(' ',2)+'% | 패 : '+ String( Math.floor((v[9]+v[10]+v[11])/v[2]*1000)/10 ).extension(' ',2)+'% | 外 : ' +  String( Math.floor((v[12])/v[2]*1000)/10 ).extension(' ',2)+'%').join('\n\n').replace(/NaN%/g, 'X'));
    		return;
    	}
    	
    	if ( (msg.indexOf('!블랙잭') == 0 && work == 1) || ( Flag.get('gameinfo', r.room) != 0 && (  !isNaN(msg) || msg.indexOf('참가') == 0 || msg == 'ㅊㄱ' || msg == '시작' || msg == 'ㅅㅈ'  || msg == '!블랙잭종료' || msg == '힛'|| msg == 'ㅎ' || msg == '스테이'|| msg == 'ㅅㅌㅇ'|| msg == '서렌더'|| msg == 'ㅅㄹㄷ'|| msg == '더블다운'|| msg == 'ㄷㅂㄷㅇ'|| msg == '스플릿'|| msg == 'ㅅㅍㄹ') )){
        	blackjack(r);
        }
    	
    	if( (msg == "!야구" && work == 0) || msg == "!야구방" ){
    		replier.reply('https://open.kakao.com/o/gQwX2Shb 로 입장해주세요. 중복되지 않는 자신만의 닉네임을 설정하셔야됩니다. 중복되는 닉네임으로 게임을 진핼할 경우 제재당할 수 있습니다.');
    		return;
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
    	
    	if(Flag.get('gameinfo', r.room).start == 1 || Flag.get('gameinfo', r.room).start1 == 1 ||Flag.get('gameinfo', r.room).start2 == 1 ||Flag.get('gameinfo', r.room).start3 == 1 ||Flag.get('gameinfo', r.room).start4 == 1 ){
    		if(msg =='!야구'){
    			r.replier.reply('블랙잭이 진행중입니다.');
        		return;
    		} else {
    			return;
    		}
    	}
    	
    	if( D.selectForArray('baseball', 'name', 'room=?', room) == undefined || D.selectForArray('baseball', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) == -1){
    		D.insert('baseball', {name : sender, point : 100000, room : room, win : 0, lose : 0, solowin : 0, clear : 2});
    	}
        
        if ((msg == "!야구" && work == 1) || ( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && ( !isNaN(msg) || msg == '참가' || msg == '시작' || msg == '!야구종료' || msg == '!힌트' || msg == '!패스') ) ){
        	baseball(r);
        }    	
	} catch (e) {
        Api.replyRoom("test", e + "\n" + e.stack);
	}
}