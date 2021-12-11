import { e, showNavigation, showSection } from './dom.js';
import { showCreate } from './create.js';
import { showDetails } from './details.js'
import { getUserInfo } from './utils.js';

const section = document.getElementById('home-page');
const movieCards = section.querySelector('#movie-cards');
const addMovieBtnSection = section.querySelector('#add-movie-button');

section.querySelector('#add-movie-button').addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.tagName === 'A') {
        showCreate();
    }
});

movieCards.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        showDetails(event.target.id);
    }
});

section.remove();

export async function showHome() {
    showNavigation();
    showAddMovieButton();
    showSection(section);
    showMovies();
}

function showAddMovieButton() {
    const userInfo = getUserInfo();
    if(userInfo.accessToken) {
        addMovieBtnSection.style.display = 'block';
    } else {
        addMovieBtnSection.style.display = 'none';
    }
}

async function showMovies() {
    movieCards.replaceChildren(e('p', {}, 'Loading...'));
    const movies = await getMovies();
    movieCards.replaceChildren(...movies.map(createMovieCard));
}

async function getMovies() {
    try {
        const response = await fetch('http://localhost:3030/data/movies');
        return await response.json();
    } catch (e) {
        alert(e);
    }
}

function createMovieCard(movie) {
    const userInfo = getUserInfo();
    const card = e('div', { className: 'card mb-4' });
    card.innerHTML = `
        <img class="card-img-top" src=${movie.img} alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
        ${userInfo.accessToken ? `<a href="#"><button id=${movie._id} type="button" class="btn btn-info">Details</button></a>` : ''}
    </div>`;
    return card;
}