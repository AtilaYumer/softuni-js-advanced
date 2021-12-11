import {html, page} from "../lib.js";
import {register} from "../api/data.js";

const registerTemplate = () => html`
    <!--Registration-->
    <section id="registerPage">
        <form @submit=${(event) => registerUser(event, () => page.redirect('/'))}>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>`;

export function registerPageHandler(ctx) {
    ctx.render(registerTemplate());
}

async function registerUser(event, onSuccess) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const confPass = formData.get('conf-pass').trim();

        if (!email || !password || !confPass) {
            return alert('All fields are required!');
        }
        if (password !== confPass) {
            return alert('Password does not match confirm password!');
        }
        await register(email, password);
        onSuccess();
    } catch (e) {
        alert(e.message);
    }
}