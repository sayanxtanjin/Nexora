const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const themeButton = document.getElementById('themeButton');

function updateThemeButton() {
    themeButton.textContent = document.body.classList.contains('dark') ? 'Use light mode' : 'Use dark mode';
}

menuButton.addEventListener('click', function () {
    sidebar.classList.toggle('open');
});

themeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    localStorage.setItem('nexoraTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeButton();
});

updateThemeButton();
