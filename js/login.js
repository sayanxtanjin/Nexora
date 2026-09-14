const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const account = NexoraAccounts.getAccount(email);

    if (account && account.password === password) {
        localStorage.setItem('nexoraSession', JSON.stringify({
            email: email,
            role: account.role,
            name: account.name
        }));
        window.location.href = 'pages/dashboard.html';
        return;
    }

    alert('Incorrect email address or password.');
});
