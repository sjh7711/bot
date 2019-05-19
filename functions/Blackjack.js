givemoney = function (r){
	var data = r.msg.substr(7).split(',');
	var money = Number(data[0]);
	var who = data[1];
	var room = data[2];
	var temp = D.selectForArray('blackjack', 'point', 'name=? and room = ?', [who, room])[0][0];
	D.update('blackjack', {point: temp + money}, 'name=? and room = ?', [who, room]);
	r.replier.reply(room+'방의' + who+'님의 포인트변동\n'+ temp + ' → ' + D.selectForArray('blackjack', 'point', 'name=? and room = ?', [who, room])[0][0])
	Api.replyRoom(room, who+'님의 포인트변동\n'+ temp + ' → ' + D.selectForArray('blackjack', 'point', 'name=? and room = ?', [who, room])[0][0] );
}

blackinform = function (r){
	if(D.selectForArray('blackjack', null, 'name=? and room=?', [r.sender, r.room]) !=undefined){
		var win = D.selectForArray('blackjack', 'win', 'name=? and room=?', [r.sender, r.room])[0][0];
		var lose =  D.selectForArray('blackjack', 'lose', 'name=? and room=?', [r.sender, r.room])[0][0];
		var blackjack = D.selectForArray('blackjack', 'blackjack', 'name=? and room=?', [r.sender, r.room])[0][0];
		var splitc = D.selectForArray('blackjack', 'splitc', 'name=? and room=?', [r.sender, r.room])[0][0];
		var split = D.selectForArray('blackjack', 'split', 'name=? and room=?', [r.sender, r.room])[0][0];
		var ddw = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [r.sender, r.room])[0][0];
		var ddl = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [r.sender, r.room])[0][0];
		var ddp = D.selectForArray('blackjack', 'ddp', 'name=? and room=?', [r.sender, r.room])[0][0];
		var push = D.selectForArray('blackjack', 'push', 'name=? and room=?', [r.sender, r.room])[0][0];
		var even = D.selectForArray('blackjack', 'even', 'name=? and room=?', [r.sender, r.room])[0][0];
		var evenc = D.selectForArray('blackjack', 'evenc', 'name=? and room=?', [r.sender, r.room])[0][0];
		var insur = D.selectForArray('blackjack', 'insur', 'name=? and room=?', [r.sender, r.room])[0][0];
		var insurc = D.selectForArray('blackjack', 'insurc', 'name=? and room=?', [r.sender, r.room])[0][0];
		var insurw = D.selectForArray('blackjack', 'insurw', 'name=? and room=?', [r.sender, r.room])[0][0];
		var sur = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [r.sender, r.room])[0][0];
		var all = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [r.sender, r.room])[0][0];
		var exit = D.selectForArray('blackjack', 'fexit', 'name=? and room=?', [r.sender, r.room])[0][0];
		var bpush = D.selectForArray('blackjack', 'bpush', 'name=? and room=?', [r.sender, r.room])[0][0];
		
		var str = '';
		str += r.sender+'님의 정보';
		str += '\n순위 : '+Number(D.selectForArray('blackjack',['name','point'], 'room=?', [r.room], {orderBy:"point desc"}).map(v=>v[0]).indexOf(r.sender)+1) + '등';
		str += '\n포인트 : '+D.selectForArray('blackjack', 'point','name=? and room=?',[r.sender, r.room])[0][0];
		str += '\n이득확률 : '+ Math.floor( (win + blackjack + ddw - bpush ) / all*1000)/10 + "%";
		str += '\n본전확률 : '+ Math.floor( (push + ddp + bpush ) / all*1000)/10 + "%";
		str += '\n손해확률 : '+ Math.floor( (lose + ddl + sur) / all*1000)/10 + "%";
		str += '\n기ㅤㅤ타 : '+ Math.floor( ( exit ) / all*1000)/10 + "%";
		
		str += '\n\n세부전적'+ es;
		str += '\nSplit 빈도 : ' + Math.floor( split/splitc *1000 )/10 + "%";
		str += '\nInsurance 빈도 : ' + Math.floor( insur/insurc *1000 )/10 + "%";
		str += '\nInsurance 성공 확률 : ' + Math.floor( (insurc-insurw)/insurc *1000 )/10 + "%";
		str += '\nEvenMoney 빈도 : ' + Math.floor( even/evenc *1000 )/10 + "%";
		str += '\nBlackJack 빈도 : ' + Math.floor( blackjack/all *1000 )/10 + "%";
		str += '\nBlackJack 푸시 빈도 : ' + Math.floor( bpush/all *1000 )/10 + "%";
		str += '\nBlackJack 승리 빈도 : ' + Math.floor( (blackjack-bpush)/all *1000 )/10 + "%";
		str += '\nSurrender 빈도 : ' + Math.floor( sur/all *1000 )/10 + "%";
 		str += '\nDoubleDown 승률 비교 \nWin : ' + Math.floor( ddw/(ddw+ddl+ddp) *1000 )/10 + "%\nLose : "+ Math.floor( ddl/(ddw+ddl+ddp) *1000 )/10 + "%\nPush : "+Math.floor( ddp/(ddw+ddl+ddp) *1000 )/10 +"%\n";
 		str += '\n전체 게임 횟수 : '+all;
 		str += '\nSplit 횟수 : ' + split;
 		str += '\n단순 승리 횟수 : '+win;
 		str += '\nBlackJack 횟수 : '+blackjack;
 		str += '\nBlackJack 푸시 횟수 : '+bpush;
 		str += '\nBlackJack 승리 횟수 : ' + Number(blackjack-bpush);
 		str += '\nPush 횟수 : '+push;
 		str += '\nDoubleDown 승리 횟수 : '+ddw;
 		str += '\nDoubleDown 패배 횟수 : '+ddl;
 		str += '\nDoubleDown 푸시 횟수 : '+ddp;
 		str += '\nSurrender 횟수 : ' + sur;
 		str += '\n패배 횟수 : ' + lose;
 		str += '\n블랙잭 종료 횟수 : ' + exit;
		r.replier.reply(str.replace(/NaN%/g, '데이터 없음'));
		return;
	}else {
		r.replier.reply('알 수 없습니다.');
		return;
	}
}

