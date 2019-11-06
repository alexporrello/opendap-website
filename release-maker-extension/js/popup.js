document.getElementById('jira-search').addEventListener('click', () => {
    chrome.windows.create({
        url: chrome.extension.getURL("../html/template.html"),
        type: "popup"
    });
});