function genericOnClick(info, tab) {
    console.log('genericOnClick hass been called');
    console.log(info);
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, info);
}

chrome.contextMenus.create({
    id: 'createQrcode',
    title: '生成二维码',
    contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(genericOnClick);