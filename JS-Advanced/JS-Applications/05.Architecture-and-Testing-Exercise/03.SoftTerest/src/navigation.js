export default function createNavigationHandler(main, navbar) {
    const views = {};
    const links = {};

    setupNavigationHandler();

    const navigator = {
        registerView,
        goToView
    };

    return navigator;

    function setupNavigationHandler() {
        navbar.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                const handlerName = links[ev.target.id];
                if (handlerName) {
                    ev.preventDefault();
                    goToView(handlerName);
                }
            }
        });
    }

    async function goToView(name, ...params) {
        setUserNav();
        main.innerHTML = '';
        const result = await views[name](...params);
        main.appendChild(result);
    }

    function registerView(name, section, setup, navId) {
        const execute = setup(section, navigator);

        views[name] = (...params) => {
            [...navbar.querySelectorAll('a')].forEach(a => a.classList.remove('active'));
            if (navId) {
                navbar.querySelector('#' + navId).classList.add('active');
            }
            return execute(...params);
        };
        if (navId) {
            links[navId] = name;
        }
    }

    function setUserNav() {
        if (sessionStorage.getItem('userToken')) {
            document.querySelectorAll('.user').forEach(e => e.style.display='list-item');
            document.querySelectorAll('.guest').forEach(e => e.style.display='none');
        } else {
            document.querySelectorAll('.user').forEach(e => e.style.display='none');
            document.querySelectorAll('.guest').forEach(e => e.style.display='list-item');
        }
    }
}