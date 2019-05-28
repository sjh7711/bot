mylotto = function (r){
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var temp = D.selectForArray('lotto', ['date', 'lotto'], 'room = ? and name = ? and num = ?' , [r.room , r.sender, num]);
	if(temp.length == 0 ){
		result = '뽑은 번호가 없습니다';
	} else if(temp.length < 5000){
		var result = r.sender+"님이 이번주에 뽑은 로또번호 | "+num+"회차 "+temp.length+"개\n"+es+"\n";
		for(var i=0; i<temp.length; i++){
			result+= (i+1)+". | " + "생성:"+temp[i][0]+" \n"+temp[i][1]+"\n\n";
		}
	} else{
		var result = r.sender+"님이 이번주에 뽑은 로또번호 | "+num+"회차 "+temp.length+"개\n"+es+"\n";
		for(var i=0; i<5000; i++){
			result+= (i+1)+". | " + "생성:"+temp[i][0]+" \n"+temp[i][1]+"\n\n";
		}
	}
	r.replier.reply(result);
}