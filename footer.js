class Footer {

    footer = document.createElement("footer");

    constructor() {
        this.footer.id = "footer";
        document.body.insertAdjacentElement('afterend', this.footer);

        let aboutUs = document.createElement("div");
        let aboutUsList = document.createElement("ul");
        aboutUs.appendChild(aboutUsList);

        let aboutUsLabel = helper.createElement("h3", "About Us");
        let history = helper.createElement("li", "History");
        let workshop = helper.createElement("li", "Workshops & Presentations");
        let locations = helper.createElement("li", "Locations");
        let supporters = helper.createElement("li", "Supporters");
        let getInvolved = helper.createElement("li", "Get Involved");
        let updated = helper.createElement("li", "OPeNDAP Updates");
        let contact = helper.createElement("li", "Contract Us");

        aboutUsList.appendChild(aboutUsLabel);
        aboutUsList.appendChild(history);
        aboutUsList.appendChild(workshop);
        aboutUsList.appendChild(locations);
        aboutUsList.appendChild(supporters);
        aboutUsList.appendChild(getInvolved);
        aboutUsList.appendChild(updated);
        aboutUsList.appendChild(contact);

        this.footer.appendChild(aboutUs);


        let software = document.createElement("div");
        let softwareList = document.createElement("ul");
        software.appendChild(softwareList);

        let softwareLabel = helper.createElement("h3", "Software");
        let hyrax = helper.createElement("li", "Hyrax");
        let libdap = helper.createElement("li", "Libdap");
        let unsupported = helper.createElement("li", "Unsupported Software");
        let wcs = helper.createElement("li", "WCS Gateway Handler");
        let otherResources = helper.createElement("li", "Software From Other Resources");
        let thirdParty = helper.createElement("li", "Require Third-Party Software");

        softwareList.appendChild(softwareLabel);
        softwareList.appendChild(hyrax);
        softwareList.appendChild(libdap);
        softwareList.appendChild(unsupported);
        softwareList.appendChild(wcs);
        softwareList.appendChild(otherResources);
        softwareList.appendChild(thirdParty);

        this.footer.appendChild(software);



        let support = document.createElement("div");
        let supportList = document.createElement("ul");
        support.appendChild(supportList);

        let supportLabel = helper.createElement("h3", "Support");
        let userDocs = helper.createElement("li", "User Documentation");
        let designDocs = helper.createElement("li", "Design Documentation");
        let clientSoftware = helper.createElement("li", "Available Client Software");
        let serverSoftware = helper.createElement("li", "Available Server Software");
        let dataHandlers = helper.createElement("li", "Data Handlers");
        let opendapMailing = helper.createElement("li", "OPeNDAP Mailing List");
        let opendapWiki = helper.createElement("li", "OPeNDAP Wiki");
        let softwareWishList = helper.createElement("li", "Software Wish List");
        let faq = helper.createElement("li", "FAQ");

        supportList.appendChild(supportLabel);
        supportList.appendChild(userDocs);
        supportList.appendChild(designDocs);
        supportList.appendChild(clientSoftware);
        supportList.appendChild(serverSoftware);
        supportList.appendChild(dataHandlers);
        supportList.appendChild(opendapMailing);
        supportList.appendChild(opendapWiki);
        supportList.appendChild(softwareWishList);
        supportList.appendChild(faq);

        this.footer.appendChild(support);
    }
}

class helper {
    static createElement(type, text) {
        let toReturn = document.createElement(type);
        toReturn.appendChild(document.createTextNode(text));

        return toReturn;
    }

    static makeLink(text, url) {
        let toReturn = document.createElement("a");
        
        toReturn.appendChild(document.createTextNode(text));
        toReturn.href = url;

        return toReturn;
    }
}

document.addEventListener('DOMContentLoaded', new Footer(), true);