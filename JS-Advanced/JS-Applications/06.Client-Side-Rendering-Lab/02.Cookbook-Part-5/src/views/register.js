import {regster} from '../api/data.js';
import {html} from "../../node_modules/lit-html/lit-html.js";


export function setupRegister(navigation) {
    return showRegister;

    function showRegister() {
        return registerTemplate(navigation);
    }
}

const registerTemplate = (navigation) => html`
    <section id="register">
        <article>
            <h2>Register</h2>
            <form @submit=${(event) => registerUser(event, navigation)}>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <input type="submit" value="Register">
            </form>
        </article>
    </section>`;

async function registerUser(event, navigation) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {[k]: v}), {});
        if (data.password !== data.rePass) {
            return alert('Passwords don\'t match');
        }
        await regster(data.email, data.password);
        navigation.setUserNav();
        await navigation.goTo('catalog');
    } catch (err) {
        alert(err.message);
    }
}