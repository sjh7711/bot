sel = function (r){ //flag[2]==0&&flag[3]==0 -> 초기상태  // flag[2]==1&&flag[3]==0 -> 추첨이 시작함 // flag[2]==1&&flag[3]==1 -> 추첨인원 모집  // flag[2]==0&&flag[3] ==1 -> 당첨자 발표
	try{
		if ((Flag.get("sel0", r.room) == 1 || Flag.get("sel1", r.room) == 1) && r.msg == '!추첨'){
			r.replier.reply('현재 추첨이 진행중입니다.')
		}

		if (Flag.get("sel0", r.room) == 0 && Flag.get("sel1", r.room) == 0){
			r.replier.reply("뽑힐 인원 수를 입력해주세요. 숫자만 입력하면 됩니다. ex) 1\n최대 5명까지 가능합니다. 참여엔 제한이 없습니다.");
			Flag.set('seltime', r.room, new Date().getTime());
			Flag.set("selsender", r.room , r.sender);
			Flag.set("sel0", r.room, 1);
		}
		
		if(Flag.get("selsender", r.room) == r.sender && r.msg < 6 && 0 < r.msg && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 0){
			Flag.set("selnum", r.room , r.msg)
			r.replier.reply(Flag.get("selnum", r.room)+"명을 뽑습니다. 참여할 사람은 [참가] 를 입력해주세요. 추첨을 제안한 사람이 [!마감] 을 입력하면 마감됩니다. 90초 이후엔 누구든 [!마감]으로 마감할 수 있습니다.");
			Flag.set("sel1", r.room, 1);
		}
		
		if (r.msg == '참가' && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 1){
	         if( Flag.get('sellist', r.room) == 0 || Flag.get('sellist', r.room).indexOf(r.sender)==-1){
	            var temp;
	            if(Flag.get('sellist', r.room) == 0){
	               temp=[];
	            }
	            else{
	               temp=Flag.get('sellist', r.room);
	            }
	            
	            temp.push(r.sender);
	            Flag.set("sellist", r.room , temp);
	            r.replier.reply(r.sender+"님이 참가하셨습니다. 현재 "+temp.length+'명');
	         }
	      }
		
		var selexittime = new Date().getTime();
		
		if(r.msg == '!마감' && r.sender != Flag.get("selsender", r.room) && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 1){
	    	if( Flag.get('seltime', r.room) + 1000*60*1.5 > selexittime ){
	    		var temp = new Date().getTime();
				r.replier.reply(r.sender+'님은 '+(90000 - (temp - Flag.get('seltime', r.room)))/1000 + "초 뒤에 마감이 가능합니다. 현재는 추첨을 제안한 사람만 마감이 가능합니다.");
	    	} else {
	    		Flag.set("sel0", r.room, 0);
	    		if(Flag.get('sellist', r.room) == 0){
		    		r.replier.reply('아무도 참가하지 않았습니다.');
		    		Flag.set("sel1", r.room, 0);
			    	Flag.set("selnum", r.room, -1);
			    	Flag.set("selsender", r.room, "");
			    	Flag.set("sellist", r.room, [])
			    	return;
		    	}
	    	}
		} else if(r.msg == '!마감' && r.sender == Flag.get("selsender", r.room) && Flag.get("sel0", r.room) == 1 && Flag.get("sel1", r.room) == 1){
			Flag.set("sel0", r.room, 0);
			if(Flag.get('sellist', r.room) == 0){
	    		r.replier.reply('아무도 참가하지 않았습니다.');
	    		Flag.set("sel1", r.room, 0);
		    	Flag.set("selnum", r.room, -1);
		    	Flag.set("selsender", r.room, "");
		    	Flag.set("sellist", r.room, [])
	    		return;
	    	}
	    }
	   
	    if ( Flag.get("sel0", r.room) == 0 && Flag.get("sel1", r.room) == 1 ){
	    	if(Flag.get('sellist', r.room).length <= Flag.get("selnum", r.room)){
	    		var list1 = Flag.get('sellist', r.room);
	    	} else {
	    		for (var i = 0; i < Flag.get("selnum", r.room); i++) {
	    			var list1 = [];
	            	var rad = Math.floor(Math.random() * Flag.get('sellist', r.room).length);
	            	if (list1.indexOf(Flag.get('sellist', r.room)[rad]) == -1){//중복이면 거른다
	            		list1.push(Flag.get('sellist', r.room).splice(rad, 1));
	            	}
	            }
	    	}
	    	
	    	if(Flag.get('selend', r.room)==1){
	    		return;
	    	}
	    	Flag.set('selend', r.room, 1);
	    	r.replier.reply('3');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply('2');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply('1');
	    	java.lang.Thread.sleep(1000);
	    	r.replier.reply("당첨자 : "+list1.join(", "));
	    	Flag.set("sel1", r.room, 0);
	    	Flag.set("selnum", r.room, -1);
	    	Flag.set("selsender", r.room, "");
	    	Flag.set("sellist", r.room, [])
	    	Flag.set('selend', r.room, 0);
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}