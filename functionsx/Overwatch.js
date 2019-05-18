overwatch = function (r) {
	try{
		var name = r.msg.substr(6).replace("#", "-");//배틀태그가 담기는 공간
	    var source = org.jsoup.Jsoup.connect('https://playoverwatch.com/ko-kr/career/pc/'+name).header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36").get();
	    if (source.select('div.u-align-center').text().indexOf('이 프로필은 비공개입니다.')>0 ) {
	    	r.replier.reply(r.msg.substr(6) + "의 정보를 알 수 없습니다.");
		} else {
			if(String(source.select('div.masthead').select('div.u-align-center')).length==0 ){
				var score = "Unranked";
				var tier = "Unranked";
			}else if (String(source.select('div.masthead').select('div.u-align-center')).length>0) {
				var score = source.select('div.masthead').select('div.u-align-center').get(0).text();
		        var tier = source.select('div.masthead').select('div.competitive-rank').get(0).toString().split('rank-icons/rank-')[1].split('Tier')[0];
			}else {
				var score = "알 수 없습니다."
				var tier = "Unranked";
			}

	        //var quickplaytime = source.select('div.progress-category.toggle-display').get(0);
			
			var compplaytime = source.select('div.progress-category.toggle-display').get(7);
			var compwinrate = source.select('div.progress-category.toggle-display').get(10);
			var compkilldeath = source.select('div.progress-category.toggle-display').get(11);
			
	        var res = "닉네임 : "+r.msg.substr(6)+"\n점수 : "+score+"\n티어 : "+tier+"\n\n많이 플레이한 영웅 TOP5"+es;
	        
	        var num = compplaytime.select('div.ProgressBar-title').toArray().length;
	        
	        if(num>4){
	        	num=5;
	        }
	        
	        for(var i = 0 ; i < num ; i++ ){
	        	var most = compplaytime.select('div.ProgressBar-title').get(i).text();
	        	res+="\n\n"+(i+1)+"."+most;
	            var mosttime = compplaytime.select('div.ProgressBar-description').get(i).text();
	        	res+="\n  플레이 시간 : "+mosttime;
	            var mostwinrate = compwinrate.select("div.ProgressBar-textWrapper:contains("+most+")").select('div.ProgressBar-description').text();  if(mostwinrate.indexOf("%")==-1){mostwinrate+='%'};
	            res+="\n  승률 : "+mostwinrate;
	            var mostkilldeath = compkilldeath.select("div.ProgressBar-textWrapper:contains("+most+")").select('div.ProgressBar-description').text();
	            res+="\n  목숨당처치 : "+mostkilldeath;
	        }
	        r.replier.reply(res);
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}