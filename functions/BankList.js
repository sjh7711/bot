banklist(r){
	try{
		var name = r.msg.split(" ")[1];
		if(typeof name == 'string'){
			var temp=D.selectForArray('bankls',null,'name like ?','%'+name+'%');
			for(var i=0;i<temp.length;i++){
				temp[i]=temp[i].join(" : ")
				if(i==3){
					temp[2]=temp[2]+es;
				}
			}
			r.replier.reply("      기관명      |      전화번호\n----------------------------------\n"+temp.join("\n\n"));
		} else {
			var temp=D.selectForArray('bankls');
			for(var i=0;i<temp.length;i++){
				temp[i]=temp[i].join(" : ")
				if(i==3){
					temp[2]=temp[2]+es;
				}
			}
			r.replier.reply("      기관명      |      전화번호\n----------------------------------\n"+temp.join("\n\n"));
		}
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}