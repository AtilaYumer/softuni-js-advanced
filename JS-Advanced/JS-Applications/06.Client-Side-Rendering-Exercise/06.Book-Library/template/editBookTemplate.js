import {html} from "../lib.js";
import {loadBooks} from "../app.js";

const editBookTemplate = (book) => html`
    <form id="edit-form" @submit=${(event) => editBook(event, book.id)}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value=${book.book.title}>
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value=${book.book.author}>
        <input type="submit" value="Save">
    </form>`;

async function editBook(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [, v] of [...formData.entries()]) {
        if (!v || !v.trim()) {
            return alert('All fields are required');
        }
    }
    const body = {
        title: formData.get('title').trim(),
        author: formData.get('author').trim()
    }
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`,{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if (response.ok){
        event.target.reset();
        await loadBooks();
    }
}

export {
    editBookTemplate
}