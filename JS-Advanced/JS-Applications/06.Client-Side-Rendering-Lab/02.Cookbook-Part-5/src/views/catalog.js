import {getRecipeCount, getRecipes} from '../api/data.js';
import {html} from "../../node_modules/lit-html/lit-html.js";


export function setupCatalog(navigation) {
    return showCatalog;

    async function showCatalog(page = 1) {
        const recipes = await getRecipes(page);
        const count = await getRecipeCount();
        const pages = Math.ceil(count / 5);
        return catalogTemplate(recipes, page, pages, navigation.goTo)
    }
}

const catalogTemplate = (recipes, page, pages, goto) => html`
    <section id="catalog">
        ${pagerTemplate(page, pages, goto)}
        ${recipes.map(r => recipeTemplate(r, goto))}
        ${pagerTemplate(page, pages, goto)}
    </section>`;

const pagerTemplate = (page, pages, goto) => html`
    <header class="section-title">${pager(page, pages, goto)}</header>`;

const pager = (page, pages, goto) => html`
    Page ${page} of ${pages}
    ${page > 1 ? html`<a class="pager" @click=${() => goto('catalog', page - 1)}>&lt; Prev</a>` : ''}
    ${page < pages ? html`<a class="pager" @click=${() => goto('catalog', page + 1)}>Next
        &gt;</a>` : ''}`;

const recipeTemplate = (recipe, goto) => html`
    <article class="preview" @click=${() => goto('details', recipe._id)}>
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src=${recipe.img} alt="Recipe image">
        </div>
    </article>`;