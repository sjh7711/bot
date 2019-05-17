function blackinform(r){
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
		str += '\nInsurance 성공 확률 : ' + Math.floor( insurw/insur *1000 )/10 + "%";
		str += '\nEvenMoney 빈도 : ' + Math.floor( even/evenc *1000 )/10 + "%";
		str += '\nBlackJack 빈도 : ' + Math.floor( blackjack/all *1000 )/10 + "%";
		str += '\nBlackJack 승리 빈도 : ' + Math.floor( (blackjack-bpush)/all *1000 )/10 + "%";
		str += '\nSurrender 빈도 : ' + Math.floor( sur/all *1000 )/10 + "%";
 		str += '\nDoubleDown 승률 비교 \nWin : ' + Math.floor( ddw/(ddw+ddl+ddp) *1000 )/10 + "%\nLose : "+ Math.floor( ddl/(ddw+ddl+ddp) *1000 )/10 + "%\nPush : "+Math.floor( ddp/(ddw+ddl+ddp) *1000 )/10 +"%\n";
 		str += '\n전체 게임 횟수 : '+all;
 		str += '\nSplit 횟수 : ' + split;
 		str += '\n단순 승리 횟수 : '+win;
 		str += '\nBlackJack 횟수 : '+blackjack;
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