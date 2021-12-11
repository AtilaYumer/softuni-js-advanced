import {e} from './dom.js';
import {onDelete, showEdit} from "./edit.js";

let main;
let section;
let setActiveNav;

export function setUpDetails(targetMain, targetSection, targetSetActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = targetSetActiveNav;
}

export function showDetails(recipe) {
    setActiveNav();
    main.innerHTML = '';
    main.appendChild(section);

    section.innerHTML = '';
    section.appendChild(createRecipeCard(recipe));
}

function createRecipeCard(recipe) {
    let result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', {className: 'band'},
            e('div', {className: 'thumb'}, e('img', {src: recipe.img})),
            e('div', {className: 'ingredients'},
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', {className: 'description'},
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    const userId = sessionStorage.getItem('userId');
    if (userId != null && recipe._ownerId === userId) {
        result.appendChild(e('div', {className: 'controls'},
            e('button', {onClick: () => showEdit(recipe)}, '\u270E Edit'),
            e('button', {onClick: () => onDelete(recipe._id, result)}, '\u2716 Delete'),
        ));
    }
    return result;
}
