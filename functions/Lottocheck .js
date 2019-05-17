lottocheck(r) {
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