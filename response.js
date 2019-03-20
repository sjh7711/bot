//소스불러오기및 리로딩//기타
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
var D = require("DBManager.js")("D");
var T = require("ThreadManager.js");
var I = require("Interactive.js");
File = java.io.File;
var es=String.fromCharCode(8237).repeat(500);
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
function blankFunc(r){
}

//--------------------------------------------------------------------Response-------------------------------------------------//
function response(room, msg, sender, isGroupChat, replier, imageDB) {
	
	if(reloadcheck == 1){
		return;
	}
	
	I.run(room, sender, msg);
	
	r = { replier: replier, msg: msg, sender: sender, room: room , imageDB : imageDB};
	
	if (room == 'test' || room == '시립대 봇제작방') {
		if (msg.indexOf("]") == 0) {
			try {
				replier.reply(eval(msg.substring(1)));
			} catch (e) {replier.reply(e + "\n" + e.stack);}
		}
	}
	
	try {
		blankFunc(r);
	} catch (e) {replier.reply(e + "\n" + e.stack);}

	
	try {
		var str = "";
		if (msg.indexOf("!날씨") == 0 || msg.indexOf("!ㄴㅆ") == 0 ) {
        	weather(r);
        	return;
        }
        str += "!날씨\n"
        
		if (msg == "!로또" || msg == "!ㄹㄸ" ) {
            lotto(r);
            return;
        } 
        str += "!로또 / "

        if (msg.indexOf("!당첨") == 0 || msg.indexOf("!ㄷㅊ") == 0) {
            lottocheck(r);
            return;
        } 
        str += "!당첨\n";
        
        if (msg == "!로또통계"){
        	bestlotto(r);
        	return;
        }
        str += "!로또통계\n";
        
        if (msg.indexOf("!메뉴") == 0 || msg.indexOf("!ㅁㄴ") == 0|| msg.indexOf("!메뉴추천") == 0|| msg.indexOf("!ㅁㄴㅊㅊ") == 0) {
            recom(r, "menu");
            return;
        } 
        str += "!메뉴 / "

        if (!(room == '푸드마켓' || room == '오버워치')) {
            if (msg.indexOf("!식당") == 0 || msg.indexOf("!ㅅㄷ") == 0|| msg.indexOf("!식당추천") == 0|| msg.indexOf("!ㅅㄷㅊㅊ") == 0) {recom(r, "res"); return;}
            str += "!식당 / "
        } 
        
        if(msg.indexOf("!맛집")==0 || msg.indexOf("!ㅁㅈ")==0){
        	famous(r);
        	return;
        } 
        str += "!맛집\n"
        	
        if (room == '시립대 전전컴 톡방' || room=='test' || room=='시립대 봇제작방' || room =='시립대 단톡방') {
            if (msg.indexOf("!최근채팅") == 0 || msg.indexOf("!ㅊㄱㅊㅌ") == 0) { recentchat(r); return;}
            str += "!최근채팅\n";
        }

        if (room == 'test') {
            if (msg.indexOf("!전체채팅") == 0 || msg.indexOf("!ㅈㅊㅊㅌ") == 0) { allchat(r); return;}
            str += "!전체채팅\n"
        } 
        
        if (msg.indexOf("!오버워치") == 0 || msg.indexOf("!ㅇㅂㅇㅊ") == 0) {
            overwatch(r);
            return;
        }
        str += "!오버워치\n";
        
        if (room == 'test' || room == '시립대 봇제작방') {
            if (msg.indexOf("!예정기능") == 0 || msg.indexOf("!ㅇㅈㄱㄴ") == 0) {replier.reply(D.selectForArray('willdo').join("\n")); return;}
            str += "!예정기능\n";
        }
        
        if (room == 'test' || room == '푸드마켓' || room == '시립대 봇제작방') {
            if (msg.indexOf("!공지") == 0 || msg.indexOf("!ㄱㅈ") == 0) { notice(r); return;}
            str += "!공지\n";
        }
        
        if (msg =="!ㅊㅊ"|| msg == "!추첨" || Flag.get("sel0", r.room) == 1 || Flag.get("sel1", r.room) == 1) {sel(r); return;}
        str += "!추첨\n";

        if (room == '푸드마켓' || room =='test'){
        	if(msg.indexOf("!명단")==0 || msg.indexOf("!ㅁㄷ")==0){banklist(r); return;}
        	str += "!명단\n"
        } 

        if (msg == "!상태"){
        	checkstatus(r);
        	return;
        } 
        
        if( ( !(room =='test' || room =='시립대 단톡방' || room =='시립대 봇제작방' || room =='BASEBALL' || room =='오버워치' || room =='공익' || room =='시립대 전전컴 톡방'  ) && msg == "!야구" ) || msg == "!야구방"  ){
    		replier.reply('https://open.kakao.com/o/gQwX2Shb 로 입장해주세요. 중복되지 않는 자신만의 닉네임을 설정하셔야됩니다. 중복되는 닉네임으로 게임을 진핼할 경우 제재당할 수 있습니다.');
    		return;
    	}
        
        if(  room =='test' || room =='시립대 봇제작방' || room =='시립대 단톡방' || room =='BASEBALL' || room =='오버워치' || room =='공익' || room =='시립대 전전컴 톡방' ){
        	if( D.selectForArray('baseball', 'name', 'room=?', room) == undefined || D.selectForArray('baseball', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) == -1){
        		D.insert('baseball', {name : sender, point : 100000, room : room, win : 0, lose : 0, solowin : 0});
        	}
        	
        	if( msg == "!전적초기화" && D.selectForArray('baseball', 'name', 'room=?', room).map(v=>v[0]).indexOf(sender) > -1){
        		D.update('baseball', {point : 100000, win : 0, lose : 0, solowin : 0}, 'name=? and room=?', [sender, room] );
        	}
        	
        	if (msg == "!야구" || msg == "!ㅇㄱ" || Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1 ){
            	baseball(r);
            }
        	
        	if(msg == '!정보'){
        		if(D.selectForArray('baseball',null,'name=? and room=?',[sender, room])!=undefined){
        			var wincount = Number(D.selectForArray('baseball', 'win','name=? and room=?',[sender, room]));
        			var losecount = Number(D.selectForArray('baseball', 'lose','name=? and room=?',[sender, room]));
        			replier.reply(sender+'님의 정보'
        			+'\n순위 : '+(Number(D.selectForArray('baseball',['name','point'], 'room=?', [room], {orderBy:"point desc"}).map(v=>v[0]).indexOf(r.sender))+1) + '등'
        			+'\n포인트 : '+D.selectForArray('baseball', 'point','name=? and room=?',[sender, room])
        			+'\n전적 : '+wincount+'승 / '+losecount+'패'
        			+'\n승률 : '+ Math.floor( wincount / (losecount + wincount)*1000)/10 + "%");
        			return;
        		}else {
        			replier.reply('알 수 없습니다.');
        			return;
        		}
        	}
        	
        	if(msg == '!랭킹'){
        		var i = 1;
        		replier.reply('전체 순위\n'+es+D.selectForArray('baseball', ['name','point'], 'room=?', r.room, {orderBy:"point desc"}).map(v=> i++ +'. ' +v[0]+' '+v[1]).join('\n'));
        		return;
        	}
        }
        str += '!야구\n';
        
        if(msg.indexOf('!주사위') == 0){
        	randomnumber(r);
        	return;
        }
        str+="!주사위\n";
    	
        
        if(room=='test'){
        	
        	if (msg.indexOf("!파일삭제")==0){
        		var temp = java.io.File("/sdcard/ipdisk").listFiles();
        		for(i=0;i<temp.length;i++){
        			if(String(temp[i]).indexOf(msg.split(' ')[1])>-1) {
        				File(temp[i]).delete();
        				replier.reply(temp[i]+' 삭제 완료');
        			}
        		}
        		return;
        	}str += "!파일삭제\n";
        	
        	if (msg == "!방"){
        		replier.reply(Api.getRoomList().slice().join('\n'));
        		return;
        	}str += "!방\n";
        	
        	if(msg == "!파일목록"){
        		replier.reply(File("/sdcard/ipdisk").listFiles().slice().join('\n'));
        		return;
        	}str += "!파일목록\n";
        	
        	if(msg =="!쓰레드"){
        		replier.reply(T.getThreadList().join('\n'));
        		return;
        	}str += "!쓰레드\n";
        	
        	if(msg =="!로딩"){
        		replier.reply(reload());
        		return;
        	}str += "!로딩\n";
        	
        	if (msg == "!올로또통계"){
            	allbestlotto(r);
            	return;
            }str += "!올로또통계\n";
        }
        
        str += "!상태\n";

        if (msg.indexOf('!건의 ')==0){
        	if(msg.substr(4).length < 3){
        		replier.reply("건의가 너무 짧습니다.");
        		return;
        	}else{
        		Api.replyRoom('추천/건의', room+" : "+sender+" : "+msg.substr(4));
        		replier.reply(sender+"님의 건의가 접수되었습니다.");
        		return;
        	}
        }
        str += "!건의\n";

        if (msg.indexOf("!기능 ") == 0) {
            func(r);
            return;
        } 
        
        if (sender == "시립봇") {} else { D.insert('chatdb', { time : time().hour+":"+time().minute+":"+time().second, name: sender, msg: msg, room : room}); }
        
        if (msg == "!기능") {
            replier.reply(str+es+"\n설명이 필요하면 !기능 오버워치 처럼 입력하세요.\n초성만 입력해도 기능이 작동합니다"); 
            return;
        }
        
        if (msg=="/기능") {
            replier.reply("!기능으로 작동합니다 "+es+'\n'+str);
            return;
        } 
        
        if(imageDB.getImage() != null){
    		saveImage(r);
    	}
        
        /*
        if (room == 'test' || room == '시립대 봇제작방') {
        	if (msg =="!반응속도" || msg =="!ㅂㅇㅅㄷ") {
        		Flag.set('reactionroom', room, room);
        		Flag.get('reactionspeed', room).start();
        	}
        }*/
        
	} catch (e) {
        Api.replyRoom("test", e + "\n" + e.stack);
	}
}


