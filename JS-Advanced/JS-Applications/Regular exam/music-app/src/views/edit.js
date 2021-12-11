import {html, page} from "../lib.js";
import {editAlbumById, getAlbumById} from "../api/data.js";

const editTemplate = (album) => html`
    <!--Edit Page-->
    <section class="editPage">
        <form @submit=${(event) => onEdit(event, album._id, () => page.redirect(`/details/${album._id}`))}>
            <fieldset>
                <legend>Edit Album</legend>

                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" .value=${album.name}>

                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${album.imgUrl}>

                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" .value=${album.price}>

                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text"
                           .value=${album.releaseDate}>

                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" .value=${album.artist}>

                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" .value=${album.genre}>

                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10" cols="10"
                              .value=${album.description}></textarea>

                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>`;

export async function editPageHandler(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumById(id);

    ctx.render(editTemplate(album));
}

async function onEdit(event, id, onSuccess) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        for (const [, v] of [...formData.entries()]) {
            if (!v || !v.trim()) {
                return alert('All fields are required!');
            }
        }
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {[k]: v.trim()}), {});
        await editAlbumById(id, data);
        onSuccess();
    } catch (e) {
        alert(e.message);
    }
}
