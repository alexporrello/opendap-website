chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    fetch(request.url).then(r => r.json()).then(result => {
        sendResponse(result);
    });

    return true;
});