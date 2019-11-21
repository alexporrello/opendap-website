class UIHelper {

    static fixVersionTableToJSON(table) {
        let rows = table.getElementsByTagName("tr");
        
        let tableData = [];

        for(let row of rows) {
            let cells = row.getElementsByTagName("td");

            tableData.push({
                jiraLink: cells[0].firstChild.href,
                jiraKey: cells[0].firstChild.textContent,
                notes: cells[1].textContent
            });
        }

        return tableData;
    }

    /**
     * Creates and returns a table suited for fixVersion data.
     * @param {JSON} releaseData The JSON response from Jira.searchFixVersion(xxx).
     */
    static makeFixVersionTable(releaseData) {
        let table = document.createElement("table");
        table.id = "fixVersionTable";

        for (let i = 0; i < releaseData.issues.length; i++) {
            table.appendChild(
                UIHelper.makeFixVersionTableRow(
                    releaseData.issues[i].key,
                    releaseData.issues[i].fields.summary
                )
            );
        }

        this.fixVersionTableToJSON(table);

        return table;
    }

    static makeFixVersionTableRow(key, summaryText) {
        let tableRow = document.createElement("tr");

        let makeLink = (key) => {
            let link = document.createElement("a");
            link.contentEditable = true;
            link.setAttribute("data-text", "Issue ID");
            link.appendChild(document.createTextNode(key));
            link.href = 'https://opendap.atlassian.net/browse/' + key;
            link.target = "_blank";
            return link;
        }

        let linkHolder = document.createElement("td");
        linkHolder.style.minWidth = "70px";
        linkHolder.appendChild(makeLink(key));

        let summary = document.createElement("td");
        summary.appendChild(document.createTextNode(summaryText))
        summary.classList.add("no-right-border");
        summary.contentEditable = true;
        summary.setAttribute("data-text", "Issue Summary");

        let downloadButton = UIHelper.makeIconButton("save_alt");
        downloadButton.classList.add("no-padding");
        downloadButton.tabIndex = -1;
        downloadButton.addEventListener('click', async () => {
            let issueData = await Jira.getIssueFromKey(linkHolder.textContent);
            let newSummary = issueData.fields.summary;
            let newLink = makeLink(linkHolder.textContent);

            linkHolder.innerHTML = "";
            linkHolder.appendChild(newLink);

            summary.textContent = newSummary;
        })
        let download = document.createElement("td");
        download.appendChild(downloadButton);

        let deleteButton = UIHelper.makeIconButton("delete");
        deleteButton.classList.add("no-padding");
        deleteButton.tabIndex = -1;
        deleteButton.addEventListener('click', () => UIHelper.removeRowFromTable(tableRow));
        let deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteButton);

        tableRow.appendChild(linkHolder);
        tableRow.appendChild(summary);
        tableRow.appendChild(download);
        tableRow.appendChild(deleteCell);

        return tableRow;
    }

    /**
     * 
     * @param {HTMLTableElement} table The table whose data will be extracted. 
     */
    static convertFixVersionTableToJSON(table) {
        let cells = table.getElementsByTagName("tr");

        let toConvert = [];

        for (let i = 0; i < cells.length; i++) {
            let id = cells[i].getElementsByTagName("td")[0];
            let content = cells[i].getElementsByTagName("td")[1];

            toConvert.push({
                url: id.getElementsByTagName("a")[0].href,
                key: id.getElementsByTagName("a")[0].innerHTML,
                text: content.textContent.substring(0, content.textContent.length - 5)
            });
        }

        return toConvert;
    }

    /**
     * Removes a row from a given table object, given the row's index.
     * @param {String} tableRow The row that should be removed from the table.
     */
    static removeRowFromTable(tableRow) {
        tableRow.parentElement.removeChild(tableRow);
    }

    /**
     * Adds a row to the fix version table.
     * @param {Object} table Table object to be updated.
     */
    static addRowToFixVersionTable(table) {
        table.appendChild(UIHelper.makeFixVersionTableRow(4, table, "", ""));
    }

    /**
     * 
     * @param {String} iconName The name of the material icon.
     * @param {String} buttonClassList The list of classes to be attributed to the button.
     * @param {String} iconClassList The list of classes to be attributed to the icon.
     */
    static makeIconButton(iconName, buttonClassList = "", iconClassList = "") {
        let icon = document.createElement("i");
        icon.classList = "material-icons " + iconClassList;
        icon.innerHTML = iconName;

        let button = document.createElement("button");
        button.classList = buttonClassList;
        button.appendChild(icon);

        return button;
    }
}
