function recentchat(r) {
	try{
		var temp = r.msg.substr(5);
		var temp1 = '';//개수
		var temp2 = '';//이름
		if(temp.length > 0 && temp.indexOf(' ') > -1 && temp.indexOf(' ') <= 2){
			temp1 = temp.split(' ')[0];
			temp2 = temp.substr(temp.indexOf(' ')+1);//닉
		}
		
		if(temp1==''){
			temp1 = 6;
		}
		if( 0 < Number(temp) ){
			temp1 = temp;
		}
	    
	    var list = [r.room];
	    var list1 = 'room=?';
	    var list2 = ['time'];
	    var list3 = 'WHERE room=\''+r.room+'\'';
	    
	    if (temp2 == ''){
	    	list2.push('name');
	    }
	    list2.push('msg');
	    
	    
	    if (temp2 != ''){
	    	list1 += ' and name=?';
	    	list.push(temp2);
	    	list3 += ' and name=\'' + temp2 + '\'';
	    }
	    
	    var templeng = D.selectForArray("chatdb","count(*)",list1,list)[0][0];
	    if(templeng == 0){
			r.replier.reply("검색된 내용이 없습니다.");
			return;
		} else {
			if ( 0 < temp1 && 17 > temp1){
				var num = Number(temp1);
			} else {
				var num = 6;
			}
			if(templeng < num){
				num = templeng;
			}
    	}
	    
	    var tempchat = D.rawQuery("SELECT "+ list2.join(',') +" FROM chatdb " + list3 + " limit " + num + " offset " + String(templeng - num) )
		
	    var temp = [];
		if(temp2 != ''){
			temp[0]=temp2+"의 채팅"; 
		}
		
		for (var i in tempchat) {
			temp.push(tempchat[i].join(' | '));
		}
		if (tempchat.length > 3){
			temp[2] += es;
		}
		r.replier.reply(temp.join("\n"));
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}
