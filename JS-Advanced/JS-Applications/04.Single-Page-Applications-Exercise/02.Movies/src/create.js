import { showNavigation, showSection } from "./dom.js";
import { showHome } from "./home.js";

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    for (const [, v] of [...formData.entries()]) {
        if (!v) {
            return alert('All fields are required!');
        }
    }
    if(formData.get('title').length < 9) {
        return alert('Movie title must be at least 9 characters.')
    }
    createMovie([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
})

export function showCreate() {
    showNavigation();
    showSection(section);
}

async function createMovie(movie) {
    try {
        const token = sessionStorage.getItem('accessToken');
        const respone = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(movie)
        });
        await respone.json();
        showHome();
    } catch (e) {
        alert(e.message);
    }
}