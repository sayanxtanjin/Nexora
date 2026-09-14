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

document.querySelectorAll('[data-message]').forEach(function (button) {
    button.addEventListener('click', function () {
        showToast(button.dataset.message);
    });
});
