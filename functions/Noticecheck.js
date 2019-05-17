noticecheck(){
	try{
		if(Flag.get('cookie1', 'test') == 0 || Flag.get('cookie2', 'test') == 0){
			var cookie1 = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/login.php?url=%2Fhtml%2Fmain.html")
			.method(org.jsoup.Connection.Method.GET).execute().cookies();

			var cookie2 = org.jsoup.Jsoup.connect("https://www.knfb1377.or.kr:9001/bbs/login_check.php").cookies(cookie1)
			.data("mb_id","tyfb1377").data("mb_password","1q2w3e4r").data("x","30").data("y","30")
			.method(org.jsoup.Connection.Method.POST).execute().cookies();

			Flag.set('cookie1', 'test', cookie1);
			Flag.set('cookie2', 'test', cookie2);
		}
		
		var doc = org.jsoup.Jsoup.connect("http://www.knfb1377.or.kr/bbs/board.php?bo_table=10_01")
	    .cookies(Flag.get('cookie2', 'test')).cookies(Flag.get('cookie1', 'test')).get().select('tbody');
		
    	var docnum = doc.select("tr.num").toArray().map(v=>v.select('td.num').get(0).text());
    	var doctitle = doc.select("tr.num").toArray().map(v=>v.select('a:first-child').get(0).ownText());
    	
    	var difcount = 0;
    	
    	for(var i=0; i<15;i++){
    		for(var j=i; j<15; j++){
    			if(D.selectForArray('notice')[i][1].indexOf(doctitle[j]) == 0){
    				break;
    			}else{
    				difcount += 1;
        			var wantnum = j;
        			break;
        		}
    		}
    		if(difcount > 0){
    			break;
    		}
    	}
    	
		if(difcount > 0){
			D.delete('notice');
	    	for(var i=0; i<15;i++){
	    		D.insert('notice', {num : docnum[i], msg : doctitle[i]});
	    	}
			var doclink = doc.select("tr.num").select("a:first-child").get(wantnum).attr("abs:href");
	    	
	    	var subdoc = org.jsoup.Jsoup.connect(doclink).cookies(Flag.get('cookie2', 'test')).cookies(Flag.get('cookie1', 'test')).get();
	    	
	    	var text = String(subdoc.select("div.content").toArray()[0]).replace(/<br>/g, '\n').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').trim().replace(/^ +/gm,"").replace(/\n\n\n/g, '\n').replace(/\n\n\n/g, '\n');
	    	var repl = subdoc.select("div.comment_area").eachText().toArray().join('\n\n').replace(/관리자 /g, "").replace(/답변 /g, "\n").replace(/수정 삭제 /g, '');
	    	
			Api.replyRoom("test","새공지!\n"+docnum[wantnum]+" : "+doctitle[wantnum]+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
			Api.replyRoom("푸드마켓","새공지!\n"+docnum[wantnum]+" : "+doctitle[wantnum]+"\n----------------------------------\n"+es+text+"\n----------------------------------\n"+repl+"\n----------------------------------\n"+doclink);
		}
	}catch(e){
		Log.e(e+"\n"+e.stack+'\n');
	}
};