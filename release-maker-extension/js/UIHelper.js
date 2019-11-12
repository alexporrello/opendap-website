class UIHelper {

    /**
     * Creates and returns a table suited for fixVersion data.
     * @param {JSON} releaseData The JSON response from Jira.searchFixVersion(xxx).
     */
    static makeFixVersionTable(releaseData) {
        let table = document.createElement("table");

        for (let i = 0; i < releaseData.issues.length; i++) {
            table.appendChild(
                UIHelper.makeFixVersionTableRow(
                    i,
                    releaseData.issues[i].key,
                    releaseData.issues[i].fields.summary
                )
            );
        }

        return table;
    }

    static makeFixVersionTableRow(i, key, summaryText) {
        let tableRow = document.createElement("tr");
        tableRow.setAttribute("index", i);

        if (i % 2 === 0) {
            tableRow.classList.add("dark-cell");
        } else {
            tableRow.classList.add("light-cell");
        }

        let link = document.createElement("a");
        link.href = 'https://opendap.atlassian.net/browse/' + key;
        link.target = "_blank";
        link.tabIndex = -1;
        link.contentEditable = true;
        link.setAttribute("data-text", "Issue Name");
        link.appendChild(document.createTextNode(key));

        let linkHolder = document.createElement("td");
        linkHolder.tabIndex = -1;
        linkHolder.appendChild(link);

        let deleteButton = UIHelper.makeIconButton("close", "hide");
        deleteButton.classList.add("position-absolute");
        deleteButton.tabIndex = -1;
        deleteButton.addEventListener('click', () => {
            UIHelper.removeRowFromTable(tableRow.parentNode, i);
        });

        let summary = document.createElement("td");
        summary.appendChild(document.createTextNode(summaryText))
        summary.appendChild(deleteButton);
        summary.contentEditable = true;
        summary.setAttribute("data-text", "Issue Summary");
        summary.addEventListener('mouseenter', () => {
            deleteButton.classList.remove("hide");
        });
        summary.addEventListener('mouseleave', () => {
            deleteButton.classList.add("hide");
        });

        tableRow.appendChild(linkHolder);
        tableRow.appendChild(summary);

        return tableRow;
    }

    /**
     * 
     * @param {HTMLTableElement} table The table whose data will be extracted. 
     */
    static convertFixVersionTableToJSON(table) {
        let cells = table.getElementsByTagName("tr");

        let toConvert = [];

        for(let i = 0; i < cells.length; i++) {
            let id      = cells[i].getElementsByTagName("td")[0];
            let content = cells[i].getElementsByTagName("td")[1];

            toConvert.push({
                url: id.getElementsByTagName("a")[0].href,
                key: id.getElementsByTagName("a")[0].innerHTML,
                text: content.textContent.substring(0, content.textContent.length-5)
            });
        }

        return toConvert;
    }

    /**
     * Removes a row from a given table object, given the row's index.
     * @param {String} table The table from which a row should be removed.
     * @param {int} index The index of the row to be removed.
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
            newRows[i].classList.remove("light-cell");
            
            if (i % 2 === 0) {
                newRows[i].classList.add("dark-cell");
            } else {
                newRows[i].classList.add("light-cell");
            }
        }

        return table;
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

// document.addEventListener('DOMContentLoaded', async () => {
//     let data = await Jira.searchFixVersion(10104);
//     let table = UIHelper.makeFixVersionTable(data);

//     document.body.appendChild(table);
//     UIHelper.removeRowFromTable(table, 0);
// });