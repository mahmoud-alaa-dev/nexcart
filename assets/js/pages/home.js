import {getData, cartIconCount, getCart, saveCart} from "../utils/helpers.js";

const apiLink = "../assets/data/products.json";
function initHomePage() {

    const hotDealSlider = document.getElementById("hotDealSlider");
    const electronicsSlider = document.getElementById("electronicsSlider");
    const appliancesSlider = document.getElementById("appliancesSlider");
    const mobilesSlider = document.getElementById("mobilesSlider");
    
    // initialize swiper
    //
    // main section swiper
    var swiper = new Swiper(".mySwiper", {
        pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
        },
        autoplay: {
            delay: 2500,
        },
        loop: true,
    });
    
    // products seciton swiper
    var swiper = new Swiper(".slide-products", {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: ".nextEl",
            prevEl: ".prevtEl",
        },
        breakpoints: {
            1200: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            0: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        },
    });
    
    // get data
    const products = getData(apiLink);

    products.then((data) => {

        let hotDealSwiperSlide = "";
        let electronicsSwiperSlide = "";
        let appliancesSwiperSlide = "";
        let mobilesSwiperSlide = "";

        data.forEach((product) => {

            if(product.old_price){
                hotDealSwiperSlide += `
                        <div class="swiper-slide">
                        <div class="product-card">
                            <span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>
                            <div class="product-img">
                                <img src=${product.img} alt=${product.name}>
                            </div>
                            <div class="product-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <p class="product-name">
                                <a href="#">${product.name}</a>
                            </p>
                            <div class="product-price">
                                <strong class="current-price">$${product.price.toLocaleString()}</strong>
                                <span class="product-old-price">$${product.old_price.toLocaleString()}</span>
                            </div>
                            <div class="product-btns">
                                <button class="add-cart" data-id=${product.id}>
                                    <i class="fa-solid fa-cart-plus"></i>
                                    <span>Add To Cart</span>
                                </button> 
                                <button class="add-fav">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };

            if(product.category === "electronics"){
                let oldPrice = product.old_price ? `<span class="product-old-price">$${product.old_price.toLocaleString()}</span>` : "";
                let salePercent = product.old_price ? `<span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>` : "";
                electronicsSwiperSlide += `
                    <div class="swiper-slide">
                        <div class="product-card">
                            ${salePercent}
                            <div class="product-img">
                                <img src=${product.img} alt=${product.name}>
                            </div>
                            <div class="product-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <p class="product-name">
                                <a href="#">${product.name}</a>
                            </p>
                            <div class="product-price">
                                <strong class="current-price">$${product.price.toLocaleString()}</strong>
                                ${oldPrice}
                            </div>
                            <div class="product-btns">
                                <button class="add-cart" data-id=${product.id}>
                                    <i class="fa-solid fa-cart-plus"></i>
                                    <span>Add To Cart</span>
                                </button> 
                                <button class="add-fav">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };

            if(product.category === "appliances"){
                let oldPrice = product.old_price ? `<span class="product-old-price">$${product.old_price.toLocaleString()}</span>` : "";
                let salePercent = product.old_price ? `<span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>` : "";
                appliancesSwiperSlide += `
                    <div class="swiper-slide">
                        <div class="product-card">
                            ${salePercent}
                            <div class="product-img">
                                <img src=${product.img} alt=${product.name}>
                            </div>
                            <div class="product-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <p class="product-name">
                                <a href="#">${product.name}</a>
                            </p>
                            <div class="product-price">
                                <strong class="current-price">$${product.price.toLocaleString()}</strong>
                                ${oldPrice}
                            </div>
                            <div class="product-btns">
                                <button class="add-cart" data-id=${product.id}>
                                    <i class="fa-solid fa-cart-plus"></i>
                                    <span>Add To Cart</span>
                                </button> 
                                <button class="add-fav">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };

            if(product.category === "mobiles"){
                let oldPrice = product.old_price ? `<span class="product-old-price">$${product.old_price.toLocaleString()}</span>` : "";
                let salePercent = product.old_price ? `<span class="product-sale">${((product.old_price - product.price) * 100 / product.old_price).toFixed(2)}%</span>` : "";
                mobilesSwiperSlide += `
                    <div class="swiper-slide">
                        <div class="product-card">
                            ${salePercent}
                            <div class="product-img">
                                <img src=${product.img} alt=${product.name}>
                            </div>
                            <div class="product-rate">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <p class="product-name">
                                <a href="#">${product.name}</a>
                            </p>
                            <div class="product-price">
                                <strong class="current-price">$${product.price.toLocaleString()}</strong>
                                ${oldPrice}
                            </div>
                            <div class="product-btns">
                                <button class="add-cart" data-id=${product.id}>
                                    <i class="fa-solid fa-cart-plus"></i>
                                    <span>Add To Cart</span>
                                </button> 
                                <button class="add-fav">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            };
        });

        return {hotDealSwiperSlide, electronicsSwiperSlide, appliancesSwiperSlide, mobilesSwiperSlide};

    }).then((data) => {

        hotDealSlider.innerHTML = data.hotDealSwiperSlide;
        electronicsSlider.innerHTML = data.electronicsSwiperSlide;
        appliancesSlider.innerHTML = data.appliancesSwiperSlide;
        mobilesSlider.innerHTML = data.mobilesSwiperSlide;

        const cart = getCart();
        const addToCartBtns = document.querySelectorAll(".add-cart");
        
        addToCartBtns.forEach(btn => {

            if(cart.find((item) => item.id === Number(btn.dataset.id))){
                btn.classList.add("added");
                btn.innerHTML = `<i class="fa-regular fa-circle-check"></i> Added`;
                btn.disabled = true;
            };

            btn.addEventListener("click", function() {
                addToCart(Number(btn.dataset.id));
                btn.classList.add("added");
                btn.innerHTML = `<i class="fa-regular fa-circle-check"></i> Added`;
                btn.disabled = true;
            });
        });
    });
};


async function addToCart(productId){
    const cart = getCart();
    const product = cart.find((item) => item.id === productId);
    if (product) {
        product.quantity++;
    } else {
        const productsData = await getData(apiLink);
        const product = productsData.find((item) => item.id === productId);
        cart.push({...product, quantity: 1});
    };
    saveCart(cart);
    cartIconCount();
};

cartIconCount();
initHomePage();




