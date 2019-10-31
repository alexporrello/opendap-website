class NavBar {
    constructor() {
        let titleA    = document.createElement("a");
        let aboutUsA  = document.createElement("a");
        let softwareA = document.createElement("a");
        let supportA  = document.createElement("a");
        let hyraxA    = document.createElement("a");

        let titleText = document.createElement("div");
        titleText.classList.add("nav-heading");
        titleText.appendChild(document.createTextNode("OPeNDAP"));

        titleA.appendChild(titleText)
        aboutUsA.appendChild(document.createTextNode("About Us"));
        softwareA.appendChild(document.createTextNode("Software"));
        supportA.appendChild(document.createTextNode("Support"));
        hyraxA.appendChild(document.createTextNode("Hyrax"));

        titleA.href = "../html/index.html";
        aboutUsA.href = "../html/about-us.html";
        softwareA.href = "";
        supportA.href = "";
        hyraxA.href = "../html/hyrax.html";

        let title    = document.createElement("li");
        let aboutUs  = document.createElement("li");
        let software = document.createElement("li");
        let support  = document.createElement("li");
        let hyrax    = document.createElement("li");

        title.appendChild(titleA);
        aboutUs.appendChild(aboutUsA);
        software.appendChild(softwareA);
        support.appendChild(supportA);
        hyrax.appendChild(hyraxA);

        aboutUs.classList.add("float-right");
        software.classList.add("float-right");
        support.classList.add("float-right");
        hyrax.classList.add("float-right");

        let navLinks = document.createElement("ul");

        navLinks.appendChild(title);
        navLinks.appendChild(aboutUs);
        navLinks.appendChild(software);
        navLinks.appendChild(hyrax);
        navLinks.appendChild(support);
        
        let nav = document.getElementById("nav");
        nav.appendChild(navLinks);
    }
}

function createNavBar() {
    new NavBar();
}

createNavBar();