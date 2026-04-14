import {changePaddingBasedOnWindowSize, cartIconCount} from "./utils/helpers.js";

cartIconCount();

const body = document.body;
const page = body.dataset.page;
const header = document.querySelector("header");
const navLinksContainer = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const themeIcon = document.getElementById("color-theme-icon");
const footerBottom = document.querySelector(".footer-bottom");


localStorage.getItem("theme") && body.classList.add("dark");

themeIcon.addEventListener("click", function() {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "");
});

window.addEventListener("scroll", () => {
    header.style.background = window.scrollY > 40 ? "var(--bg-dark)" : "none";
});

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
});

changePaddingBasedOnWindowSize();

window.addEventListener("resize", changePaddingBasedOnWindowSize);

const navLinks = document.querySelectorAll(".nav-links li");

navLinks.forEach(link => {
    link.addEventListener("click", function(){
        navLinks.forEach((li) => {
            li.classList.remove("active");
        });
        this.classList.add("active");
    });
});

/**
 * Import the relevant page script based on the page attribute
 * @param {string} page - The value of the page attribute
 */
function importPageScript(page) {
    switch (page) {
        case "home":
            import("./pages/home.js");
            break;
        case "cart":
            import("./pages/cart.js");
            break;
        case "checkout":
            import("./pages/checkout.js");
            break;
        case "signup":
            import("./pages/signup.js");
            break;
        case "login":
            import("./pages/login.js");
            break;
        case "about":
            import("./pages/about.js");
            break;
        case "contact":
            import("./pages/contact.js");
            break;
        default:
            break;
    }
};

importPageScript(page);

footerBottom.innerHTML = `<p>&copy; Copyright nexCart ${new Date().getFullYear()}, All Rights Reserved</p>`;


