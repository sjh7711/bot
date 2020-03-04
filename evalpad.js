blankFunc1=(r)=>{
if(r.msg == "!ㄷㄲ" || r.msg == "!대깨" ){
var idiot= org.jsoup.Jsoup.connect("https://www1.president.go.kr/petitions/585683").get().select("#cont_view > div.cs_area > div.new_contents > div > div.petitionsView_left > div > h2 > span").text()
r.replier.reply("대깨문 : " + String(idiot) + "명")
} else if ( r.msg == "!대깨표" ){
r.replier.reply("응원 청원 추이\n" + es + '\n\n' + readFile("/sdcard/badlist.txt").trim())
} else if (r.msg =="!탄핵표"){ 
r.replier.reply("탄핵 청원 추이\n" + es + '\n\n' + readFile("/sdcard/goodlist.txt").trim())
}
}