checkstatus = function (r) {
	var reboottime = ObjKeep.get("reboottime");
	var nowtime = new Date().getTime();
	var day = Math.floor((nowtime - reboottime) / 1000 / 60 / 60 / 24);
	var hour = Math.floor((nowtime - reboottime) / 1000 / 60 / 60 % 24);
	var min = Math.floor((nowtime - reboottime) / 1000 / 60 % 60);
	var sec = Math.floor((nowtime - reboottime) / 1000 % 60);
	var day1 = Math.floor((nowtime - reloadtime) / 1000 / 60 / 60 / 24);
	var hour1 = Math.floor((nowtime - reloadtime) / 1000 / 60 / 60 % 24);
	var min1 = Math.floor((nowtime - reloadtime) / 1000 / 60 % 60);
	var sec1 = Math.floor((nowtime - reloadtime) / 1000 % 60);
	var bm = Api.getContext().registerReceiver(null, new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED));
	var temperature = bm.getIntExtra("temperature", 0) / 10 + "℃";
	var level = bm.getIntExtra("level", 0) + "%";
	var status = ["Unknown", "Charging", "Discharging", "Not charging", "Full"][bm.getIntExtra("status", 1) - 1];
	var voltage = bm.getIntExtra("voltage", 0) / 1000 + "V";
	
	
	var cputemp = Number(readFile("sys/devices/virtual/thermal/thermal_zone0/temp"))/1000;
	var ram = readFile("/proc/meminfo").split("\n");
	var ramall = Number(ram[0].split(":")[1].split("kB")[0].trim());
	var ramfree = Number(ram[1].split(":")[1].split("kB")[0].trim()) + Number(ram[3].split(":")[1].split("kB")[0].trim()) + Number(ram[4].split(":")[1].split("kB")[0].trim());
	var stat1 = readFile("/proc/stat").substr(5).split(" ");
	java.lang.Thread.sleep(1000);
	var stat2 = readFile("/proc/stat").substr(5).split(" ");
	var user = stat2[0] - stat1[0];
	var system = stat2[1] - stat1[1];
	var nice = stat2[2] - stat1[2];
	var idle = stat2[3] - stat1[3];
	var total = user + system + nice + idle;
	var idlePerc = (1 - idle / total) * 100;
	
	var str = "";
	str += "CPU : " + Math.floor(idlePerc * 100) / 100 + "%(" + Math.floor(cputemp * 100) / 100 + "℃)";
	str += "\nRAM : " + Math.floor((ramall-ramfree) / 1024 / 1024 * 100) / 100 + "/" + Math.floor(ramall / 1024 / 1024 * 100) / 100 + "GB (" + Math.floor((ramall-ramfree) / ramall * 1000) / 10 + "%)";
	str += "\n베터리 (" + temperature + ")\n충전률 : " + level + " (" + status + " - " + voltage + ")";
	str += "\nT/C : " + T.getThreadList().length;
	str += "\n리부트~" + day + "D " + String(hour).extension(" ", 2) + "H " + String(min).extension(" ", 2) + "M " + String(sec).extension(" ", 2) + "S\n" + "리로딩~" + day1 + "D " + String(hour1).extension(" ", 2) + "H " + String(min1).extension(" ", 2) + "M " + String(sec1).extension(" ", 2) + "S";
	r.replier.reply(str);
}