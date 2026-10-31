// ================= SEARCH =================

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("show");

    if (searchInput.classList.contains("show")) {
        searchInput.focus();
    }
});

// ================= CART =================

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

let cart = [];

// ---------- Open Cart ----------

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("show");
    overlay.style.display = "block";
});

// ---------- Close Cart ----------

closeCart.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
    cartSidebar.classList.remove("show");
    overlay.style.display = "none";
}

// ================= ADD TO CART =================

const buttons = document.querySelectorAll(".addCart");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        // Check if already exists
        let item = cart.find(food => food.name === name);

        if (item) {

            item.qty++;

        } else {

            cart.push({
    name:name,
    price:price,
    image:button.dataset.image,
    qty:1
});

        }

        updateCart();

        cartSidebar.classList.add("show");
        overlay.style.display = "block";

    });

});

// ================= UPDATE CART =================
function updateCart(){

    cartItems.innerHTML="";

    let total=0;
    let count=0;

    if(cart.length===0){

        cartItems.innerHTML="<p>Your cart is empty.</p>";

        totalPrice.innerHTML="$0.00";

        cartCount.innerHTML="0";

        return;
    }

    cart.forEach((food,index)=>{

        total+=food.price*food.qty;

        count+=food.qty;

        cartItems.innerHTML+=`

<div class="cart-item">

    <img src="${food.image}" class="cart-img">

    <div class="cart-info">

        <h4>${food.name}</h4>

        <p>$${food.price.toFixed(2)}</p>

        <div class="qty">

            <button onclick="decrease(${index})">−</button>

            <span>${food.qty}</span>

            <button onclick="increase(${index})">+</button>

        </div>

    </div>

</div>

`;

    });
    cartCount.innerHTML=count;
    totalPrice.innerHTML="$"+total.toFixed(2);
}
// ================= INCREASE =================

function increase(index){

    cart[index].qty++;

    updateCart();

}

// ================= DECREASE =================

function decrease(index){
    cart[index].qty--;
    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }
    updateCart();

}
// ================= RECEIPT =================

const checkoutBtn = document.getElementById("checkoutBtn");
const receiptModal = document.getElementById("receiptModal");
const receiptItems = document.getElementById("receiptItems");
const receiptTotal = document.getElementById("receiptTotal");
const closeReceipt = document.getElementById("closeReceipt");

checkoutBtn.addEventListener("click", () => {
    receiptItems.innerHTML = "";
    let total = 0;
    cart.forEach(food => {
        let sub = food.price * food.qty;
        total += sub;
      receiptItems.innerHTML += `
            <div class="receipt-item">
                <span>${food.name} x${food.qty}</span>
                <span>$${sub.toFixed(2)}</span>
            </div>
        `;
    });
    receiptTotal.innerHTML = "$" + total.toFixed(2);
  receiptModal.classList.add("show");
});
closeReceipt.onclick = () => {
    receiptModal.classList.remove("show");
};
document.getElementById("printReceipt").onclick = () => {
    window.print();

};
