randomnumber = function (r){
	var num1 = Number(r.msg.split(' ')[1]);
	var num2 = Number(r.msg.split(' ')[2]);
	if(num1 < 0 || num2 < 0 ){
		r.replier.reply('양수만 입력하세요');
		return;
	}
	if (isNaN(num1) && isNaN(num2)){
		num2=100;
		num1=1;
	}
	if (!isNaN(num1) && isNaN(num2)){
		num2=num1;
		num1=1;
	}
	if(num2==num1){
		r.replier.reply(num1);
		return;
	}
	 if( !isNaN(num1) && !isNaN(num2) && (num1 < num2)){
		r.replier.reply(num1 + Math.floor(Math.random() * ( num2 - num1 + 1 ) ));
	} else {
		r.replier.reply('잘못 입력했습니다.');
	}
}