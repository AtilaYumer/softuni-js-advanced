import { e, showSection } from "./dom.js";
import { showEdit } from "./edit.js";
import { getUserInfo } from "./utils.js";
import { showHome } from "./home.js";

const section = document.getElementById('movie-example');
const movieContainer = section.querySelector('.container');
section.remove();

const controllButtonsFunctions = {
    'btn btn-primary': likeMovie,
    'btn btn-secondary': dislikeMovie,
    'btn btn-danger': deleteMovie,
    'btn btn-warning': showEdit
}

export function showDetails(id) {
    showSection(section);
    showMovieDetails(id);
}

async function showMovieDetails(id) {
    movieContainer.replaceChildren(e('p', {}, 'Loading...'));
    const movie = await getMovie(id);
    const likes = await getLikes(id);
    const currentUserLike = await getUserLikesByMovie(id);
    movieContainer.replaceChildren(createMovieCard(movie, likes, currentUserLike));
}

export async function getMovie(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/movies/${id}`);
        if (!response.ok) {
            const error = response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (e) {
        alert(e.message);
    }
}

async function getLikes(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (e) {
        alert(e.message);
    }
}

async function getUserLikesByMovie(movieId) {
    try {
        const userInfo = getUserInfo();
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userInfo.userId}%22`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    } catch (e) {

    }
}

function createMovieCard(movie, likes, currentUserLike) {
    const userInfo = getUserInfo();
    const mainDiv = e('div', { className: 'row bg-light text-dark' });
    mainDiv.innerHTML = `
    <h1>Movie title: ${movie.title}</h1>
    <div class="col-md-8">
        <img class="img-thumbnail" src="${movie.img}" alt="Movie">
    </div>
    <div class="col-md-4 text-center">
        <h3 class="my-3 ">Movie Description</h3>
        <p>${movie.description}</p>
        ${showControllButtons(movie)}
        ${currentUserLike.length === 0 && (userInfo.userId !== movie._ownerId) ? '<a class="btn btn-primary" href="#">Like</a>' : ''}
        ${currentUserLike.length !== 0 && (userInfo.userId !== movie._ownerId) ? '<a class="btn btn-secondary" href="#">Dislike</a>' : ''}
        <span class="enrolled-span">Liked ${likes}</span>
    </div>`;
    mainDiv.addEventListener('click', (event) => handleClick(movie._id, event));
    return mainDiv;
}

function showControllButtons(movie) {
    const userInfo = getUserInfo();
    if (userInfo.userId === movie._ownerId) {
        return `<a class="btn btn-danger" href="#">Delete</a>
                <a class="btn btn-warning" href="#">Edit</a>`;
    } else {
        return '';
    }
}

function handleClick(id, event) {
    if (event.target.tagName === 'A' && controllButtonsFunctions[event.target.className]) {
        event.preventDefault();
        controllButtonsFunctions[event.target.className](id, event);
    }
}

async function deleteMovie(id) {
    try {
        const userInfo = getUserInfo();
        const movie = await getMovie(id);
        if (userInfo.userId !== movie._ownerId) {
            throw new Error('Current user is not the owner of the movie!')
        }
        const response = await fetch(`http://localhost:3030/data/movies/${id}`, {
            method: 'delete',
            headers: { 'X-Authorization': userInfo.accessToken }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        showHome();
    } catch (e) {
        alert(e.message);
    }
}

async function likeMovie(id, event) {
    event.preventDefault();
    try {
        const userInfo = getUserInfo();
        if (!userInfo.accessToken) {
            return alert('Only loged in users can like movies.');
        }
        const userLikes = await getUserLikesByMovie(id);
        if (userLikes.length > 0) {
            return alert('Users can like movies only once.')
        }
        const payload = JSON.stringify({
            movieId: id
        });
        const response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userInfo.accessToken
            },
            body: payload
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error.message);
        }
        showDetails(id);
    } catch (e) {
        alert(e.message);
    }
}

async function dislikeMovie(id, event) {
    event.preventDefault();
    try {
        const userInfo = getUserInfo();
        if (!userInfo.accessToken) {
            return alert('Only loged in users can dislike movies.');
        }
        const userLikes = await getUserLikesByMovie(id);
        if (userLikes.length === 0) {
            return alert('User can dislike movoies only if they liked them first.')
        }
        const response = await fetch(`http://localhost:3030/data/likes/${userLikes[0]._id}`, {
            method: 'delete',
            headers: {  
                'X-Authorization': userInfo.accessToken
            }
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error.message);
        }
        showDetails(id);
    } catch (e) {
        alert(e.message);
    }
}
