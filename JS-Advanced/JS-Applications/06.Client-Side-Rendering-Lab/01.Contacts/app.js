import {contacts} from "./contacts.js";
import {html, render} from "./node_modules/lit-html/lit-html.js";

window.addEventListener('load', () => {
    const div = document.getElementById('contacts');
    render(contacts.map(contactsTemplate), div);
});

const contactsTemplate = (data) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${data.name}</h2>
            <button @click=${toggleDetails} class="detailsBtn">Details</button>
            <div class="details" id=${data.id}>
                <p>Phone number: ${data.phoneNumber}</p>
                <p>Email: ${data.email}</p>
            </div>
        </div>
    </div>`;

function toggleDetails(event) {
    let parentNode = event.target.parentNode;
    let details = parentNode.lastElementChild;
    details.className = details.className === 'details' ? '' : 'details';
}