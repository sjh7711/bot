function deleteimage(r){
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
