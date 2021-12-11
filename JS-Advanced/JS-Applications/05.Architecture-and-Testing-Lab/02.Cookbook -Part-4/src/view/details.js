import {e} from '../dom.js';
import {showEdit} from './edit.js';
import {deleteRecipeById, getRecipeById} from "../api/data.js";

function createRecipeCard(recipe) {
    const result = e('article', {},
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
            e('button', {onClick: () => showEdit(recipe._id)}, '\u270E Edit'),
            e('button', {onClick: onDelete}, '\u2716 Delete'),
        ));
    }

    return result;

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
        if (confirmed) {
            try {

                await deleteRecipeById(recipe._id);
                section.innerHTML = '';
                section.appendChild(e('article', {}, e('h2', {}, 'Recipe deleted')));
            } catch (e) {
                alert(e.message);
            }
        }
    }
}

let main;
let section;
let setActiveNav;

export function setupDetails(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;
}

export async function showDetails(id) {
    try {
        setActiveNav();
        section.innerHTML = 'Loading&hellip;';
        main.innerHTML = '';
        main.appendChild(section);

        const recipe = await getRecipeById(id);
        section.innerHTML = '';
        section.appendChild(createRecipeCard(recipe));
    } catch (e) {
        alert(e.message);
    }
}