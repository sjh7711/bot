time = function () {
	var today = new Date();
	var dayNames = ['(일요일)', '(월요일)', '(화요일)', '(수요일)', '(목요일)', '(금요일)', '(토요일)'];
	var day = dayNames[today.getDay()];
	
	var year   = today.getFullYear(),
	month  = today.getMonth() + 1,
	date   = today.getDate(),
	hour   = today.getHours(),
	minute = today.getMinutes(),
	second = today.getSeconds();
	ampm   = hour >= 12 ? 'PM' : 'AM';
	
	hour1 = hour % 12;
	hour1 = hour1 < 10 ? '0' + hour1 : hour1;
	
	hour = hour < 10 ? '0' + hour : hour;
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	
	var now = year + '년 ' + month + '월 ' + date + '일 ' + day + ' ' + hour1 + ':' + minute + ':' + second + ' ' + ampm;
	
	return { now : now , year : year, month : month , date : date, day : day, hour : hour , minute : minute , second : second, ampm : ampm , hour1: hour1};
}