import { showNavigation, showSection } from './dom.js';
import { showHome } from './home.js'

const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    for (const [k, v] of [...formData.entries()]) {
        if (!v) {
            return alert('All fields are required!');
        }
    }
    login([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
});
section.remove();

export function showLogin() {
    showNavigation();
    showSection(section);
}

async function login(loginData) {
    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('userId', data._id);
        form.reset();
        showHome();
    } catch (e) {
        alert(e.message);
    }
}