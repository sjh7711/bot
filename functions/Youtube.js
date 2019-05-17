youtube = function (r) {//조회수
	var search_word = r.msg.substr(5);
	if(r.msg[0] == '!'){//관련성
		var link=org.jsoup.Jsoup.connect('https://www.youtube.com/results?search_query='+search_word+'&sp=CAASAhAB').get().select('div.yt-lockup-dismissable').select('div.yt-lockup-content');
	} else if (r.msg[0] == '/'){//조회수
		var link=org.jsoup.Jsoup.connect('https://www.youtube.com/results?search_query='+search_word+'&sp=CAMSAhAB').get().select('div.yt-lockup-dismissable').select('div.yt-lockup-content');
		
	}
	if(String(link).length == 0 ){//CAASAhAB : 관련성  //CAMSAhAB : 조회수
		r.replier.reply('검색결과가 없습니다.');
		return;
	}
	var link=link.get(0).select('h3.yt-lockup-title').select('a').attr("abs:href");
	r.replier.reply(link);
	return;
}
