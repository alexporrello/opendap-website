class Jira {
    static async fetchData(url) {
        return new Promise(async resolve => {
            let request = { url: url }

            chrome.runtime.sendMessage(request, response => {
                resolve(response);
            });
        });
    }

    static async searchWithJQL(jql) {
        return await Jira.fetchData(
            "https://opendap.atlassian.net/rest/api/2/search?jql=" + jql
        );
    }

    static async getFixVersions() {
        return await this.fetchData (
            "https://opendap.atlassian.net/rest/api/2/project/HK/versions"
        );
    }

    static async searchFixVersion(version, project = "HK") {
        return await Jira.searchWithJQL (
            'project = ' + project + ' AND fixVersion=' + version
        );
    }
}


// document.addEventListener('DOMContentLoaded', async () => {
//     let data = await Jira.searchFixVersion(10104);
// })