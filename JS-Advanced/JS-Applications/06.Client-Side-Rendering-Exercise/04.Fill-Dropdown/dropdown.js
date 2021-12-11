import {html, render} from "./node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
const itemText = document.getElementById('itemText');
const optionsTemplate = (options) => html`${options.map(o => html`
    <option value="${o._id}">${o.text}</option>`)}`;

async function loadDropdown() {
    const response = await fetch(url);
    if (!response.ok) {
        const error = await response.json();
        console.log(error.message)
    }
    const options = await response.json();
    render(optionsTemplate(Object.values(options)), document.getElementById('menu'));
}

await loadDropdown();

document.querySelector('form').addEventListener('submit', addItem);

async function addItem(event) {
    event.preventDefault();
    const body = {
        text: itemText.value.trim()
    };
    const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if (response.ok) {
        event.target.reset();
        await loadDropdown();
    }
}