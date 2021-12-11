import {getRecipeById, editRecipe} from '../api/data.js';
import {html} from "../../node_modules/lit-html/lit-html.js";


export function setupEdit(navigation) {

    return showEdit;

    async function showEdit(id) {
        const recipe = await getRecipeById(id);
        return editTemplate(recipe, navigation);
    }
}

const editTemplate = (recipe, navigation) => html`
    <section id="edit">
        <article>
            <h2>Edit Recipe</h2>
            <form @submit=${(event) => edit(event, recipe._id, navigation)}>
                <label>Name: <input .value=${recipe.name} type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input .value=${recipe.img} type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" .value=${recipe.ingredients.join('\n')}
                                                         placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" .value=${recipe.steps.join('\n')}
                                                         placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Update Recipe">
            </form>
        </article>
    </section>`;

async function edit(event, recipeId, navigation) {
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
        await editRecipe(recipeId, body);
        await navigation.goTo('details', recipeId);
    } catch (e) {
        alert(e.message);
    }
}
