import {getFormData} from "../utils/helpers.js";

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData(contactForm);
    contactForm.reset();
});