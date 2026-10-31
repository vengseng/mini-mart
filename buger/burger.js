// ================================
// CART
// ================================

let cart = [];


// Add product to cart
function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " added to your cart!");
}


// Update cart number
function updateCart() {

    document.getElementById("cartCount").textContent = cart.length;

    let cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        document.getElementById("cartTotal").textContent = "$0.00";

        return;
    }


    let html = "";

    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;

        html += `
            <div class="cart-item">

                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>$${item.price.toFixed(2)}</small>
                </div>

                <button
                    onclick="removeFromCart(${index})"
                    style="
                        border:none;
                        background:none;
                        color:#b65c0b;
                    "
                >
                    Remove
                </button>

            </div>
        `;

    });


    cartItems.innerHTML = html;

    document.getElementById("cartTotal").textContent =
        "$" + total.toFixed(2);
}


// Remove item
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// Show cart
function showCart() {

    document
        .getElementById("cartModal")
        .classList.add("active");

    updateCart();
}


// Close cart
function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");
}


// Checkout
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // Close shopping cart
    closeCart();


    // Get receipt elements
    const receiptItems =
        document.getElementById("receiptItems");

    let subtotal = 0;

    let html = "";


    // Create receipt items
    cart.forEach(item => {

        subtotal += item.price;

        html += `
            <div class="receipt-item">

                <div class="receipt-item-name">

                    <strong>${item.name}</strong>

                    <small>1 × $${item.price.toFixed(2)}</small>

                </div>

                <strong>
                    $${item.price.toFixed(2)}
                </strong>

            </div>
        `;

    });


    receiptItems.innerHTML = html;


    // Delivery fee
    const delivery = 2;

    const total = subtotal + delivery;


    // Show prices
    document.getElementById("receiptSubtotal")
        .textContent =
        "$" + subtotal.toFixed(2);

    document.getElementById("receiptTotal")
        .textContent =
        "$" + total.toFixed(2);


    // Current date
    const date = new Date();

    document.getElementById("receiptDate")
        .textContent =
        date.toLocaleString();


    // Show receipt
    document.getElementById("receiptModal")
        .classList.add("active");

}


// ================================
// SEARCH
// ================================

function openSearch() {

    document
        .getElementById("searchBox")
        .classList.add("active");

    document
        .getElementById("searchInput")
        .focus();
}


function closeSearch() {

    document
        .getElementById("searchBox")
        .classList.remove("active");

    document.getElementById("searchInput").value = "";

    showAllProducts();
}


// Search products
function searchProducts() {

    let search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    let products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        let name =
            product
            .getAttribute("data-name")
            .toLowerCase();


        if (name.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// Show all products
function showAllProducts() {

    document
        .querySelectorAll(".product-card")
        .forEach(product => {

            product.style.display = "block";

        });

}


// ================================
// SCROLL
// ================================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================================
// NEWSLETTER
// ================================

function subscribe(event) {

    event.preventDefault();

    let email =
        document
        .getElementById("email")
        .value;


    alert(
        "Thank you! " +
        email +
        " has been subscribed."
    );


    document
        .getElementById("email")
        .value = "";

}


// ================================
// CLOSE CART WHEN CLICKING OUTSIDE
// ================================

document
    .getElementById("cartModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeCart();

        }

    });
    // ================================
// HERO IMAGE SLIDER
// ================================

const heroImages = [

    "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=90",

    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=90",

    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=90"

];

let currentSlide = 0;


// Change image
function changeSlide(direction) {

    currentSlide += direction;


    if (currentSlide >= heroImages.length) {
        currentSlide = 0;
    }


    if (currentSlide < 0) {
        currentSlide = heroImages.length - 1;
    }


    updateSlider();

}


// Go directly to a slide
function goToSlide(index) {

    currentSlide = index;

    updateSlider();

}


// Update image
function updateSlider() {

    const image =
        document.getElementById("heroSlider");

    const dots =
        document.querySelectorAll(".dot");


    // Fade out
    image.style.opacity = "0";


    setTimeout(() => {

        image.src = heroImages[currentSlide];

        image.style.opacity = "1";

    }, 200);


    // Update dots
    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


// ================================
// AUTOMATIC SLIDESHOW
// ================================

setInterval(() => {

    changeSlide(1);

}, 4000);