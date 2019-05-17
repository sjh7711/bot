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
const es=String.fromCharCode(8237).repeat(500);
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
	    Api.replyRoom(r.room , "Response reloading 완료 / " + ((new Date() - Timer) / 1000) + "s\n" + new Date() );
	    for(var i in File("/sdcard/kbot/functions").listFiles()){eval( readFile(File("/sdcard/kbot/functions").listFiles()[i]))}
	    Api.replyRoom(r.room , "Function reloading 완료 / " + ((new Date() - Timer) / 1000) + "s\n" + new Date());
	}
}
function freload(r){
	for(var i in File("/sdcard/kbot/functions").listFiles()){eval( readFile(File("/sdcard/kbot/functions").listFiles()[i]))}
    Api.replyRoom(r.room , "Function reloading 완료");
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

function cloneObject(obj) {
	  return JSON.parse(JSON.stringify(obj));
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