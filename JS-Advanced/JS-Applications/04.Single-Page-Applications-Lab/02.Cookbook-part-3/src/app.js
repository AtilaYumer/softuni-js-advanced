import { showCatalog, setUpCatalog } from "./catalog.js";
import { setUpLogin, showLogin } from "./login.js";
import { setUpCreate, showCreate } from "./create.js";
import { setUpRegister, showRegister } from "./register.js";
import { setUpDetails } from "./details.js";
import {setUpEdit} from "./edit.js";

const navigations = {
    catalogLink: showCatalog,
    createLink: showCreate,
    logoutBtn: logout,
    loginLink: showLogin,
    registerLink: showRegister
}

export function showNav() {
    if (sessionStorage.getItem('authToken')) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

window.addEventListener('load', async () => {
    showNav();
    document.getElementById('logoutBtn').addEventListener('click', logout);
    const main = document.querySelector('main');
    setUpCatalog(main, document.getElementById('catalog'), setActiveNav);
    setUpLogin(main, document.getElementById('login'), setActiveNav);
    setUpCreate(main, document.getElementById('create'), setActiveNav);
    setUpRegister(main, document.getElementById('register'), setActiveNav);
    setUpDetails(main, document.getElementById('details'), setActiveNav);
    setUpEdit(main, document.getElementById('edit'), setActiveNav);

    const navigation = document.querySelector('nav');
    navigation.addEventListener('click', navigate);

    function setActiveNav(targetId) {
        [...navigation.querySelectorAll('a')].forEach(a => a.id === targetId ? a.classList.add('active') : a.classList.remove('active'));
    }
    showCatalog();
});

async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    if (response.ok) {
        sessionStorage.removeItem('authToken');
        showCatalog();
    } else {
        console.error(await response.text());
    }
}

function navigate(event) {
    if (event.target.tagName === 'A') {
        const handler = navigations[event.target.id];
        if (handler) {
            event.preventDefault();
            handler();
        }
    }
}