overwatch = function (r) {
	if(r.msg == '!오버워치'){
		r.replier.reply('배틀태그와 닉네임을 포함하여 검색하세요.');
		return;
	}
	var name = r.msg.substr(6).replace("#", "-");
	var source = org.jsoup.Jsoup.connect("https://playoverwatch.com/ko-kr/career/pc/" + name).get();
	if (source.text().indexOf("이 프로필은 현재 비공개입니다.") > 0) {
		r.replier.reply(r.msg.substr(6) + "의 정보는 비공개 상태입니다.");
	} else {
		if (String(source.select('div.competitive-rank')).length == 0){
			var res = '';
			var score = "Unranked";
			var tier = "Unranked";
			res += "오버워치 경쟁전\n닉네임 : " + r.msg.substr(6) + "\n탱커 : Unranked\n딜러 : Unranked\n힐러 : Unranked\n\n많이 플레이한 영웅 TOP5"+es;
			var compplaytime = source.select("div.progress-category.toggle-display").get(7);
			var compwinrate = source.select("div.progress-category.toggle-display").get(10);
			var compkilldeath = source.select("div.progress-category.toggle-display").get(11);
			var num = compplaytime.select("div.ProgressBar-title").toArray().length;
			if (num > 4) {
				num = 5;
			}
			for (var i = 0; i < num; i++) {
				var most = compplaytime.select("div.ProgressBar-title").get(i).text();
				res += "\n\n" + (i + 1) + "." + most;
				var mosttime = compplaytime.select("div.ProgressBar-description").get(i).text();
				res += "\n  플레이 시간 : " + mosttime;
				var mostwinrate = compwinrate.select("div.ProgressBar-textWrapper:contains(" + most + ")").select("div.ProgressBar-description").text();
				if (mostwinrate.indexOf("%") == -1) {
					mostwinrate += "%";
				}
				res += "\n  승률 : " + mostwinrate;
				var mostkilldeath = compkilldeath.select("div.ProgressBar-textWrapper:contains(" + most + ")").select("div.ProgressBar-description").text();
				res += "\n  목숨당처치 : " + mostkilldeath;
			}
			r.replier.reply(res);
			return;
		}
		
		var tank = '';
		var tanktier = '';
		var deal = '';
		var dealtier = '';
		var supp = '';
		var supptier = '';
		
		var temp = source.select('div.competitive-rank').toArray()[0].select('div.competitive-rank-level').toArray().map(v=>v.text());
		if(String(source.select('div.competitive-rank').get(0).select("[data-ow-tooltip-text=돌격 실력 평점]")).length > 0){
			tank += String(temp.shift());
			tanktier += " (" + String(source.select('div.competitive-rank').get(0).select("[data-ow-tooltip-text=돌격 실력 평점]")).split('Tier')[0].split('s/rank-')[1] + ")";
		} else {
			tank += "Unranked";
		}
		if(String(source.select('div.competitive-rank').get(0).select("[data-ow-tooltip-text=공격 실력 평점]")).length > 0){
			deal += String(temp.shift());
			dealtier += " (" + String(source.select('div.competitive-rank').get(0).select("[data-ow-tooltip-text=공격 실력 평점]")).split('Tier')[0].split('s/rank-')[1] + ")";
		} else {
			deal += "Unranked";
		}
		if(String(source.select('div.competitive-rank').get(0).select("[data-ow-tooltip-text=지원 실력 평점]")).length > 0){
			supp += String(temp.shift());
			supptier += " (" + String(source.select('div.competitive-rank').get(0).select("[data-ow-tooltip-text=지원 실력 평점]")).split('Tier')[0].split('s/rank-')[1] + ")";
		} else {
			supp += "Unranked";
		}
		
		var res = "오버워치 경쟁전\n닉네임 : " + r.msg.substr(6) + "\n돌격 : " + tank + tanktier + "\n공격 : " + deal + dealtier + "\n지원 : " + supp + supptier + "\n\n많이 플레이한 영웅 TOP5" + es;
		var compplaytime = source.select("div.progress-category.toggle-display").get(7);
		var compwinrate = source.select("div.progress-category.toggle-display").get(10);
		var compkilldeath = source.select("div.progress-category.toggle-display").get(11);
		var num = compplaytime.select("div.ProgressBar-title").toArray().length;
		if (num > 4) {
			num = 5;
		}
		for (var i = 0; i < num; i++) {
			var most = compplaytime.select("div.ProgressBar-title").get(i).text();
			res += "\n\n" + (i + 1) + "." + most;
			var mosttime = compplaytime.select("div.ProgressBar-description").get(i).text();
			res += "\n  플레이 시간 : " + mosttime;
			var mostwinrate = compwinrate.select("div.ProgressBar-textWrapper:contains(" + most + ")").select("div.ProgressBar-description").text();
			if (mostwinrate.indexOf("%") == -1) {
				mostwinrate += "%";
			}
			res += "\n  승률 : " + mostwinrate;
			var mostkilldeath = compkilldeath.select("div.ProgressBar-textWrapper:contains(" + most + ")").select("div.ProgressBar-description").text();
			res += "\n  목숨당처치 : " + mostkilldeath;
		}
		r.replier.reply(res);
	}
}