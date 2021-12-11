import {html, render} from "./node_modules/lit-html/lit-html.js";

window.addEventListener('load', () => {
    const root = document.getElementById('root');
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const towns = formData.get('towns');
        if (towns) {
            render(rootTemplate(towns.split(', ')), root);
        }
    })
});

const rootTemplate = (towns) => html`
    <ul>
        ${towns.map(t => html`
            <li>${t}</li>`)}
    </ul>`;