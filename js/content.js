
    console.log("content loaded!");
    chrome.extension.onMessage.addListener(function(request, _, response) {
        console.log(request);
        console.log(request.selectionText);
    });