import {render, page} from './lib.js';
import {homePageHandler} from "./views/home.js";
import {catalogPageHandler} from "./views/catalog.js";
import {loginPageHandler} from "./views/login.js";
import {logout} from "./api/data.js";
import {registerPageHandler} from "./views/register.js";
import {createPageHandler} from "./views/create.js";
import {detailsPageHandler} from "./views/details.js";
import {editPageHandler} from "./views/edit.js";
import {searchPageHandler} from "./views/search.js";

const main = document.querySelector('main');
const nav = document.querySelector('nav');
const userNav = document.querySelector('.user');
const guestNav = document.querySelector('.guest');

page(contextHandler);
page('/', homePageHandler);
page('/index.html', homePageHandler);
page('/catalog', catalogPageHandler);
page('/create', createPageHandler);
page('/details/:id', detailsPageHandler);
page('/edit/:id', editPageHandler);
page('/login', loginPageHandler);
page('/register', registerPageHandler);
page('/logout', logoutUser);
page('/search', searchPageHandler);

page.start();

function contextHandler(ctx, next) {
    showNavigation();
    ctx.render = (html) => render(html, main);
    next();
}

function showNavigation() {
    if (sessionStorage.getItem('accessToken')) {
        nav.appendChild(userNav);
        guestNav.remove();
    } else {
        userNav.remove();
        nav.appendChild(guestNav);
    }
}

async function logoutUser() {
    await logout();
    page.redirect('/');
}