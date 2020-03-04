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




menurecom = function (r) {
	I.register("menuSelect" + r.sender, r.room, r.sender, function (input) {
		var theme = D.selectForArray('menu', 'theme', null,null,{groupBy:"theme"}).concat("랜덤");
		var msg;
		r.replier.reply("테마를 선택하세요\n" +theme.map((v,i) => i+1 + '. ' + v).join("\n"));
		msg = input.getMsg() * 1;
		if (!isNaN(msg) && msg >= 1 && msg <= theme.length) {
			var selectTheme = theme[Math.floor(msg-1)];
			if(selectTheme == "랜덤"){
				var menulist = D.selectForArray("menu", "name")
			} else {
				var menulist = D.selectForArray("menu", "name", "theme=?", [selectTheme])
			}
			var templist = menulist.slice();
			var randmenu = [];
			for (var i = 0; i < 6; i++) {
				var rad = Math.floor(Math.random() * templist.length);
				randmenu.push(templist.splice(rad, 1));
			}
			r.replier.reply(randmenu.join(", "));
		} else {
			r.replier.reply('범위내의 숫자를 입력해주세요.')
		}
	})
}

 
famous = function (r) {
	doc = org.jsoup.Jsoup.connect('https://www.diningcode.com/list.php?query='+r.msg.substr(4)).get();
	if(Number(String( doc.select('p.stit').text()).replace(/[^0-9]/g,'')) > 400000){
		r.replier.reply('지역을 새로 입력하세요.')
		return;
	}
	doc = doc.select('ul.list').select('li[onmouseenter]').toArray().map((v,i)=> i+1 +'.\n' + '이름 : ' + v.select('span.btxt').text().substr(3) + '\n특징 : ' +  v.select('span.stxt').text() + '\n태그 : ' + v.select('span.ctxt').toArray()[0].text() + '\n주소 : ' + v.select('span.ctxt').toArray()[1].ownText() ).join('\n\n')
	r.replier.reply(r.msg.substr(4)+' 지역의 맛집 검색결과'+es+'\n\n'+doc)
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
