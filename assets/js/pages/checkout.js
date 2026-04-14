import { cartIconCount, getFormData, getCart, removeCart } from "../utils/helpers.js";

const orderSummary = document.getElementById("orderSummary");
const orderTotalPrice = document.getElementById("orderTotalPrice");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

function initOrderSummary(){
    const cart = getCart();
    if(!cart.length){
        orderSummary.innerHTML = `<h2 class="order-empty">Your cart is empty</h2>`;
        orderTotalPrice.textContent = `$0`;
        return;
    };
    const orderSummaryHTML = cart.map((item) => `
        <div class="order-item" id="order-item-${item.id}"> 
            <img src=".${item.img}" alt="${item.name}"> 
            <div class="order-item-info"> 
                <h2 class="order-item-title">${item.name}</h2> 
                <span class="order-quantity">${item.quantity}</span> 
                <p class="order-item-price">$${item.price.toLocaleString()}</p> 
            </div> 
        </div>`).join("")

    orderSummary.innerHTML = orderSummaryHTML;

    const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    orderTotalPrice.textContent = `$${orderTotal.toLocaleString()}`;
};

initOrderSummary();

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData(checkoutForm);
    if(!getCart().length) {
        faildOrder();
        return;
    };
    orderSuccess(data.name);
    removeCart();
    cartIconCount();
    initOrderSummary();
    checkoutForm.reset();
});

function orderSuccess (userName) {
    successMsg.textContent = `${userName} your order has been placed successfully`;
    errorMsg.textContent = "";
    setTimeout(() => {
        successMsg.textContent = "";
    }, 4000);
};
function faildOrder () {
    errorMsg.textContent = "Order failed. Your cart is empty.";
    checkoutForm.reset();
};