blackjacksum = function (temp){
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

blackjack = function (r){
	if( Flag.get('gameinfo', r.room) == 0 ){
		var gameinfo = {start : 0,start1 : 0,start2 : 0,start3 : 0,start4 : 0}
		Flag.set('gameinfo', r.room, gameinfo);
	} else {
		var gameinfo = Flag.get('gameinfo', r.room);
	}
	
	if( ( gameinfo.start == 1 || gameinfo.start1 == 1 || gameinfo.start2 ==  1 || gameinfo.start3 ==  1) && r.msg == '!블랙잭종료' ){
		if ( ( gameinfo.starttime + 1000*90 ) < new Date().getTime() ){
			blackjackend(r, gameinfo);
		} else if(gameinfo.playerlist.indexOf(r.sender) != -1 ){
			for(var i in gameinfo.playerlist){
				var temppoint = D.selectForArray('blackjack', 'fexit', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
				D.update('blackjack', {fexit : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
				D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
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
		} else {
			r.replier.reply( (Math.floor( ( gameinfo.starttime + 1000*90 ) - new Date().getTime() ) / 1000 ) + '초 뒤에 강제종료가 가능합니다.');
		}
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
		var figure = ["\u2663\uFE0F","\u2660\uFE0F","\u2666\uFE0F","\u2665\uFE0F"];
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
			if(gameinfo['player'+i].card[0][1] == gameinfo['player'+i].card[1][1]){
				var temp = D.selectForArray('blackjack', 'splitc', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
	            D.update('blackjack', {splitc : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
			}
		}
		r.replier.reply(str.trim());
		for( var i in gameinfo.playerlist){
			if(gameinfo['player'+i].sum == 21){
				gameinfo['player'+i].state = 4;
				gameinfo.blackjacklist.push(gameinfo['player'+i].name);
				gameinfo.endcount +=1;
				var temp = D.selectForArray('blackjack', 'blackjack', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
				D.update('blackjack', {blackjack : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				r.replier.reply(gameinfo['player'+i].name + '님의 BlackJack!'+'  ('+gameinfo.endcount+'/'+(gameinfo.playerlist.length+gameinfo.splitdata.length)+')');
			}
		}
		if(gameinfo.dealer.card[0][1] == 'A'){
			for(var i in gameinfo.playerlist){
				var temp = D.selectForArray('blackjack', 'insurc', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
				D.update('blackjack', {insurc : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
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
				java.lang.Thread.sleep(800);
				gameinfo.start4 = 0;
				str += '딜러의 BlackJack!\n';
				str += '⤷[' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + '] ('+gameinfo.dealer.sum +')';
				r.replier.reply( str );
				var str = '';
				for( var i in gameinfo.playerlist){
					var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
					var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room] )[0][0];
					if(gameinfo['player'+i].sum == 21 && gameinfo['player'+i].state == 4){
						str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						var temppoint = temppoint1;
						var temp = D.selectForArray('blackjack', 'bpush', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
						D.update('blackjack', {bpush : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
					} else {
						str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
						var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
						D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
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
					java.lang.Thread.sleep(800);
					gameinfo.start4 = 0;
					str += '딜러의 BlackJack!\n';
					str += '딜러 ('+gameinfo.dealer.sum +')\n⤷[' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + ']\n';
					for( var i in gameinfo.playerlist){
						if( gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 1){
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : EvenMoney\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						} else if( gameinfo['player'+i].state == 4){
							var temp = D.selectForArray('blackjack', 'bpush', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {bpush : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : BlackJack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						} else {
							var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
						}
					}
					for(var i in gameinfo.playerlist){
						var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
						D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room] )[0][0];
						if (gameinfo['player'+i].insurance == 1 && gameinfo.blackjacklist.indexOf(r.sender) != -1) {//블랙잭 & 이븐머니
							var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
						} else if (gameinfo['player'+i].insurance == 0 && gameinfo.blackjacklist.indexOf(r.sender) == -1) {//블랙잭x & 보험x
							var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
							var temp = D.selectForArray('blackjack', 'insurw', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {insurw : temp }, 'name=? and room=?', [gameinfo['player'+i].name,r.room] );
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
							var temp = D.selectForArray('blackjack', 'insurw', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {insurw : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
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
		if((r.msg == '스플릿' || r.msg == 'ㅅㅍㄹ') && gameinfo['player'+num].card.length == 2 && gameinfo['player'+num].card[0][1] == gameinfo['player'+num].card[1][1] && gameinfo['player'+num].splitcount < 3 ){
			var temp = D.selectForArray('blackjack', 'split', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
			D.update('blackjack', {split : temp }, 'name=? and room=?', [gameinfo['player'+num].name, r.room] );
			if(gameinfo['player'+num].card[0][1] == 'A' && gameinfo['player'+num].splitcount == 0){
				gameinfo['player'+num].splitcount += 3;
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
			if(gameinfo['player'+num].card[0][1] == gameinfo['player'+num].card[1][1]){
				var temp = D.selectForArray('blackjack', 'splitc', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
	            D.update('blackjack', {splitc : temp }, 'name=? and room=?', [gameinfo['player'+num].name, r.room] );
			}
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
						if(gameinfo['player'+num].card[0][1] == gameinfo['player'+num].card[1][1]){
							var temp = D.selectForArray('blackjack', 'splitc', 'name=? and room=?', [gameinfo['player'+num].name, r.room])[0][0]+1;
				            D.update('blackjack', {splitc : temp }, 'name=? and room=?', [gameinfo['player'+num].name, r.room] );
						}
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
		} else if ( (r.msg == '스플릿' || r.msg == 'ㅅㅍㄹ') && gameinfo['player'+num].splitcount > 3) {
			r.replier.reply('Split을 더 이상 할 수 없습니다.');
			return;
		} else if ( r.msg == '스플릿' || r.msg == 'ㅅㅍㄹ') {
			r.replier.reply('Split을 할 수 있는 패가 아닙니다.');
			return;
		}
		
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

blackjackend = function (r, gameinfo){
	r.replier.reply('게임종료!');
	gameinfo.start4 = 1;
	java.lang.Thread.sleep(1200);
	gameinfo.start4 = 0;
	if((gameinfo.playerlist.length + gameinfo.splitdata.length == 1) && (gameinfo['player0'].state == 7 || gameinfo['player0'].state == 1 || gameinfo['player0'].state == 4 )){
		var str = '';
		var temp = gameinfo.dealer.card.map(v=>v[1]);
		var sum = blackjacksum(temp);
		gameinfo.dealer.sum = sum;
		str += '딜러의 카드 ('+gameinfo.dealer.sum +')\n⤷[' + gameinfo.dealer.card.map(v=>v.join(' ')).join(' | ') + ']';
		r.replier.reply(str);
		gameinfo.start4 = 1;
		java.lang.Thread.sleep(1500);
		gameinfo.start4 = 0;
	} else {
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
			java.lang.Thread.sleep(1500);
			gameinfo.start4 = 0;
			if(sum < 17){
				var rand = Math.floor(Math.random()*Flag.get('cards', r.room).length);
				gameinfo.dealer.card.push(Flag.get('cards', r.room).splice(rand,1)[0]);
			} else{
				gameinfo.dealer.sum = sum;
				break;
			}
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
					var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 0){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet*1.5);
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : EvenMoney\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
				} else if (gameinfo['player'+i].state == 5){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Surrender\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet/2);
					var temp = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {sur : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo['player'+i].state == 6){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownWin\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet * 2);
					var temp = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {ddw : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo['player'+i].state == 7){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownLose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet * 2);
					var temp = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {ddl : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else {
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Win\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {win : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
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
							var tempc = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {lose : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if (temp[j].state == 4 && temp[j].insurance == 0){
							str += temp[j].name+'님 ('+temp[j].sum+') : Blackjack\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet*1.5);
						} else if (temp[j].state == 4 && temp[j].insurance == 1 ){
							str += temp[j].name+'님 ('+temp[j].sum+') : EvenMoney\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
						} else if (temp[j].state == 5){
							str += temp[j].name+'님 ('+temp[j].sum+') : Surrender\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet/2);
							var tempc = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {sur : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if (temp[j].state == 6){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownWin\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet * 2);
							var tempc = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {ddw : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if (temp[j].state == 7){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownLose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet * 2);
							var tempc = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {ddl : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else {
							str += temp[j].name+'님 ('+temp[j].sum+') : Win\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {win : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						}
						D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						str += String(temppoint1).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
					}
				}
			}
		} else if( gameinfo.dealer.sum < 22 ){
			for( var i in gameinfo.playerlist){
				var even = 0;
				var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0];
				if(gameinfo['player'+i].state == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo['player'+i].state == 5){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Surrender\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet/2);
					var temp = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {sur : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				}  else if (gameinfo['player'+i].state == 6 && gameinfo.dealer.sum < gameinfo['player'+i].sum){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownWin\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet*2);
					var temp = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {ddw : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo['player'+i].state == 6 && gameinfo.dealer.sum == gameinfo['player'+i].sum){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownPush\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var temp = D.selectForArray('blackjack', 'ddp', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {ddp : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if ((gameinfo['player'+i].state == 6 && gameinfo.dealer.sum > gameinfo['player'+i].sum) || gameinfo['player'+i].state == 7 ){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : DoubleDownLose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet*2);
					var temp = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {ddl : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 0){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet*1.5);
				} else if (gameinfo['player'+i].state == 4 && gameinfo['player'+i].insurance == 1){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : EvenMoney\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var even = gameinfo['player'+i].bet;
				} else if (gameinfo['player'+i].state == 4 && gameinfo.dealer.sum == gameinfo['player'+i].sum) {
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var temp = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {push : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if( gameinfo.dealer.sum < gameinfo['player'+i].sum && gameinfo['player'+i].state != 1 ){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Win\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1+Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {win : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else if (gameinfo.dealer.sum == gameinfo['player'+i].sum){
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1;
					var temp = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {push : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				} else {
					str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Lose\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
					var temppoint = temppoint1-Number(gameinfo['player'+i].bet);
					var temp = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
					D.update('blackjack', {lose : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				}
				D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
				str += String(Number(temppoint1-even)).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
				if( gameinfo['player'+i].splitcount > 0 ){
					var temp = gameinfo.splitdata.filter(v=>v.name == gameinfo['player'+i].name);
					for(var j in temp) {
						var even = 0;
						var temppoint1 = D.selectForArray('blackjack', 'point', 'name=? and room=?', [temp[j].name, r.room])[0][0];
						if(temp[j].state == 1){
							str += temp[j].name+'님 ('+temp[j].sum+') : Lose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {lose : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if (temp[j].state == 5) {
							str += temp[j].name+'님 ('+temp[j].sum+') : Surrender\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet/2);
							var tempc = D.selectForArray('blackjack', 'sur', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {sur : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						}  else if (temp[j].state == 6 && gameinfo.dealer.sum < temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownWin\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet*2);
							var tempc = D.selectForArray('blackjack', 'ddw', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {ddw : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if (temp[j].state == 6 && gameinfo.dealer.sum == temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownPush\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
							var tempc = D.selectForArray('blackjack', 'ddp', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {ddp : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if ( (temp[j].state == 6 && gameinfo.dealer.sum > temp[j].sum ) || temp[j].state == 7){
							str += temp[j].name+'님 ('+temp[j].sum+') : DoubleDownLose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet*2);
							var tempc = D.selectForArray('blackjack', 'ddl', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {ddl : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						}  else if (temp[j].state == 4 && temp[j].insurance == 0){
							str += temp[j].name+'님 ('+temp[j].sum+') : Blackjack\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet*1.5);
						} else if (temp[j].state == 4 && temp[j].insurance == 1 ){
							str += temp[j].name+'님 ('+temp[j].sum+') : EvenMoney\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var even = gameinfo['player'+i].bet
							var temppoint = temppoint1;
						} else if (gameinfo['player'+i].state == 4 && gameinfo.dealer.sum == gameinfo['player'+i].sum) {
							str += gameinfo['player'+i].name+'님 ('+gameinfo['player'+i].sum+') : Blackjack/Push\n⤷[' + gameinfo['player'+i].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
							var tempc = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {push : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if( gameinfo.dealer.sum < temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : Win\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1+Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'win', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {win : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else if (gameinfo.dealer.sum == temp[j].sum){
							str += temp[j].name+'님 ('+temp[j].sum+') : Push\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1;
							var tempc = D.selectForArray('blackjack', 'push', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {push : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						} else {
							str += temp[j].name+'님 ('+temp[j].sum+') : Lose\n⤷[' + temp[j].card.map(v=>v.join(' ')).join(' | ')+']\n';
							var temppoint = temppoint1-Number(temp[j].bet);
							var tempc = D.selectForArray('blackjack', 'lose', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
							D.update('blackjack', {lose : tempc }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						}
						D.update('blackjack', {point : temppoint }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
						str += String(Number(temppoint1-even)).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,") + ' → ' + String(D.selectForArray('blackjack', 'point', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]).replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")+'\n\n';
					}
				}
			}
		}
	}
	
	for(var i in gameinfo.playerlist){
		var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo['player'+i].name, r.room])[0][0]+1;
		D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo['player'+i].name, r.room] );
	}
	
	for(var i in gameinfo.splitdata){
		var temp = D.selectForArray('blackjack', 'allp', 'name=? and room=?', [gameinfo.splitdata[i].name, r.room])[0][0]+1;
		D.update('blackjack', {allp : temp }, 'name=? and room=?', [gameinfo.splitdata[i].name, r.room] );
	}
	
	r.replier.reply( str.trim() );
	gameinfo = {start : 0,start1 : 0,start2 : 0,start3 : 0,start4 : 0}
	Flag.set('gameinfo', r.room, gameinfo);
}