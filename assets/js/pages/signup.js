import {togglePasswordVisibility, getFormData, getUsers, setUsers} from "../utils/helpers.js";

const signupForm = document.getElementById("signupForm");
const signupError = document.getElementById("signupError");
const signupSuccess = document.getElementById("signupSuccess");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

togglePassword.addEventListener("click", togglePasswordVisibility);
toggleConfirmPassword.addEventListener("click", togglePasswordVisibility);

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const validation = validateForm();
    if(validation) {
        const users = getUsers();
        const isUserExist = users.find(user => user.email === validation.email);
        if(isUserExist) {
            signupError.textContent = "User already exist. Please log in.";
            signupForm.reset();
            return;
        }else {
            users.push(validation);
            setUsers(users);
            signupForm.reset();
            signupSuccess.textContent = "Account created successfully.";
            setTimeout(() => {
                signupSuccess.textContent = "";
            }, 3000);
        };
    }else {
        return;
    };
});

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();


    const nameRegex = /^[a-zA-Z\s]{3,}$/g;
    const invalidNameMessage = "Ivalid name: Please enter at least 3 characters and only letters (both uppercase and lowercase) and whitespace characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;
    const invalidEmailMessage = "Please enter a valid email address.";

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/g;
    const invalidPasswordMessage = "Please enter a password that contains at least one lowercase letter, one uppercase letter, one digit, and one special character.";

    if(!name || !nameRegex.test(name)) {
        signupError.textContent = invalidNameMessage;
        return false;
    }else{
        signupError.textContent = "";
    };

    if(!email || !emailRegex.test(email)) {
        signupError.textContent = invalidEmailMessage;
        return false;
    }else {
        signupError.textContent = "";
    };

    if(!password || !passwordRegex.test(password)) {
        signupError.textContent = invalidPasswordMessage;
        return false;
    }else {
        signupError.textContent = "";
    };

    if (password !== confirmPassword) {
        signupError.textContent = "Passwords do not match.";
        return false;
    }else {
        signupError.textContent = "";
    };

    return getFormData(signupForm);
};