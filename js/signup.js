const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name) {
        alert('Enter your full name.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!NexoraAccounts.createAccount(name, email, password)) {
        alert('An account already exists for this email address.');
        return;
    }

    alert('Your account has been created. Please sign in to continue.');
    window.location.href = '../index.html';
});
