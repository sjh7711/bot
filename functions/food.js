recom = function (r, name) {
	var num = r.msg.split(" ")[1];
	var list = D.selectForArray(name);
	if (num == undefined) {
		var rad = Math.floor(Math.random() * list.length);
		r.replier.reply(list[rad]);
	}
	if (0 < num && num < 9) {
		var templist = list.slice();
		var listmul = [];
		for (var i = 0; i < num; i++) {
			var rad = Math.floor(Math.random() * templist.length);
			listmul.push(templist.splice(rad, 1));
		}
		r.replier.reply(listmul.join(", "));
	}
}

 
famous = function (r) {
	var name = r.msg.split(" ")[1];
	var firsturl = "https://m.search.naver.com/search.naver?query=" + name + "맛집&where=m&sm=mtp_hty.top";
	var url = undefined;
	url = org.jsoup.Jsoup.connect(firsturl).get().select("a.btn_sort");
	if (url.toArray()[0] == undefined) {
		r.replier.reply("검색 결과가 없습니다.");
	} else {
		url = url.get(1).attr("abs:href");
		var doc = org.jsoup.Jsoup.connect(url).get();
		var temptext = doc.select("li.list_item").toArray().map(v => v.select("span.name").text() + " : " + v.select("div.txt.ellp1").text() + "\n태그 : " + String(v.select("span.tag").text()).replace(/ /g, "/"));
		if (temptext.length > 3) {
			temptext[2] = temptext[2] + es;
		}
		temptext = temptext.join("\n\n");
		temptext = temptext + "\n" + url;
		r.replier.reply(temptext);
	}
}

hamburg = function(r){
	var lotte = org.jsoup.Jsoup.connect('http://www.lotteria.com/menu/Menu_All.asp').get().select('div.memu_group>ul').get(0).select('div.cont.menu.roundMiddle > a').toArray().map(v=>v.text());
	var mc = org.jsoup.Jsoup.connect('http://www.mcdonalds.co.kr/www/kor/menu/menu_list.do?cate_cd=100').get().select('p.sbj').toArray().map(v=>v.ownText())
	var moms1 = org.jsoup.Jsoup.connect('http://www.momstouch.co.kr/sub/menu/menu_list.html?pg=1&menu=4').get().select('span.title').toArray().map(v=>v.text());
	var moms2 = org.jsoup.Jsoup.connect('http://www.momstouch.co.kr/sub/menu/menu_list.html?pg=2&menu=4').get().select('span.title').toArray().map(v=>v.text());
	var moms3 = org.jsoup.Jsoup.connect('http://www.momstouch.co.kr/sub/menu/menu_list.html?pg=3&menu=4').get().select('span.title').toArray().map(v=>v.text());
	var moms = moms1.concat(moms2).concat(moms3);

	var rad = rad = Math.floor(Math.random() * 3);
	if(rad < 1){
		var rad = rad = Math.floor(Math.random() * lotte.length);
		r.replier.reply('롯데리아 버거 추천\n' + lotte.splice(rad,1)[0]);
	} else if(rad < 2){
		var rad = rad = Math.floor(Math.random() * moms.length);
		r.replier.reply('맘스터치 버거 추천\n' + moms.splice(rad,1)[0]);
	} else {
		var rad = rad = Math.floor(Math.random() * mc.length);
		r.replier.reply('맥도날드 버거 추천\n' + mc.splice(rad,1)[0]);
	}
}


subway = function (r) {
	var sandwich = org.jsoup.Jsoup.connect('http://subway.co.kr/sandwichList').get().select('div.pd_list_wrapper');
	var nbf = sandwich.select('li:not(.bf)').toArray().map(v=> v.select('strong').text() + '(' + v.select('span.cal').text() + ')' );
	var bf = sandwich.select('li.bf').toArray().map(v=> v.select('strong').text() + '(' + v.select('span.cal').text() + ')' );

	if( time().hour < 11 ) {
		nbf.concat(bf);
	}

	var addtop = org.jsoup.Jsoup.connect('http://subway.co.kr/toppingList').get().select('strong').toArray().map(v=>v.text());;

	var top = org.jsoup.Jsoup.connect('http://subway.co.kr/freshInfo?tab=vegetable').get();
	var bread = top.select('li.bread').select('strong').toArray().map(v=>v.text());
	var veg = top.select('li.vegetable').select('strong').toArray().map(v=>v.text());
	var cheese = top.select('li.cheese').select('strong').toArray().map(v=>v.text());
	var sauce = top.select('li.sauce').select('strong').toArray().map(v=>v.text());

	//소스 2
	//치즈 0~1
	//야채 2~4
	//빵 0~1

	var str = '';

	var rad = Math.floor(Math.random() * nbf.length);
	str += '메뉴 : ' + nbf.splice(rad, 1)[0] + '\n';

	var rad = Math.floor(Math.random() * bread.length*2);
	if(rad+1 > bread.length){
		str += '빵 : 기본\n'
	} else {
		str += '빵 : ' + bread.splice(rad, 1)[0] + '\n';
	}

	str += '야채 : '
	var rad1 = Math.floor(Math.random() * 4)+3;
	for (var i = 0 ; i < rad1 ; i++){
		var rad = Math.floor(Math.random() * veg.length);
		str += veg.splice(rad, 1)[0]+', ';
	}
	str = str.substr(0, str.length - 2)+'\n';

	var rad1 = Math.random();
	if(rad1 < 0.5){
		var rad = Math.floor(Math.random() * cheese.length);
		str += '치즈 : ' + cheese.splice(rad, 1)[0] + '\n';
	}

	var rad1 = Math.floor(Math.random() * 3);
	if(rad1 > 0){
		str += '소스 : '
	}
	for (var i = 0 ; i < rad1 ; i++){
		var rad = Math.floor(Math.random() * sauce.length);
		str += sauce.splice(rad, 1)[0]+', ';
	}
	if(rad1 > 0){
		str = str.substr(0, str.length - 2);
	}

	r.replier.reply('서브웨이 추천 메뉴\n'+str.trim());
}
