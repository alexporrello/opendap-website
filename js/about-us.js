async function makeAboutUsPage() {
    var converter = new showdown.Converter();

    let response = await getUpdatesFromGithub("about-us.md");
    let parsed = atob(response.content);

    var html = converter.makeHtml(parsed);

    document.getElementById("content").innerHTML = html;

    let levelOne = document.getElementsByTagName("h1");

    // document.addEventListener('scroll', () => {
    //     for (let i = 0; i < levelOne.length; i++) {
    //         let bounding = levelOne[i].getBoundingClientRect();
            
    //         if (
    //             bounding.top >= 0 && 
    //             bounding.left >= 0 &&
    //             bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    //             bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    //         ) {
    //             document.getElementById(levelOne[i].id + "_map").classList.add("current-link");
    //         } else {
    //             document.getElementById(levelOne[i].id + "_map").classList.remove("current-link");
    //         }
    //     }
    // })

    let allNodes = document.getElementById("content").childNodes;

    for (let i = 0; i < allNodes.length; i++) {
        if (allNodes[i].nodeName === "H1" || allNodes[i].nodeName === "H2") {
            let thisLink = document.createElement("h4");
            
            thisLink.classList.add("pointer");
            thisLink.classList.add("hover-red");
            thisLink.appendChild(document.createTextNode(allNodes[i].innerHTML));
            thisLink.id = allNodes[i].id + "_map";
            thisLink.addEventListener('click', () => {
                document.getElementById(allNodes[i].id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            })

            document.getElementById("left-nav").appendChild(thisLink);
        }
    }

    // for (let i = 0; i < levelOne.length; i++) {
    //     let thisLink = document.createElement("h3");
    //     thisLink.classList.add("pointer");
    //     thisLink.classList.add("hover-red");
    //     thisLink.appendChild(document.createTextNode(levelOne[i].innerHTML));
    //     thisLink.id = levelOne[i].id + "_map";
    //     thisLink.addEventListener('click', () => {
    //         document.getElementById(levelOne[i].id).scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start'
    //         });
    //     })

        

    //     document.getElementById("left-nav").appendChild(thisLink);
    // }
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
                    success: false,
                    status: request.status,
                    response: request.response
                });
            }
        }
        request.send();
    });
}

makeAboutUsPage();