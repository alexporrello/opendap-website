class ReleasePage {

    versions;

    fixVersion = [];

    body = document.getElementById("content");

    async initialize() {
        let versions = await this.getFixVersionFile();

        for (let version of versions) {
            this.fixVersion.push(await this.fetchFixVersionData(version + ".json"));
        }

        for (let fixVersion of this.fixVersion) {
            // console.log(fixVersion);

            let thisFixVersion = fixVersion.fixVersion;
            let thisNewFeatures = fixVersion.newFeatures;
            let thisBugFixes = fixVersion.bugFixes;

            let heading = document.createElement("h1");
            heading.id = thisFixVersion;
            heading.appendChild(document.createTextNode(thisFixVersion));
            this.body.appendChild(heading);

            let subheading = document.createElement("h2");
            subheading.id = thisFixVersion + "h2";
            subheading.appendChild(document.createTextNode("New Features in " + thisFixVersion));
            this.body.appendChild(subheading);

            for (let newFeature of thisNewFeatures) {
                let newFeatureHeading = document.createElement("h3");
                newFeatureHeading.id = newFeature.title;
                newFeatureHeading.appendChild(document.createTextNode(newFeature.title));

                let newFeatureBody = document.createElement("p");
                newFeatureBody.appendChild(document.createTextNode(newFeature.body));

                this.body.appendChild(newFeatureHeading);
                this.body.appendChild(newFeatureBody);
            }

            let bugFixesHeading = document.createElement("h2");
            bugFixesHeading.appendChild(document.createTextNode("Bug Fixes in " + thisFixVersion));
            this.body.appendChild(bugFixesHeading);

            let table = document.createElement("table");

            let keyHeader = document.createElement("th");
            keyHeader.appendChild(document.createTextNode("Key"));

            let textHeader = document.createElement("th");
            textHeader.appendChild(document.createTextNode("Notes"))

            let headerRow = document.createElement("tr");
            headerRow.appendChild(keyHeader);
            headerRow.appendChild(textHeader);

            table.appendChild(headerRow);

            for (let bugFix of thisBugFixes) {
                let tableRow = document.createElement("tr");

                let key = document.createElement("td");
                key.classList.add("left-column");
                key.appendChild(document.createTextNode(bugFix.key));

                let text = document.createElement("td");
                text.appendChild(document.createTextNode(bugFix.text));

                tableRow.appendChild(key);
                tableRow.appendChild(text);

                table.appendChild(tableRow);
            }

            this.body.appendChild(table);
        }

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
    }

    getFixVersionFile() {
        return new Promise(resolve => {
            fetch("../sample-json/versions.json")
                .then(res => res.json())
                .then(data => {
                    let versions = [];

                    for (let version of data.versions) {
                        versions.push(version.version);
                    }

                    resolve(versions);
                });
        });
    }

    fetchFixVersionData(filename) {
        return new Promise(resolve => {
            fetch("../sample-json/" + filename)
                .then(res => res.json())
                .then(data => resolve(data));
        });
    }
}

new ReleasePage().initialize();
