function getJiraInfo() {
    // fetch("https://opendap.atlassian.net/rest/api/2/project/HK/versions").then(r => r.json()).then((response) => {
    //     console.log(response);
    // });

    let url = "https://opendap.atlassian.net/rest/api/latest/project/HK/versions";

    $.ajax({
        type: 'GET',
        url: url,
        crossDomain: false,
        dataType: 'application/json',
        success: (responseData) => {
            console.log(responseData);
        },
        error: function (responseData) {
            console.log(responseData)
        }
    });
}

getJiraInfo();