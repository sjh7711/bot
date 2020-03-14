ROOM_DATA = {
	"관리" : "18248078030548724",
	"18248078030548724" : "관리",
	"시갤" : "18259566597820701",
	"18259566597820701" : "시갤",
	"단톡" : "34562168741689",
	"34562168741689" : "단톡",
	"옵치" : "199403768640948",
	"199403768640948" : "옵치",
	"봇방" : "18271769562610190",
	"18271769562610190" : "봇방",
	"야구" : "18251161196296451",
	"18251161196296451" : "야구",
	"자생" : "18195967861665450",
	"18195967861665450" : "자생",
	"전컴" : "18206635037381780",
	"18206635037381780" : "전컴"
}

ROOM_LINK_ID = {
	"관리" : "58387445",
	"58387445" : "관리",
	"시갤" : "71981256",
	"71981256" : "시갤",
	"봇방" : "87158082",
	"87158082" : "봇방",
	"야구" : "62379280",
	"62379280" : "야구",
	"자생" : "20714346",
	"20714346" : "자생",
	"전컴" : "24873750",
	"24873750" : "전컴"
}

realId = function (r, info){
	if(!ROOM_LINK_ID[r.room] && !ROOM_LINK_ID[r] ){//MultiChat
		return info;
	} else {
		if( typeof(r) == "object" && !isNaN(String(info))){ //r => r // info == user_id
			var num = B(1073741824);//Math.pow(2,30)
			var user_Id = B(info);
			var link_Id = B(ROOM_LINK_ID[r.room])
			var real_Id = user_Id.minus(num.multipliedBy(link_Id))
			return real_Id.toString()
		} else if ( ROOM_LINK_ID[r] && !isNaN(String(info)) ) { //r => roomname //info == user_id(OpenChat)
			var num = B(1073741824);//Math.pow(2,30)
			var user_Id = B(info);
			var link_Id = B(ROOM_LINK_ID[r])
			var real_Id = user_Id.minus(num.multipliedBy(link_Id))
			return real_Id.toString()
		} else {
			var num = B(1073741824);//r => r // info == getchatinfo
			var user_Id = B(info.user_id);
			var link_Id = B(ROOM_LINK_ID[ROOM_DATA[info.chat_id]])
			var real_Id = user_Id.minus(num.multipliedBy(link_Id))
			return real_Id.toString()
		}
	}
}

roomAceess = function (r){
	var roomcode = ROOM_DATA[r.room]
    if (!roomcode) {
        r.replier.reply("기능이 지원되지 않는 방입니다.")
        return;
    }
    r.replier.reply("불러오는 중...")
    var list = K1.rawQueryForArray("SELECT _id FROM chat_logs WHERE type=0 AND chat_id = ? ORDER BY _id DESC", [roomcode])
    var str = ""
    for (var _id in list) {
        var info = getChatInfo(list[_id])
        var message = JSON.parse(info.message)
        if (message.feedType == 4) {
            str += parseInt(info.created_at + "000", 10).toString().timeUnit().now + "\n"
            str += "입장 : " + message.members.map((m) => m.nickName + "(" + info.user_id + ")").join(",") + "\n\n"
        }
        else if (message.feedType == 2) {
            str += parseInt(info.created_at + "000", 10).toString().timeUnit().now + "\n"
            str += "퇴장 : " + message.member.nickName + "(" + info.user_id + ")\n\n" //+ ((message.member.userId != info.user_id) ? "("+info.user_id+"에 의해 내보내짐.)" : "")+"\n\n"
        }
    }
    r.replier.reply("Room Aceess History" + String.fromCharCode(8237).repeat(500) + "\n" + str.replace(new RegExp(String.fromCharCode(8238), "g", "i"), ""))
}

who = function (r){
	var userId = r.msg.substr(6)
    var info = getUserInfo(userId)
    str = ""
    str += info.name + "(" + info.id + ")\n" + String.fromCharCode(8237).repeat(500)
    str += "Raw data : ...\n\n"
    for (var i in info) {
        str += i + ": " + info[i] + "\n"
    }
    r.replier.reply(str)
}

