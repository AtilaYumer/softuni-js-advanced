import {html, page} from '../lib.js';
import {login} from "../api/data.js";

const loginTemplate = () => html`
    <!--Login-->
    <section id="loginPage">
        <form @submit=${(event) => loginUser(event, () => page.redirect('/'))}>
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;

export function loginPageHandler(ctx) {
    ctx.render(loginTemplate());
}

async function loginUser(event, onSuccess) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        if (!email || !password) {
            return alert('All fields are required!');
        }
        await login(email, password);
        onSuccess();
    } catch (e) {
        alert(e.message);
    }
}