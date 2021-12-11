import {html, nothing} from "../lib.js";
import {getAlbums} from "../api/data.js";

const catalogTemplate = (albums) => html`
    <!--Catalog-->
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${albums.length > 0 ? html`${albums.map(albumTemplate)}` : html`
            <!--No albums in catalog-->
            <p>No Albums in Catalog!</p>`}
    </section>`;

const albumTemplate = (album) => html`
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
                    <a id="details" href=/details/${album._id} id="details">Details</a>
                </div>` : nothing}
        </div>
    </div>`;

export async function catalogPageHandler(ctx) {
    const albums = await getAlbums();

    ctx.render(catalogTemplate(albums));
}