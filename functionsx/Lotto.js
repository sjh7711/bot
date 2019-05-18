lotto = function (r) {
	try{
		var cycle = 1;
		if( r.msg.substr(4) > 0 && r.msg.substr(4) < 1001 ){
			cycle = Number(r.msg.substr(4));
		}
		var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
		var num = raw.select('h4').text().split('회')[0]*1+1;
		var str = '';
		for(var j = 0 ; j < cycle; j++){
			var templotto = []; //로또번호 담길곳
		    for (var i = 0; i < 100; i++) {
		        var rad = Math.floor(1 + Math.random() * 45); //rad : 1~45중에 뽑히는 숫자
		        if (templotto.indexOf(rad) == -1) {//중복이면 거른다
		            templotto.push(rad);
		        }
		        if (templotto.length == 6) {//6개까지
		            break;
		        }
		    }
		    templotto.sort(compare);
		    
		    if(cycle < 6){
		    	str += Number(j+1)+'. | '+templotto.map(v=>String(v).extension(" ",2)).join(", ")+'\n';
		    }
		    
		    
			var today = new Date();
			var year   = today.getFullYear();
			var month  = today.getMonth() + 1;
			var date   = today.getDate();
			var hour   = today.getHours();
			var minute = today.getMinutes();
			
			date = date < 10 ? '0' + date : date;
			hour = hour < 10 ? '0' + hour : hour;
			minute = minute < 10 ? '0' + minute : minute;
			
		    D.insert('lotto', {room : r.room, sender : r.sender, year: year, month: month, date:date, hour:hour, minute:minute, num:num, num1:templotto[0],num2:templotto[1],num3:templotto[2],num4:templotto[3],num5:templotto[4],num6:templotto[5], count : -1, class : ''});
		}
		str+= r.sender+'님이 '+cycle+'개의 로또를 뽑았습니다.';
		r.replier.reply(str);
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

testlotto = function (r){
	var cycle = 1;
	if( r.msg.substr(4) > 0 && r.msg.substr(4) < 10001 ){
		cycle = Number(r.msg.substr(4));
	}
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var str = '';
	for(var j = 0 ; j < cycle; j++){
		var templotto = []; //로또번호 담길곳
	    for (var i = 0; i < 100; i++) {
	        var rad = Math.floor(1 + Math.random() * 45); //rad : 1~45중에 뽑히는 숫자
	        if (templotto.indexOf(rad) == -1) {//중복이면 거른다
	            templotto.push(rad);
	        }
	        if (templotto.length == 6) {//6개까지
	            break;
	        }
	    }
	    templotto.sort(compare);
	    
	    if(cycle < 6){
	    	str += Number(j+1)+'. | '+templotto.map(v=>String(v).extension(" ",2)).join(", ")+'\n';
	    }
	    
	    
		var today = new Date();
		var year   = today.getFullYear();
		var month  = today.getMonth() + 1;
		var date   = today.getDate();
		var hour   = today.getHours();
		var minute = today.getMinutes();
		
		date = date < 10 ? '0' + date : date;
		hour = hour < 10 ? '0' + hour : hour;
		minute = minute < 10 ? '0' + minute : minute;
		
	    D.insert('lotto', {room : r.room, sender : r.sender, year: year, month: month, date:date, hour:hour, minute:minute, num:num, num1:templotto[0],num2:templotto[1],num3:templotto[2],num4:templotto[3],num5:templotto[4],num6:templotto[5], count : -1, class : ''});
	}
	str+= r.sender+'님이 '+cycle+'개의 로또를 뽑았습니다.';
	r.replier.reply(str);
}

flottocheck = function (r) {
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


lottocheck = function (r) {
	try{
		var doc = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get()
		var raw = doc.select('div.win_result');
		var lastnum = raw.select('h4').text().split('회')[0];
		var win = raw.select('p').get(1).text().split(" ").slice().map(v=>Number(v));
		var bonus = Number(raw.select('p').get(2).text());
		var date = raw.select('p').get(0).text().replace("(","").replace(" 추첨)","").slice();
		var temp = D.selectForArray('lotto', "count(*)", "num=? and count > -1", [lastnum])[0][0];
		
		if(temp == 0){
			if(calculating == 0){
				r.replier.reply('약 '+Number(temp1/200+140)+'초 정도 소요될 예정입니다. 기다려주세요.');
				calculating = 1;
				var money = doc.select('tbody>tr').toArray().map(v=>String(v.select('td.tar').get(1).text()).replace(/[,원]/g, ''));
				D.insert('lottomoney', {num : lastnum , first: money[0], second:money[1], third:money[2], fourth:money[3] ,fifth:money[4]});
				var lottodata = D.selectForArray('lotto', null ,"num=?", [lastnum]);
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
						D.insert('lottot', {room : lottodata[i][0], sender: lottodata[i][1], year: lottodata[i][2], month :lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7],num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:count, class:'꽝'});
					}else if(count==3){
						D.insert('lottot', {room : lottodata[i][0], sender: lottodata[i][1], year: lottodata[i][2], month :lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7],num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:count, class:'5등'});
					}else if(count==4){
						D.insert('lottot', {room : lottodata[i][0], sender: lottodata[i][1], year: lottodata[i][2], month :lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7],num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:count, class:'4등'});
					}else if(count==5){
						D.insert('lottot', {room : lottodata[i][0], sender: lottodata[i][1], year: lottodata[i][2], month :lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7],num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:count, class:'3등'});
					}else if(count==7){
						D.insert('lottot', {room : lottodata[i][0], sender: lottodata[i][1], year: lottodata[i][2], month :lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7],num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:count, class:'2등'});
					}else if(count==6){
						D.insert('lottot', {room : lottodata[i][0], sender: lottodata[i][1], year: lottodata[i][2], month :lottodata[i][3], date:lottodata[i][4], hour:lottodata[i][5], minute:lottodata[i][6], num:lottodata[i][7],num1:lottodata[i][8],num2:lottodata[i][9],num3:lottodata[i][10],num4:lottodata[i][11],num5:lottodata[i][12],num6:lottodata[i][13],count:count, class:'1등'});
					}
				}
				D.delete('lotto', 'num=?', [lastnum]);
				D.rawQuery("INSERT INTO lotto SELECT * FROM lottot");
				D.delete('lottot');
				calculating = 0;
			} else {
				r.replier.reply('로또 결과 연산이 진행중입니다.');
				return;
			}
		}
		
		var money1 = D.selectForArray('lottomoney', null, "num=?", [lastnum])[0];
		
		if( r.msg == "!당첨"){
			if ( D.selectForArray('lotto',"count(*)",'room=? and num=?', [r.room, lastnum])[0][0] == 0 ){
				r.replier.reply('저번주에 로또 번호를 뽑은 사람이 아무도 없습니다.');
				return;
			}
			var temp = D.selectForArray('lotto',null,'room=? and num=?', [r.room, lastnum]);
			var all = D.selectForArray('lotto', "count(*)" , ' num = ? and room = ? ',  [lastnum , r.room])[0][0];
			var five = D.selectForArray('lotto', "count(*)", 'num = ? and count = 3 and room = ? ',  [lastnum ,r.room])[0][0];
			var four = D.selectForArray('lotto', "count(*)", 'num = ? and count = 4 and room = ? ',  [lastnum ,r.room])[0][0];
			var three = D.selectForArray('lotto', "count(*)", 'num = ? and count = 5 and room = ? ',  [lastnum ,r.room])[0][0];
			var two = D.selectForArray('lotto', "count(*)", 'num = ? and count = 7 and room = ? ',  [lastnum , r.room])[0][0];
			var one = D.selectForArray('lotto', "count(*)", 'num = ? and count = 6 and room = ? ',  [lastnum , r.room])[0][0];
		} else if ( r.msg.substr(4).length > 0){
			if ( D.selectForArray('lotto',"count(*)",'room=? and sender=?', [r.room , r.msg.substr(4)])[0][0] == 0 ){
				r.replier.reply(r.msg.substr(4)+"님은 저번주에 로또번호를 뽑은 적이 없습니다.");
				return;
			}
			var temp = D.selectForArray('lotto',null,'room=? and num =? and sender=?', [r.room , lastnum, r.msg.substr(4)]);
			var all = D.selectForArray('lotto', "count(*)" , ' num = ? and room = ? and sender = ? ',  [lastnum , r.room, r.msg.substr(4)])[0][0];
			var five = D.selectForArray('lotto', "count(*)", 'num = ? and count = 3 and room = ? and sender = ? ',  [lastnum ,r.room, r.msg.substr(4)])[0][0];
			var four = D.selectForArray('lotto', "count(*)", 'num = ? and count = 4 and room = ? and sender = ?',  [lastnum ,r.room, r.msg.substr(4)])[0][0];
			var three = D.selectForArray('lotto', "count(*)", 'num = ? and count = 5 and room = ? and sender = ?',  [lastnum ,r.room, r.msg.substr(4)])[0][0];
			var two = D.selectForArray('lotto', "count(*)", 'num = ? and count = 7 and room = ? and sender = ?',  [lastnum , r.room, r.msg.substr(4)])[0][0];
			var one = D.selectForArray('lotto', "count(*)", 'num = ? and count = 6 and room = ? and sender = ?',  [lastnum , r.room, r.msg.substr(4)])[0][0];
		}
		
		var v = all*1000;
		var lost = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');
		
		var v = Number(one*money1[1]+two*money1[2]+three*money1[3]+four*50000+five*5000);
		var getmoney = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');

		var result=date+" "+lastnum+"회\n뽑은 개수 : "+temp.length+"\n당첨번호 : "+win.join(' ')+"/"+bonus+ "\n";
		var money = money1.map(v=> (Math.floor(v/100000000) > 0 ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' :  Math.floor(v/10000%10000)+'만 '+v%10000+'원').replace(' 0원', '원') );
		
		result += '1등 : '+money[1]+'\n2등 : '+money[2]+'\n3등 : '+money[3]+'\n4등 : 5만원\n5등 : 5천원\n\n쓴ㅤ돈 : ' + lost + '\n당첨금 : '+ getmoney  +'\n회수율 : '+ Math.floor(v/all*100)/1000 + '%      ';
		
		var first = '';
		var second = '';
		var third = '';
		var fourth = '';
		var fifth = '';
		
		for(var i=0; i<temp.length; i++){
			if (temp[i][14] == 3) {
				fifth+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 4) {
				fourth+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 5) {
				third+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 6) {
				first+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} else if (temp[i][14] == 7) {
				second+=temp[i][1]+"|생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+" | "+temp[i][15]+"\n\n";
			} 
		}
		result += es+'\n\n1등('+one+')\n'+first+'\n2등('+two+')\n'+second+'\n3등('+three+')\n'+third+'\n4등('+four+')\n'+fourth+'\n5등('+five+')\n'+fifth+'\n꽝('+Number(all-(one+two+three+four+five))+")\n";
		
		r.replier.reply(result);
		
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

bestlotto = function (r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var result = "명예의 전당 | ";
	var temp = D.selectForArray('lotto', null, 'count > 3 and room = ? ',  [r.room] , {orderBy:"class asc"});
	var all = D.selectForArray('lotto', "count(*)" , ' num < ? and room = ? ',  [num , r.room])[0][0];
	var five = D.selectForArray('lotto', "count(*)", 'count = 3 and room = ? ',  [r.room])[0][0];
	var four = D.selectForArray('lotto', "count(*)", 'count = 4 and room = ? ',  [r.room])[0][0];
	var three = D.selectForArray('lotto', "count(*)", 'count = 5 and room = ? ',  [r.room])[0][0];
	var two = D.selectForArray('lotto', "count(*)", 'count = 7 and room = ? ',  [r.room])[0][0];
	var one = D.selectForArray('lotto', "count(*)", 'count = 6 and room = ? ',  [r.room])[0][0];
	var getmoney = 0;
	for(var i = D.selectForArray('lottomoney')[0][0]; i < D.selectForArray('lottomoney')[0][0]+D.selectForArray('lottomoney', "count(*)")[0][0] ; i++ ){
		var money = D.selectForArray('lottomoney', null, 'num = ?', [i])[0];
		var five1 = D.selectForArray('lotto', "count(*)", 'count = 3 and room = ? and num =?',  [r.room, i])[0][0];
		var four1 = D.selectForArray('lotto', "count(*)", 'count = 4 and room = ?  and num =?',  [r.room, i])[0][0];
		var three1 = D.selectForArray('lotto', "count(*)", 'count = 5 and room = ?  and num =?',  [r.room, i])[0][0];
		var two1 = D.selectForArray('lotto', "count(*)", 'count = 7 and room = ?  and num =?',  [r.room, i])[0][0];
		var one1 = D.selectForArray('lotto', "count(*)", 'count = 6 and room = ?  and num =?',  [r.room, i])[0][0];
		getmoney += one1*money[1]+two1*money[2]+three1*money[3]+four1*money[4]+five1*money[5];
	}
	var v = getmoney;
	var getmoney1 = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');
	result+='로또 뽑은 횟수 : '+all+'\n';
	result+='1등 확률 : '+Number((Math.floor(one/all*1000000000000)/10000000000).toFixed(12))+"%("+one+")\n";
	result+='2등 확률 : '+Number((Math.floor(two/all*1000000000000)/10000000000).toFixed(12))+"%("+two+")\n";
	result+='3등 확률 : '+Number((Math.floor(three/all*1000000000000)/10000000000).toFixed(12))+"%("+three+")\n";
	result+='4등 확률 : '+Number((Math.floor(four/all*1000000000000)/10000000000).toFixed(12))+"%("+four+")\n";
	result+='5등 확률 : '+Number((Math.floor(five/all*1000000000000)/10000000000).toFixed(12))+"%("+five+")\n";
	var v = all*1000;
	var lost = ((Math.floor(v/100000000) > 0) ? Math.floor(v/100000000)+'억 ' + Math.floor(v/10000%10000)+'만 '+v%10000+'원' : ((Math.floor(v/10000) > 0) ? Math.floor(v/10000%10000)+'만 '+v%10000+'원' : v+'원')).replace(' 0원', '원');
	result+='\n쓴ㅤ돈 : '+ lost + '\n당첨금 : '+ getmoney1 +'\n';
	result+='회수율 : '+ Math.floor(getmoney/(all*1000)*100000)/1000+'%       '+es+"\n\n";
	
	var str1 ='\n';
	var str2 ='\n';
	var str3 ='\n';
	var str4 ='\n';
	
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
	'5등 개수 : '+five+'\n'+
	'꽝 개수 : '+Number(all-(one+two+three+four+five))+'\n';
	
	if (result.length > 20000){
		result = result.substr(0,20000);
	}
	r.replier.reply(result);
}

allbestlotto = function (r) {
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

mylotto = function (r){
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
	var num = raw.select('h4').text().split('회')[0]*1+1;
	var temp = D.selectForArray('lotto', null, 'room = ? and sender = ? and num = ?' , [r.room , r.sender, num]);
	if(temp.length == 0 ){
		result = '뽑은 번호가 없습니다';
	}else {
		var result = r.sender+"님이 이번주에 뽑은 로또번호 | "+num+"회차\n"+es+"\n";
		for(var i=0; i<temp.length; i++){
			result+= (i+1)+". | " + "생성:"+temp[i].slice(2,5).join('.')+" "+temp[i].slice(5,7).join(':')+" \n"+temp[i].slice(8,14).join(' ')+"\n\n";
		}
	}
	r.replier.reply(result);
}