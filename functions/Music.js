music = function(r) {
	var rand = Math.floor(Math.random()*100);
	var list = org.jsoup.Jsoup.connect('https://m.bugs.co.kr/chart').get().select('td.check').toArray().map(v=>v.toString().split('title="')[1].split('"')[0]);
	var search_word = list[rand];
	var trash = org.jsoup.Jsoup.connect('https://music.bugs.co.kr/genre/chart/kpop/rnh/total/day').get().select('p.title').toArray().map(v=>String(v.text()));
	while(1){
		if(trash.indexOf(String(search_word))>-1){
			rand = Math.floor(Math.random()*100);
			search_word = list[rand];
		} else {
			break;
		}
	}
	var link=org.jsoup.Jsoup.connect('https://www.youtube.com/results?search_query='+search_word+'&sp=CAASAhAB').get().select('div.yt-lockup-dismissable').select('div.yt-lockup-content').get(0).select('h3.yt-lockup-title').select('a').attr("abs:href");
	r.replier.reply(link);
	return;
}