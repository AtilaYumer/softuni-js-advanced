import {getRecent} from '../api/data.js';
import {html} from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = (recentRecipes, goto) => html`
    <section id="home">
        <div class="hero">
            <h2>Welcome to My Cookbook</h2>
        </div>
        <header class="section-title">Recently added recipes</header>
        <div class="recent-recipes">
            ${recentRecipes.map(r => recipeTemplate(r, goto))}
        </div>
        <footer class="section-title">
            <p>Browse all recipes in the <a @click=${() => goto('catalog')}>Catalog</a></p>
        </footer>
    </section>`;

const recipeTemplate = (recipe, goto) => html`
    <article class="recent" @click=${() => goto('details', recipe._id)}>
        <div class="recent-preview">
            <img src=${recipe.img}>
        </div>
        <div class="recent-title">
            ${recipe.name}
        </div>
    </article>${spacerTemplate()}`;

const spacerTemplate = () => html`
    <div class="recent-space"></div>`;

export function setupHome(navigation) {
    return showHome;

    async function showHome() {
        const recentRecipes = await getRecent();
        return homeTemplate(recentRecipes, navigation.goTo);
    }
}