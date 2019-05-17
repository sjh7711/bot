function allbestlotto(r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var result = "명예의 전당 | ";
	var temp = D.selectForArray('lotto', null, 'count > 3 ', null , {orderBy:"class asc"});
	var all = D.selectForArray('lotto', "count(*)" , ' num < ?',  [num])[0][0];
	var five = D.selectForArray('lotto', "count(*)", 'count = 3')[0][0];
	var four = D.selectForArray('lotto', "count(*)", 'count = 4 ')[0][0];
	var three = D.selectForArray('lotto', "count(*)", 'count = 5 ')[0][0];
	var two = D.selectForArray('lotto', "count(*)", 'count = 7 ')[0][0];
	var one = D.selectForArray('lotto', "count(*)", 'count = 6')[0][0];
	var getmoney = 0;
	for(var i = D.selectForArray('lottomoney')[0][0]; i < D.selectForArray('lottomoney')[0][0]+D.selectForArray('lottomoney', "count(*)")[0][0] ; i++ ){
		var money = D.selectForArray('lottomoney', null, 'num = ?', [i])[0];
		var five1 = D.selectForArray('lotto', "count(*)", 'count = 3 and num =?',  [i])[0][0];
		var four1 = D.selectForArray('lotto', "count(*)", 'count = 4 and num =?',  [i])[0][0];
		var three1 = D.selectForArray('lotto', "count(*)", 'count = 5 and num =?',  [i])[0][0];
		var two1 = D.selectForArray('lotto', "count(*)", 'count = 7 and num =?',  [i])[0][0];
		var one1 = D.selectForArray('lotto', "count(*)", 'count = 6 and num =?',  [i])[0][0];
		getmoney += one1*money[1]+two1*money[2]+three1*money[3]+four1*money[4]+five1*money[5];
	}
	
	var v = getmoney;
	var getmoney1 = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');
	
	result+='로또 뽑은 횟수 : '+all+'\n';
	result+='1등 확률 : '+Number((Math.floor(one/all*1000000000000)/10000000000).toFixed(12))+"%("+one+")\n";
	result+='2등 확률 : '+Number((Math.floor(two/all*1000000000000)/10000000000).toFixed(12))+"%("+two+")\n";
	result+='3등 확률 : '+Number((Math.floor(three/all*1000000000000)/10000000000).toFixed(12))+"%("+three+")\n";
	result+='4등 확률 : '+Number((Math.floor(four/all*1000000000000)/10000000000).toFixed(12))+"%("+four+")\n"
	result+='5등 확률 : '+Number((Math.floor(five/all*1000000000000)/10000000000).toFixed(12))+"%("+five+")\n";
	var v = all*1000;
	var lost = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');
	result+='\n쓴ㅤ돈 : '+ lost + '\n당첨금 : '+ getmoney1 +'\n';
	result+='회수율 : '+ Math.floor(getmoney/(all*1000)*100000)/1000+'%    ';
	
	var str1 ='\n';
	var str2 ='\n';
	var str3 ='\n';
	var str4 ='\n';
	
	if ( r.room == 'test'){
		result += "\n"+es+"\n";
		for(var i=0; i<temp.length; i++){
			if(temp[i][14]==4){
				str4+= temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][7] + "회차\n\n";
			}else if(temp[i][14]==5){
				str3+= temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][7] + "회차\n\n";
			}else if(temp[i][14]==7){
				str2+= temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][7] + "회차\n\n";
			}else if(temp[14]==6){
				str1+= temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][7] + "회차\n\n";
			}
		}
		result += '1등 개수 : '+one+'\n'+str1+'\n'+
		'2등 개수 : '+two+'\n'+str2+'\n'+
		'3등 개수 : '+three+'\n'+str3+'\n'+
		'4등 개수 : '+four+'\n'+str4+'\n'+
		'5등 개수 : '+five+'\n\n'+
		'꽝 개수 : '+Number(all-(one+two+three+four+five))+'\n';
	}
	if (result.length > 100000){
		result = result.substr(0,100000);
	}
	r.replier.reply(result);
}