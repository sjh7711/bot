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