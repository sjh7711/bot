lottocount = function (r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select("div.win_result");
	var num = raw.select("h4").text().split("회")[0] * 1 + 1;
	if (r.room == "test") {
		var data = D.selectForArray("lotto", "room, name, count(*)", "num=?", [num], {groupBy: "room,name"});
	} else {
		var data = D.selectForArray("lotto", "name,count(*)", "num=? and room =?", [num, r.room], {groupBy: "name"});
	}
	if (data.length == 0) {
		r.replier.reply("아무도 로또를 뽑지않았습니다.");
		return;
	}
	if (r.room == "test") {
		r.replier.reply(num + "회차 유저별 로또개수" + es + "\n" + data.map(v => v[0] + " | " + v[1] + " : " + v[2] + "개").join("\n"));
	} else {
		r.replier.reply(num + "회차 유저별 로또개수" + es + "\n" + data.map(v => v[0] + " : " + v[1] + "개").join("\n"));
	}
}


lotto = function (r) {
	var cycle = 5;
	if (r.msg.substr(4) > 0 && r.msg.substr(4) < 20001) {
		cycle = Number(r.msg.substr(4));
	}
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select("div.win_result");
	var num = raw.select("h4").text().split("회")[0] * 1 + 1;
	var str = "";
	var acycle = cycle;
	var kcycle = (Math.floor(cycle / 100) + 1);
	for (var k = 0; k < kcycle; k++) {
		if (cycle == 0) {
			break;
		} else {
			if (cycle < 100) {
				var icycle = cycle;
			} else {
				var icycle = 100;
			}
		}
		var str1 = "";
		for (var j = 0; j < icycle; j++) {
			var numlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
			var templotto = [];
			for (var i = 0; i < 6; i++) {
				var rad = Math.floor(Math.random() * numlist.length);
				templotto.push(numlist.splice(rad, 1));
			}
			templotto.sort(compare);
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1;
			var date = today.getDate();
			var hour = today.getHours();
			var minute = today.getMinutes();
			date = date < 10 ? "0" + date : date;
			hour = hour < 10 ? "0" + hour : hour;
			minute = minute < 10 ? "0" + minute : minute;
			str1 += "('" + r.room + "','" + r.sender + "','" + year + "." + month + "." + date + " " + hour + "." + minute + "','" + num + "',' " + templotto.join(" ") + " ','-1',''),";
			if (acycle < 6) {
				str += Number(j + 1) + ". | " + templotto.map(v => String(v).extension(" ", 2)).join(", ") + "\n";
			}
		}
		D.rawQuery("INSERT INTO lotto (room,name,date,num,lotto,count,class) VALUES " + str1.substr(0, str1.length - 1));
		cycle -= icycle;
	}
	str += r.sender + "님이 " + acycle + "개의 로또를 뽑았습니다.";
	r.replier.reply(str);
}


