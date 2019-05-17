function translation(r){
	var tempmsg = r.msg.substr(7);
	var templan0 = r.msg.substr(4).split(',')[0][0];
	var templan1 = r.msg.substr(4).split(',')[0][1];
	if (templan0 == '영'){
		templan0 = 'en';
	} else if (templan0 =='한'){
		templan0 = 'ko';
	} else if (templan0 =='일'){
		templan0 = 'ja';
	} else {
		r.replier.reply('번역할 수 없습니다.');
		return;
	}
	if (templan1 == '영'){
		templan1 = 'en';
	} else if (templan1 =='한'){
		templan1 = 'ko';
	} else if (templan1 =='일'){
		templan1 = 'ja';
	} else {
		r.replier.reply('번역할 수 없습니다.');
		return;
	}
	if(templan0 == templan1 ){
		r.replier.reply('번역할 수 없습니다.');
		return;
	}
	
	r.replier.reply(Api.papagoTranslate(templan0,templan1,tempmsg));
}