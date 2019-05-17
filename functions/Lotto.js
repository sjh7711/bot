lotto(r) {
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