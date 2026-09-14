(function () {
    const SESSION_KEY = 'nexoraSession';
    const THEME_KEY = 'nexoraTheme';
    const roles = {
        admin: { label: 'Admin', note: 'Full access to every workspace section.', pages: ['dashboard', 'employees', 'customers', 'products', 'inventory', 'sales', 'invoices', 'finance', 'reports', 'notifications', 'profile', 'settings'] },
        manager: { label: 'Manager', note: 'Operations access, without Finance.', pages: ['dashboard', 'employees', 'customers', 'products', 'inventory', 'sales', 'invoices', 'reports', 'notifications', 'profile', 'settings'] },
        employee: { label: 'Employee', note: 'Focused access to sales and personal tools.', pages: ['dashboard', 'sales', 'notifications', 'profile', 'settings'] }
    };

    function currentSession() {
        try {
            const session = JSON.parse(localStorage.getItem(SESSION_KEY));
            return session && roles[session.role] && session.email && session.name ? session : null;
        } catch (error) {
            return null;
        }
    }

    function pageName() {
        return location.pathname.split('/').pop().replace('.html', '') || 'dashboard';
    }

    function applySavedTheme() {
        try {
            document.body.classList.toggle('dark', localStorage.getItem(THEME_KEY) === 'dark');
        } catch (error) {
            document.body.classList.remove('dark');
        }
    }

    applySavedTheme();

    function personalizeDashboard(role, session) {
        if (pageName() !== 'dashboard') return;
        const content = document.querySelector('.content');
        const title = document.querySelector('.page-head h1');
        const subtitle = document.querySelector('.page-head p');
        const stats = document.querySelector('.stats');
        if (!content || !title || !subtitle || !stats) return;
        const summaries = {
            admin: ['Business command center', 'A complete view of today\'s business activity.', [['Revenue', '৳195,000', '+12% this month'], ['Sales', '24', '6 awaiting payment'], ['Customers', '186', '8 new this month'], ['Products', '48', '3 low-stock items']]],
            manager: ['Operations overview', 'Monitor your teams, sales and operational priorities.', [['Team tasks', '18', '4 due today'], ['Sales', '24', '6 awaiting payment'], ['Inventory alerts', '3', 'Items need attention'], ['Customer requests', '7', '2 new today']]],
            employee: ['My workspace', 'Your sales activity and tasks for today.', [['My sales', '6', '2 awaiting payment'], ['Today\'s target', '৳65,000', '72% achieved'], ['Notifications', '4', '1 requires action'], ['Open tasks', '3', 'Due this week']]]
        };
        const [heading, description, cards] = summaries[role];
        title.textContent = heading;
        subtitle.textContent = 'Welcome back, ' + session.name + '. ' + description;
        stats.innerHTML = cards.map(card => '<article><span>' + card[0] + '</span><strong>' + card[1] + '</strong><small>' + card[2] + '</small></article>').join('');
        const activity = document.querySelector('.activity');
        if (activity) activity.innerHTML = role === 'employee'
            ? '<li>Follow up with Nova Stores</li><li>Invoice INV-1042 is awaiting payment</li><li>Weekly sales target updated</li>'
            : role === 'manager'
                ? '<li>Three inventory items need review</li><li>Team sales target is 86% complete</li><li>Two customer requests are new</li>'
                : '<li>Invoice INV-1042 was paid</li><li>Low stock: Wireless Keyboard</li><li>New customer: Nova Stores</li>';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const session = currentSession();
        if (!session) {
            location.replace('../index.html');
            return;
        }
        const role = session.role;
        const current = pageName();
        if (!roles[role].pages.includes(current)) {
            location.replace('dashboard.html');
            return;
        }
        document.querySelectorAll('.sidebar nav a').forEach(link => {
            const page = link.getAttribute('href').replace('.html', '');
            if (!roles[role].pages.includes(page)) link.remove();
        });
        const logout = document.querySelector('.logout');
        if (logout) logout.addEventListener('click', event => {
            event.preventDefault();
            localStorage.removeItem(SESSION_KEY);
            location.href = '../index.html';
        });
        const profileInputs = document.querySelectorAll('.form-panel input');
        if (pageName() === 'profile' && profileInputs.length >= 3) {
            profileInputs[0].value = session.name;
            profileInputs[1].value = session.email;
            profileInputs[2].value = roles[role].label;
        }
        personalizeDashboard(role, session);

        import('./workspace-data.js').then(async function (workspace) {
            const storage = new workspace.WorkspaceStorage('nexora');
            storage.rememberPage(current);

            if (current === 'dashboard') {
                const data = await workspace.loadDashboardData();
                workspace.renderDashboard(data, role, session);
            }
        }).catch(function (error) {
            console.warn('Workspace enhancements are unavailable.', error);
        });
    });
})();
