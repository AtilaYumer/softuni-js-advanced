import {showNav} from './app.js';
import {showDetails} from './details.js';
import {e} from './dom.js';

let main;
let section;
let setActiveNav;

export function setUpCatalog(targetMain, targetSection, targetSetActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = targetSetActiveNav;
}

export async function showCatalog() {
    showNav();
    setActiveNav('catalogLink');
    section.innerHTML = 'Loading...';
    main.innerHTML = '';
    main.appendChild(section);

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);
    main.innerHTML = '';
    cards.forEach(c => main.appendChild(c));
}

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    return await response.json();
}

function createRecipePreview(recipe) {
    return e('article', {className: 'preview', onClick: () => showDetails(recipe)},
        e('div', {className: 'title'}, e('h2', {}, recipe.name)),
        e('div', {className: 'small'}, e('img', {src: recipe.img})),
    );
}