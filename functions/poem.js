poem = function (r) {
	var poemlist = D.selectForArray('poemlist', null, "name = ? and room = ?", [r.sender, r.room]);
	var str = poemlist[0][0]+'님에게 온 쪽지' + es + '\n\n쪽지목록\n======================================';
	for(var i in poemlist){
		str += '\n' + (Number(i)+Number(1)) + '.\n' + poemlist[i][2] + '\n\n발신인 : ' + poemlist[i][4] + '\n발신시간 : ' + poemlist[i][3]
		str += '\n======================================'
	}
	Api.replyRoom(r.room, str);
	D.delete("poemlist", "name=? and room=?", [r.sender, r.room])
}

poemsend = function (r) {
	if(r.msg.split('\n').length > 1){
		var name = r.msg.split('\n')[0].substr(4);
		var text = r.msg.substr(r.msg.split('\n')[0].length+1);
		if(text.length == 0){
			r.replier.reply('쪽지의 내용이 너무 짧습니다.');
			return;
		}
		D.insert("poemlist", {name : name, room : r.room, text : text, time : time().now, sender : r.sender, timecheck : new Date().getTime()})
		r.replier.reply( name + '님에게 보낼 쪽지가 전달 되었습니다.')
	} else {
		r.replier.reply('쪽지의 형식이 잘못 되었습니다.')
	}
}

poemclean = function (r) {
	var count = 0;
	var pstr = '';
	var now = new Date().getTime();
	var poemlist = D.selectForArray('poemlist')
	for(var i in poemlist){
		if( now - poemlist[i][5] > 86400000*3 ){
			pstr += '수신자 : ' + poemlist[i][0] + '\n발신인 : ' + poemlist[i][4] + '\n방 : ' + poemlist[i][1] + '\n내용 : ' + poemlist[i][2] + '\n발신시간 : ' + poemlist[i][3] + '\n\n';
			D.delete("poemlist", "name=? and room=? and timecheck = ?", [poemlist[i][0], poemlist[i][1], poemlist[i][5]])
			count += 1;
		}
	}
	if(count > 0) {
		Api.replyRoom('관리', count + '개의 쪽지가 삭제되었습니다.\n\n세부목록' + es + '\n' + pstr )
	} else {
		Api.replyRoom('관리', '삭제할 쪽지가 없습니다.' )
	}
}

poemlistcheck = function (r) {
	var pstr = '';
	var poemlist = D.selectForArray('poemlist')
	for(var i in poemlist){
		pstr += (Number(i)+Number(1)) + '.\n수신자 : ' + poemlist[i][0] + '\n발신인 : ' + poemlist[i][4] + '\n방 : ' + poemlist[i][1] + '\n내용 : ' + poemlist[i][2] + '\n발신시간 : ' + poemlist[i][3] + '\n\n';
	}
	Api.replyRoom('관리', '세부목록\n' + es + '\n' + pstr )
}