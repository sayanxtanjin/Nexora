const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
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

document.querySelector('[data-message]').addEventListener('click', function () {
    showToast(this.dataset.message);
});
