const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const accounts = {
        'admin@nexora.com': { password: 'admin@123', role: 'admin', name: 'Sayan Tanjin' },
        'manager@nexora.com': { password: 'manager@123', role: 'manager', name: 'Jannatul Fardous Shorna' },
        'employee@nexora.com': { password: 'employee@123', role: 'employee', name: 'Likhon Saha' }
    };

    if (accounts[email] && accounts[email].password === password) {
        localStorage.setItem('nexoraSession', JSON.stringify({
            email: email,
            role: accounts[email].role,
            name: accounts[email].name
        }));
        window.location.href = 'pages/dashboard.html';
        return;
    }

    alert('Use one of the demo accounts shown below the form.');
});
