weather = function (r) {
	I.register("weatherSelect" + r.sender, r.room, r.sender, function (input) {
		var want = r.msg.substr(4);
		var link1 = "";
		var link2 = "https://m.weather.naver.com/m/main.nhn?regionCode=09140104";
		var check = link2.indexOf("weather");
		var where = "서울 중구 을지로 1가";
		if (r.room == "test" || r.room == "단톡방" || r.room == "공익" || r.room == "푸드마켓" || r.room == "오버워치" || r.room == "fa") {
			link2 = "https://m.weather.naver.com/m/main.nhn?regionCode=03220111";
			check = link2.indexOf("weather");
			where = "통영시 무전동";
		}
		if (r.room == "시립대 자취생 생정" || r.room == "시립대 전전컴 톡방" || r.room == "시립대 봇제작방" || r.room == "시립대 단톡방") {
			link2 = "https://m.weather.naver.com/m/main.nhn?regionCode=09230104";
			check = link2.indexOf("weather");
			where = "서울시립대";
		}
		if (want.length > 0) {
			link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=" + want + "+날씨").get();
			link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
			var check = link2.indexOf("weather");
			where = want;
			var temp = org.jsoup.Jsoup.connect("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=날씨+" + want).get().select("div.sort_box._areaSelectLayer").select("div.select_lst._selectLayerLists").select("a").toArray();
			if (temp.length > 1 || (check == -1 && link2 != "http://m.weather.naver.com/m/nation.nhn")) {
				if (temp.length > 1) {
					var i = 0;
					var navername = temp.map(v => (1 + i++) + ". " + v.text() + " ");
				}
				var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
				if (String(temp).indexOf("addressColl") > -1) {
					if (String(temp).indexOf("지번주소") > -1) {
						var name0 = temp.select("div.mg_cont.clear").select("dl.dl_comm").select("span.txt_address").select("span.f_l").text();
						var name1 = temp.select("div.mg_cont.clear").select("div.wrap_tit").select("span.f_etit").text();
						var i = 1;
						var name2 = temp.select("div.mg_cont.clear").select("div.wrap_relspace").select("a").toArray().map(v => (1 + i++) + ". " + v.text().replace("..", ""));
						if (name2.length > 0) {
							var name = [];
							name.push("1. " + name1);
							name = name.concat(name2);
							var msg;
							r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
							msg = input.getMsg() * 1;
							if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
								var targetNum = msg - 1;
								var want = name[targetNum].split(". ")[1];
								var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
								var name0 = temp.select("div.mg_cont.clear").select("dl.dl_comm").select("span.txt_address").select("span.f_l").text();
								var name1 = temp.select("div.mg_cont.clear").select("div.wrap_tit").select("span.f_etit").text();
							}
						}
						var wantplace = "";
						var temp = name0;
						var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
						var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
						var loc2 = temp.substr(0, temp.lastIndexOf("동 ") + 1);
						var loc3 = temp.substr(0, temp.lastIndexOf("가 ") + 1);
						if (loc.length > 0) {
							wantplace = loc;
						} else {
							if (loc1.length > 0) {
								wantplace = loc1;
							} else {
								if (loc2.length > 0) {
									wantplace = loc2;
								} else {
									if (loc3.length > 0) {
										wantplace = loc3;
									} else {
										var temp = name1;
										var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
										var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
										var loc2 = temp.substr(0, temp.lastIndexOf("구 ") + 1);
										var loc3 = temp.substr(0, temp.lastIndexOf("시 ") + 1);
										if (loc.length > 0) {
											wantplace = loc;
										} else {
											if (loc1.length > 0) {
												wantplace = loc1;
											} else {
												if (loc2.length > 0) {
													wantplace = loc2;
												} else {
													if (loc3.length > 0) {
														wantplace = loc3;
													}
												}
											}
										}
									}
								}
							}
						}
						link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
						link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
						if (link2.indexOf("regionCode") == -1) {
							link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
							link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
						}
						check = link2.indexOf("weather");
						where = want;
						if (check == -1 || String(temp).length == 0) {
							r.replier.reply("검색이 불가능합니다.");
							return;
						}
					} else {
						var name = [];
						name.push("1. " + temp.select("div.mg_cont.clear.admin_area").select("div.wrap_tit").select("span").text() + " ");
						var i = 1;
						name = name.concat(temp.select("div.mg_cont.clear.admin_area").select("div.wrap_relspace").select("a").toArray().map(v => (1 + i++) + ". " + v.text().replace("..", "") + " "));
						if (navername != undefined) {
							if (navername.length >= name.length) {
								name = navername;
							}
						}
						var msg;
						r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
						msg = input.getMsg() * 1;
						if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
							var targetNum = msg - 1;
							var wantplace = "";
							var temp = name[targetNum].substr(3);
							var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
							var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
							var loc2 = temp.substr(0, temp.lastIndexOf("동 ") + 1);
							var loc3 = temp.substr(0, temp.lastIndexOf("가 ") + 1);
							var loc4 = temp.substr(0, temp.lastIndexOf("군 ") + 1);
							var loc5 = temp.substr(0, temp.lastIndexOf("구 ") + 1);
							var loc6 = temp.substr(0, temp.lastIndexOf("시 ") + 1);
							if (loc.length > 0) {
								wantplace = loc;
							} else {
								if (loc1.length > 0) {
									wantplace = loc1;
								} else {
									if (loc2.length > 0) {
										wantplace = loc2;
									} else {
										if (loc3.length > 0) {
											wantplace = loc3;
										} else {
											if (loc4.length > 0) {
												wantplace = loc4;
											} else {
												if (loc5.length > 0) {
													wantplace = loc5;
												} else {
													if (loc6.length > 0) {
														wantplace = loc6;
													} else {
														wantplace = temp;
													}
												}
											}
										}
									}
								}
							}
							link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
							link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
							if (link2.indexOf("regionCode") == -1) {
								link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
								link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
							}
							check = link2.indexOf("weather");
							where = name[targetNum].substr(3);
						}
					}
				} else {
					temp = temp.select("div.wrap_place").select("div.wrap_cont").toArray();
					var i = 0;
					var name = temp.map(v => (1 + i++) + ". " + v.select("a").first().text().replace(" 펼치기/접기", ""));
					if (name.length == 0) {
						r.replier.reply("검색이 불가능합니다.");
						return;
					}
					var loc = temp.map(v => {
						vv = String(v.select("dd.cont").text() + " ");
						return vv.substr(0, vv.lastIndexOf("면 ") + 1);
					}
					);
					var loc1 = temp.map(v => {
						vv = String(v.select("dd.cont").text() + " ");
						return vv.substr(0, vv.lastIndexOf("읍 ") + 1);
					}
					);
					var loc2 = temp.map(v => {
						vv = String(v.select("dd.cont").text() + " ");
						return vv.substr(0, vv.lastIndexOf("동 ") + 1);
					}
					);
					var loc3 = temp.map(v => {
						vv = String(v.select("dd.cont").text() + " ");
						return vv.substr(0, vv.lastIndexOf("가 ") + 1);
					}
					);
					var msg;
					r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
					msg = input.getMsg() * 1;
					if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
						var targetNum = msg - 1;
						var wantplace = "";
						if (loc[targetNum].length > 0) {
							wantplace = loc[targetNum];
						} else {
							if (loc1[targetNum].length > 0) {
								wantplace = loc1[targetNum];
							} else {
								if (loc2[targetNum].length > 0) {
									wantplace = loc2[targetNum];
								} else {
									if (loc3[targetNum].length > 0) {
										wantplace = loc3[targetNum];
									}
								}
							}
						}
						link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
						link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
						if (link2.indexOf("regionCode") == -1) {
							link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
							link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
						}
						where = name[targetNum].substr(3);
						check = link2.indexOf("weather");
					}
				}
			} else {
				if (link2 == "http://m.weather.naver.com/m/nation.nhn") {
					var temp = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
					if (String(temp).indexOf("addressColl") > -1) {
						var name = [];
						name.push("1. " + temp.select("div.mg_cont.clear.admin_area").select("div.wrap_tit").select("span").text());
						var i = 1;
						name = name.concat(temp.select("div.mg_cont.clear.admin_area").select("div.wrap_relspace").select("a").toArray().map(v => (1 + i++) + ". " + v.text()));
						if (name.length == 1) {
							var targetNum = 0;
						} else {
							if (name.length > 1) {
								var msg;
								r.replier.reply("장소를 선택하세요\n" + name.join("\n"));
								msg = input.getMsg() * 1;
								if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
									var targetNum = msg - 1;
								}
							}
						}
						var wantplace = "";
						var temp = name[targetNum].split(". ")[1];
						var loc = temp.substr(0, temp.lastIndexOf("면 ") + 1);
						var loc1 = temp.substr(0, temp.lastIndexOf("읍 ") + 1);
						var loc2 = temp.substr(0, temp.lastIndexOf("동 ") + 1);
						var loc3 = temp.substr(0, temp.lastIndexOf("가 ") + 1);
						if (loc.length > 0) {
							wantplace = loc;
						} else {
							if (loc1.length > 0) {
								wantplace = loc1;
							} else {
								if (loc2.length > 0) {
									wantplace = loc2;
								} else {
									if (loc3.length > 0) {
										wantplace = loc3;
									}
								}
							}
						}
						link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + wantplace).get();
						link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
						if (link2.indexOf("regionCode") == -1) {
							link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + wantplace + "날씨").get();
							link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
						}
						check = link2.indexOf("weather");
						where = name[targetNum].split(". ")[1];
						if (check == -1 || String(temp).length == 0) {
							r.replier.reply("검색이 불가능합니다.");
							return;
						}
					}
				} else {
					if (link2 == "http://m.weather.naver.com") {
						var i = 0;
						var link1 = org.jsoup.Jsoup.connect("https://search.daum.net/search?nil_suggest=btn&w=tot&DA=SBC&q=" + want).get();
						var name = String(link1.select("select[id=regionnamelist]").text()).replace("하위 행정명", "").trim().split(" ").map(v => (1 + i++) + ". " + v);
						var msg;
						if (name.length < 6) {
							r.replier.reply("지역을 선택하세요\n" + name.join("\n"));
						} else {
							if (name.length > 5) {
								var name1 = "";
								for (var i in name) {
									if (Number(name[i].split(".")[0]) % 2 == 1) {
										name1 += name[i];
									} else {
										name1 += " / " + name[i] + "\n";
									}
								}
								r.replier.reply("지역을 선택하세요\n" + name1.trim());
							}
						}
						msg = input.getMsg() * 1;
						if (!isNaN(msg) && msg >= 1 && msg <= name.length) {
							var targetNum = msg - 1;
							link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=날씨+" + name[targetNum].substr(3)).get();
							link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
							if (link2.indexOf("regionCode") == -1) {
								link1 = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?query=+" + name[targetNum].substr(3) + "날씨").get();
								link2 = link1.select("div.api_more_wrap").select("a").attr("abs:href");
							}
							check = link2.indexOf("weather");
							where = name[targetNum].substr(3);
						}
					}
				}
			}
		}
		if (link2.indexOf("regionCode") == -1) {
			r.replier.reply("검색이 불가능합니다.");
			return;
		}
		if (check > -1) {
			var doc = org.jsoup.Jsoup.connect(link2).get();
			var sky = doc.select("div.weather_icon.sp_icon_60").toArray().map(v => v.text());
			var degree = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=0]").text().split(",").slice();
			var wind = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=2]").text().split(",").slice();
			var wet = doc.select("div._cnWtrHourlyChartData").select("div[data-tab=3]").text().split(",").slice();
			var where1 = "";
			if (want.length > 0) {
				var where1 = "(" + doc.select("div.section_location").select("strong").text() + ")";
			}
			if (String(doc).indexOf("Weathernews") > 0 || String(doc).indexOf("The Weather Channel") > 0 || String(doc).indexOf("accuweather") > 0) {
				var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
				var clock1 = clock.length;
				if (clock1 > 16) {
					clock1 = 16;
				}
				var res = where + where1 + " 날씨\n";
				res += "-------------날씨-------------\n";
				res += "시간 기온 습도 바람	날씨\n [h]   [℃]  [%]  [㎧]	상태\n";
				for (var i = 1; i < clock1; i++) {
					res += " " + String(clock[i]).extension("0", 2) + "	";
					res += String(degree[i]).extension(" ", 2) + "	";
					res += String(wet[i]).extension(" ", 3) + "   ";
					res += String(wind[i]).extension(" ", 2) + " ";
					res += String(sky[i]).extension("ㅤ", 5) + "\n";
					if (i == 5) {
						res = res.trim() + " " + es + "\n";
					}
				}
				res += "\n" + link2;
			} else {
				var clock = doc.select("span.th_text").text().match(/[0123456789]?[0123456789](?=시)/g);
				var clock1 = clock.length;
				var uv1 = doc.select("li.uv").select("em").text();
				var uv = doc.select("li.uv").select("span").text().replace(uv1, " (" + uv1 + ")");
				var index = doc.select("strong.title").text().replace("최근 검색한 곳", "").split(" ").map(v => String(v).replace(/온도/g, "온도 : ").replace(/지수/g, "지수 : "));
				var sun1 = doc.select("li.sun_item").select("div.day").select("span").get(0).text() + " : " + doc.select("li.sun_item").select("div.time").get(0).text();
				var sun2 = doc.select("li.sun_item").select("div.day").select("span").get(1).text() + " : " + doc.select("li.sun_item").select("div.time").get(1).text();
				var link3 = link2 + "&default=air";
				var doc1 = org.jsoup.Jsoup.connect(link3).get();
				var pollution = doc1.select("li.pollution_item").toArray().map(v => {
					vv = String(v.select("span.number").select("em").text());
					vvv = String(v.select("span.title").text());
					return vvv + " : " + v.select("span.number").text().replace(vv, " " + vv);
				}
				);
				var dust = doc1.select("div.chart_item").toArray().map(v => v.select("div.dust_graph_number").text().replace("먼지", "먼지 :") + "㎍/㎥" + "(" + v.select("div.dust_graph_text").text() + ")");
				var windrain = "";
				var windtemp = wind.slice(0, 7);
				var windforce = [, , , , ];
				for (var i in windtemp) {
					if (Number(windtemp[i]) > 16) {
						windforce[i] = 1;
					} else {
						if (Number(windtemp[i]) > 9) {
							windforce[i] = 0;
						}
					}
				}
				if (windforce.indexOf(1) > -1) {
					windtemp.sort(compare);
					windrain += windtemp[6] + "㎧로 바람이 매우 강합니다.\n";
				} else {
					if (windforce.indexOf(0) > -1) {
						windtemp.sort(compare);
						windrain += windtemp[6] + "㎧로 바람이 강합니다.\n";
					}
				}
				if (sky.slice(0, 7).map(v => String(v)).indexOf("비") > -1) {
					windrain += "☔비가오니 우산을 챙기세요☔";
				}
				if (windrain != "") {
					r.replier.reply(windrain.trim());
				}
				var res = where + where1 + " 날씨\n";
				res += "-------미세먼지/자외선-------\n";
				res += dust.join("\n") + "\n";
				res += "자외선 : " + uv + "\n";
				res += "-------------날씨-------------\n";
				res += "시간ㅤ기상ㅤ기온 습도 바람\n [h] ㅤ상황	[℃]  [%]  [㎧]\n";
				for (var i = 0; i < clock1; i++) {
					res += " " + String(clock[i]).extension("0", 2) + " ";
					res += String(sky[i]).extensionRight("ㅤ", 4) + "  ";
					res += String(degree[i]).extension(" ", 2) + "   ";
					res += String(wet[i]).extension(" ", 3) + "   ";
					res += String(wind[i]).extension(" ", 2) + "\n";
					if (i == 6) {
						res = res.trim() + " " + es + "\n";
					}
				}
				res += "------------기타지수------------\n" + pollution.join("\n") + "\n";
				res += "------------일상지수------------\n" + index.join("\n");
				res += "\n------------일출&일몰-----------\n" + sun1 + "\n" + sun2;
				res += "\n" + link2;
			}
			r.replier.reply(res);
		}
	});
}
