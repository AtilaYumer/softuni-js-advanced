import { showNavigation, showSection } from './dom.js';
import { showHome } from './home.js';

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    for (let [, v] of [...formData.entries()]) {
        if (!v) {
            return alert('All fields are required!');
        }
    }

    if(formData.get('password').length < 6) {
        return alert('Password must be at lesat 6 character length!');
    }

    if (formData.get('password') !== formData.get('repeatPassword')) {
        return alert('Password does not match with repat password.');
    }
    register([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
});
section.remove();

export function showRegister() {
    showNavigation();
    showSection(section);
}

async function register(registrationData) {
    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        });
        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('userId', data._id);
        showHome();
    } catch (e) {
        alert(e.message);
    }
}