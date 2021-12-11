import {towns} from "./towns.js";
import {html, render} from "./node_modules/lit-html/lit-html.js";

const input = document.querySelector('article input');
const result = document.getElementById('result');
let matchedTowns = [];

const townsTemplate = (towns) => html`
    <ul>
        ${towns.map(t => html`
            <li class=${matchedTowns.includes(t) ? 'active' : ''}>${t}</li>`)}
    </ul>`;

search();

function search() {
    const townsDiv = document.getElementById('towns');
    render(townsTemplate(towns), townsDiv);

    document.querySelector("article button").addEventListener('click', (event) => {
        matchedTowns = [];
        const searchText = input.value.trim();
        if (searchText) {
            matchedTowns = towns.filter(t => t.toLowerCase().includes(searchText.toLowerCase()));
        }
        result.textContent = `${matchedTowns.length} matches found`;
        render(townsTemplate(towns), townsDiv);
    })
}
