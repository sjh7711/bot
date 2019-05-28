recentchat= function (r) {
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

allchat = function (r) { 
	try{
		var temp = r.msg.substr(5);
		var temp1 = '';
		var temp2 = '';
		var temp3 = '';
		if(temp.indexOf(',')>-1){
			var temp1 = temp.split(',')[0]; // 개수
			var temp2 = temp.split(',')[1]; // 이름
			var temp3 = temp.split(',')[2]; // 방
		}
		if(temp1==''){
			temp1 = 12;
		}
		if(Number(temp)>0){
			temp1 = temp;
		}
	    
	    var list = [];
	    var list1 = '';
	    var list2 = ['time'];
	    var list3 = '';
	    if (temp2 == ''){
	    	list2.push('name');
	    }
	    if (temp3 == ''){
	    	list2.push('room');
	    }
	    list2.push('msg');
	    
	    if (temp2 != ''){
	    	list1 += 'name=? ';
	    	list.push(temp2);
	    	list3 += 'WHERE name=\'' + temp2 + '\'';
	    }
	    if (temp3 != ''){
	    	if(list1 != ''){
	    		list1 += 'and room=?';
	    		list3 += 'and room=\'' + temp3 + '\'';
	    	} else{
	    		list1 += 'room=?';
	    		list3 += 'WHERE room=\'' + temp3 + '\'';
	    	}
	    	list.push(temp3);
	    }
	    
	    var templeng = D.selectForArray("chatdb","count(*)",list1,list)[0][0];
	    if(templeng == 0){
			r.replier.reply("검색된 내용이 없습니다.");
			return;
		} else {
			var num = temp1*1;
			if(templeng < num){
				num = templeng;
			}
    	}
	    
	    var tempchat = D.rawQuery("SELECT "+ list2.join(',') +" FROM chatdb " + list3 + " limit " + num + " offset " + String(templeng - num) )
    	
		var temp = [];
	    temp[0]='길이:'+num+'\n';
		if(temp2 != ''){
			temp[0]=temp[0]+temp2+"의 채팅"; 
		}
		if(temp3 != ''){
			temp[0]=temp[0]+"("+temp3+")\n"; 
		} else {
			temp[0]=temp[0]+"\n"; 
		}
		
		for (var i in tempchat) {
			temp.push(tempchat[i].join(' | '));
		}
		if (tempchat.length > 3){
			temp[3] += es;
		}
		r.replier.reply(temp.join("\n"));
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}