import {showCatalog} from './catalog.js';
import {login} from "../api/data.js";


let main;
let section;
let setActiveNav;

export function setupLogin(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;

    const form = targetSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {[k]: v}), {}));
    }));

    async function onSubmit(data) {
        try {
            await login(data.email, data.password);
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
            await showCatalog();
        } catch (e) {
            alert(e.message)
        }
    }
}

export function showLogin() {
    setActiveNav('loginLink');
    main.innerHTML = '';
    main.appendChild(section);
}