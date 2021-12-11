import { e } from './dom.js';

let main;
let section;
let header;
let commentDiv;
let form;
let postId;

export function setUpDetails(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
    header = section.querySelector('.theme-name');
    commentDiv = section.querySelector('.comment');
    form = section.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        for (const [, v] of [...formData.entries()]) {
            if (!v) {
                return alert('All fields are required');
            }
        }
        createComment(postId, [...formData.entries()].reduce((r, [k, v]) => Object.assign(r, { [k]: v }), {}));
        form.reset();
    });
}

export async function showDetails(id) {
    postId = id;
    const [topic, comments] = await Promise.all([
        getTopic(id),
        getComments(id)
    ]);
    main.innerHTML = '';
    main.appendChild(section);
    header.innerHTML = '';
    commentDiv.innerHTML = '';
    header.appendChild(e('h2', {}, topic.topicName));
    Array.from(createCards(topic, comments ? Object.values(comments) : undefined)).forEach(c => commentDiv.appendChild(c));
}

async function createComment(postId, comment) {
    comment.createdOn = Date.now();

    fetch(`http://localhost:3030/jsonstore/collections/myboard/comments/${postId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(response => {
        if (!response.ok) {
            response.text().then(errorText => {
                throw new Error(errorText);
            });
        } else {
            showDetails(postId);
        }
    }).catch(error => {
        alert(error.message);
    });
}

async function getTopic(id) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

async function getComments(id) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments/${id}`);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

function createCards(topic, comments) {
    const temp = document.createElement('div');
    temp.appendChild(createTopicCard(topic));
    if (comments) {
        temp.appendChild(createCommentCards(comments));
    }
    return temp.children;
}

function createTopicCard(topic) {
    const headerDiv = document.createElement('div');
    headerDiv.className = 'header';
    headerDiv.innerHTML = `<img src="static/profile.png" alt="avatar">
                            <p><span>${topic.username}</span> posted on <time>${new Date(topic.createdOn).toLocaleString()}</time></p>
                            <p class="post-content">${topic.postText}</p>`;
    return headerDiv;
}

function createCommentCards(comments) {
    const userCommentDiv = e('div', { id: 'user-comment' });
    comments.forEach(c => {
        userCommentDiv.appendChild(e('div', { className: 'topic-name-wrapper' },
            e('div', { className: 'topic-name' },
                e('p', {},
                    e('strong', {}, c.username), ' commented on ',
                    e('time', {}, new Date(c.createdOn).toLocaleString('en-US'))),
                e('div', { className: 'post-content' },
                    e('p', {}, c.postText)))));
    });
    return userCommentDiv;
}
