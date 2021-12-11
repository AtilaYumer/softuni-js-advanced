import {render} from "./lib.js";
import {homeTemplate} from "./template/homeTemplate.js";

const body = document.querySelector('body');
document.getElementById('loadBooks').addEventListener('click', (event) => loadBooks());
await loadBooks();

export async function loadBooks(book) {
    const books = await getBooks();
    render(homeTemplate(Object.entries(books), book), body);
}

async function getBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    return await response.json();
}