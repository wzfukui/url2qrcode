
console.log("content loaded!");
chrome.runtime.onMessage.addListener((request, sender, response) => {
    console.log(request);
    console.log(request.selectionText);
});
