import { showHome } from "./home.js";
import { logout } from "./logout.js";
import { showLogin } from './login.js';
import { showRegister } from './register.js';

const buttons = {
    'movies-btn': showHome,
    'logout-btn': logout,
    'login-btn': showLogin,
    'register-btn': showRegister
}

document.querySelector('nav').addEventListener('click', navigate);

function navigate(event) {
    const btnFunction = buttons[event.target.id];
    if (btnFunction) {
        event.preventDefault();
        btnFunction();
    }
}

showHome();