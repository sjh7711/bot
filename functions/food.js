 recom= function(r, name) { //name : DB이름
	try{
		var num = r.msg.split(" ")[1]; //num : 추천받고 싶은개수
	    var list = D.selectForArray(name);
	    if (num == undefined) {//1개만 추천
	        var rad = Math.floor(Math.random() * list.length);
	        r.replier.reply(list[rad]);
	    }
	    if (0 < num && num < 9) {//추천할 메뉴가 1개  ~ 8개이하일때
	        var templist = list.slice(); //list의 복사본을 만든다.
	        var listmul = []; //listmul : 랜덤으로 뽑힐 메뉴들이 담기는 공간
	        for (var i = 0; i < num; i++) {
	            var rad = Math.floor(Math.random() * templist.length);//rad : 뽑힌 메뉴
	            listmul.push(templist.splice(rad, 1));//rad 번째 메뉴가 뽑혀서 listmul에 담김
	        }
	        r.replier.reply(listmul.join(", "));
	    }
	}catch(e){
		Api.replyRoom('test',e+"\n"+e.stack);
		}
}

 
famous = function (r){
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