//------------------------------------------------------------------ 함수------------------------------------------------------

function func(r) {
    if (r.msg.split(" ")[1] == "최근채팅") {
        r.replier.reply("최근채팅 6개를 출력합니다. [!최근채팅16]과 같이 입력하면 16개를 불러오고 최대 16개까지 조회가 가능합니다. [!최근채팅16 닉네임] 과 같이 입력하면 해당 닉네임의 최근 16개 채팅을 보여줍니다. 불필요한 띄워쓰기가 들어가거나 이름이 잘못되면 출력이 안될 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "오버워치") {
        r.replier.reply("[!오버워치 똥개#5468]와 같이 입력하면 티어,점수,경쟁전에서 가장 많이 플레이한 영웅 4명을 확인할 수 있습니다.\n배치를 치지 않은 경우, 프로필이 비공개인 경우, 배틀태그를 입력하지 않은 경우, 대소문자를 정확하게 구분하지 않은 경우엔 정보를 알 수 없습니다.");
    } else if (r.msg.split(" ")[1] == "로또") {
        r.replier.reply("로또번호를 추천해줍니다. [!당첨]으로 토요일에 로또번호 추첨이 끝나면 결과를 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "당첨") {
        r.replier.reply("매주 토요일에 로또번호가 발표가 되면 지난 일주일간 뽑았던 번호가 몇등인지 알 수 있습니다. [!당첨 닉네임] 과 같이 입력하면 자기가 뽑은 번호만 확인 할 수 있습니다."+es+"\n3개 : 5등 / 4개 : 4등 / 5개 : 3등 / 5개+보너스 : 2등 / 6개 : 1등");
    } else if (r.msg.split(" ")[1] == "로또통계") {
        r.replier.reply("지금까지 뽑았던 로또의 당첨내역을 모두 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "메뉴") {
        r.replier.reply("먹을 음식을 추천해 줍니다. [!메뉴 3]과 같이 입력하면 메뉴를 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "식당") {
        r.replier.reply("시립대 주변 식당을 추천해 줍니다. [!식당 3]과 같이 입력하면 식당을 3개 추천해줍니다. 최대 8개를 추천해줍니다.");
    } else if (r.msg.split(" ")[1] == "공지") {
        r.replier.reply("최근 5개의 공지를 띄워줍니다. [!공지 15] 과 같이 입력하면 공지 15개를 보여주고 최대 15개까지 조회가능합니다. 해당 공지의 번호를 [!공지 823] 이렇게 입력하시면 내용과 댓글을 확인할 수 있습니다.");
    } else if (r.msg.split(" ")[1] == "날씨") {
        r.replier.reply("[!날씨 지역명]으로 검색가능하며 경우에 따라 선택을 해야할 수도 있습니다. 기본값은 해당 방과 가장 관련있는 지역입니다.");
    } else if (r.msg.split(" ")[1] == "건의") {
        r.replier.reply("건의를 받습니다. [!건의 건의내용] 으로 입력하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "추첨") {
        r.replier.reply("[!추첨]을 입력하면 몇 명을 뽑을 건지 입력할 수 있습니다. 숫자만 입력하면 됩니다. 입력 후에는 누구든지 참가 를 입력하면 참가가 가능하고, 추첨을 제안한 사람이 [!마감 ]을 입력하면 당첨자가 바로 발표됩니다.\n추첨이 진행중일 땐 다른 추첨이 불가능합니다. 누구든 [!추첨]이 입력된 후 90초 이후엔 [!추첨종료]로 종료가 가능합니다.");
    } else if (r.msg.split(" ")[1] == "명단") {
        r.replier.reply("푸드뱅크 명단을 보여줍니다. [!명단 만월] 처럼 입력하면 만월노인요양원의 검색 결과가 나옵니다.\n[!명단추가 복지센터 055645XXXX] 처럼 입력하면 추가되고 [!명단삭제 복지센터] 처럼 입력하면 목록이 삭제됩니다. 삭제할 땐 반드시 제대로 된 기관명을 입력해야합니다.");
    } else if (r.msg.split(" ")[1] == "맛집") {
        r.replier.reply("검색한 지역의 맛집을 알려줍니다. [!맛집 지역명] 으로 검색하면 됩니다.");
    } else if (r.msg.split(" ")[1] == "야구"){
    	r.replier.reply('숫자야구 룰\n'+es+'\n\
여러분들은 [!야구] 를 통해 게임을 시작 할 수 있으며 [!야구] 를  외친 사람은 자동으로 참가가 됩니다.\
[참가] 를 입력하면 참가가 가능하고 [!야구] 를 외친 사람이 [시작] 이라고 입력하면 게임을 시작합니다.\n\
참가한 순서대로 맞출 수 있는 기회가 부여됩니다. 숫자는 중복되지 않는 0~9까지의 숫자입니다. 맞출 숫자가 1325라고 가정합니다.\n\
[1246]이라고 질문을 합니다. 1은 위치와 숫자가 같으므로 스트라이크, 2는 위치는 다르지만 포함은 되어있으니 볼입니다. 4와 6은 아무것도 해당되지 않습니다.\n\
단서를 통해 정답인 1325를 맞추면 됩니다. 참가비는 1000point입니다. 1000point아래로 내려가면 다른 닉네임으로 오시면 됩니다.\n\
최대 3인까지 가능하며 혼자서도 가능하지만 전적은 기록되지 않습니다.\n\
[!정보]를 통해 자신의 각종 정보를 확인할 수 있습니다.\n\
[!랭킹]을 통해 point가 가장 많은 순서대로 등수 조회가 가능합니다.\n\
[!강제종료]를 통해 게임을 강제로 종료할 수 있습니다. 혼자 플레이 중인 경우 아무나 종료 가능하고 2인 이상일 경우 현재 참가중인 플레이어 중에서만 강제종료가 가능합니다.\n\
[!패스]를 통해 상대방이 30초 이상 답하지 않을 경우 그 다음 턴으로 차례를 넘길 수 있습니다.\n\
[!힌트]를 통해 8번째 턴 부터 500포인트를 사용하여 숫자 하나에 대한 정보를 얻을 수 있습니다. 힌트를 쓰는 즉시 포인트는 차감되기 때문에 강제종료를 하더라도 포인트는 돌아오지 않습니다. 신중하게 사용해주세요.\n\
[!야구방]을 통해 야구 전용방에 들어갈 수 있습니다.')
    } else if (r.msg.split(" ")[1] == "주사위"){
    	r.replier.reply("기본값은 1~100이고 [!주사위 200] 처럼하면 1~200까지, [!주사위 2 200] 처럼하면 2부터 200까지 랜덤한 숫자를 뽑습니다.");
    }
}

/*
Flag.set('reactionspeed', r.room, r.room) = T.register("reactionSpeed",()=>{
	while(1){
		if(Flag.get('react', r.room) == 0 && Flag.get('reactionroom', r.room) != 0){
			Api.replyRoom(Flag.get('reactionroom', r.room),"8초안에 반응속도 확인을 시작합니다. 먼저 . 을 입력하는 사람이 이깁니다.");
			var rand = 1+Math.floor(Math.random() * 7000);
			java.lang.Thread.sleep(rand);
			Api.replyRoom(Flag.get('reactionroom', r.room),'시작!');
			Flag.set('react', r.room, 1);
			Flag.set('reactstarttime', r.room, new Date().getTime());
			r.msg = '';
		}
		var reactiontime = new Date().getTime();
		if(Flag.get('react', r.room) == 1 && r.msg == '.' && Flag.get('reactionroom', r.room) != 0 && (reactiontime - Flag.get('reactstarttime', r.room) - 410 > 0) ){
			Api.replyRoom(Flag.get('reactionroom', r.room), r.sender+"님의 반응 속도 : "+ (reactiontime - Flag.get('reactstarttime', r.room) - 410)/1000 +'초');
			Flag.set('react', r.room, 0); 
			Flag.set('reactionspeed', r.room, 0)
			T.interrupt(reactionspeed);
			break;
		}
		if( new Date().getTime() - Flag.get('reactstarttime', r.room) > 5000 && Flag.get('reactionroom', r.room) != 0){
			Api.replyRoom(Flag.get('reactionroom', r.room), '5초가 지났습니다. 게임이 끝났습니다.')
			Flag.set('react', r.room, 0); 
			Flag.set('reactionspeed', r.room, 0)
			T.interrupt(reactionspeed);
			break;
		}
		java.lang.Thread.sleep(5);
	}
})*/

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
			r.replier.reply('게임을 시작합니다. 참여할 사람은 참가 를 입력해주세요.');
			Flag.set('baseballtime', r.room, new Date().getTime());
			Flag.set("start", r.room, 1);
			Flag.set("suggest", r.room, r.sender);
			var temp = [r.sender];
			Flag.set("baseball", r.room , temp);
			r.replier.reply(r.sender+"님("+Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room]))+")이 참가하셨습니다. 현재 "+temp.length+'명');
		}else if( Number(D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])) < 1000 ){
			r.replier.reply('포인트가 부족합니다. 닉네임을 바꾸세요.')
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
        	r.replier.reply('포인트가 부족합니다. 새로운 닉네임으로 오세요.');
        	return;
        }
    }
	
	if ( Flag.get("start", r.room) == 1 && (Flag.get('baseball', r.room).length == 3 || (r.msg == '시작' && Flag.get('suggest', r.room) ==r.sender)) ){
		if(Flag.get('baseball', r.room).length > 0 ){
			r.replier.reply(Flag.get('baseball', r.room).length+'명이 참가했습니다. 게임을 시작합니다. 4자리 숫자만 입력하세요.');
			Flag.set('start', r.room, 0);
			Flag.set('start1', r.room, 1);
		} else{
			r.replier.reply('아무도 참여하지 않았습니다.');
			return;
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


function saveImage(r){
	if(r.sender == '_(≥∇≤)ノ🎓'){
		r.sender = '이모티콘';
	}
	file = 'storage/emulated/0/FTP/'+r.sender+"."+r.room+"-"+time().year+"."+time().month+"."+time().date+time().day+" "+time().hour+"."+time().minute+"."+time().second+".jpg";
	write64(file, r.imageDB.getImage());
	Api.replyRoom('test', 'image save succes\n'+r.sender+' / '+r.room+'\n'+time().now);
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
			if(r.room == '시립대 자취생 생정' || r.room == '시립대 전전컴 톡방'|| r.room == '시립대 봇제작방'|| r.room == '시립대 단톡방'){
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
	    		
	    		 if (temp.length > 1){ //네이버에서 같은 이름의 지역이 2곳 이상일 때 ex) 고성, 광주
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
		        	}
				} else if (check == -1 && link2 != 'http://m.weather.naver.com/m/nation.nhn'){ //네이버에 날씨검색이 바로 안될 때 1 ex)읍내면, 북극
		        	var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q="+want).get().select('div.wrap_place').select('div.wrap_cont').toArray(); // 다음에서 해당하는 곳의 주소를 가져옴
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
		        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+wantplace+"+날씨").get();
		        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
		        		where = name[targetNum].substr(3) ;
		        		check = link2.indexOf('weather');
		        		if(check == -1){
		        			r.replier.reply("검색이 불가능합니다.");
							return;
		        		}
		        	}
				} else if (link2 == 'http://m.weather.naver.com/m/nation.nhn') { // 바로 검색이 안될 때 2 ex) 독도
		        	var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q="+want).get().select('span.f_etit').text();
		        	
		        	var wantplace="";
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
		        	link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+wantplace+"+날씨").get();
	        		link2 = link1.select('div.api_more_wrap').select('a').attr("abs:href");
	        		where = want;
	        		check = link2.indexOf('weather');
	        		if(check == -1 || String(temp).length == 0){
	        			r.replier.reply("검색이 불가능합니다.");
						return;
	        		}
		        } else if(link2=="http://m.weather.naver.com"){//도단위 검색일 때 ex) 제주도 , 경남
					var i = 0;
	    			var name = link1.select('div.lcl_lst').select('span.lcl_name').toArray().map(v=>(1+i++)+". "+v.text());
	    			var msg;
	    			r.replier.reply("지역을 선택하세요\n"+name.join('\n'));
		        	msg=input.getMsg()*1;
		        	if(!isNaN(msg) && msg>=1 && msg<=name.length){
		        		var targetNum=msg-1;
		        		link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query="+name[targetNum].substr(3)+"+날씨").get();
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
			r={msg : '!날씨', room : '시립대 자취생 생정',replier:{reply:function(msg){
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
			r={msg : '!날씨', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 대연동', room : '오버워치',replier:{reply:function(msg){
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
			java.lang.Thread.sleep(6*1000);
			r={msg : '!날씨 진해 석동', room : '오버워치',replier:{reply:function(msg){
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
			
	        var res = "닉네임 : "+r.msg.substr(6)+"\n점수 : "+score+"\n티어 : "+tier+"\n\n많이 플레이한 영웅 TOP4"+es;
	        
	        var num = compplaytime.select('div.ProgressBar-title').toArray().length;
	        
	        if(num>3){
	        	num=4;
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
			r.replier.reply("실제로 있는 지역을 입력하세요.");
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

function foodbank(r){
	try{
		var name = r.msg.split(" ")[1];
		var phone = r.msg.split(" ")[2];
		var cmd = r.msg.split("!업무")[1].split(" ")[0];
		if(typeof name == 'string'){
			var temp=D.selectForArray('foodbank',null,'name like ?','%'+name+'%');
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
		
		
		if ((Flag.get("sel0", r.room) == 1 || Flag.get("sel1", r.room) == 1) && r.msg == '!추첨'){
			r.replier.reply('현재 추첨이 진행중입니다.')
		}

		if (Flag.get("sel0", r.room) == 0 && Flag.get("sel1", r.room) == 0){
			r.replier.reply("뽑힐 인원 수를 입력해주세요. 숫자만 입력하면 됩니다. ex) 1\n최대 5명까지 가능합니다. 참여엔 제한이 없습니다.");
			Flag.set('seltime', r.room, new Date().getTime());
			Flag.set("selsender", r.room , r.sender);
			Flag.set("sel0", r.room, 1);
		}
		
		if(Flag.get("selsender", r.room) == r.sender && r.msg < 5 && 0 < r.msg && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 0){
			Flag.set("selnum", r.room , r.msg)
			r.replier.reply(Flag.get("selnum", r.room)+"명을 뽑습니다. 참여할 사람은 '참가' 를 입력해주세요. 추첨을 제안한 사람이 !마감 을 입력하면 마감됩니다. 90초 이후엔 누구든 !마감으로 마감할 수 있습니다.");
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
	    		if(Flag.get('sellist', r.room).length == 0){
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
			if(Flag.get('sellist', r.room).length == 0){
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
		var temp1 = r.msg.substr(5); // 개수
	    if(temp1.length!=0){
	    	temp1 = temp1.split(" ")[0];
	    }
	    var temp2 = r.msg.substr(r.msg.split(" ")[0].length+1);//닉
	    var num = 6;
	    var flag = 0;
	    
	    if( temp2.length > 0 ){
	    	var tempchat = D.selectForArray('chatdb', ['time', 'msg'] , 'name=? and room=?', [temp2, r.room]);
	    	var templeng = tempchat.length;
	    	flag = 1;
	    	if(templeng==0){
				r.replier.reply(temp2+"의 채팅이 없습니다.");
				return;
			} else if(temp1.length > 0){
				if(0 < temp1*1 && temp1*1 < 17 ) {
					num = temp1*1;
					if(tempchat.length<temp1*1){
						num = templeng;
					}
				}
	    	}
	    }else{
	    	var tempchat = D.selectForArray('chatdb', ['time', 'name', 'msg' ] , 'room=?', r.room);
			var templeng = tempchat.length;
			if (0 < temp1*1 && temp1*1 < 17) {
				num = Math.floor( temp1*1 );
				if( templeng < temp1*1){
					num = templeng;
				}
			} else {
			    if(6 > templeng){
					num = templeng;
				}
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
		var temp1 = r.msg.substr(5); // 개수
	    if(temp1.length!=0){
	    	temp1 = temp1.split(" ")[0];
	    }
	    var temp2 = r.msg.substr(r.msg.split(" ")[0].length+1);//닉
	    var num = 6;
	    var flag = 0;
	    
	    if( temp2.length > 0 ){
	    	var tempchat = D.selectForArray('chatdb', ['time', 'room', 'msg'] , 'name=?', [temp2]);
	    	var templeng = tempchat.length;
	    	flag = 1;
	    	if(templeng==0){
				r.replier.reply(temp2+"의 채팅이 없습니다.");
				return;
			} else if(temp1.length > 0){
				num = temp1*1;
				if(tempchat.length<temp1*1){
					num = templeng;
				}
			
	    	}
	    }else{
	    	var tempchat = D.selectForArray('chatdb', ['time','room', 'name', 'msg']);
			var templeng = tempchat.length;
			if( temp1.length > 0){
				num = Math.floor( temp1*1 );
				if( templeng < temp1*1){
					num = templeng;
				}
			} else {
			    if(6 > templeng){
					num = templeng;
				}
			}
		}
		
		var temp = [];
		temp[0]='길이:'+num+'\n';
		if(flag==1){
			temp[0]=temp[0]+temp2+"님의 채팅내역\n"; 
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

function allbestlotto(r) {
	var result = "명예의 전당"+es+"\n";
	var temp = D.selectForArray('lottoresult', null, 'count > 2 ', null , {orderBy:"class asc"});
	var all = D.selectForArray('lottoresult', null, null ,null ,{orderBy:"class asc"}).length;
	var five = D.selectForArray('lottoresult', null, 'count == 3', null, {orderBy:"class asc"}).length;
	var four = D.selectForArray('lottoresult', null, 'count == 4 ',null,  {orderBy:"class asc"}).length;
	var three = D.selectForArray('lottoresult', null, 'count == 5 ',null,  {orderBy:"class asc"}).length;
	var two = D.selectForArray('lottoresult', null, 'count == 7 ',null,  {orderBy:"class asc"}).length;
	var one = D.selectForArray('lottoresult', null, 'count == 6', null, {orderBy:"class asc"}).length;
	for(var i=0; i<temp.length; i++){
		result+=temp[i][1]+"|생성:"+temp[i][2]+"."+temp[i][3]+"."+temp[i][4]+" "+temp[i][5]+":"+temp[i][6]+" \n"+temp[i][8]+" "+temp[i][9]+" "+temp[i][10]+" "+temp[i][11]+" "+temp[i][12]+" "+temp[i][13]+" | "+temp[i][15]+ ' '+temp[i][7] + "회차\n\n";
	}
	result+='로또 뽑은 횟수 : '+all+'\n'
	result+='1등 확률 : '+Math.floor(one/all*100000000000)/1000000000+"%("+one+")"+"\n";
	result+='2등 확률 : '+Math.floor(two/all*100000000000)/1000000000+"%("+two+")"+"\n";
	result+='3등 확률 : '+Math.floor(three/all*100000000000)/1000000000+"%("+three+")"+"\n";
	result+='4등 확률 : '+Math.floor(four/all*100000000000)/1000000000+"%("+four+")"+"\n";
	result+='5등 확률 : '+Math.floor(five/all*100000000000)/1000000000+"%("+five+")";
	r.replier.reply(result);
}

function bestlotto(r) {
	var result = "명예의 전당"+es+"\n";
	var temp = D.selectForArray('lottoresult', null, 'count > 2 and room=?', [r.room], {orderBy:"class asc"});
	var all = D.selectForArray('lottoresult', null, 'room=?', [r.room], {orderBy:"class asc"}).length;
	var five = D.selectForArray('lottoresult', null, 'count == 3 and room=?', [r.room], {orderBy:"class asc"}).length;
	var four = D.selectForArray('lottoresult', null, 'count == 4 and room=?', [r.room], {orderBy:"class asc"}).length;
	var three = D.selectForArray('lottoresult', null, 'count == 5 and room=?', [r.room], {orderBy:"class asc"}).length;
	var two = D.selectForArray('lottoresult', null, 'count == 7 and room=?', [r.room], {orderBy:"class asc"}).length;
	var one = D.selectForArray('lottoresult', null, 'count == 6 and room=?', [r.room], {orderBy:"class asc"}).length;
	for(var i=0; i<temp.length; i++){
		result+=temp[i][1]+"|생성:"+temp[i][2]+"."+temp[i][3]+"."+temp[i][4]+" "+temp[i][5]+":"+temp[i][6]+" \n"+temp[i][8]+" "+temp[i][9]+" "+temp[i][10]+" "+temp[i][11]+" "+temp[i][12]+" "+temp[i][13]+" | "+temp[i][15]+ ' '+temp[i][7] + "회차\n\n";
	}
	result+='로또 뽑은 횟수 : '+all+'\n'
	result+='1등 확률 : '+Math.floor(one/all*100000000000)/1000000000+"%("+one+")"+"\n";
	result+='2등 확률 : '+Math.floor(two/all*100000000000)/1000000000+"%("+two+")"+"\n";
	result+='3등 확률 : '+Math.floor(three/all*100000000000)/1000000000+"%("+three+")"+"\n";
	result+='4등 확률 : '+Math.floor(four/all*100000000000)/1000000000+"%("+four+")"+"\n";
	result+='5등 확률 : '+Math.floor(five/all*100000000000)/1000000000+"%("+five+")";
	r.replier.reply(result);
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
	    	
	    	var text = String(subdoc.select("div.page").select("div.content").toArray()[0]).replace(/<br>/g, '\n').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').trim().replace(/^ +/gm,"").replace(/\n\n\n/g, '\n').replace(/\n\n\n/g, '\n');
	    	var repl = subdoc.select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n");
	    	
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
	    	
	    	var text = String(subdoc.select("div.page").select("div.content").toArray()[0]).replace(/<br>/g, '\n').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').trim().replace(/^ +/gm,"").replace(/\n\n\n/g, '\n').replace(/\n\n\n/g, '\n');
	    	var repl = subdoc.select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n");
	    	
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


own=function(obj){
	return Object.getOwnPropertyNames(Api);
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
        if (room == 'test' || room == '시립대 봇제작방' || room == '시립대 자취생 생정' || room == '시립대 전전컴 톡방') {
            if (msg.indexOf("!메뉴추가 ") == 0 || msg.indexOf("!ㅁㄴㅊㄱ ") == 0) {
                add(r, "menu", "메뉴", 0);
            }
        }
        //메뉴동의합의
        if (room == 'test' || room == '시립대 봇제작방' || room == '시립대 자취생 생정' || room == '시립대 전전컴 톡방') {
            if (this["flag" + room][0] == 1) {
                agree(r, "menu", "메뉴", 0);
            }
        }

        if (room == 'test' || room == '시립대 봇제작방' || room == '시립대 자취생 생정' || room == '시립대 전전컴 톡방') {
            if (msg.indexOf("!식당추가 ") == 0 || msg.indexOf("!ㅅㄷㅊㄱ ") == 0) {
                add(r, "res", "식당", 1);
            }
        }
		
        //식당동의합의
        if (room == 'test' || room == '시립대 봇제작방' || room == '시립대 자취생 생정' || room == '시립대 전전컴 톡방') {
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


