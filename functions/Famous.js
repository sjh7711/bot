function famous(r){
	try{
		var name = r.msg.split(" ")[1];
		var firsturl = "https://m.search.naver.com/search.naver?query="+name+"맛집&where=m&sm=mtp_hty.top";
		var url = undefined;
		url = org.jsoup.Jsoup.connect(firsturl).get().select('a.btn_sort');
		if(url.toArray()[0] == undefined){
			r.replier.reply("검색 결과가 없습니다.");
		}else{
			url = url.get(1).attr("abs:href");
			var doc = org.jsoup.Jsoup.connect(url).get();
			var temptext = doc.select('li.list_item').toArray().map(v=>v.select("span.name").text() + " : " +v.select("div.txt.ellp1").text() + '\n태그 : ' + String(v.select("span.tag").text()).replace(/ /g, "/" ) );
			if (temptext.length > 3){
				temptext[2]=temptext[2]+es;
			}
			temptext = temptext.join('\n\n');
			temptext = temptext + '\n' + url ;
			r.replier.reply(temptext);
		}
    }catch(e){
    	Api.replyRoom('test',e+"\n"+e.stack);
		}
}