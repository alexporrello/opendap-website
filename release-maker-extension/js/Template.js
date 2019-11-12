class Template {

    fixVersion;

    fixVersionTable;

    constructor() {
        document.getElementById("loadFixVersion").addEventListener('click', async () => {
            let fixVersionTable = await this.makeFixVersionTable();
            let newFeaturesSection = this.makeNewFeaturesSection();
            
            let mainHeading = document.createElement("h1");
            mainHeading.appendChild(document.createTextNode(this.fixVersion));

            document.body.appendChild(mainHeading);
            document.body.appendChild(newFeaturesSection);
            document.body.appendChild(fixVersionTable);
        });
    }

    async initialize() {
        await this.getFixVersions();
    }

    async getFixVersions() {
        let fixVersions = await Jira.getFixVersions();

        for (let i = 0; i < fixVersions.length; i++) {
            let option = document.createElement("option");
            option.value = fixVersions[i].id;
            option.appendChild(document.createTextNode(fixVersions[i].name));
            document.getElementById("fixVersions").appendChild(option);
        }
    }

    async makeFixVersionTable() {
        let selectedIndex      = document.getElementById("fixVersions").selectedIndex;
        let selectedFixVersion = document.getElementById("fixVersions")[selectedIndex];
        let fixVersionData     = await Jira.searchFixVersion(selectedFixVersion.value);

        this.fixVersion      = selectedFixVersion.textContent;
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
            UIHelper.makeFixVersionTableRow(1, "", "");
        });
        fixVersionTableDiv.appendChild(addRow);

        return fixVersionTableDiv;
    }

    makeNewFeaturesSection() {
        let newFeatures = document.createElement("h2");
        newFeatures.appendChild(document.createTextNode("New Features in " + this.fixVersion + ":"));
        
        let newFeaturesSection = document.createElement("div");
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

    makeNewFeaturesSubSection() {
        let subsection = document.createElement("form");
        subsection.addEventListener('mouseenter', () => {
            deleteButton.classList.remove('hide');
        });
        subsection.addEventListener('mouseleave', () => {
            deleteButton.classList.add('hide');
        });

        let deleteButton = UIHelper.makeIconButton("close");//, "hide");
        deleteButton.tabIndex = -1;
        deleteButton.classList.add('hide');
        deleteButton.addEventListener('click', () => {
            subsection.parentNode.removeChild(subsection);
        });

        let subsectionHeading = document.createElement("div");
        subsectionHeading.classList.add("h3");
        subsectionHeading.classList.add("textarea");
        subsectionHeading.contentEditable = true;
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
        subsectionBody.rows = "1";

        
        subsection.appendChild(heading);
        subsection.appendChild(subsectionBody);
        subsection.appendChild(document.createElement("hr"));
        return subsection;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    new Template().initialize();
});