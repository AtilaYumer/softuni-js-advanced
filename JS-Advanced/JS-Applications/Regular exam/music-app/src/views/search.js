import {html, nothing, render} from "../lib.js";
import {getAlbums} from "../api/data.js";

const searhTemplate = () => html`
    <!--Search Page-->
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${onSearch}>Search</button>
        </div>

        <h2>Results:</h2>

        <!--Show after click Search button-->
        <div class="search-result">
        </div>
    </section>`;

const resultTemplate = (albums) => html`
    ${albums.length > 0 ? html`
        ${albums.map(albumTemplate)}` : html`
        <!--If there are no matches-->
        <p class="no-result">No result.</p>`}`;

const albumTemplate = (album) => html`
    <!--If have matches-->
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${sessionStorage.getItem('userId') ? html`
                <div class="btn-group">
                    <a href="#" id="details">Details</a>
                </div>` : nothing}
        </div>
    </div>`;

export function searchPageHandler(ctx) {
    ctx.render(searhTemplate());
}

async function onSearch(event) {
    try {
        event.preventDefault();
        const searchText = document.getElementById('search-input').value.trim();
        if (searchText) {
            const albums = await getAlbums(true, searchText);
            const container = document.querySelector('.search-result');
            render(resultTemplate(albums), container);
        }
    } catch (e) {
        alert(e.message);
    }
}