flottocheck = function (r) {
	var Timer = new Date();
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select("div.win_result");
	var lastnum = Number(raw.select("h4").text().split("회")[0]) + 1;
	var money = D.selectForArray("lottomoney", null, "num=?", [lastnum - 1])[0];
	var win = raw.select("p").get(1).text().split(" ").slice().map(v => " " + String(v) + " ");
	var bonus = " " + String(raw.select("p").get(2).text()) + " ";
	var date = raw.select("p").get(0).text().replace("(", "").replace(" 추첨)", "").slice();
	var lottodata = D.selectForArray("lotto", ["date", "lotto"], "num=? and name=? and room=?", [lastnum, r.sender, r.room]);
	var failcount = 0;
	var str1 = "\n";
	var one = 0;
	var str2 = "\n";
	var two = 0;
	var str3 = "\n";
	var three = 0;
	var str4 = "\n";
	var four = 0;
	var str5 = "\n";
	var five = 0;
	for (var i in lottodata) {
		var count = 0;
		for (j = 0; j < 6; j++) {
			if (lottodata[i][1].indexOf(win[j]) > -1) {
				count += 1;
			}
			if (j == 4 && count == 0) {
				break;
			}
		}
		if (count == 5 && lottodata[i][1].indexOf(bonus) > -1) {
			count += 2;
		}
		if (count == 0 || count == 1 || count == 2) {
			failcount += 1;
		} else {
			if (count == 3) {
				str5 += lottodata[i].join(" |") + "\n";
				five += 1;
			} else {
				if (count == 4) {
					str4 += lottodata[i].join(" |") + "\n";
					four += 1;
				} else {
					if (count == 5) {
						str3 += lottodata[i].join(" |") + "\n";
						three += 1;
					} else {
						if (count == 7) {
							str2 += lottodata[i].join(" |") + "\n";
							two += 1;
						} else {
							if (count == 6) {
								str1 += lottodata[i].join(" |") + "\n";
								one += 1;
							}
						}
					}
				}
			}
		}
	}
	if (four > 100) {
		str4 = "";
	}
	if (five > 200) {
		str5 = "";
	}
	var all = lottodata.length;
	if (all == 0) {
		r.replier.reply("로또를 뽑은 뒤 다시 시도하세요.");
		return;
	}
	var result = "";
	var getmoney = Number(five * 5000 + four * 50000 + three * money[3] + two * money[2] + one * money[1]);
	var getmoney1 = String(getmoney).moneyUnit();
	var lost = String(all * 1000).moneyUnit();
	result += "1등 확률 : " + Number((Math.floor(one / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + one + ")" + "\n";
	result += "2등 확률 : " + Number((Math.floor(two / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + two + ")" + "\n";
	result += "3등 확률 : " + Number((Math.floor(three / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + three + ")" + "\n";
	result += "4등 확률 : " + Number((Math.floor(four / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + four + ")" + "\n";
	result += "5등 확률 : " + Number((Math.floor(five / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + five + ")" + "\n";
	result += "\n쓴ㅤ돈 : " + lost + "\n당첨금 : " + getmoney1 + "\n";
	result += "회수율 : " + Math.floor(getmoney / (all * 1000) * 100000) / 1000 + "%	 " + es + "\n\n";
	result += "저번주 당첨 번호\n" + win.join(" ") + " / " + bonus + "\n\n";
	money = money.map(v => String(v).moneyUnit());
	result += "저번주 당첨금\n1등 : " + money[1] + "\n2등 : " + money[2] + "\n3등 : " + money[3] + "\n4등 : 5만원\n5등 : 5천원\n\n";
	result += "1등 개수 : " + one + "\n" + str1 + "\n" + "2등 개수 : " + two + "\n" + str2 + "\n" + "3등 개수 : " + three + "\n" + str3 + "\n" + "4등 개수 : " + four + "\n" + str4 + "\n" + "5등 개수 : " + five + "\n" + str5 + "\n" + "꽝 개수 : " + failcount + "\n";
	r.replier.reply(r.sender + "님의 이번주 번호가 저번주 번호라면?(개수 : " + lottodata.length + ")\n" + result);
	Api.replyRoom("test", lottodata.length + "개 / " + ((new Date() - Timer) / 1000) + "s");
}


calculating = 0;
lottocheck = function (r) {
	var doc = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get();
	var raw = doc.select("div.win_result");
	var lastnum = raw.select("h4").text().split("회")[0];
	var win = raw.select("p").get(1).text().split(" ").slice().map(v => " " + String(v) + " ");
	var bonus = " " + String(raw.select("p").get(2).text()) + " ";
	var date = raw.select("p").get(0).text().replace("(", "").replace(" 추첨)", "").slice();
	var temp = D.selectForArray("lotto", "count(*)", "num=? and count > -1", [lastnum])[0][0];
	if (temp == 0 || calculating == 1) {
		if (calculating == 0) {
			var willdo = D.selectForArray("lotto", "count(*)", "num=?", [lastnum])[0][0];
			r.replier.reply("모든 방에서 이번주에 총 " + String(willdo) + "개의 로또를 뽑았습니다. 계산을 위해 잠시만 기다려주세요.");
			calculating = 1;
			var money = doc.select("tbody>tr").toArray().map(v => String(v.select("td.tar").get(1).text()).replace(/[,원]/g, ""));
			D.insert("lottomoney", {num: lastnum, first: money[0], second: money[1], third: money[2], fourth: money[3], fifth: money[4]});
			for (var t = 0; t < (Math.floor(willdo / 500000) + 1); t++) {
				var lottodata = D.rawQuery("SELECT key, lotto FROM lotto WHERE num = " + lastnum + " and count = -1 limit 500000 offset 0");
				for (var i = 0; i < lottodata.length; i++) {
					var count = 0;
					for (j = 0; j < 6; j++) {
						if (lottodata[i][1].indexOf(win[j]) > -1) {
							count += 1;
						}
					}
					if (count == 5 && lottodata[i][1].indexOf(bonus) > -1) {
						count += 2;
					}
					if (count == 0 || count == 1 || count == 2) {
						D.update("lotto", {count: count, class: "꽝"}, "key=?", [lottodata[i][0]]);
					} else {
						if (count == 3) {
							D.update("lotto", {count: 3, class: "5등"}, "key=?", [lottodata[i][0]]);
						} else {
							if (count == 4) {
								D.update("lotto", {count: 4, class: "4등"}, "key=?", [lottodata[i][0]]);
							} else {
								if (count == 5) {
									D.update("lotto", {count: 5, class: "3등"}, "key=?", [lottodata[i][0]]);
								} else {
									if (count == 7) {
										D.update("lotto", {count: 7, class: "2등"}, "key=?", [lottodata[i][0]]);
									} else {
										if (count == 6) {
											D.update("lotto", {count: 6, class: "1등"}, "key=?", [lottodata[i][0]]);
										}
									}
								}
							}
						}
					}
				}
			}
			calculating = 0;
			r.replier.reply("계산이 끝났습니다. 데이터 정리를 위해 잠시만 기다려주세요.");
		} else {
			r.replier.reply("로또 결과를 계산중입니다.\n진행률 : " + Math.floor(Number(D.selectForArray("lotto", "count(*)", "num=? and count > -1", [lastnum])[0][0] / D.selectForArray("lotto", "count(*)", "num=?", [lastnum])[0][0]) * 10000) / 100 + "%");
			return;
		}
	}
	var money1 = D.selectForArray("lottomoney", null, "num=?", [lastnum])[0];
	if (r.msg == "!당첨") {
		if (D.selectForArray("lotto", "count(*)", "room=? and num=?", [r.room, lastnum])[0][0] == 0) {
			r.replier.reply("저번주에 로또 번호를 뽑은 사람이 아무도 없습니다.");
			return;
		}
		var temp = D.selectForArray("lotto", ["name", "date", "lotto", "count"], "room=? and num=?", [r.room, lastnum]);
		var all = D.selectForArray("lotto", "count(*)", " num = ? and room = ? ", [lastnum, r.room])[0][0];
		var temp1 = D.selectForArray("lotto", "count, count(*)", "num = ? and room = ? and count > 2", [lastnum, r.room], {groupBy: "count"});
		var five = 0;
		var four = 0;
		var three = 0;
		var two = 0;
		var one = 0;
		for (var i in temp1) {
			if (temp1[i][0] == 3) {
				five = temp1[i][1];
			} else {
				if (temp1[i][0] == 4) {
					four = temp1[i][1];
				} else {
					if (temp1[i][0] == 5) {
						three = temp1[i][1];
					} else {
						if (temp1[i][0] == 6) {
							one = temp1[i][1];
						} else {
							if (temp1[i][0] == 7) {
								two = temp1[i][1];
							}
						}
					}
				}
			}
		}
	} else {
		if (r.msg.substr(4).length > 0) {
			if (D.selectForArray("lotto", "count(*)", "room=? and num=? and name=?", [r.room, lastnum, r.msg.substr(4)])[0][0] == 0) {
				r.replier.reply(r.msg.substr(4) + "님은 저번주에 로또번호를 뽑은 적이 없습니다.");
				return;
			}
			var temp = D.selectForArray("lotto", ["name", "date", "lotto", "count"], "room=? and num =? and name=?", [r.room, lastnum, r.msg.substr(4)]);
			var all = D.selectForArray("lotto", "count(*)", " num = ? and room = ? and name = ? ", [lastnum, r.room, r.msg.substr(4)])[0][0];
			var temp1 = D.selectForArray("lotto", "count, count(*)", "num = ? and room = ? and name = ? and count > 2", [lastnum, r.msg.substr(4), r.room], {groupBy: "count"});
			var five = 0;
			var four = 0;
			var three = 0;
			var two = 0;
			var one = 0;
			for (var i in temp1) {
				if (temp1[i][0] == 3) {
					five = temp1[i][1];
				} else {
					if (temp1[i][0] == 4) {
						four = temp1[i][1];
					} else {
						if (temp1[i][0] == 5) {
							three = temp1[i][1];
						} else {
							if (temp1[i][0] == 6) {
								one = temp1[i][1];
							} else {
								if (temp1[i][0] == 7) {
									two = temp1[i][1];
								}
							}
						}
					}
				}
			}
		}
	}
	var result = date + " " + lastnum + "회\n뽑은 개수 : " + temp.length + "\n당첨번호 : " + win.map(v => v.trim()).join(" ") + "/" + bonus.trim() + "\n";
	var money = money1.map(v => String(v).moneyUnit());
	var getmoney = Number(one * money1[1] + two * money1[2] + three * money1[3] + four * 50000 + five * 5000);
	var lost = all * 1000;
	result += "1등 : " + money[1] + "\n2등 : " + money[2] + "\n3등 : " + money[3] + "\n4등 : 5만원\n5등 : 5천원\n\n쓴ㅤ돈 : " + String(lost).moneyUnit() + "\n당첨금 : " + String(getmoney).moneyUnit() + "\n회수율 : " + Math.floor(getmoney / lost * 100000) / 1000 + "%	  ";
	var first = "";
	var second = "";
	var third = "";
	var fourth = "";
	var fifth = "";
	for (var i = 0; i < temp.length; i++) {
		if (temp[i][3] == 3) {
			fifth += temp[i][0] + "|" + temp[i][2] + " \n생성 : " + temp[i][1] + "\n\n";
		} else {
			if (temp[i][3] == 4) {
				fourth += temp[i][0] + "|" + temp[i][2] + " \n생성 : " + temp[i][1] + "\n\n";
			} else {
				if (temp[i][3] == 5) {
					third += temp[i][0] + "|" + temp[i][2] + " \n생성 : " + temp[i][1] + "\n\n";
				} else {
					if (temp[i][3] == 6) {
						first += temp[i][0] + "|" + temp[i][2] + " \n생성 : " + temp[i][1] + "\n\n";
					} else {
						if (temp[i][3] == 7) {
							second += temp[i][0] + "|" + temp[i][2] + " \n생성 : " + temp[i][1] + "\n\n";
						}
					}
				}
			}
		}
	}
	result += es + "\n\n1등[확률 : " + Number((Math.floor(one / all * 1000000000000) / 10000000000).toFixed(12)) + "% (" + one + ")" + "]";
	result += "\n2등[확률 : " + Number((Math.floor(two / all * 1000000000000) / 10000000000).toFixed(12)) + "% (" + two + ")" + "]";
	result += "\n3등[확률 : " + Number((Math.floor(three / all * 1000000000000) / 10000000000).toFixed(12)) + "% (" + three + ")" + "]";
	result += "\n4등[확률 : " + Number((Math.floor(four / all * 1000000000000) / 10000000000).toFixed(12)) + "% (" + four + ")" + "]";
	result += "\n5등[확률 : " + Number((Math.floor(five / all * 1000000000000) / 10000000000).toFixed(12)) + "% (" + five + ")" + "]";
	result += "\n꽝[" + Number(all - (one + two + three + four + five)) + "]\n\n";
	result += "\n1등 목록\n" + first;
	result += "\n2등 목록\n" + second;
	result += "\n3등 목록\n" + third;
	if (four < 200) {
		result += "\n4등 목록\n" + fourth;
	} else {
		result += "\n4등의 개수가 200개를 초과하였기에 표기하지 않습니다.\n";
	}
	if (five < 200) {
		result += "\n5등 목록" + fifth;
	} else {
		result += "\n5등의 개수가 200개를 초과하였기에 표기하지 않습니다.";
	}
	r.replier.reply(result.replace(/NaN%/g, "데이터없음"));
}


bestlotto = function (r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select("div.win_result");
	var num = raw.select("h4").text().split("회")[0] * 1 + 1;
	var result = "";
	var temp = D.selectForArray("lotto", ["name", "date", "num", "lotto", "count"], "count > 4 and room = ? ", [r.room], {orderBy: "class asc"});
	var all = D.selectForArray("lotto", "count(*)", " num < ? and room = ? ", [num, r.room])[0][0];
	var temp1 = D.selectForArray("lotto", "count, count(*)", "room = ? and count > 2", [r.room], {groupBy: "count"});
	var five = 0;
	var four = 0;
	var three = 0;
	var two = 0;
	var one = 0;
	for (var i in temp1) {
		if (temp1[i][0] == 3) {
			five = temp1[i][1];
		} else {
			if (temp1[i][0] == 4) {
				four = temp1[i][1];
			} else {
				if (temp1[i][0] == 5) {
					three = temp1[i][1];
				} else {
					if (temp1[i][0] == 6) {
						one = temp1[i][1];
					} else {
						if (temp1[i][0] == 7) {
							two = temp1[i][1];
						}
					}
				}
			}
		}
	}
	var getmoney = 0;
	var money = D.selectForArray("lottomoney");
	var start = money[0][0];
	var end = D.selectForArray("lottomoney", "count(*)")[0][0];
	var data = D.selectForArray("lotto", "num, count, count(*)", "num >= ? and num < ? and count > 2 and room = ?", [start, start + end, r.room], {groupBy: "num,count"});
	for (var i in data) {
		var moneyt = data[i][0] - start;
		if (data[i][1] == 3) {
			getmoney += data[i][2] * money[moneyt][5];
		} else {
			if (data[i][1] == 4) {
				getmoney += data[i][2] * money[moneyt][4];
			} else {
				if (data[i][1] == 5) {
					getmoney += data[i][2] * money[moneyt][3];
				} else {
					if (data[i][1] == 6) {
						getmoney += data[i][2] * money[moneyt][1];
					} else {
						if (data[i][1] == 7) {
							getmoney += data[i][2] * money[moneyt][2];
						}
					}
				}
			}
		}
	}
	result += "누적 횟수 : " + all + "\n";
	result += "1등 확률 : " + Number((Math.floor(one / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + one + ")\n";
	result += "2등 확률 : " + Number((Math.floor(two / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + two + ")\n";
	result += "3등 확률 : " + Number((Math.floor(three / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + three + ")\n";
	result += "4등 확률 : " + Number((Math.floor(four / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + four + ")\n";
	result += "5등 확률 : " + Number((Math.floor(five / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + five + ")\n";
	result += "\n쓴ㅤ돈 : " + String(all * 1000).moneyUnit() + "\n당첨금 : " + String(getmoney).moneyUnit() + "\n";
	result += "회수율 : " + Math.floor(getmoney / (all * 1000) * 100000) / 1000 + "%	   " + es + "\n\n";
	var str1 = "\n";
	var str2 = "\n";
	var str3 = "\n";
	for (var i = 0; i < temp.length; i++) {
		if (temp[i][4] == 5) {
			str3 += temp[i][0] + "|생성:" + temp[i][1] + " \n" + temp[i][3] + "| " + temp[i][2] + "회차\n\n";
		} else {
			if (temp[i][4] == 7) {
				str2 += temp[i][0] + "|생성:" + temp[i][1] + " \n" + temp[i][3] + "| " + temp[i][2] + "회차\n\n";
			} else {
				if (temp[i][4] == 6) {
					str1 += temp[i][0] + "|생성:" + temp[i][1] + " \n" + temp[i][3] + "| " + temp[i][2] + "회차\n\n";
				}
			}
		}
	}
	result += "1등 개수 : " + one + "\n" + str1 + "\n" + "2등 개수 : " + two + "\n" + str2 + "\n" + "3등 개수 : " + three + "\n" + str3 + "\n" + "4등 개수 : " + four + "\n\n" + "5등 개수 : " + five + "\n" + "꽝 개수 : " + Number(all - (one + two + three + four + five)) + "\n";
	r.replier.reply(result.replace(/NaN%/g, "데이터없음"));
}


allbestlotto = function (r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select("div.win_result");
	var num = raw.select("h4").text().split("회")[0] * 1 + 1;
	var result = "";
	var all = D.selectForArray("lotto", "count(*)", " num < ?", [num])[0][0];
	var temp1 = D.selectForArray("lotto", "count, count(*)", "count > 2", null, {groupBy: "count"});
	var five = 0;
	var four = 0;
	var three = 0;
	var two = 0;
	var one = 0;
	for (var i in temp1) {
		if (temp1[i][0] == 3) {
			five = temp1[i][1];
		} else {
			if (temp1[i][0] == 4) {
				four = temp1[i][1];
			} else {
				if (temp1[i][0] == 5) {
					three = temp1[i][1];
				} else {
					if (temp1[i][0] == 6) {
						one = temp1[i][1];
					} else {
						if (temp1[i][0] == 7) {
							two = temp1[i][1];
						}
					}
				}
			}
		}
	}
	var getmoney = 0;
	var money = D.selectForArray("lottomoney");
	var start = money[0][0];
	var end = D.selectForArray("lottomoney", "count(*)")[0][0];
	var data = D.selectForArray("lotto", "num, count, count(*)", "num >= ? and num < ? and count > 2", [start, start + end], {groupBy: "num,count"});
	for (var i in data) {
		var moneyt = data[i][0] - start;
		if (data[i][1] == 3) {
			getmoney += data[i][2] * money[moneyt][5];
		} else {
			if (data[i][1] == 4) {
				getmoney += data[i][2] * money[moneyt][4];
			} else {
				if (data[i][1] == 5) {
					getmoney += data[i][2] * money[moneyt][3];
				} else {
					if (data[i][1] == 6) {
						getmoney += data[i][2] * money[moneyt][1];
					} else {
						if (data[i][1] == 7) {
							getmoney += data[i][2] * money[moneyt][2];
						}
					}
				}
			}
		}
	}
	result += "누적 횟수 : " + all + "\n";
	result += "1등 확률 : " + Number((Math.floor(one / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + one + ")\n";
	result += "2등 확률 : " + Number((Math.floor(two / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + two + ")\n";
	result += "3등 확률 : " + Number((Math.floor(three / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + three + ")\n";
	result += "4등 확률 : " + Number((Math.floor(four / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + four + ")\n";
	result += "5등 확률 : " + Number((Math.floor(five / all * 1000000000000) / 10000000000).toFixed(12)) + "%(" + five + ")\n";
	result += "\n쓴ㅤ돈 : " + String(all * 1000).moneyUnit() + "\n당첨금 : " + String(getmoney).moneyUnit() + "\n";
	result += "회수율 : " + Math.floor(getmoney / (all * 1000) * 100000) / 1000 + "%	";
	if (r.room == "test") {
		var str1 = "\n";
		var str2 = "\n";
		var str3 = "\n";
		var temp = D.selectForArray("lotto", ["name", "date", "num", "lotto", "count", "room"], "count > 4 ", null, {orderBy: "class asc"});
		result += "\n" + es + "\n";
		for (var i = 0; i < temp.length; i++) {
			if (temp[i][4] == 5) {
				str3 += temp[i][5] + "/" + temp[i][0] + "|생성:" + temp[i][1] + " \n" + temp[i][3] + "| " + temp[i][2] + "회차\n\n";
			} else {
				if (temp[i][4] == 7) {
					str2 += temp[i][5] + "/" + temp[i][0] + "|생성:" + temp[i][1] + " \n" + temp[i][3] + "| " + temp[i][2] + "회차\n\n";
				} else {
					if (temp[i][4] == 6) {
						str1 += temp[i][5] + "/" + temp[i][0] + "|생성:" + temp[i][1] + " \n" + temp[i][3] + "| " + temp[i][2] + "회차\n\n";
					}
				}
			}
		}
		result += "1등 개수 : " + one + "\n" + str1 + "\n" + "2등 개수 : " + two + "\n" + str2 + "\n" + "3등 개수 : " + three + "\n" + str3 + "\n" + "4등 개수 : " + four + "\n\n" + "5등 개수 : " + five + "\n\n" + "꽝 개수 : " + Number(all - (one + two + three + four + five)) + "\n";
	}
	r.replier.reply(result);
}


mylotto = function (r) {
	var raw = org.jsoup.Jsoup.connect("https://www.dhlottery.co.kr/gameResult.do?method=byWin").get().select("div.win_result");
	var num = raw.select("h4").text().split("회")[0] * 1 + 1;
	var temp = D.selectForArray("lotto", ["date", "lotto"], "room = ? and name = ? and num = ?", [r.room, r.sender, num]);
	if (temp.length == 0) {
		result = "뽑은 번호가 없습니다";
	} else {
		if (temp.length < 1000) {
			var result = r.sender + "님이 이번주에 뽑은 로또번호\n" + num + "회차 " + temp.length + "개\n" + es + "\n";
			for (var i = 0; i < temp.length; i++) {
				result += (i + 1) + ". |" + temp[i][1] + "\n  생성:" + temp[i][0] + "\n\n";
			}
		} else {
			var result = r.sender + "님이 이번주에 뽑은 로또번호\n" + num + "회차 " + temp.length + "개\n" + es + "\n";
			for (var i = 0; i < 1000; i++) {
				result += (i + 1) + ". |" + temp[i][1] + "\n  생성:" + temp[i][0] + "\n\n";
			}
		}
	}
	r.replier.reply(result);
}
