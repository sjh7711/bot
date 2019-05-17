checkimage(r){
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