roomidsearch = function (r){
	var list = K1.selectForObject('chat_rooms', null, "id > 0");
	var str = '';
	for (var i in list){
		str += "방 이름 : " + JSON.parse(list[i].private_meta).name + '\n';
		str += "linkid : " + list[i].link_id + '\n';
		str += "roomid : " + list[i].id + '\n\n';
	}
	
	for (var i in list){
		str += "\"" + JSON.parse(list[i].private_meta).name + "\" : \"" + list[i].id + "\",\n";
		str += "\"" + list[i].id + "\" : \"" + JSON.parse(list[i].private_meta).name + "\",\n";
		str += "\"" + JSON.parse(list[i].private_meta).name + "\" : \"" + list[i].link_id + "\",\n";
		str += "\"" + list[i].link_id + "\" : \"" + JSON.parse(list[i].private_meta).name + "\",\n\n";
	}
	r.replier.reply(str.trim())
}

recentPhoto = function (r){
	var roomcode = ROOM_DATA[r.room]
    if (!roomcode) {
        r.replier.reply("기능이 지원되지 않는 방입니다.")
        return;
    }
	r.replier.reply("불러오는 중...")
	if(r.room == "관리" || r.room == "봇방"){
		var cnt = 20;
		if(r.msg.indexOf("//")!= -1){
			var cnt = Number(r.msg.split('//')[1])
			r.msg = r.msg.split('//')[0]
		}
		if(r.msg.substr(6).length != 0){
			if( !isNaN(r.msg.substr(6)) && r.msg.substr(6).length > 16 ){
				var list = D.rawQueryForArray("SELECT * FROM photodb WHERE userid = ? ORDER BY _id DESC LIMIT ?", [r.msg.substr(6), cnt])
				var str = list[0][3] + "님의 사진\n"
				for (var _id in list) {
					str += "Created at : " + list[_id][5] + "\n"
					str += list[_id][6] + "\n\n"
				}
			} else {
				var list = D.rawQueryForArray("SELECT * FROM photodb WHERE user like ? ORDER BY _id DESC LIMIT ?", ["%" + r.msg.substr(6) + "%", cnt])
				var str = ""
				for (var _id in list) {
					str += list[_id][3] + "님의 사진\n"
					str += "Room       : " + list[_id][2] + "\n"
					str += "Created at : " + list[_id][5] + "\n"
					str += list[_id][6] + "\n\n"
				}
			}
		} else {
			var list = D.rawQueryForArray("SELECT * FROM photodb ORDER BY _id DESC LIMIT ?", [cnt])
			var str = ""
			for (var _id in list) {
				str += "Room       : " + list[_id][2] + "\n"
				str += "Sender     : " + list[_id][3] + "\n"
				str += "Created at : " + list[_id][5] + "\n"
				str += list[_id][6] + "\n\n"
			}
		}
	} else if(r.msg.substr(6).length != 0 ){
		if( !isNaN(r.msg.substr(6)) && r.msg.substr(6).length > 16 ){
			var list = D.rawQueryForArray("SELECT * FROM photodb WHERE room = ? AND user userid = ? ORDER BY _id DESC LIMIT 20", [r.room, r.msg.substr(6)])
			var str = list[0][3] + "님의 사진\n"
			for (var _id in list) {
				str += "Created at : " + list[_id][5] + "\n"
				str += list[_id][6] + "\n\n"
			}
		} else {
			var list = D.rawQueryForArray("SELECT * FROM photodb WHERE room = ? AND user like ? ORDER BY _id DESC LIMIT 20", [r.room, "%" + r.msg.substr(6) + "%"])
			var str = ""
			for (var _id in list) {
				str += "Sender     : " + list[_id][3] + "\n"
				str += "Created at : " + list[_id][5] + "\n"
				str += list[_id][6] + "\n\n"
			}
		}
	} else {
		var list = D.rawQueryForArray("SELECT * FROM photodb WHERE room = ? ORDER BY _id DESC LIMIT 20", [r.room])
		var str = ""
		for (var _id in list) {
			str += "Sender     : " + list[_id][3] + "\n"
			str += "Created at : " + list[_id][5] + "\n"
			str += list[_id][6] + "\n\n"
		}
	}
	r.replier.reply("최근 " + list.length + "개의 사진" + es + "\n\n" + str.replace(new RegExp(String.fromCharCode(8238), "g", "i"), ""))
}

nicknameHistory = function (r){
	var userid = r.msg.substr(6)
	if( !isNaN(userid) ){
		if ( r.room == "관리" || r.room == "봇방"){
			var list = D.selectForObject('history', null, "userid=?", [userid])
		} else {
			var list = D.selectForObject('history', null, "room=? and userid=?", [r.room, userid])
		}
		var str = userid + "의 닉변기록\n\n"
		for (var i in list){
			str += list[i].username + "\n";
			str += "변경일 : " + list[i].date +'\n\n'
		}
		r.replier.reply(str.trim())
	} else {
		r.replier.reply("적절한 형식으로 입력해주세요.")
	}
}

