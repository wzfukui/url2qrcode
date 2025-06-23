const qrimgContainer = document.getElementById('qrimg');
const qrtext_url = document.getElementById('qrtext_url');
const qrtext_title = document.getElementById('qrtext_title');
const copy_btn = document.getElementById('copy-btn');

function showLoading() {
    qrimgContainer.innerHTML = '<div class="loading"></div>';
}

function refreshQR(text) {
    const value = qrtext_url.value || text || '';
    
    showLoading();
    
    setTimeout(() => {
        try {
            qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
            const qr = qrcode(0, 'L');
            qr.addData(value);
            qr.make();
            qrimgContainer.innerHTML = qr.createSvgTag(10);
        } catch (e) {
            qrimgContainer.innerHTML = '<p style="color: white; font-size: 14px;">无法生成二维码，内容可能过长。</p>';
        }
    }, 150);
}

// 添加淡入动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

qrtext_url.addEventListener('input', () => {
    clearTimeout(qrtext_url.debounceTimer);
    qrtext_url.debounceTimer = setTimeout(refreshQR, 300);
});

copy_btn.addEventListener('click', () => {
    navigator.clipboard.writeText(qrtext_url.value).then(() => {
        copy_btn.classList.add('copy-success');
        copy_btn.textContent = '✅ 已复制!';
        
        setTimeout(() => { 
            copy_btn.textContent = '📋 复制'; 
            copy_btn.classList.remove('copy-success');
        }, 1500);
    }).catch(() => {
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = qrtext_url.value;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            copy_btn.classList.add('copy-success');
            copy_btn.textContent = '✅ 已复制!';
            setTimeout(() => { 
                copy_btn.textContent = '📋 复制'; 
                copy_btn.classList.remove('copy-success');
            }, 1500);
        } catch (err) {
            copy_btn.textContent = '复制失败';
        }
    });
});

qrtext_url.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        qrtext_url.select();
    }
    if (e.ctrlKey && e.key === 'c') {
        copy_btn.click();
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
        const url = tabs[0].url;
        const title = tabs[0].title;
        qrtext_url.value = url;
        qrtext_title.value = title;
        qrtext_url.select();
        refreshQR(url);
    }
});
