weather = function (r) {
	I.register("weatherSelect" + r.sender, r.room, r.sender, function (input) {
		var searchPlace = r.msg.substr(4);
		if( searchPlace.length == 0 ){
			var searchPlace = '서울 을지로1가'
			var link = "https://m.weather.naver.com/m/main.nhn?regionCode=09140104";
			if (r.room == "관리" || r.room == "단톡" || r.room == "옵치" || r.room == "가족") {
				var searchPlace = '통영시 무전동'
				var link = "https://m.weather.naver.com/m/main.nhn?regionCode=03220111";
			}
			if (r.room == "자생" || r.room == "전컴" || r.room == "봇방" || r.room == "시갤") {
				var searchPlace = '서울시립대'
				var link = "https://m.weather.naver.com/m/main.nhn?regionCode=09230104";
			}
		} else {
			var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + searchPlace + "+날씨").get();
			var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
			
			var placeList = org.jsoup.Jsoup.connect('https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q='+searchPlace).get().select('div.coll_cont.poi_cont').select('select.opt_select > option').toArray().map(v=>v.text());
			if ( placeList.length > 1 ){//같은 행정명
				var msg;
				r.replier.reply("주소를 선택하세요\n" + placeList.map((v,i) => i+1 + '. ' + v).join("\n"));
				msg = input.getMsg() * 1;
				if (!isNaN(msg) && msg >= 1 && msg <= placeList.length) {
					var searchPlace = placeList[msg - 1];
				} else {
					r.replier.reply('잘못 입력했습니다.')
				}
				var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + searchPlace + "+날씨").get();
				var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
				
			} else if ( String(templink.select('h2.place_section_header.no_line.type_nx').text()).length > 0 && link.indexOf("regionCode") == -1 && link.indexOf("weather") == -1) {//도로명//지번주소
				var fullname = String(org.jsoup.Jsoup.connect('https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query='+searchPlace).get().select('div.place_section._2pEtqquEyu').select('div.SIWUKLijMM').select('div._2JYGT1h7wv>span.fxPOnXHuAM').text()) +' '
				var loc = fullname.substr(0, fullname.lastIndexOf("리 ") + 1);
				var loc1 = fullname.substr(0, fullname.lastIndexOf("읍 ") + 1);
				var loc2 = fullname.substr(0, fullname.lastIndexOf("면 ") + 1);
				var loc3 = fullname.substr(0, fullname.lastIndexOf("동 ") + 1);
				var loc4 = fullname.substr(0, fullname.lastIndexOf("가 ") + 1);
				var loc5 = fullname.substr(0, fullname.lastIndexOf("군 ") + 1);
				var loc6 = fullname.substr(0, fullname.lastIndexOf("시 ") + 1);
				var loc7 = fullname.substr(0, fullname.lastIndexOf("구 ") + 1);
				if (loc.length > 0) {
					var searchPlace = loc;
				} else if (loc1.length > 0) {
					var searchPlace = loc1;
				} else if (loc2.length > 0) {
					var searchPlace = loc2;
				} else if (loc3.length > 0) {
					var searchPlace = loc3;
				} else if (loc4.length > 0) {
					var searchPlace = loc4;
				} else if (loc5.length > 0) {
					var searchPlace = loc5;
				} else if (loc6.length > 0) {
					var searchPlace = loc6;
				} else if (loc7.length > 0) {
					var searchPlace = loc7;
				} else {
					var searchPlace = fullname.trim().split(' ');
					searchPlace.pop()
					searchPlace.pop()
					var searchPlace = searchPlace.join(' ');
				}
				var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + searchPlace + "+날씨").get();
				var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
				if (link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1) {
					while ( searchPlace.split(' ').length > 1 && (link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1)) {			
						var searchPlace = searchPlace.split(' ');
						searchPlace.pop()
						var searchPlace = searchPlace.join(' ');
						var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + searchPlace).get();
						var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
						if (String(link).indexOf("regionCode") == -1) {
							var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + searchPlace + "날씨").get();
							var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
						}
					}
				}
			} else if ( String(templink).indexOf('wt_map_area map_state') != -1 ) { //도단위 검색
				var placeList = templink.select('div.wt_map_area.map_state').select('a').toArray().map(v=>v.select('span.lcl_name').text());
				var msg;
				r.replier.reply("주소를 선택하세요\n" + placeList.map((v,i) => i+1 + '. ' + v).join("\n"));
				msg = input.getMsg() * 1;
				if (!isNaN(msg) && msg >= 1 && msg <= placeList.length) {
					var templink = templink.select('div.wt_map_area.map_state').select('a').get(msg - 1).attr("abs:href")
					var link = org.jsoup.Jsoup.connect(templink).get().select("div.api_more_wrap").select("a").attr("abs:href");
				} else {
					r.replier.reply('잘못 입력했습니다.')
				}
			} else if ( link == "http://m.weather.naver.com/m/nation.nhn" || link == "https://m.weather.naver.com/m/nation.nhn" ){ //독도 등
				var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + searchPlace).get();
				if (String(temp).indexOf("addressColl") > -1) {
					var placeList = temp.select("div[id=poiColl]").select('ul.list_place').select('li > div > div > div > div > a').toArray().map(v =>String(v.ownText())+' ')
					var placeList = placeList.filter((item,index)=>placeList.indexOf(item) === index);
					if (placeList.length == 1) {
						var targetNum = 0;
					} else {
						if (placeList.length > 1) {
							var msg;
							r.replier.reply("장소를 선택하세요\n" + placeList.map((v,i) => i+1 +'. '+v.trim()).join("\n"));
							msg = input.getMsg() * 1;
							if (!isNaN(msg) && msg >= 1 && msg <= placeList.length) {
								var targetNum = msg - 1;
							} else {
								r.replier.reply('잘못 입력했습니다.').
								return;
							}
						}
					}
					var fullname = String(placeList[targetNum])
					var loc = fullname.substr(0, fullname.lastIndexOf("리 ") + 1);
					var loc1 = fullname.substr(0, fullname.lastIndexOf("읍 ") + 1);
					var loc2 = fullname.substr(0, fullname.lastIndexOf("면 ") + 1);
					var loc3 = fullname.substr(0, fullname.lastIndexOf("동 ") + 1);
					var loc4 = fullname.substr(0, fullname.lastIndexOf("가 ") + 1);
					var loc5 = fullname.substr(0, fullname.lastIndexOf("군 ") + 1);
					var loc6 = fullname.substr(0, fullname.lastIndexOf("시 ") + 1);
					var loc7 = fullname.substr(0, fullname.lastIndexOf("구 ") + 1);
					if (loc.length > 0) {
						var searchPlace = loc;
					} else if (loc1.length > 0) {
						var searchPlace = loc1;
					} else if (loc2.length > 0) {
						var searchPlace = loc2;
					} else if (loc3.length > 0) {
						var searchPlace = loc3;
					} else if (loc4.length > 0) {
						var searchPlace = loc4;
					} else if (loc5.length > 0) {
						var searchPlace = loc5;
					} else if (loc6.length > 0) {
						var searchPlace = loc6;
					} else if (loc7.length > 0) {
						var searchPlace = loc7;
					} else {
						var searchPlace = fullname.split(' ');
						searchPlace.pop()
						searchPlace.pop()
						var searchPlace = searchPlace.join(' ');
					}
					var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + searchPlace).get();
					var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
					if (String(link).indexOf("regionCode") == -1) {
						var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + searchPlace + "날씨").get();
						var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
					}
					if (link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1) {
						while ( searchPlace.split(' ').length > 1 && (link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1)) {			
							var searchPlace = searchPlace.split(' ');
							searchPlace.pop()
							var searchPlace = searchPlace.join(' ');
							var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + searchPlace).get();
							var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
							if (String(link).indexOf("regionCode") == -1) {
								var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + searchPlace + "날씨").get();
								var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
							}
						}
					}
				}
			} else if( String(templink).indexOf("Weathernews") > 0 || String(templink).indexOf("The Weather Channel") > 0 || String(templink).indexOf("accuweather") > 0 ){
			
			} else if( String(org.jsoup.Jsoup.connect('https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q='+searchPlace).get().select('div[id=addressColl]')).length == 0  ){
				var templink = org.jsoup.Jsoup.connect('https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&q=' + searchPlace).get().select("div.wrap_place").select("div.wrap_cont").toArray();
				var placeList = templink.map(v => [v.select("a").first().text().replace(" 펼치기/접기", ""), v.select("dd.cont").text()+' ']);
				if(placeList.length == 0){
					var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + searchPlace + "+날씨").get();
					var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
				} else {
					for (var i in placeList){//고려대 같은 케이스
						var fullname = String(placeList[i][1])
						var loc = fullname.substr(0, fullname.lastIndexOf("리 ") + 1);
						var loc1 = fullname.substr(0, fullname.lastIndexOf("읍 ") + 1);
						var loc2 = fullname.substr(0, fullname.lastIndexOf("면 ") + 1);
						var loc3 = fullname.substr(0, fullname.lastIndexOf("동 ") + 1);
						var loc4 = fullname.substr(0, fullname.lastIndexOf("가 ") + 1);
						var loc5 = fullname.substr(0, fullname.lastIndexOf("군 ") + 1);
						var loc6 = fullname.substr(0, fullname.lastIndexOf("시 ") + 1);
						var loc7 = fullname.substr(0, fullname.lastIndexOf("구 ") + 1);
						if (loc.length > 0) {
							placeList[i][1] = loc;
						} else if (loc1.length > 0) {
							placeList[i][1] = loc1;
						} else if (loc2.length > 0) {
							placeList[i][1] = loc2;
						} else if (loc3.length > 0) {
							placeList[i][1] = loc3;
						} else if (loc4.length > 0) {
							placeList[i][1] = loc4;
						} else if (loc5.length > 0) {
							placeList[i][1] = loc5;
						} else if (loc6.length > 0) {
							placeList[i][1] = loc6;
						} else if (loc7.length > 0) {
							placeList[i][1] = loc7;
						} else {
							placeList[i][1] = fullname.split(' ');
							placeList[i][1].pop()
							placeList[i][1].pop()
							placeList[i][1] = placeList[i][1].join(' ');
						}
					}
					var placeList = placeList.filter((item,index)=>placeList.map(v=>String(v[1])).indexOf(String(item[1])) === index);
					var placeList = placeList.filter((item,index)=>placeList.map(v=>String(v[0])).indexOf(String(item[0])) === index);
					
					if(placeList.length == 1) {
						var msg = 1
					} else {
						var msg;
						r.replier.reply("장소를 선택하세요\n" + placeList.map((v,i)=>i+1 + '. '+v[0]).join("\n"));
						msg = input.getMsg() * 1;
					}
					if (!isNaN(msg) && msg >= 1 && msg <= placeList.length) {
						var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + placeList[msg-1][1].trim()).get();
						var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
						if (String(link).indexOf("regionCode") == -1) {
							var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + placeList[msg-1][1].trim() + "날씨").get();
							var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
						}
						if (link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1) {
							var tempPlace = placeList[msg-1][1].trim()
							while ( tempPlace.split(' ').length > 1 && (link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1)) {
								var tempPlace = tempPlace.split(' ');
								tempPlace.pop()
								var tempPlace = tempPlace.join(' ');
								var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + tempPlace).get();
								var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
								if (String(link).indexOf("regionCode") == -1) {
									var templink = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + tempPlace + "날씨").get();
									var link = templink.select("div.api_more_wrap").select("a").attr("abs:href");
								}
							}
						}
					} else {
						r.replier.reply('잘못 입력했습니다.').
						return;
					}
				}
			}
		}

		if(link.indexOf("regionCode") == -1 || link.indexOf("weather") == -1){
			r.replier.reply("검색이 불가능합니다.");
			return;
		} else {
			var doc = org.jsoup.Jsoup.connect(link).get();
			var sky = doc.select("div.weather_icon.sp_icon_60").toArray().map(v => v.text());
			var degree = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=0]").text().split(",").slice();
			var wind = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=2]").text().split(",").slice();
			var wet = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=3]").text().split(",").slice();
			var officialName = "(" + doc.select("div.section_location").select("strong").text() + ")";
			if (String(doc).indexOf("Weathernews") > 0 || String(doc).indexOf("The Weather Channel") > 0 || String(doc).indexOf("accuweather") > 0) {
				var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
				var clock1 = clock.length;
				if (clock1 > 16) {
					clock1 = 16;
				}
				var res = searchPlace + officialName;
				if(res.length > 16) {
					res = res.substr(0,19) + '\n' + res.substr(19, res.length);
					res = res.trim();
				}
				res += "\n-----------------------------\n";
				res += "시간 기온 습도 바람ㅤ날씨\n [h]  [℃]  [%]  [㎧]ㅤㅤㅤ\n";
				for (var i = 1; i < clock1; i++) {
					res += " " + String(clock[i]).extension("0", 2) + "ㅤ";
					res += String(degree[i]).extension(" ", 2) + "ㅤ";
					res += String(wet[i]).extension(" ", 3) + "ㅤ";
					res += String(wind[i]).extension(" ", 2) + "ㅤ";
					res += String(sky[i]).extensionRight("ㅤ", 5) + "\n";
					if (i == 5) {
						res = res.trim() + " " + es + "\n";
					}
				}
				res += "\n" + link;
			} else {
				var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
				var clock1 = clock.length;
				var uv1 = doc.select("li.uv").select("em").text();
				var uv = doc.select("li.uv").select("span").text().replace(uv1, " (" + uv1 + ")");
				var index = doc.select("strong.title").toArray().map(v=>v.ownText() + ' : ' + v.select("em").text() ).join('\n').replace('\n최근 검색한 곳 : ','');
				var sun1 = doc.select("li.sun_item").select("div.day").select("span").get(0).text() + " : " + doc.select("li.sun_item").select("div.time").get(0).text();
				var sun2 = doc.select("li.sun_item").select("div.day").select("span").get(1).text() + " : " + doc.select("li.sun_item").select("div.time").get(1).text();
				var linkair = link + "&default=air";
				var doc1 = org.jsoup.Jsoup.connect(linkair).get();
				var pollution = doc1.select("li.pollution_item").toArray().map(v => {
					vv = String(v.select("span.number").select("em").text());
					vvv = String(v.select("span.title").text());
					return vvv + " : " + v.select("span.number").text().replace(vv, " " + vv);
				}
				);
				var dust = doc1.select("div.chart_item").toArray().map(v => v.select("div.dust_graph_number").text().replace("먼지", "먼지 :") + "㎍/㎥" + "(" + v.select("div.dust_graph_text").text() + ")");
				var windrain = "";
				var windtemp = wind.slice(0, 8);
				var windforce = [];
				for (var i in windtemp) {
					if (Number(windtemp[i]) > 12) {
						windforce[i] = 1;
					} else {
						if (Number(windtemp[i]) > 7) {
							windforce[i] = 0;
						}
					}
				}
				if (windforce.indexOf(1) > -1) {
					windtemp.sort(compare);
					windrain += windtemp[7] + "㎧로 바람이 매우 강합니다.\n";
				} else {
					if (windforce.indexOf(0) > -1) {
						windtemp.sort(compare);
						windrain += windtemp[7] + "㎧로 바람이 강합니다.\n";
					}
				}
				if ( sky.slice(0, 8).map( v => String(v).indexOf("비")).reduce((sVal, nowVal, nowIndex, array) => { return sVal + nowVal}, 0 ) != -8 ) {
					windrain += "☔비가오니 우산을 챙기세요☔";
				} else if ( sky.slice(0, 8).map( v => String(v).indexOf("소나기")).reduce((sVal, nowVal, nowIndex, array) => { return sVal + nowVal}, 0 ) != -8 ) {
					windrain += "☔비가오니 우산을 챙기세요☔";
				} else if ( sky.slice(0, 8).map( v => String(v).indexOf("눈")).reduce((sVal, nowVal, nowIndex, array) => { return sVal + nowVal}, 0 ) != -8  ) {
					windrain += "☔눈이오니 우산을 챙기세요☔";
				}
				if (windrain != "") {
					r.replier.reply(windrain.trim());
				}
				var res = searchPlace + officialName;
				if(res.length > 16) {
					res = res.substr(0,16) + '\n' + res.substr(16, res.length);
					res = res.trim();
				}
				res += "\n-------미세먼지/자외선-------\n";
				res += dust.join("\n") + "\n";
				res += "자외선 : " + uv + "\n";
				res += "------------------------------\n";
				res += "시간ㅤ날씨ㅤ기온 습도 바람\n [h] ㅤㅤㅤㅤ  [℃]  [%]  [㎧]\n";
				for (var i = 0; i < clock1; i++) {
					if( String(clock[i]) == 0 && i > 7 ){
						res += "--------------------------------\n";
					}
					res += " " + String(clock[i]).extension("0", 2) + " ";
					res += String(sky[i]).extensionRight("ㅤ", 4) + "  ";
					res += String(degree[i]).extension(" ", 2) + "   ";
					res += String(wet[i]).extension(" ", 3) + "   ";
					res += String(wind[i]).extension(" ", 2) + "\n";
					if (i == 7) {
						res = res.trim() + " " + es + "\n";
					}
				}
				res += "------------기타지수------------\n" + pollution.join("\n") + "\n";
				res += "------------일상지수------------\n" + index;
				res += "\n------------일출&일몰-----------\n" + sun1 + "\n" + sun2;
				res += "\n" + link;
			}
			r.replier.reply(res);
		}
	});
}
