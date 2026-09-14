const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const searchInput = document.querySelector('.table-tools input');
const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 2200);
}

menuButton.addEventListener('click', function () {
    sidebar.classList.toggle('open');
});

function filterProducts() {
    document.querySelectorAll('tbody tr').forEach(function (row) {
        row.hidden = !row.textContent.toLowerCase().includes(searchInput.value.toLowerCase());
    });
}

function debounce(callback, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(callback, delay);
    };
}

searchInput.addEventListener('input', debounce(filterProducts, 250));

document.querySelector('[data-message]').addEventListener('click', function () {
    showToast(this.dataset.message);
});
