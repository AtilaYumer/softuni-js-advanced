import {e} from '../dom.js';
import {showDetails} from './details.js';
import {getRecipes} from "../api/data.js";

function createRecipePreview(recipe) {
    return e('article', {className: 'preview', onClick: () => showDetails(recipe._id)},
        e('div', {className: 'title'}, e('h2', {}, recipe.name)),
        e('div', {className: 'small'}, e('img', {src: recipe.img})),
    );
}

let main;
let section;
let setActiveNav;

export function setupCatalog(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;
}

export async function showCatalog() {
    try {
        setActiveNav('catalogLink');
        section.innerHTML = 'Loading&hellip;';
        main.innerHTML = '';
        main.appendChild(section);

        const recipes = await getRecipes();
        const cards = recipes.map(createRecipePreview);

        const fragment = document.createDocumentFragment();
        cards.forEach(c => fragment.appendChild(c));
        section.innerHTML = '';
        section.appendChild(fragment);
    } catch (e) {
        alert(e.message);
    }
}