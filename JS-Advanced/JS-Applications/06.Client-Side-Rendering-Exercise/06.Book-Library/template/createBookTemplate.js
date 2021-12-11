import {html} from "../lib.js";
import {loadBooks} from "../app.js";

const createBookTemplate = () =>  html`
    <form id="add-form" @submit=${createBook}>
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>`;

async function createBook(event) {
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
    const response = await fetch('http://localhost:3030/jsonstore/collections/books',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if (response.ok){
        event.target.reset();
        await loadBooks();
    }
}

export {
    createBookTemplate
}