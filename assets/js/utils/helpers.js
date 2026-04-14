/**
 * Changes the padding-top of the body based on the window's inner width.
 * This is to ensure that the header is always visible when the page is scrolled.
 * The padding is calculated based on the following rules:
 * - If the window's inner width is less than or equal to 767px, the padding is set to the height of the header multiplied by 1.1.
 * - If the window's inner width is greater than 767px and less than or equal to 992px, the padding is set to the height of the header multiplied by 1.29.
 * - If the window's inner width is greater than 992px and less than or equal to 1200px, the padding is set to the height of the header multiplied by 1.34.
 * - If the window's inner width is greater than 1200px, the padding is set to the height of the header multiplied by 1.4.
 * @returns {undefined}
 */
export function changePaddingBasedOnWindowSize(){
    const header = document.querySelector("header");
    const body = document.body;
    const navLinksContainer = document.querySelector(".nav-links");
    switch (true) {
        case window.innerWidth <= 767:
            body.style.paddingTop = `${header.clientHeight * 1.1}px`;
            navLinksContainer.style.top = `${header.clientHeight - 5}px`;
            break;
        case window.innerWidth > 767 && window.innerWidth < 992:
            body.style.paddingTop = `${header.clientHeight * 1.29}px`;
            navLinksContainer.style.top = `${header.clientHeight - 5}px`;
            break;
        case window.innerWidth > 992 && window.innerWidth < 1200:
            body.style.paddingTop = `${header.clientHeight * 1.34}px`;
            break;
        case window.innerWidth > 1200:
            body.style.paddingTop = `${header.clientHeight * 1.4}px`;
            break;
        default:
            break;
    };
};

/**
 * Checks if the current orientation of the window is landscape.
 * @returns {boolean} true if the window is in landscape orientation, false otherwise.
 */
export function isLandscape(){
    return window.matchMedia("(orientation: landscape)").matches;
};

/**
 * Checks if the current orientation of the window is portrait.
 * @returns {boolean} true if the window is in portrait orientation, false otherwise. 
 */
export function isPortrait(){
    return window.matchMedia("(orientation: portrait)").matches;
};

/**
 * Fetches data from a given API link and returns it in JSON format.
 * If the response is not OK, it throws an error with the status code.
 * @param {string} apiLink - The link of the API to fetch data from.
 * @returns {Promise<object>} A promise that resolves to the fetched data in JSON format.
 */
export async function getData(apiLink){
    try {
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return `Error fetching data: ${error.message}`;
    };
};

/**
 * Posts data to a given API link and returns the response in JSON format.
 * If the response is not OK, it throws an error with the status code.
 * @param {string} apiLink - The link of the API to post data to.
 * @param {object} data - The data to be posted to the API.
 * @returns {Promise<object>} A promise that resolves to the response data in JSON format.
 */
export async function postData (apiLink, data){
    try {
        const response = await fetch(apiLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    } catch (error) {
        return `Error fetching data: ${error.message}`;
    };
};

/**
 * Updates the cart icon count based on the number of items in local storage.
 * If no items are in local storage, the count is set to 0.
 * @returns {undefined}
 */
export function cartIconCount (){
    const cartIcon = document.querySelector(".cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartIcon.textContent = cart.length;
};

/**
 * Returns a JSON object containing the form data of a given HTML form.
 * The object keys are the names of the form elements, and the values are the
 * corresponding values of the form elements.
 * @param {HTMLFormElement} form - The form element to get the data from.
 * @returns {Object} A JSON object containing the form data.
 */
export function getFormData(form){
    const formData = new FormData(form);
    return Object.fromEntries(formData);
};

/**
 * Retrieves the cart items from local storage.
 * If no cart items are found in local storage, it returns an empty array.
 * @returns {Array<object>} An array of cart items in JSON format.
 */
export function getCart(){
    const CART_KEY = "cart";
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

/**
 * Saves the cart items to local storage.
 * The cart items are expected to be an array of objects containing the item's
 * details, such as the item's id, name, price, quantity, and image URL.
 * The cart items are saved under the key "cart" in local storage.
 * @param {Array<object>} cart - The cart items to be saved.
 */
export function saveCart(cart){
    const CART_KEY = "cart";
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

/**
 * Removes the cart items from local storage.
 * This function is used to remove the cart items after a successful checkout.
 * @returns {undefined}
 */
export function removeCart(){
    const CART_KEY = "cart";
    localStorage.removeItem(CART_KEY);
};

/**
 * Toggles the visibility of a password input field when the toggle icon is clicked.
 * @param {Event} e - The event object of the click event.
 * @returns {undefined}
 */
export function togglePasswordVisibility(e) {
    const passwordInput = e.target.parentElement.parentElement.querySelector("input");
    const toggleIcon = e.target;
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    toggleIcon.classList.toggle("fa-eye-slash");
    toggleIcon.classList.toggle("fa-eye");
};

/**
 * Retrieves the list of users from local storage.
 * If no users are found in local storage, it returns an empty array.
 * @returns {Array<object>} An array of user objects in JSON format.
 */
export function getUsers (){
    const USERS_KEY = "users";
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

/**
 * Saves the list of users to local storage.
 * The users are expected to be an array of objects containing the user's
 * details, such as the user's id, name, email, and password.
 * The users are saved under the key "users" in local storage.
 * @param {Array<object>} users - The list of users to be saved.
 */
export function setUsers (users){
    const USERS_KEY = "users";
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};