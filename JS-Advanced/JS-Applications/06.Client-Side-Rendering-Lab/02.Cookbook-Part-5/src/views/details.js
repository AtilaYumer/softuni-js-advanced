import {getRecipeById, deleteRecipeById} from '../api/data.js';
import {html, render} from "../../node_modules/lit-html/lit-html.js";
import {showComments} from "./comments.js";


export function setupDetails() {
    return showDetails;

    async function showDetails(id) {
        const recipe = await getRecipeById(id);

        const userId = sessionStorage.getItem('userId');
        const isOwner = userId != null && recipe._ownerId === userId;
        return detailsTemplate(recipe, isOwner);
    }
}

const detailsTemplate = (recipe, isOwner) => html`
    <section id="details">
        ${recipeTemplate(recipe, isOwner)}
        ${sessionStorage.getItem('userId') ? html`
            ${showComments(recipe)}` : ''}
    </section>`;

const recipeTemplate = (recipe, isOwner) => html`
    <article><h2>Easy Lasagna</h2>
        <div class="band">
            <div class="thumb">
                <img src=${recipe.img} alt="Recipe image">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(r => html`
                        <li>${r}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3> Preparation:</h3>
            ${recipe.steps.map(s => html`<p>${s}</p>`)}
        </div>
        ${isOwner ? html`
            <div class="controls">
                <button href="/edit/${recipe._id}">\u270E Edit</button>
                <button @click=${() => onDelete(recipe)}>\u2716 Delete</button>
            </div>` : ''}
    </article>`;

async function onDelete(recipe) {
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
    if (confirmed) {
        try {
            await deleteRecipeById(recipe._id);
            const deletedTemplate = () => html`
                <article><h2>Recipe deleted</h2></article>`;
            document.getElementById('details').innerHTML = '';
            render(deletedTemplate(), document.getElementById('details'));
        } catch (err) {
            alert(err.message);
        }
    }
}

async function addNewComment(event) {
    event.preventDefault();
}
