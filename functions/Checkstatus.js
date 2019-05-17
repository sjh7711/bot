checkstatus(r){
	var reboottime = ObjKeep.get("reboottime");
	var nowtime = new Date().getTime();
	var day = Math.floor((nowtime-reboottime)/1000/60/60/24);
	var hour = Math.floor((nowtime-reboottime)/1000/60/60%24);
	var min = Math.floor((nowtime-reboottime)/1000/60%60);
	var sec = Math.floor((nowtime-reboottime)/1000%60);
	var day1 = Math.floor((nowtime-reloadtime)/1000/60/60/24);
	var hour1 = Math.floor((nowtime-reloadtime)/1000/60/60%24);
	var min1 = Math.floor((nowtime-reloadtime)/1000/60%60);
	var sec1 = Math.floor((nowtime-reloadtime)/1000%60);
	var bm = Api.getContext().registerReceiver(null,new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED));
	var temperature = bm.getIntExtra("temperature",0)/10 + '℃'
	var level = bm.getIntExtra("level",0) + "%"
	var status =["Unknown","Charging","Discharging","Not charging","Full"][bm.getIntExtra("status",1)-1]
	var voltage = bm.getIntExtra("voltage",0)/1000 + "V"
	
	var stat1 = readFile('/proc/stat').substr(5).split(" ");
	java.lang.Thread.sleep(1000);
	var stat2 = readFile('/proc/stat').substr(5).split(" ");        
	var user = stat2[0]-stat1[0];
	var system = stat2[1]-stat1[1];
	var nice = stat2[2]-stat1[2];
	var idle = stat2[3]-stat1[3];
	var total = user+system+nice+idle;
	var idlePerc = (1-idle/total)*100

	str = "온도 : " + temperature +"\n충전률 : "+level + "\n상태 : " + status + "\n전압 : " + voltage + "\nT/C : "+T.getThreadList().length + "\nCPU : "+ Math.floor(idlePerc*100)/100;
	str += "%\n리부트~"+day+"D "+String(hour).extension(" ",2)+"H "+String(min).extension(" ",2)+"M "+String(sec).extension(" ",2)+"S\n"+"리로딩~"+day1+"D "+String(hour1).extension(" ",2)+"H "+String(min1).extension(" ",2)+"M "+String(sec1).extension(" ",2)+"S";
	r.replier.reply(str);
}