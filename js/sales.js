const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const cart = document.getElementById('cart');
const saleTotal = document.getElementById('saleTotal');
const createSale = document.getElementById('createSale');
const toast = document.getElementById('toast');
const prices = {
    'Business Laptop': 85000,
    'Office Monitor': 22000,
    'Wireless Keyboard': 3500
};
let cartItems = [];

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 2200);
}

function updateCart() {
    const total = cartItems.reduce(function (sum, item) {
        return sum + prices[item];
    }, 0);

    cart.innerHTML = cartItems.length ? cartItems.map(function (item) {
        return '<p>' + item + '</p>';
    }).join('') : 'Choose a product to add it here.';
    saleTotal.textContent = '৳' + total.toLocaleString();
}

menuButton.addEventListener('click', function () {
    sidebar.classList.toggle('open');
});

document.querySelectorAll('.product').forEach(function (button) {
    button.addEventListener('click', function () {
        cartItems.push(button.dataset.product);
        updateCart();
    });
});

createSale.addEventListener('click', function () {
    if (!cartItems.length) {
        showToast('Add a product before creating a sale');
        return;
    }

    cartItems = [];
    updateCart();
    showToast('Sale created successfully');
});
