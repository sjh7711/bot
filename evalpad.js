temp1 = org.jsoup.Jsoup.connect('https://www.google.com/search?ei=u7v0XKb3B9mAr7wPuoq2kAk&q='+'マリーゴールド'+' 가사').get().select('div.Oh5wg');
musicLyrics1 = String(temp1.select('div[jsname=rdVbIe]>div:not(.OULBYb)'))
musicLyrics2 = String(temp1.select('div[jsname=wq5Syf]'))
musicLyrics = (musicLyrics1+musicLyrics2).replace(/<br>/g, '').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').replace(/&gt;/g, '>').replace(/^ +/gm,"").trim();


/*
lyrics = function(r) {
	var musicCode = String(org.jsoup.Jsoup.connect('https://www.melon.com/search/total/index.htm?q='+r.msg.substr(4)+'&section=&linkOrText=T&ipath=srch_form').get().select('div.tb_list.d_song_list.songTypeOne').select('tr>td').get(0)).split('value="')[1].split('"')[0];
	var musicData = org.jsoup.Jsoup.connect('https://www.melon.com/song/detail.htm?songId='+musicCode).get();
	var artist = musicData.select('div.info>div.artist').text();
	var title = musicData.select('div.info>div.song_name').text().replace('곡명 ', '');
	var musicLyrics = String(musicData.select('div.lyric')).replace(/<br>/g, '').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').replace(/&gt;/g, '>').replace(/^ +/gm,"").trim();
	if(musicLyrics.length == 0){
		musicLyrics = String(org.jsoup.Jsoup.connect('https://www.google.com/search?ei=u7v0XKb3B9mAr7wPuoq2kAk&q='+r.msg.substr(4)+' 가사').get().select('div.M1CzJc.PZPZlf.MtKf9c.kno-fb-ctx')).replace(/<br>/g, '').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').replace(/&gt;/g, '>').replace(/^ +/gm,"").trim();
	}
	if(musicLyrics.length == 0){
		musicLyrics ="멜론에 가사가 등록되지 않은 곡입니다.";
	}
	r.replier.reply(r.msg.substr(4)+'의 검색 결과'+es+'\n제목 : '+title+'\n아티스트 : '+artist+'\n\n'+musicLyrics);
}



lyrics = function(r) {
	var musicData = org.jsoup.Jsoup.connect('https://music.naver.com/search/search.nhn?query='+ r.msg.substr(4) +'&x=0&y=0').get();
	var artist = musicData.select('tbody').select('tr._tracklist_move.data1').select('td._artist.artist').get(0).text();
	var title = musicData.select('tbody').select('tr._tracklist_move.data1').select('a._title.title').get(0).text();
	var musicCode= String(musicData.select('tbody').select('td.lyric').select('a').get(0)).split('i:')[1].split('"')[0];
	var musicLyrics = String(org.jsoup.Jsoup.connect('https://music.naver.com/lyric/index.nhn?trackId='+musicCode).get().select('div.show_lyrics')).replace(/<br>/g, '').replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, ' ').replace(/&gt;/g, '>').replace(/^ +/gm,"").trim();
	r.replier.reply(r.msg.substr(4)+'의 검색 결과'+es+'\n제목 : '+title+'\n아티스트 : '+artist+'\n\n'+musicLyrics);
}*/