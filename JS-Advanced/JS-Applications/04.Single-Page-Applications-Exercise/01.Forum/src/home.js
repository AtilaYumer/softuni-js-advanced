import {e} from './dom.js';
import {showDetails} from "./details.js";

let main;
let section;
let topicsDiv;
const form = document.querySelector('#home form');
const homeBtn = document.querySelector('nav a');
const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

export function setUpHome(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    topicsDiv = section.querySelector('.topic-container');
    attachEvents();
}

export function showHome() {
    main.innerHTML = '';
    main.appendChild(section);

    getTopics().then(topics => {
        topicsDiv.innerHTML = '';
        const cards = topics.map(createCard);
        cards.forEach(c => topicsDiv.appendChild(c));
    });
}

function attachEvents() {
    homeBtn.addEventListener('click', () => {
        showHome();
    })
    form.querySelector('button[class=cancel]').addEventListener('click', (event) => {
        event.preventDefault();
        form.reset();
    });

    form.querySelector('button[class=public]').addEventListener('click', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        for (const [, v] of [...formData.entries()]) {
            if (!v) {
                console.log(formData.get)
                return alert('All fields are required');
            }
        }
        createTopic([...formData.entries()]
            .reduce((r, [k, v]) => Object.assign(r, {[k]: v}), {}));
        form.reset();
    });

    topicsDiv.addEventListener('click', (e) => {
        const id = e.target.closest('.topic-name-wrapper').id;
        showDetails(id);
    });
}

function createTopic(topic) {
    topic.createdOn = Date.now();

    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(topic)
    }).then(response => {
        if (!response.ok) {
            response.text().then(errorText => {
                throw new Error(errorText);
            });
        } else {
            showHome();
        }
    }).catch(error => {
        alert(error.message);
    });
}

async function getTopics() {
    const response = await fetch(url);
    const data = await response.json();
    return Object.values(data);
}

function createCard(topic) {
    return e('div', {className: 'topic-name-wrapper', id: topic._id},
        e('div', {className: 'topic-name'},
            e('a', {href: '#', className: 'normal'},
                e('h2', {}, topic.topicName)),
            e('div', {className: 'columns'},
                e('div', {},
                    e('p', {}, 'Date: ',
                        e('time', {}, new Date(topic.createdOn).toISOString())),
                    e('div', {className: 'nick-name'},
                        e('p', {}, 'Username: ',
                            e('span', {}, topic.username)))))));
}