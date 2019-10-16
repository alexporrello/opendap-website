async function makeAboutUsPage() {
    var converter = new showdown.Converter();

    let response = await getUpdatesFromGithub("about-us.md");
    let parsed = atob(response.content);

    var html = converter.makeHtml(parsed);

    document.getElementById("content").innerHTML = html;
}

function getItem(file) {
    
    return new Promise(resolve => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    resolve(allText);
                }
            }
        }
        rawFile.send(null);
    });
}

function getUpdatesFromGithub(url) {
    return new Promise(resolve => {
        let searchURL = "https://api.github.com/repos/alexporrello/opendap-website/contents/content-source/" + url;

        let request = new XMLHttpRequest();
        request.open('GET', searchURL, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = async function () {
            if (request.status >= 200 && request.status < 400) {                    
                let response = request.response;
                resolve(JSON.parse(response));
            } else {
                resolve({
                    success  : false,
                    status   : request.status,
                    response : request.response
                });
            }
        }
        request.send();
    });
}

makeAboutUsPage();