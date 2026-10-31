/* =====================================================
   FASHION STORE
   Products are stored in HTML
===================================================== */


/* ================= CART ================= */

let cart = [];

let selectedProduct = null;

let selectedSize = null;

let selectedColor = null;


/* ================= ELEMENTS ================= */

const productContainer =
    document.getElementById("productContainer");

const productCards =
    document.querySelectorAll(".product-card");


const productModal =
    document.getElementById("productModal");

const closeProductModal =
    document.getElementById("closeProductModal");


const modalProductImage =
    document.getElementById("modalProductImage");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductCategory =
    document.getElementById("modalProductCategory");

const modalProductPrice =
    document.getElementById("modalProductPrice");


const sizeOptions =
    document.getElementById("sizeOptions");

const colorOptions =
    document.getElementById("colorOptions");


const confirmAddBtn =
    document.getElementById("confirmAddBtn");


const cartOverlay =
    document.getElementById("cartOverlay");

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


const checkoutBtn =
    document.getElementById("checkoutBtn");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeCheckout =
    document.getElementById("closeCheckout");

const continueShopping =
    document.getElementById("continueShopping");

const checkoutSummary =
    document.getElementById("checkoutSummary");


/* =====================================================
   GET PRODUCT DATA FROM HTML
===================================================== */

function getProductData(card) {

    return {

        name: card.dataset.name,

        price: Number(card.dataset.price),

        category: card.dataset.category,

        image: card.dataset.image,

        sizes: card.dataset.sizes
            .split(","),

        colors: card.dataset.colors
            .split(",")

    };

}


/* =====================================================
   ADD CART BUTTON
===================================================== */

productCards.forEach(card => {

    const button =
        card.querySelector(".add-cart-btn");


    button.addEventListener("click", () => {

        openProductModal(card);

    });

});


/* =====================================================
   OPEN PRODUCT MODAL
===================================================== */

function openProductModal(card) {

    selectedProduct =
        getProductData(card);

    selectedSize = null;

    selectedColor = null;


    /* PRODUCT INFORMATION */

    modalProductImage.src =
        selectedProduct.image;

    modalProductName.textContent =
        selectedProduct.name;

    modalProductCategory.textContent =
        selectedProduct.category;

    modalProductPrice.textContent =
        `$${selectedProduct.price.toFixed(2)}`;


    /* ================= SIZE ================= */

    sizeOptions.innerHTML = "";


    selectedProduct.sizes.forEach(size => {

        const button =
            document.createElement("button");

        button.className =
            "size-option";

        button.textContent =
            size;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".size-option")
                .forEach(btn => {

                    btn.classList.remove("selected");

                });


            button.classList.add("selected");

            selectedSize = size;

        });


        sizeOptions.appendChild(button);

    });


    /* ================= COLOR ================= */

    colorOptions.innerHTML = "";


    selectedProduct.colors.forEach(color => {

        const button =
            document.createElement("button");

        button.className =
            "color-option";

        button.textContent =
            color;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".color-option")
                .forEach(btn => {

                    btn.classList.remove("selected");

                });


            button.classList.add("selected");

            selectedColor = color;

        });


        colorOptions.appendChild(button);

    });


    productModal.classList.add("show");

}


/* =====================================================
   CLOSE PRODUCT MODAL
===================================================== */

closeProductModal.addEventListener("click", () => {

    productModal.classList.remove("show");

});


/* =====================================================
   ADD PRODUCT TO CART
===================================================== */

