import {createRecipe} from '../api/data.js';
import {html} from "../../node_modules/lit-html/lit-html.js";


export function setupCreate(navigation) {

    return showCreate;

    function showCreate() {
        return createTemplate(navigation);
    }
}

const createTemplate = (navigation) => html`
    <section id="create">
        <article>
            <h2>New Recipe</h2>
            <form @submit=${(event) => createNewRecipe(event, navigation)}>
                <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>
        </article>
    </section>`;

async function createNewRecipe(event, navigation) {
    try {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, {[k]: v}), {});
        const body = {
            name: data.name,
            img: data.img,
            ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l !== ''),
            steps: data.steps.split('\n').map(l => l.trim()).filter(l => l !== '')
        };
        const result = await createRecipe(body);
        await navigation.goTo('details', result._id);
    } catch (e) {
        alert(e.message);
    }
}

