import {html, render} from "./node_modules/lit-html/lit-html.js";
import {cats} from "./catSeeder.js";

window.addEventListener('load', () => {
    const section = document.getElementById('allCats');
    render(catsTemplate(cats), section);
});

const catsTemplate = (cats) => html`
    <ul>
        ${cats.map(c => html`${singleCatTemplate(c)}`)}
    </ul>`;

const singleCatTemplate = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${showStatus}>Show status code</button>
            <div class="status" style="display: none" id="100">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`;

function showStatus(event) {
    event.target.innerHTML = event.target.innerHTML === 'Show status code' ? 'Hide status code' : 'Show status code';
    event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === 'none' ? 'block' : 'none';
}