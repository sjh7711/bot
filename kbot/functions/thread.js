WCC = T.register("weatherClockCheck",()=>{
	while(true){
		if( 7 == new Date().getHours() ){
			r={msg : '!날씨', room : '자생',replier:{reply:function(msg){
				Api.replyRoom('자생',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('전컴',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('시갤',msg);
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨', room : '가족',replier:{reply:function(msg){
				Api.replyRoom('가족',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('단톡',msg);
				java.lang.Thread.sleep(500);
				Api.replyRoom('옵치',msg);
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 공릉동', room : '단톡',replier:{reply:function(msg){
				Api.replyRoom('단톡',msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 거제시 고현동', room : '옵치',replier:{reply:function(msg){
				Api.replyRoom('옵치',msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 광진구 자양동', room : '옵치',replier:{reply:function(msg){
				Api.replyRoom('옵치',msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 부산 대연동', room : '옵치',replier:{reply:function(msg){
				Api.replyRoom('옵치',msg)
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 진해 석동', room : '옵치',replier:{reply:function(msg){
				Api.replyRoom('옵치',msg)
				java.lang.Thread.sleep(500);
				Api.replyRoom('단톡',msg);
				java.lang.Thread.sleep(500);
				}}
			}
			weather(r);
			java.lang.Thread.sleep(4*1000);
			r={msg : '!날씨 광주 오룡동', room : '옵치',replier:{reply:function(msg){
				Api.replyRoom('옵치',msg)
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

TC = T.register("threadCheck",()=>{
	while(true){
		java.lang.Thread.sleep(30*60*1000);
		var ThreadList = T.getThreadList().join('');
		if( ThreadList.indexOf('weatherClockCheck') == -1 ){
			Api.replyRoom('관리', '쓰레드 목록\n=====================\n'+ T.getThreadList().join('\n'));
			T.interruptAll();
			eval(readFile(File("/sdcard/kbot/functions/thread.js")));
			Api.replyRoom('관리', '쓰레드 재시작 완료');
		} else {
			Api.replyRoom('관리', '정상작동중');
		}
		
		if( Api.getRoomList().length < 7 ) {
			Api.replyRoom('관리', '방세션 갱신필요');
		}
	}
}).start();

LC = T.register("LottoCheck",()=>{
	while(true){
		threadlotto();
		java.lang.Thread.sleep(1000*60*60*24*5);
	}
}).start();