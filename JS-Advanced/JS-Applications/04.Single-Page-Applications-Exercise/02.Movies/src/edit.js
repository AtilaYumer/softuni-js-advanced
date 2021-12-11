import { getMovie, showDetails } from './details.js';
import { showSection } from './dom.js';
import { getUserInfo } from './utils.js';

const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
section.remove();

export async function showEdit(id, event) {
    event.preventDefault();
    const movie = await getMovie(id);
    await fillMovieInfo(movie);
    showSection(section);
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
        const movieData = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {});
        editMovie(movie, JSON.stringify(movieData));
    });
}

async function fillMovieInfo(movie) {
    form.querySelector('[name=title]').value = movie.title;
    form.querySelector('[name=description]').value = movie.description;
    form.querySelector('[name=img]').value = movie.img;
}

async function editMovie(movie, data) {
    try {
        const userInfo = getUserInfo();
        if (userInfo.userId !== movie._ownerId) {
            return alert('Current user is not the owner of the movie!');
        }
        const response = await fetch(`http://localhost:3030/data/movies/${movie._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userInfo.accessToken
            },
            body: data
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        showDetails(movie._id);
    } catch (e) {
        alert(e.message);
    }
}