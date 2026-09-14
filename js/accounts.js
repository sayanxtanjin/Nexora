const NexoraAccounts = (function () {
    const USERS_KEY = 'nexoraUsers';
    const demoAccounts = {
        'admin@nexora.com': { password: 'admin@123', role: 'admin', name: 'Sayan Tanjin' },
        'manager@nexora.com': { password: 'manager@123', role: 'manager', name: 'Jannatul Fardous Shorna' },
        'employee@nexora.com': { password: 'employee@123', role: 'employee', name: 'Likhon Saha' }
    };

    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
        } catch (error) {
            return {};
        }
    }

    function getAccount(email) {
        const users = getUsers();
        return users[email] || demoAccounts[email];
    }

    function createAccount(name, email, password) {
        const users = getUsers();

        if (users[email] || demoAccounts[email]) return false;

        users[email] = {
            name: name,
            email: email,
            password: password,
            role: 'employee'
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    }

    return {
        getAccount: getAccount,
        createAccount: createAccount
    };
})();
