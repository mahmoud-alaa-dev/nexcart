import {getUsers, getFormData, togglePasswordVisibility } from "../utils/helpers.js";

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const loginSuccess = document.getElementById("loginSuccess");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", togglePasswordVisibility);

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData(loginForm);
    const users = getUsers();
    const isUserExist = users.find(user => user.email === data.email && user.password === data.password);
    if(isUserExist) {
        loginSuccess.textContent = "Logged in successfully.";
        loginError.textContent = "";
        loginForm.reset();
        setTimeout(() => {
            loginSuccess.textContent = "";
        }, 4000);
    }else {
        loginError.textContent = "Incorrect email or password.";
    };
});
