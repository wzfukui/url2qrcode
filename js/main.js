// xkwy, 2019/3/14
function refreshQR(text) {
    console.log("this.value=[" + this.value + "], text=[" + text + "]");
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    var qr = qrcode(0, 'L');
    qr.addData(this.value || text);
    qr.make();
    qrimg.innerHTML = qr.createSvgTag(4);
}

qrtext_url.addEventListener("input", refreshQR);

chrome.tabs.query({'active': true}, function(tabs){
    var url = tabs[0].url;
    qrtext_url.value = url;
    qrtext_url.select();
    refreshQR(url);
    
    var title = tabs[0].title;
    qrtext_title.value = title;
});
