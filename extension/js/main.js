// Update the QR code display with the provided text or current input
function refreshQR(text) {
    const value = qrtext_url.value || text || '';
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    const qr = qrcode(0, 'L');
    qr.addData(value);
    qr.make();
    qrimg.innerHTML = qr.createSvgTag(4);
}

// Grab elements we need
const copyBtn = document.getElementById('copy-btn');

qrtext_url.addEventListener('input', () => refreshQR());

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(qrtext_url.value).then(() => {
        copyBtn.innerText = 'Copied!';
        setTimeout(() => { copyBtn.innerText = 'Copy'; }, 2000);
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
