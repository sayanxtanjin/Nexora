export class WorkspaceStorage {
    constructor(prefix) {
        this.prefix = prefix;
    }

    read(key, fallback) {
        try {
            const savedValue = localStorage.getItem(this.prefix + key);
            return savedValue ? JSON.parse(savedValue) : fallback;
        } catch (error) {
            console.warn('Unable to read saved workspace data.', error);
            return fallback;
        }
    }

    save(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        } catch (error) {
            console.warn('Unable to save workspace data.', error);
        }
    }

    rememberPage(page) {
        try {
            sessionStorage.setItem(this.prefix + 'lastPage', page);
        } catch (error) {
            console.warn('Unable to remember the current page.', error);
        }
    }
}

export function debounce(callback, delay) {
    let timer;

    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, delay);
    };
}

export async function loadDashboardData() {
    const storage = new WorkspaceStorage('nexora');
    const savedData = storage.read('dashboardData', null);

    try {
        const response = await fetch(new URL('../data/dashboard.json', import.meta.url));
        if (!response.ok) {
            throw new Error('Dashboard data could not be loaded.');
        }

        const data = await response.json();
        storage.save('dashboardData', data);
        return data;
    } catch (error) {
        console.warn('Using saved dashboard data.', error);
        return savedData;
    }
}

export function renderDashboard(data, role, session) {
    if (!data || !data[role]) return;

    const content = document.querySelector('.content');
    const title = document.querySelector('.page-head h1');
    const subtitle = document.querySelector('.page-head p');
    const stats = document.querySelector('.stats');
    const activity = document.querySelector('.activity');
    const summary = data[role];

    if (!content || !title || !subtitle || !stats || !activity) return;

    title.textContent = summary.heading;
    subtitle.textContent = 'Welcome back, ' + session.name + '. ' + summary.description;
    stats.innerHTML = summary.cards.map(function (card) {
        return '<article><span>' + card.label + '</span><strong>' + card.value + '</strong><small>' + card.note + '</small></article>';
    }).join('');
    activity.innerHTML = summary.activity.map(function (item) {
        return '<li>' + item + '</li>';
    }).join('');
}
