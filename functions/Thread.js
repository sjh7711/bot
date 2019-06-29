WCC = T.register("weatherClockCheck",()=>{
	while(true){
		if( 7 == new Date().getHours() ){
			r={msg : '!날씨', room : '시립대 자취생 생정',replier:{reply:function(msg){
				Api.replyRoom('시립대 자취생 생정',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('시립대 전전컴 톡방',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('시립대 단톡방',msg);
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨', room : 'fa',replier:{reply:function(msg){
				Api.replyRoom('fa',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('단톡방',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('오버워치',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('푸드마켓',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('후원확인',msg);
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 공릉동', room : '단톡방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 강북구 수유 1동', room : '동후방',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 부산 대연동', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 진해 석동', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 광주 오룡동', room : '오버워치',replier:{reply:function(msg){
				Api.replyRoom(r.room,msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(60*60*1000);	//60분
		}
		java.lang.Thread.sleep(59*1000); //59초
	}
}).start();

/*
java.lang.Thread.sleep(4*1000);
r={msg : '!날씨 창원시 마산회원구 내서읍', room : 'fa',replier:{reply:function(msg){
	Api.replyRoom(r.room,msg)
	}}
}
weather(r);*/

/*
var networkcheck = '';
NetC = T.register("networkCheck",()=>{
	while(true){
		networkcheck = org.jsoup.Jsoup.connect('http://m.naver.com').get();
		if(networkcheck == ''){
			cmd('ifconfig wlan0 down');
			while(true){
				java.lang.Thread.sleep(50*1000);
				networkcheck = org.jsoup.Jsoup.connect('http://m.naver.com').get();
				if(networkcheck != ''){
					Api.replyRoom('WIFI AUTO ON');
					break;
				}
			}
		}
		networkcheck = '';
		java.lang.Thread.sleep(50*1000);//50초
	}
}).start();
*/

NC = T.register("noticeCheck",()=>{
	while(true){
		java.lang.Thread.sleep(50*1000); //50초
		noticecheck();
	}
}).start();

DC = T.register("donateCheck",()=>{
	while(true){
		java.lang.Thread.sleep(8*60*60*1000); //8시간
		//java.lang.Thread.sleep(50*1000);
		donatecheck();
	}
}).start();