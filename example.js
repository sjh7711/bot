
//cmd("chmod -R 777 /data/data/com.kakao.talk/databases");
//var K = require("KBManager.js")("/data/data/com.kakao.talk/databases/KakaoTalk2.db");

/*
function calculator(r){
	var temp = eval(r.msg.substr(1).replace(/[^0-9*\-+%/*=\^&|!.~{}()[\]]/g, ""));
	if(temp!=undefined){
		r.replier.reply(temp);
	}
}

//a.charCodeAt(0)
const weiredstring1=String.fromCharCode(8203);//공백
const weiredstring2=String.fromCharCode(160);//띄워쓰기로
const weiredstring3=String.fromCharCode(8237);//공백
const weiredstring4=String.fromCharCode(8197);//띄워쓰기로
//replace(new RegExp(weiredstring1, "gi"), "")

D.execSQL("create table numtest (key integer, num integer)")

]D.execSQL("alter table control add BASEBALL number")
]D.update("control", {BASEBALL:0})
]D.selectForString('control')
]D.update('control' , {name :'!계산',  시립대_단톡방 : 1, 시립대_전전컴_톡방 : 1, 오버워치 : 1, 시립대_자취생_생정 : 1, test :1, 단톡방 : 1, 짱구 : 1, 시립대_봇제작방 : 1, 푸드마켓 :1, 공익 : 1, BASEBALL : 0, blackjack : 0, 동후방 : 0 }, "name='!계산'")
]D.insert('control' , {name :'!온오프',  시립대_단톡방 : 0, 시립대_전전컴_톡방 : 0, 오버워치 : 0, 시립대_자취생_생정 : 0, test :1, 단톡방 : 0, 짱구 : 0, 시립대_봇제작방 : 0, 푸드마켓 :0, 공익 : 0, BASEBALL : 0, blackjack : 0, 동후방 : 0 })
]D.rawQuery("INSERT INTO chatdb SELECT * FROM cbot")
]D.execSQL("drop table botpoint")
]D.insert("cat", {name :"중용", gender : "남", age : 22})
]D.delete("cat", "name='중용'")
]D.delete("cat", "name='모모' and age='5'" )
]D.selectForString("cat", null, "age<4")
]D.selectForString("cat", "name, gender", "age<4")
]D.selectForString("cat", ["name", "gender"], "age<4")
]D.selectForString("cat","count(*)")
]D.selectForString("cat", null, "name=?",  [a]) //a='모모'
]D.update("cat", {age : 4} , "name='인문이'")
]D.create("cat", {name:"모모",gender:"남",age:4})
]D.update('blackjack', { win : 0, lose : 0, push : 0 , ddl : 0, ddw : 0, ddp : 0, blackjack : 0 , even : 0 , evenc : 0, insurc : 0, insur : 0, splitc : 0 , split : 0, sur : 0, allp : 0, insurw : 0 , fexit : 0 , bpush : 0, bank : 0 });
]D.selectForString('blackjack','name , bank' , "bank > 0")
]D.selectForString('blackjack','name ,room, bank' , "bank > 0")
var money = 10000000
var temp = D.selectForArray('blackjack', 'point, name , room');

for(var i in temp){
	D.update('blackjack', {point: temp[i][0] + money}, 'name=? and room = ?', [temp[i][1], temp[i][2]]);
}


.replace(/(\d{1,3})(?=(\d{3})+$)/g,"$1,")
	
	
*/

/*
!온오프,!날씨,fa,on
 */


/* hash set 
var templott = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	for(i=0;i<6;i++) {
	v = e()
	if(templott[v%45] == 0) {
	templott[v%45] = v
	continue
	}
	else
	{
	//해쉬값비교
	loopval = 0
	while(true) {
	if(loopval>45) break;
	if(templott[(v+loopval)%45]==0) {
	templott[(v+loopval)%45] = v
	break
	}
	else if(templott[(v+loopval)%45]==v) {
	i--;
	break
	}
	else {
	loopval++;
	}
	}
	}
	}
	var templotto = [0,0,0,0,0,0];
	x=0;
	for(i=0;i<templott.length;i++) {
		if(templott[i] != 0) templotto[x++] = templott[i]
	}

*/