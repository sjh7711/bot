inform = function (r){
	if(D.selectForArray('baseball',null,'name=? and room=?',[r.sender, r.room])!=undefined){
		var wincount = D.selectForArray('baseball', 'win','name=? and room=?',[r.sender, r.room])[0][0];
		var losecount = D.selectForArray('baseball', 'lose','name=? and room=?',[r.sender, r.room])[0][0];
		var str = '';
		str += r.sender+'님의 정보';
		str += '\n순위 : '+Number(D.selectForArray('baseball',['name','point'], 'room=?', [r.room], {orderBy:"point desc"}).map(v=>v[0]).indexOf(r.sender)+1) + '등';
		str += '\n포인트 : '+D.selectForArray('baseball', 'point','name=? and room=?',[r.sender, r.room])[0][0];
		str += '\n전적 : '+wincount+'승 / '+losecount+'패';
		str += '\n승률 : '+ Math.floor( wincount / (losecount + wincount)*1000)/10 + "%";
		str += '\n초기화카운트 : '+ Number(2 - D.selectForArray('baseball', 'clear', 'name=? and room=?',[r.sender, r.room]));
		r.replier.reply(str);
		return;
	}else {
		r.replier.reply('알 수 없습니다.');
		return;
	}
}

baseball = function (r){
	if(Flag.get('supposelist', r.room) == 0 && r.msg == '!힌트' && Flag.get('baseball', r.room)[Flag.get('k', r.room)] == r.sender ){
		r.replier.reply('힌트를 쓰려면 8턴이 지나야 합니다.');
		return;
	}
	if(Flag.get('supposelist', r.room) != 0){
		if( r.msg == '!힌트' && Flag.get('supposelist', r.room).split('\n').length-1 > 7  && Flag.get('baseball', r.room)[Flag.get('k', r.room)] == r.sender){
			var str = '';
			str += Flag.get('baseball', r.room)[Flag.get('k', r.room)]+' | '+D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room] )[0][0]+' → ';
			var temppoint = D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room] )[0][0]-500;
			D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room]);
			str += D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[Flag.get('k', r.room)], r.room] )[0][0];
			
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
	
	
	if( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && r.msg == '!야구종료' && Flag.get('baseball', r.room).length > 1 ){
		for(var i=0 ; i<Flag.get('baseball', r.room).length ; i++ ){
			if(r.sender == Flag.get('baseball', r.room)[i]){
				Flag.set('start', r.room, 0);
				Flag.set('start1', r.room, 0);
				Flag.set('start2', r.room, 0);
				Flag.set('supposelist', r.room, '');
				var str = '';
				str += '게임이 종료되었습니다. 새로운 게임이 가능합니다.';
				if(Flag.get('answer', r.room)!=0){
					str += ' 정답은 '+Flag.get('answer', r.room).join('')+'입니다.';
				}
				r.replier.reply(str);
				return;
			}
		}
		if((Flag.get('baseballtime', r.room ) + 1000*8*60 ) < new Date().getTime() ){
			Flag.set('start', r.room, 0);
			Flag.set('start1', r.room, 0);
			Flag.set('start2', r.room, 0);
			Flag.set('supposelist', r.room, '');
			var str = '';
			str += '게임이 종료되었습니다. 새로운 게임이 가능합니다.';
			if(Flag.get('answer', r.room)!=0){
				str += ' 정답은 '+Flag.get('answer', r.room).join('')+'입니다.';
			}
			r.replier.reply(str);
			return;
		}else {
			r.replier.reply( (Math.floor( (Flag.get('baseballtime', r.room ) + 1000*60*8 - new Date().getTime()) / 1000 )) + '초 뒤에 강제종료가 가능합니다.');
			return;
		}
	}
	
	if( (Flag.get('start', r.room) == 1 || Flag.get('start1', r.room) == 1 ||  Flag.get('start2', r.room) ==  1) && r.msg == '!야구종료' && Flag.get('baseball', r.room).length == 1 ){
		Flag.set('start', r.room, 0);
		Flag.set('start1', r.room, 0);
		Flag.set('start2', r.room, 0);
		Flag.set('supposelist', r.room, '');
		var str = '';
		str += '게임이 종료되었습니다. 새로운 게임이 가능합니다.';
		if(Flag.get('answer', r.room)!=0){
			str += ' 정답은 '+Flag.get('answer', r.room).join('')+'입니다.';
		}
		r.replier.reply(str);
		return;
	}

	if( r.msg == '!야구'){
		if(Flag.get('start', r.room) == 0 && Flag.get('start1', r.room) == 0 &&  Flag.get('start2', r.room) ==  0 && D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] >= 1000  ){
			r.replier.reply('게임을 시작합니다. 참여할 사람은 [참가] 를 입력해주세요. 시작하려면 [시작]을 입력해주세요.');
			Flag.set('baseballtime', r.room, new Date().getTime());
			Flag.set("start", r.room, 1);
			Flag.set("suggest", r.room, r.sender);
			var temp = [r.sender];
			Flag.set("baseball", r.room , temp);
			r.replier.reply(r.sender+"님("+D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0]+")이 참가하셨습니다. 현재 "+temp.length+'명');
		}else if( D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] < 1000 ){
			r.replier.reply('포인트가 부족합니다. [!전적초기화]를 통해 전적을 초기화 하세요.')
		}
		else {
			r.replier.reply('게임이 진행중입니다.');
			return;
		}
	}
	
	if (r.msg == '참가' && Flag.get("start", r.room) == 1 ){
        if( Flag.get('baseball', r.room).indexOf(r.sender)==-1 && Flag.get('baseball', r.room).length < 3 && D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] >= 1000 ){//||
            var temp = Flag.get('baseball', r.room);
            temp.push(r.sender);
            Flag.set("baseball", r.room , temp);
            r.replier.reply(r.sender+"님("+D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0]+")이 참가하셨습니다. 현재 "+temp.length+'명');
        } else if (D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0] < 1000 ){
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
		if(Flag.get('baseball', r.room).length > 1){
			r.replier.reply(Flag.get('baseball', r.room)[Flag.get('k', r.room)] + '님 차례입니다.');
		}
		Flag.set('start2', r.room, 1);
		Flag.set('passtime', r.room, new Date().getTime());
		return;
	}
	
	if(Flag.get('start2', r.room) == 1 && Flag.get('baseball', r.room)[Flag.get('k', r.room)]==r.sender && /^\d+$/.test(r.msg)) {
		if( String(r.msg).split('').length != 4 ){
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
						str += Flag.get('baseball', r.room)[i]+' | '+D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )[0][0]+' → ';
						var temppoint = D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )[0][0]-1000;
						D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
						str += D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )[0][0] + ' \n';
					} else {
						str += Flag.get('baseball', r.room)[i]+' | '+D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )[0][0]+' → ';
						var temppoint = D.selectForArray('baseball', 'point', 'name=? and room=?', [r.sender, r.room])[0][0]+Number(Flag.get('baseball', r.room).length*1100) - 1000;
						D.update('baseball', {point : temppoint }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
						str += D.selectForArray('baseball', 'point', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room] )[0][0] + ' \n';
					}
				}
				
				r.replier.reply(str+'     <'+r.sender+'님 정답!>');
				
				if(Flag.get('baseball', r.room).length > 1){
					var tempwin = D.selectForArray('baseball', 'win',  'name=? and room=?', [r.sender, r.room])[0][0]+1;
					D.update('baseball', {win : tempwin }, 'name=? and room=?', [r.sender, r.room]);
					
					for(var i=0;i<Flag.get('baseball', r.room).length;i++){
						if(Flag.get('baseball', r.room)[i] != r.sender){
							var templose = D.selectForArray('baseball', 'lose', 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room])[0][0]+1;
							D.update('baseball', {lose : templose }, 'name=? and room=?', [Flag.get('baseball', r.room)[i], r.room]);
						}
					}
				} else {
					var tempwin = D.selectForArray('baseball', 'solowin',  'name=? and room=?', [r.sender, r.room])[0][0]+1;
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
			if(Flag.get('baseball', r.room).length > 1){
				r.replier.reply(Flag.get('baseball', r.room)[Flag.get('k', r.room)] + '님 차례입니다.');
			}
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