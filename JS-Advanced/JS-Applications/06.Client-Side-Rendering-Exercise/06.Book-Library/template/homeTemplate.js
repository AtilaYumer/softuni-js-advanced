import {html} from "../lib.js";
import {tableTemplate} from "./tableTeampate.js";
import {createBookTemplate} from "./createBookTemplate.js";
import {editBookTemplate} from "./editBookTemplate.js";

const homeTemplate = (books, book) => html`
    ${tableTemplate(books)}
    ${book ? editBookTemplate(book) : createBookTemplate()}
`;

export {
    homeTemplate
}