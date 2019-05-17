function flottocheck(r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var lastnum = Number(raw.select('h4').text().split('회')[0]) + 1;
	var money = D.selectForArray('lottomoney', null, "num=?", [lastnum-1])[0];
	var win = raw.select('p').get(1).text().split(" ").slice().map(v=>Number(v));
	var bonus = Number(raw.select('p').get(2).text());
	var date = raw.select('p').get(0).text().replace("(","").replace(" 추첨)","").slice();
	var lottodata = D.selectForArray('lotto',null,'num=? and sender=? and room=?', [lastnum, r.sender, r.room]);
	var failcount=0;
	var str1='\n';
	var one = 0;
	var str2='\n';
	var two = 0;
	var str3='\n';
	var three = 0;
	var str4='\n';
	var four = 0;
	var str5='\n';
	var five = 0;
	for(var i=0;i<lottodata.length;i++){
		var count = 0;
		var tempdata = lottodata[i].slice(8,14);
		for(var j=0;j<6;j++){
			if(tempdata.indexOf(win[j]) > -1 ){
				count+=1;
			}
		}
		if(count == 5 && tempdata.indexOf(bonus) > -1 ){
			count+=2;	
		}
		if(count==0||count==1||count==2){
			failcount += 1;
		}else if(count==3){
			str5+= lottodata[i].slice(2,5).join(' ')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			five += 1;
		}else if(count==4){
			str4+= lottodata[i].slice(2,5).join(' ')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			four += 1;
		}else if(count==5){
			str3+= lottodata[i].slice(2,5).join(' ')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			three += 1;
		}else if(count==7){
			str2+= lottodata[i].slice(2,5).join(' ')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			two += 1;
		}else if(count==6){
			str1+= lottodata[i].slice(2,5).join(' ')+' '+lottodata[i].slice(5,7).join(':')+' | '+lottodata[i].slice(8,14).join(' ')+'\n';
			one += 1;
		}
	}
	
	var all = lottodata.length;
	if(all == 0){
		r.replier.reply('로또를 뽑은 뒤 다시 시도하세요.');
		return;
	}
	var result = '';
	var getmoney = Number(five*5000+four*50000+three*money[3]+two*money[2]+one*money[1]);
	
	var v = getmoney;
	var getmoney1 = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');

	result+='1등 확률 : '+Number((Math.floor(one/all*1000000000000)/10000000000).toFixed(12))+"%("+one+")"+"\n";
	result+='2등 확률 : '+Number((Math.floor(two/all*1000000000000)/10000000000).toFixed(12))+"%("+two+")"+"\n";
	result+='3등 확률 : '+Number((Math.floor(three/all*1000000000000)/10000000000).toFixed(12))+"%("+three+")"+"\n";
	result+='4등 확률 : '+Number((Math.floor(four/all*1000000000000)/10000000000).toFixed(12))+"%("+four+")"+"\n";
	result+='5등 확률 : '+Number((Math.floor(five/all*1000000000000)/10000000000).toFixed(12))+"%("+five+")"+'\n';
	var v = all*1000;
	var lost = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');
	result+='\n쓴ㅤ돈 : '+ lost + '\n당첨금 : '+ getmoney1 +'\n';
	result+='회수율 : '+ Math.floor(getmoney/(all*1000)*100000)/1000+'%     '+es+'\n\n';
	result+='저번주 당첨 번호\n'+win.join(' ')+' / '+bonus+'\n\n';
	money = money.map(v=> (Math.floor(v/100000000) > 0 ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' :  Math.floor(v/10000%10000)+'만 '+v%10000+'원').replace(' 0원', '원'));
	result+='저번주 당첨금\n1등 : '+money[1]+'\n2등 : '+money[2]+'\n3등 : '+money[3]+'\n4등 : 5만원\n5등 : 5천원\n\n';
	result+='1등 개수 : '+one+'\n'+str1+'\n'+
	'2등 개수 : '+two+'\n'+str2+'\n'+
	'3등 개수 : '+three+'\n'+str3+'\n'+
	'4등 개수 : '+four+'\n'+str4+'\n'+
	'5등 개수 : '+five+'\n'+str5+'\n'+
	'꽝 개수 : '+failcount+'\n';
	r.replier.reply(r.sender+'님의 이번주 번호가 저번주 번호라면?(개수 : '+lottodata.length+')\n'+result);
}