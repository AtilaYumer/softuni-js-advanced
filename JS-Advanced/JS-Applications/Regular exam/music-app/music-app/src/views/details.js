import {html, nothing, page} from "../lib.js";
import {deleteAlbumById, getAlbumById} from "../api/data.js";

const detailsTemplate = (album) => html`
    <!--Details Page-->
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: ${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>
                ${album._ownerId === sessionStorage.getItem('userId') ? html`
                    <!-- Only for registered user and creator of the album-->
                    <div class="actionBtn">
                        <a href=/edit/${album._id} class="edit">Edit</a>
                        <a class="remove"
                           @click=${() => onDelete(album, () => page.redirect('/catalog'))}>Delete</a>
                    </div>` : nothing}
            </div>
        </div>
    </section>`;

export async function detailsPageHandler(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumById(id);

    ctx.render(detailsTemplate(album));
}

async function onDelete(album, onSuccess) {
    try {
        const confirmed = confirm(`Are you sure you want to delete ${album.name}?`);
        if (confirmed) {
            await deleteAlbumById(album._id);
            onSuccess();
        }
    } catch (e) {
        alert(e.message);
    }
}