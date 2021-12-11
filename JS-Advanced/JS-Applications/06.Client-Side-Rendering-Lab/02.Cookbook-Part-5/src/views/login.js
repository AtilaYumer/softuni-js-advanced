import {login} from '../api/data.js';
import {html} from "../../node_modules/lit-html/lit-html.js";


export function setupLogin(navigation) {
    return showLogin;

    function showLogin() {
        return loginTemplate(navigation);
    }
}

const loginTemplate = (navigation) => html`
    <section id="login">
        <article>
            <h2>Login</h2>
            <form @submit=${(event) => loginUser(event, navigation)}>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input type="submit" value="Login">
            </form>
        </article>
    </section>`;

async function loginUser(event, navigation) {
    try {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {[k]: v}), {});
        console.log('logging in');
        await login(data.email, data.password);
        navigation.setUserNav();
        await navigation.goTo('catalog');
    } catch (err) {
        alert(err.message);
    }
}