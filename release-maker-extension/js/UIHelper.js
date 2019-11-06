class UIHelper {

    /**
     * Creates and returns a table suited for fixVersion data.
     * @param {JSON} releaseData The JSON response from Jira.searchFixVersion(xxx).
     */
    static makeFixVersionTable(releaseData) {
        let table = document.createElement("table");

        for (let i = 0; i < releaseData.issues.length; i++) {
            let tableRow = document.createElement("tr");
            tableRow.setAttribute("index", i);

            if (i % 2 === 0) {
                tableRow.classList.add("dark-cell");
            }

            let link = document.createElement("a");
            link.href = 'https://opendap.atlassian.net/browse/' + releaseData.issues[i].key;
            link.target = "_blank";
            link.tabIndex = -1;
            link.appendChild(document.createTextNode(releaseData.issues[i].key));

            let linkHolder = document.createElement("td");
            linkHolder.tabIndex = -1;
            linkHolder.appendChild(link);

            let deleteButton = UIHelper.makeIconButton("close", "hide");
            deleteButton.addEventListener('click', () => {
                UIHelper.removeRowFromTable(table, i);
            });

            let summary = document.createElement("td");
            summary.appendChild(document.createTextNode(releaseData.issues[i].fields.summary))
            summary.appendChild(deleteButton);
            summary.contentEditable = true;
            summary.addEventListener('mouseenter', () => {
                deleteButton.classList.remove("hide");
            });
            summary.addEventListener('mouseleave', () => {
                deleteButton.classList.add("hide");
            });

            tableRow.appendChild(linkHolder);
            tableRow.appendChild(summary);

            table.appendChild(tableRow);
        }

        return table;
    }

    /**
     * Removes a row from a given table object, given the row's index.
     * @param {String} table The table from which a row should be removed.
     * @param {Integer} index The index of the row to be removed.
     */
    static removeRowFromTable(table, index) {
        let rows = table.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            if (parseInt(rows[i].getAttribute("index")) === index) {
                table.removeChild(rows[i]);
            }
        }

        let newRows = table.getElementsByTagName("tr");
        for (let i = 0; i < newRows.length; i++) {
            newRows[i].classList.remove("dark-cell");

            if (i % 2 === 0) {
                newRows[i].classList.add("dark-cell");
            }
        }

        return table;
    }


    static makeIconButton(iconName, classList = "") {
        let icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerHTML = iconName;

        let button = document.createElement("button");
        button.classList = classList;
        button.appendChild(icon);

        return button;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    let data = await Jira.searchFixVersion(10104);
    let table = UIHelper.makeFixVersionTable(data);

    document.body.appendChild(table);
    UIHelper.removeRowFromTable(table, 0);
});