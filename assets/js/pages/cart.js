import { cartIconCount, getCart, saveCart } from "../utils/helpers.js";

const cartEmpty = document.getElementById("cartEmpty");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cart = getCart();

function initCart(){
    if (!cart.length) {
        cartEmpty.style.display = "block";
        cartItems.style.display = "none";
        cartTotal.style.display = "none";
        return;
    };

    cartEmpty.style.display = "none";
    cartItems.style.display = "block";
    cartTotal.style.display = "flex";

    const cartItemsHTML = cart.map((item) => `
        <div class="cart-item">
            <img src=".${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <h2 class="cart-item-title">${item.name}</h2>
                <p class="cart-item-price">$${item.price.toLocaleString()}</p>
                <div class="quantity-btns">
                    <button class="quantity-btn">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn">+</button>
                </div>
            </div>
            <i class="fa-solid fa-trash-can cart-item-trash" id="cart-delete-btn"></i>
        </div>
    `).join("");

    cartItems.innerHTML = cartItemsHTML;

    const quantityBtns = document.querySelectorAll(".quantity-btn");
    const cartDeleteBtns = document.querySelectorAll(".cart-item-trash");

    quantityBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = cart.find((i) => i.name === btn.parentElement.parentElement.querySelector(".cart-item-title").textContent);
            if (btn.textContent === "-" && item.quantity > 1) {
                item.quantity--;
            } else if (btn.textContent === "+") {
                item.quantity++;
            };
            saveCart(cart);
            initCart();
        });
    });

    cartDeleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = cart.find((i) => i.name === btn.parentElement.querySelector(".cart-item-title").textContent);
            cart.splice(cart.indexOf(item), 1);
            saveCart(cart);
            cartIconCount();
            initCart();
        });
    });

    const cartTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.innerHTML = `
        <div class="total">
            <h2 class="cart-total-title">Total Price:</h2>
            <p class="cart-total-price">$${cartTotalPrice.toLocaleString()}</p>
        </div>
        <div class="checkout-btns">
            <a href="./checkout.html" class="checkout-btn"><button class="checkout-btn">Checkout</button></a>
            <button class="clear-btn" id="clearCart">Clear Cart</button>
        </div>
    `;

    const clearCartBtn = document.getElementById("clearCart");
    clearCartBtn.addEventListener("click", () => {
        cart.splice(0, cart.length);
        saveCart(cart);
        cartIconCount();
        initCart();
    });
};

cartIconCount();
initCart();

