import createNavigationHandler from "./navigation.js";
import {setUpHome} from "./views/home.js";
import {setUpDashboard} from "./views/dashboard.js";
import {setUpCreate} from "./views/create.js";
import {setUpLogin} from "./views/login.js";
import {setUpDetails} from "./views/detail.js";
import {setUpRegister} from "./views/register.js";
import {logout} from "./api/data.js";

window.addEventListener('load', () => {
    const main = document.querySelector('main');
    const navigation = document.querySelector('nav');
    const navigationHandler = createNavigationHandler(main, navigation);

    navigationHandler.registerView('home', document.getElementById('home-holder'), setUpHome);
    navigationHandler.registerView('dashboard', document.getElementById('dashboard-holder'), setUpDashboard, 'dashboardBtn');
    navigationHandler.registerView('create', document.getElementById('create-holder'), setUpCreate, 'createBtn');
    navigationHandler.registerView('login', document.getElementById('login-holder'), setUpLogin, 'loginBtn');
    navigationHandler.registerView('register', document.getElementById('register-holder'), setUpRegister, 'registerBtn');
    navigationHandler.registerView('details', document.getElementById('detail-holder'), setUpDetails);

    navigationHandler.goToView('home');

    document.getElementById('logoutBtn').addEventListener('click', async (event) => {
        try {
            event.preventDefault();
            await logout();
            await navigationHandler.goToView('home');
        } catch (e) {
            alert(e.message);
        }
    });
});