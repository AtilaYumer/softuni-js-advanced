import {createRecipe} from "../api/data.js";
import {showDetails} from "./details.js";


let main;
let section;
let setActiveNav;

export function setupCreate(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;
    const form = targetSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));

    async function onSubmit(data) {
        const body = {
            name: data.name,
            img: data.img,
            ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l !== ''),
            steps: data.steps.split('\n').map(l => l.trim()).filter(l => l !== '')
        };

        const token = sessionStorage.getItem('authToken');
        if (token == null) {
            return alert('You\'re not logged in!');
        }

        try {
            const response =  await createRecipe(body);
            await showDetails(response._id);
        } catch (err) {
            alert(err.message);
        }
    }
}

export function showCreate() {
    setActiveNav('createLink');
    main.innerHTML = '';
    main.appendChild(section);
}