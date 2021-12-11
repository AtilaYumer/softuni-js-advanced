import {html} from '../lib.js';
import {loadBooks} from "../app.js";

const tableTemplate = (books) => html`
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        ${books.map(([id, book]) => tableRowTemplate(id, book))}`;

const tableRowTemplate = (id, book) => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${() => loadBooks({id, book})}>Edit</button>
            <button @click=${() => deleteBook(id)}>Delete</button>
        </td>
    </tr>`;

async function deleteBook(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
        method: 'delete',
    });
    if (response.ok) {
        await loadBooks();
    }
}

export {
    tableTemplate
}