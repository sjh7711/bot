functionreload function (r){
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
				eval( Flag.get('function', r.room)[Number(r.msg)-1] );
				r.replier.reply(Flag.get('function', r.room)[Number(r.msg)-1] + '리로딩 완료');
				Flag.set('freloadcheck', r.room, 0);
			} else {
				r.replier.reply('숫자를 입력하세요.');
				Flag.set('freloadcheck', r.room, 0);
			}
		}
	}
}