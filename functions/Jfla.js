jfla = function (r){
	var list=org.jsoup.Jsoup.connect('https://www.youtube.com/user/JFlaMusic/videos?view=0&sort=dd&shelf_id=0').get().select('a:contains(cover by)').toArray().map(v=>v.text()+'\n'+v.attr("abs:href"));
	r.replier.reply(list[0]);
	r.replier.reply('더보기'+es+'\n'+'노래 전체 모음\nhttps://music.youtube.com/playlist?list=PLrJ-VGAeEn8gzjavY0PXwGsMssB1DTUx7\n\n최근 목록\n'+list.slice(1).join('\n\n'));
}