idsearch = function (r){
	var username = r.msg.substr(7)
	if( r.room == "관리" || r.room == "봇방"){
		var list = D.rawQueryForArray("SELECT * FROM history WHERE username like ?", ["%" + username.split("").join("%") + "%"])
	} else {
		var list = D.rawQueryForArray("SELECT * FROM history WHERE room = ? AND username like ?", [r.room, "%" + username.split("").join("%") + "%"])
	}
	if( list.length != 0 ){
		var str = "";
		for (var i in list){
			str += list[i][4] + "의 ID : " + list[i][3] + '\n'
			if( r.room == "관리"){
				str += list[i][4] + "의 Real ID : " + list[i][2] + '\n'
			}
			str += "변경일 : " + list[i][5] +'\n\n'
		}
		r.replier.reply(str.trim())
	} else {
		r.replier.reply("적절한 형식으로 입력해주세요.")
	}
}

realidsearch = function (r){
	var realid = r.msg.substr(6)
	var list = D.rawQueryForArray("SELECT * FROM history WHERE realid = ?", [realid])
	var str = '';
	for (var i in list){
		str += "방 : " + list[i][1] + '\n'
		str += "ID : " + list[i][3] + '\n'
		str += "닉네임 : " + list[i][4] +'\n\n'
	}
	r.replier.reply(str.trim())
}

photoBackup = function (){
	var list = K1.rawQueryForArray("SELECT _id FROM chat_logs WHERE (type = 2 OR type = 27) ORDER BY _id DESC LIMIT 3")
	var check = D.selectForArray('photodb','_id',null,null,{orderBy: "_id desc"})[0][0];
	for (var _id in list ){
		if( list[list.length-1-_id] > check ){
			var info = getChatInfo(list[list.length-1-_id])
			D.insert('photodb' , {_id : list[list.length-1-_id], room : ROOM_DATA[info.chat_id],  user : getUserInfo(info.user_id).name, userid : info.user_id, date : parseInt(info.created_at + "000", 10).toString().timeUnit().now, url : JSON.parse(info.attachment).url || String(JSON.parse(info.attachment).imageUrls).split(',').join('\n\n').trim()})
		}
	}
}

nicknamechecker = function (){//key, room, realid, userid, username, date
	try{
		var list = K2.selectForObject("friends" , null, "type=?", [1000], {stringFlag : true})
		var history = D.rawQueryForArray("SELECT * FROM history ORDER BY key DESC")
		var historyid = history.map(v=>v[3])
		var num = B(1073741824);
		for(var id in list){
			var info = getUserInfo(B(list[id].id))
			var index = historyid.indexOf(String(info.id));
			if( index == -1 || history[index][4] != info.name ){
				D.insert("history", {room : ROOM_LINK_ID[Math.floor(info.id/num)], realid : B(info.id).minus(B(JSON.parse(info.v).openlink.li).multipliedBy(B(1073741824))), userid : info.id, username : info.name, date : time().now })
			}
		}
		var list = K1.selectForArray("chat_rooms", ["id", "members"], "type=?", ["MultiChat"])
		for(var i in list){
			var MClist = list[i][1].replace("[","").replace("]","").split(",");
			var roomid = list[i][0];
			for(var j in MClist){
				var info = getUserInfo(MClist[j])
				var index = historyid.indexOf(String(info.id));
				if( index == -1 || history[index][4] != info.name ){		
					D.insert("history", {room : ROOM_DATA[roomid], realid : info.id, userid : info.id, username : info.name, date : time().now })
				}
			}	
		}
	} catch (e) {
		Api.replyRoom("관리", e + "\n" + e.stack);
	}
}

onlyEval = function (r) {
    var evmy_Id = "142607889";
    var evlist = K1.rawQueryForArray("SELECT _id FROM chat_logs WHERE (type = 1 OR type = 18) ORDER BY _id DESC LIMIT 10");
    for (var _id in evlist) {
        var evdata = getChatInfo(evlist[_id]);
        if (realId(r, evdata.user_id) == evmy_Id) {
           r.replier.reply(String(eval(evdata.message.substring(1))).encoding());
        }
        break;
    }
}