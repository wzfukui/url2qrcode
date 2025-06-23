function refreshQR(text) {
    const value = qrtext_url.value || text || '';
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    const qr = qrcode(0, 'L');
    qr.addData(value);
    qr.make();
    qrimg.innerHTML = qr.createSvgTag(4);
}

qrtext_url.addEventListener('input', () => refreshQR());

copy_btn.addEventListener('click', () => {
    navigator.clipboard.writeText(qrtext_url.value).then(() => {
        copy_btn.innerText = 'Copied!';
        setTimeout(() => { copy_btn.innerText = 'Copy'; }, 2000);
    });
});

chrome.tabs.query({ active: true }, function(tabs) {
    const url = tabs[0].url;
    qrtext_url.value = url;
    qrtext_url.select();
    refreshQR(url);

    const title = tabs[0].title;
    qrtext_title.value = title;
});
