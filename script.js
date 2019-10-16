testing();

async function testing() {
    let response = await getUpdatesFromGithub();
    let parsed = atob(response.content);

    //var converter = new showdown.Converter();
    //var html = converter.makeHtml(parsed);

    //document.body.innerHTML = html;

    // document.getElementById("more-info").addEventListener('click', () => {
    //     document.getElementById("opendap-software").scrollIntoView({ 
    //         behavior: 'smooth',
    //         block: 'center'
    //     });
    // });

    // document.getElementById("more-info_2").addEventListener('click', () => {
    //     document.getElementById("products").scrollIntoView({ 
    //         behavior: 'smooth',
    //         block: 'center'
    //     });
    // });

    // document.getElementById("hyrax-more-info").addEventListener('click', () => {
    //     document.getElementById("hyrax-info").scrollIntoView({ 
    //         behavior: 'smooth',
    //         block: 'center'
    //     });
    // });
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