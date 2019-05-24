var ttt=new Date();
var cycle = 4000;
D.myDB.beginTransaction();
var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select('div.win_result');
var num = raw.select('h4').text().split('회')[0]*1+1;
var str = '';
var acycle = cycle;
var kcycle = (Math.floor(cycle / 100)+1);
for(var k = 0 ; k < kcycle ; k++){
	if (cycle == 0 ){
		break;
	} else if(cycle<100){
		var icycle = cycle;
	} else {
		var icycle = 100;
	} 
	var str1 = '';
	for(var j = 0 ; j < icycle ; j++){
		var templotto = [0, 0, 0, 0, 0, 0];
        for (i = 0; i < 6; i++) {
            v = Math.floor(Math.random() * 45) + 1;
            if (templotto[v % 6] == 0) {
                templotto[v % 6] = v;
                continue;
            } else {
                loopval = 0;
                while (true) {
                    if (loopval > 5) {
                        break;
                    }
                    if (templotto[(v + loopval) % 6] == 0) {
                        templotto[(v + loopval) % 6] = v;
                        break;
                    } else {
                        if (templotto[(v + loopval) % 6] == v) {
                            i--;
                            break;
                        } else {
                            loopval++;
                        }
                    }
                }
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

		str1 += "('"+r.room+"','"+r.sender+"','"+year+"','"+month+"','"+date+"','"+hour+"','"+minute+"','"+num+"','"+templotto[0]+"','"+templotto[1]+"','"+templotto[2]+"','"+templotto[3]+"','"+templotto[4]+"','"+templotto[5]+"','-1',"+"''"+"),"
	}
	D.execSQL("INSERT INTO lotto (room,sender,year,month,date,hour,minute,num,num1,num2,num3,num4,num5,num6,count,class) VALUES "+ str1.substr(0,str1.length-1));
	cycle -= icycle;
}
D.myDB.setTransactionSuccessful();
D.myDB.endTransaction();
str+= r.sender+'님이 '+acycle+'개의 로또를 뽑았습니다.';
r.replier.reply(str + ' time : ' + (new Date()-ttt));		