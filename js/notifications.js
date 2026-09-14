const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const clearNotifications = document.getElementById('clearNotifications');
const notificationList = document.querySelector('.activity');
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

clearNotifications.addEventListener('click', function () {
    notificationList.innerHTML = '<li><b>No new notifications.</b></li>';
    showToast('Notifications cleared');
});
