class ReleasePage {

    fixVersion = [];

    body = document.getElementById("content");

    constructor() {

    }

    async initialize() {
        this.fixVersion.push(await this.fetchFixVersionData("Hyrax_1.15.0.json"));
        this.fixVersion.push(await this.fetchFixVersionData("Hyrax_1.15.1.json"));

        for (let fixVersion of this.fixVersion) {
            console.log(fixVersion);

            let thisFixVersion = fixVersion.fixVersion;
            let thisNewFeatures = fixVersion.newFeatures;
            let thisBugFixes = fixVersion.bugFixes;

            let heading = document.createElement("h1");
            heading.appendChild(document.createTextNode(thisFixVersion));
            this.body.appendChild(heading);

            let subheading = document.createElement("h2");
            subheading.appendChild(document.createTextNode("New Features in " + thisFixVersion));
            this.body.appendChild(subheading);

            for (let newFeature of thisNewFeatures) {
                let newFeatureHeading = document.createElement("h3");
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
    }


    fetchFixVersionData(filename) {
        return new Promise(resolve => {
            fetch("../sample-json/" + filename)
                .then(res => res.json())
                .then(data => resolve(data));
        })
    }
}

new ReleasePage().initialize();