confirmAddBtn.addEventListener("click", () => {

    if (!selectedSize) {

        alert("Please select a size.");

        return;

    }


    if (!selectedColor) {

        alert("Please select a color.");

        return;

    }


    addToCart(
        selectedProduct,
        selectedSize,
        selectedColor
    );


    productModal.classList.remove("show");


    /* Open cart */

    cartOverlay.classList.add("show");

});


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(product, size, color) {

    /*
       Same product + same size + same color
       will increase quantity.
    */

    const existing =
        cart.find(item =>

            item.name === product.name &&

            item.size === size &&

            item.color === color

        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: product.name,

            price: product.price,

            image: product.image,

            category: product.category,

            size: size,

            color: color,

            quantity: 1

        });

    }


    updateCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some clothes to your cart.
                </p>

            </div>

        `;


        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;

    }


    let total = 0;

    let quantityTotal = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        quantityTotal += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="
                    this.src=
                    'https://via.placeholder.com/100x120?text=Fashion'
                "
            >


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>


                <p class="cart-detail">
                    Category: ${item.category}
                </p>


                <p class="cart-detail">
                    Size: <strong>
                        ${item.size}
                    </strong>
                </p>


                <p class="cart-detail">
                    Color: <strong>
                        ${item.color}
                    </strong>
                </p>


                <p class="cart-item-price">
                    $${item.price.toFixed(2)}
                </p>


                <div class="quantity">

                    <button
                        onclick="
                            changeQuantity(${index}, -1)
                        ">
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="
                            changeQuantity(${index}, 1)
                        ">
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="
                        removeFromCart(${index})
                    ">

                    <i class="fa-solid fa-trash"></i>

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        quantityTotal;


    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =====================================================
   OPEN CART
===================================================== */

cartBtn.addEventListener("click", () => {

    cartOverlay.classList.add("show");

});


/* =====================================================
   CLOSE CART
===================================================== */

closeCart.addEventListener("click", () => {

    cartOverlay.classList.remove("show");

});


/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        productCards.forEach(card => {

            const productCategory =
                card.dataset.category;


            if (
                category === "All" ||
                productCategory === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =====================================================
   SEARCH
===================================================== */

const searchBtn =document.getElementById("searchBtn");

const searchBox =document.getElementById("searchBox");

const searchInput =document.getElementById("searchInput");

const closeSearch =document.getElementById("closeSearch");
searchBtn.addEventListener("click", () => {
    searchBox.classList.toggle("show");
    if (searchBox.classList.contains("show")) {
        searchInput.focus();
    }
});

closeSearch.addEventListener("click", () => {
    searchBox.classList.remove("show");
    searchInput.value = "";
    showAllProducts();
});

searchInput.addEventListener("input", () => {
    const keyword =
        searchInput.value
        .toLowerCase()
        .trim();
    productCards.forEach(card => {
        const name =
            card.dataset.name
            .toLowerCase();
        const category =
            card.dataset.category
            .toLowerCase();
        if (
            name.includes(keyword) ||
            category.includes(keyword)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

function showAllProducts() {
    productCards.forEach(card => {
        card.style.display = "";
    });
}


/* =====================================================
   CHECKOUT
===================================================== */

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;

    }


    let total = 0;


    let html = "";


    cart.forEach(item => {

    const itemTotal =
        item.price * item.quantity;

    total += itemTotal;


    html += `

        <div class="receipt-item">

            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="
                    this.src =
                    'https://via.placeholder.com/70x85?text=Cloth'
                "
            >


            <div class="receipt-info">

                <h4>
                    ${item.name}
                </h4>


                <p>
                    Category:
                    ${item.category}
                </p>


                <p>
                    Size:
                    <strong>
                        ${item.size}
                    </strong>
                </p>


                <p>
                    Color:
                    <strong>
                        ${item.color}
                    </strong>
                </p>


                <p>
                    Quantity:
                    ${item.quantity}
                </p>


                <div class="receipt-price">
                    $${itemTotal.toFixed(2)}
                </div>

            </div>

        </div>

    `;

});


    html += `

        <strong>
            Total:
            $${total.toFixed(2)}
        </strong>

    `;


    checkoutSummary.innerHTML =
        html;


    cartOverlay.classList.remove("show");

    checkoutModal.classList.add("show");

});


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

closeCheckout.addEventListener("click", () => {

    checkoutModal.classList.remove("show");

});


/* =====================================================
   CONTINUE SHOPPING
===================================================== */

continueShopping.addEventListener("click", () => {

    checkoutModal.classList.remove("show");


    cart = [];


    updateCart();


    window.location.href =
        "#shop";

});


/* =====================================================
   CLICK OUTSIDE PRODUCT MODAL
===================================================== */

productModal.addEventListener("click", event => {

    if (event.target === productModal) {

        productModal.classList.remove("show");

    }

});


/* =====================================================
   CLICK OUTSIDE CART
===================================================== */

cartOverlay.addEventListener("click", event => {

    if (event.target === cartOverlay) {

        cartOverlay.classList.remove("show");

    }

});


/* =====================================================
   CLICK OUTSIDE CHECKOUT
===================================================== */

checkoutModal.addEventListener("click", event => {

    if (event.target === checkoutModal) {

        checkoutModal.classList.remove("show");

    }

});


/* =====================================================
   START
===================================================== */

updateCart();