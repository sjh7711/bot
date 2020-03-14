funccList = ['!날씨','!로또', '!쪽지', '!유튜브','!메뉴','!오버워치','!시간']
funccList3 = ['!사진확인', '!사진삭제', '!사진목록','!전체채팅']
funccList4 = ['!방','!쓰레드','!디비','!로드','!로딩','!리부트','!방아이디조회','!전체검색']
funccList5 = ['!실검','!명단','!식당','!맛집','!서브웨이', '!노래','!가사','!제이플라','!번역','!주사위', '!건의']

funccList1 = ['!최근채팅','!야구','!블랙잭', '!사진조회','!닉변내역','!아이디조회', '!신원조회', '!출입내역'];
roomList = ['관리','시갤','전컴','단톡','가족','봇방','옵치','자생','야구','블랙','기타'];
controlList = {
관리 : [1,1,1,1,1,1,1,1],
시갤 : [0,1,1,0,1,1,0,1],
전컴 : [1,1,1,0,1,1,0,1],
단톡 : [1,1,1,1,0,0,0,0],
가족 : [0,1,1,0,0,0,0,0],
봇방 : [1,1,1,1,1,1,1,1],
옵치 : [1,1,1,1,0,0,0,0],
자생 : [0,0,0,0,0,0,0,0],
야구 : [0,1,0,0,1,1,0,1],
블랙 : [0,0,1,0,1,1,0,1],
기타 : [0,1,1,0,0,0,0,0]
}

funcCheck = function (r) {
	var str1 = "!날씨\n이 외의 기능은 전체보기를 통해 확인해주세요."+es+"\n\n";
	for (var i = 1; i < funccList.length ; i++) {
		str1 += funccList[i] + "\n";
	}
	for (var i = 0; i < funccList1.length ; i++) {
		if(controlList[r.room][i] == 1){
			str1 += funccList1[i] + "\n";
		}
	}
	if ( r.room == '관리' ) {
		for (var i = 0; i < funccList3.length ; i++) {
		str1 += funccList3[i] + "\n";
		}
	}
	if ( r.room == '관리' || r.room =='봇방' ) {
		for (var i = 0; i < funccList4.length ; i++) {
			str1 += funccList4[i] + "\n";
		}
	}
	for (var i = 0; i < funccList5.length ; i++) {
		str1 += funccList5[i] + "\n";
	}
	return str1.trim();
}

controlEdit = function (r) {
	I.register("controlEdit", r.room, r.sender, function (input) {
		var edit = String(readFile(File("/storage/emulated/0/kbot/functions/control.js")));		
		var temp1 = '';
		var temp2 = '';
		var msg;
		var i = 0;
		r.replier.reply("방을 선택하세요\n" + roomList.map(v=> (1 + i++) + ". " + v  ).join("\n"));
		msg = input.getMsg() * 1;
		if (!isNaN(msg) && msg >= 1 && msg <= roomList.length) {
			temp1 = roomList[Number(msg-1)];
			var msg;
			var i = 0;
			r.replier.reply("기능을 선택하세요\n" + funccList1.map(v=> (1 + i++) + ". " + v.substr(1) + " (" + controlList[roomList[Number(msg-1)]][i-1] + ")" ).join("\n"));
			msg = input.getMsg() * 1;
			if (!isNaN(msg) && msg >= 1 && msg <= funccList1.length) {
				temp2 = Number(msg-1);
				var msg;
				r.replier.reply("켜려면 1, 끄러면 0을 입력하세요");
				msg = input.getMsg() * 1;
				if( msg == 0 ){
					controlList[temp1][temp2] = 0;
					r.replier.reply("수정 완료");
				} else if ( msg == 1 ) {
					controlList[temp1][temp2] = 1;
					r.replier.reply("수정 완료");
				} else {
					r.replier.reply('잘못 입력했습니다.');
					return;
				}
			} else {
				r.replier.reply('잘못 입력했습니다.');
				return;
			}
		} else {
			r.replier.reply('잘못 입력했습니다.');
			return;
		}
	})
}