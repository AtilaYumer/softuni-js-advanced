import {html, render, nothing} from "./node_modules/lit-html/lit-html.js";

async function solve() {
    let searchText = '';
    const searchInput = document.getElementById('searchField');
    const tbody = document.querySelector('tbody');

    const tableRowTemplate = (data) => html`
        ${data.map(d => html`
            <tr class=${isRowSelected(d) ? 'select  ' : nothing}>
                <td>${d.firstName} ${d.lastName}</td>
                <td>${d.email}</td>
                <td>${d.course}</td>
            </tr>`)}`;

    document.querySelector('#searchBtn').addEventListener('click', onClick);
    await renderData();

    async function getData() {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
        return await response.json();
    }

    async function renderData() {
        const data = await getData();
        render(tableRowTemplate(Object.values(data)), tbody);
    }

    function onClick() {
        searchText = '';
        renderData();
        searchText = searchInput.value.trim();
        searchInput.value = '';
        renderData();
    }

    function isRowSelected(data) {
        if (searchText) {
            if (data.firstName.toLowerCase().includes(searchText.toLowerCase())
                || data.lastName.toLowerCase().includes(searchText.toLowerCase())
                || data.email.toLowerCase().includes(searchText.toLowerCase())
                || data.course.toLowerCase().includes(searchText.toLowerCase()  )) {
                return true;
            }
        }
        return false;
    }
}

await solve();