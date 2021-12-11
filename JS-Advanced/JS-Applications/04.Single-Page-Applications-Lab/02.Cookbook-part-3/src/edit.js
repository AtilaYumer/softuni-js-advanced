import {showCatalog} from "./catalog.js";

let main;
let section;
let setActiveNav;
let recipe;

const form = document.querySelector('#edit form');
form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    update([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
});

export function setUpEdit(targetMain, targetSection, targetSetActive) {
    main = targetMain;
    section = targetSection;
    setActiveNav = targetSetActive;
}

export function showEdit(targetRecipe) {
    setActiveNav();
    main.innerHTML = '';
    main.appendChild(section);

    recipe = targetRecipe;

    section.querySelector('[name="name"]').value = recipe.name;
    section.querySelector('[name="img"]').value = recipe.img;
    section.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n');
    section.querySelector('[name="steps"]').value = recipe.steps.join('\n');
}

export async function onDelete(recipeId, div) {
    console.log(div);
    let confirmation = confirm('Are you sure you want to delete the recipe?');
    if(!confirmation) {
        return;
    }
    const token = sessionStorage.getItem('authToken');
    if (token == null) {
        await showCatalog();
    }

    try {
        const response = await fetch(`http://localhost:3030/data/recipes/${recipeId}`, {
            method: 'delete',
            headers: {
                'X-Authorization': token
            }
        });

        if (response.status === 200) {
            const header = div.querySelector('h2');
            div.innerHTML = '';
            header.textContent = "Recipe deleted";
            div.appendChild(header);
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
}

async function update(data) {
    const body = JSON.stringify({
        name: data.name,
        img: data.img,
        ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l !== ''),
        steps: data.steps.split('\n').map(l => l.trim()).filter(l => l !== '')
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
       await showCatalog();
    }

    try {
        const response = await fetch(`http://localhost:3030/data/recipes/${recipe._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body
        });

        if (response.status === 200) {
            await showCatalog();
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
}