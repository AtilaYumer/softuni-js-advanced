import {register} from "../api/data.js";

export function setUpRegister(section, navigation) {

    section.querySelector('.alreadyUser').addEventListener('click', async (event) => {
        event.preventDefault();
        await navigation.goToView('login');
    });

    const form = section.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        for (const [, v] of [...formData.entries()]) {
            if (!v || !v.trim()) {
                return alert('All fields are required!');
            }
        }

        if (formData.get('password') !== formData.get('repeatPassword')) {
            return alert('Password and repeat password doesn\'t match!');
        }
        await registerUser([...formData.entries()].reduce((acc, [k, v]) => Object.assign(acc, {[k]: v}), {}));
    })

    return showRegister;

    function showRegister() {
        return section;
    }

    async function registerUser(data) {
        try {
            await register(data.email, data.password);
            await navigation.goToView('home');
        } catch (e) {
            alert(e.message);
        }
    }
}