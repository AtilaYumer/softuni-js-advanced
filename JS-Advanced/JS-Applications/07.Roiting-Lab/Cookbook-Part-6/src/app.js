import page from '//unpkg.com/page/page.mjs';

import {createNav} from './navigation.js';
import {logout as apiLogout} from './api/data.js';

import {setupHome} from './views/home.js';
import {setupCatalog} from './views/catalog.js';
import {onCreateSubmit, setupCreate} from './views/create.js';
import {loginUser, setupLogin} from './views/login.js';
import {setupRegister, registerUser} from './views/register.js';
import {setupDetails} from './views/details.js';
import {setupEdit, setupDeleted, onEditSubmit} from './views/edit.js';


window.addEventListener('load', async () => {
    const main = document.querySelector('main');
    const navbar = document.querySelector('nav');
    const navigation = createNav(main, navbar);

    const views = {
        home: navigation.registerView('home', setupHome),
        catalog: navigation.registerView('catalog', setupCatalog, 'catalogLink'),
        details: navigation.registerView('details', setupDetails),
        login: navigation.registerView('login', setupLogin, 'loginLink'),
        register: navigation.registerView('register', setupRegister, 'registerLink'),
        create: navigation.registerView('create', setupCreate, 'createLink'),
        edit: navigation.registerView('edit', setupEdit),
        delete: navigation.registerView('deleted', setupDeleted)
    }

    page('/', views.home);
    page('/index.html', views.home);
    page('/catalog', views.catalog);
    page('/catalog/:page', views.catalog);
    navigation.registerForm('searchForm', (data) => page.redirect('/catalog?search=' + data.search) );
    page('/details/:id', views.details);
    page('/login', views.login);
    navigation.registerForm('loginForm', loginUser, () => { page.redirect('/'); navigation.setUserNav(); });
    page('/register', views.register);
    navigation.registerForm('registerForm', registerUser, () => { page.redirect('/'); navigation.setUserNav(); });
    page('/create', views.create);
    navigation.registerForm('createForm', onCreateSubmit, (recipeId) => page.redirect('/details/' + recipeId));
    page('/edit/:id', views.edit);
    navigation.registerForm('editForm', onEditSubmit, (recipeId) => page.redirect('/details/' + recipeId));
    page('/deleted/:id', views.delete);


    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Start application
    navigation.setUserNav();
    page();

    async function logout() {
        try {
            await apiLogout();
            navigation.setUserNav();
            page.redirect('catalog');
        } catch (err) {
            alert(err.message);
        }
    }
});
