class Template {

    fixVersion;

    fixVersionTable;

    newFeaturesSection;

    constructor() {
        document.getElementById("loadFixVersion").addEventListener('click', async () => {
            let fixVersionTable = await this.makeFixVersionTable();
            this.newFeaturesSection = this.makeNewFeaturesSection();

            let mainHeading = document.createElement("h1");
            mainHeading.appendChild(document.createTextNode(this.fixVersion));

            document.body.appendChild(mainHeading);
            document.body.appendChild(this.newFeaturesSection);
            document.body.appendChild(fixVersionTable);

            let exportButton = UIHelper.makeIconButton("save");
            exportButton.classList.add("button-bottom-right");
            exportButton.addEventListener('click', () => {
                this.saveData({
                    newFeatures: this.newFeatureToJSON(),
                    bugFixes: UIHelper.convertFixVersionTableToJSON(fixVersionTable)
                }, this.fixVersion + ".json");
            });
            document.body.appendChild(exportButton);
        });
    }

    async initialize() {
        await this.getFixVersions();
    }

    /**
     * Loads the available fix versions from Jira.
     */
    async getFixVersions() {
        let fixVersions = await Jira.getFixVersions();

        for (let i = 0; i < fixVersions.length; i++) {
            let option = document.createElement("option");
            option.value = fixVersions[i].id;
            option.appendChild(document.createTextNode(fixVersions[i].name));

            document.getElementById("fixVersions").appendChild(option);
        }
    }

    /**
     * Makes the fix version table from Jira.
     */
    async makeFixVersionTable() {
        let selectedIndex = document.getElementById("fixVersions").selectedIndex,
            selectedFixVersion = document.getElementById("fixVersions")[selectedIndex],
            fixVersionData = await Jira.searchFixVersion(selectedFixVersion.value);

        this.fixVersion = selectedFixVersion.textContent;

        this.fixVersionTable = UIHelper.makeFixVersionTable(fixVersionData);

        let bugFixHeader = document.createElement("h2");
        bugFixHeader.appendChild(document.createTextNode("Bug fixes for " + this.fixVersion + ":"));

        document.body.removeChild(document.getElementById("get-started"));

        let fixVersionTableDiv = document.createElement("div");
        fixVersionTableDiv.id = "fix-version-table-div";
        fixVersionTableDiv.appendChild(bugFixHeader);
        fixVersionTableDiv.appendChild(this.fixVersionTable);

        let addRow = UIHelper.makeIconButton(
            "add",
            "round-button round-button-center button-min",
            "round-button-plus-icon"
        );
        addRow.addEventListener('click', () => {
            UIHelper.addRowToFixVersionTable(this.fixVersionTable);
        });
        fixVersionTableDiv.appendChild(addRow);

        return fixVersionTableDiv;
    }

    /**
     * Creates the section where new features can be added to the top of the page.
     */
    makeNewFeaturesSection() {
        let newFeatures = document.createElement("h2");
        newFeatures.appendChild(document.createTextNode("New Features in " + this.fixVersion + ":"));

        let newFeaturesSection = document.createElement("div");
        newFeaturesSection.id = "new-features";
        newFeaturesSection.appendChild(newFeatures);
        newFeaturesSection.appendChild(this.makeNewFeaturesSubSection());

        let addFeature = UIHelper.makeIconButton(
            "add",
            "round-button round-button-center button-min",
            "round-button-plus-icon"
        );
        addFeature.addEventListener('click', () => {
            newFeaturesSection.insertBefore(this.makeNewFeaturesSubSection(), addFeature);
        });
        newFeaturesSection.appendChild(addFeature);

        return newFeaturesSection;
    }

    /**
     * Creates the area where the text for new features is entered into the app.
     */
    makeNewFeaturesSubSection() {
        let subsection = document.createElement("form");
        subsection.addEventListener('mouseenter', () => deleteButton.classList.remove('hide'));
        subsection.addEventListener('mouseleave', () => deleteButton.classList.add('hide'));

        let deleteButton = UIHelper.makeIconButton("delete");
        deleteButton.tabIndex = -1;
        deleteButton.classList.add('hide');
        deleteButton.addEventListener('click', () => {
            subsection.parentNode.removeChild(subsection);
        });

        let subsectionHeading = document.createElement("div");
        subsectionHeading.classList.add("h3");
        subsectionHeading.classList.add("textarea");
        subsectionHeading.contentEditable = true;
        subsectionHeading.id = "subsectionHeading"
        subsectionHeading.setAttribute("data-text", "New Feature Heading");

        let heading = document.createElement("div");
        heading.classList.add("new-feature-heading");
        heading.appendChild(subsectionHeading);
        heading.appendChild(deleteButton);

        let subsectionBody = document.createElement("div");
        subsectionBody.contentEditable = true;
        subsectionBody.setAttribute("data-text", "New Feature Body");
        subsectionBody.classList.add("textarea");
        subsectionBody.placeholder = "New Feature Body";
        subsectionBody.id = "subsectionBody";
        subsectionBody.rows = "1";

        subsectionHeading.innerHTML = "Hello world!";
        subsectionBody.innerHTML = "This is a hello world body!";

        subsection.appendChild(heading);
        subsection.appendChild(subsectionBody);
        subsection.appendChild(document.createElement("hr"));

        return subsection;
    }

    /**
     * Converts the new feature section to JSON.
     */
    newFeatureToJSON() {
        let featureSubsections = this.newFeaturesSection.getElementsByTagName("form");

        let newFeatures = [];

        for (let subsection of featureSubsections) {
            newFeatures.push({
                title: subsection.getElementsByTagName("div")[1].textContent,
                body: subsection.getElementsByTagName("div")[2].textContent
            });
        }

        return newFeatures;
    }

    /**
     * Saves the page's data to Chrome's default download location.
     * @param {JSON} data JSON data.
     * @param {String} fileName the name of the file to be added.
     */
    saveData(data, fileName) {
        let a = document.createElement("a"),
            json = JSON.stringify(data),
            blob = new Blob([json], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);

        a.style = "display: none";
        a.href = url;
        a.download = fileName.replace(' ', '_');
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    new Template().initialize();
});