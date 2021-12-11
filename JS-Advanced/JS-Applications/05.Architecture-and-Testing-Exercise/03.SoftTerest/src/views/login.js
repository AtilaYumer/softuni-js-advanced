import {login} from "../api/data.js";

export function setUpLogin(section, navigation) {

    section.querySelector('.alreadyUser').addEventListener('click', async (event) => {
        event.preventDefault();
        await navigation.goToView('register');
    });

    const form = section.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        if (!email || !password) {
            return alert('All fields are required!');
        }
        loginUser(email, password).then(form.reset);
    });

    return showLogin;

    function showLogin() {
        return section;
    }

    async function loginUser(email, password) {
        try {
            await login(email, password);
            form.reset();
            await navigation.goToView('home');
        } catch (e) {
            alert(e.message);
        }
    }
}