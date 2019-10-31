testing();

async function testing() {
    
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