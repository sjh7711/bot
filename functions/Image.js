checkimage = function (r){
	var imagelist = File("/sdcard/KakaoTalkDownload").listFiles();
	var temp = [];
	for(i=imagelist.length-1;i>-1;i--){
		if(String(imagelist[i]).indexOf(r.msg.substr(6))>-1) {
			temp.push(imagelist[i]);
		}
	}
	if(temp.length == 0){
		r.replier.reply('검색결과가 없습니다.');
		return;
	}
	var i = 1;
	r.replier.reply('파일 개수 : '+temp.length+'\n'+temp.map(v=> (i++)+'. ' + String(v).substr(26)).join('\n'));
}

deleteimage= function (r){
	var temp = java.io.File("/sdcard/KakaoTalkDownload").listFiles();
	var delist = [];
	for(i=0;i<temp.length;i++){
		if(String(temp[i]).indexOf(r.msg.substr(6))>-1) {
			File(temp[i]).delete();
			delist.push(temp[i]);
		}
	}
	r.replier.reply(delist.length+'개 삭제 완료\n'+delist.join('\n'));
}

loadimage= function (r){
	if(Flag.get('image', r.room)==0){
		Flag.set('imagelist', r.room, File("/sdcard/KakaoTalkDownload").listFiles());
		var temp = [];
		for(i=Flag.get('imagelist', r.room).length-1;i>-1;i--){
			if(String(Flag.get('imagelist', r.room)[i]).indexOf(r.msg.substr(6))>-1) {
				temp.push(Flag.get('imagelist', r.room)[i]);
			}
		}
		if(temp.length == 0){
			r.replier.reply('검색결과가 없습니다.');
			return;
		}
		Flag.set('imagelist', r.room, temp);
		var i = 1;
		r.replier.reply('파일 개수 : '+Flag.get('imagelist', r.room).length+'\n번호를 선택하세요.\n'+Flag.get('imagelist', r.room).map(v=> (i++)+'. ' + String(v).substr(26)).join('\n'));
		Flag.set('image', r.room, 1);
	} else if ( Flag.get('image', r.room)== 1){
		if(!isNaN(r.msg)){
			r.replier.reply('https://codebeautify.org/base64-to-image-converter');
			r.replier.reply(read64(String(Flag.get('imagelist', r.room)[Number(r.msg)-1]) ) );
			Flag.set('image', r.room, 0);
		} else {
			r.replier.reply('숫자를 입력하세요.');
			Flag.set('image', r.room, 0);
		}
	}
}