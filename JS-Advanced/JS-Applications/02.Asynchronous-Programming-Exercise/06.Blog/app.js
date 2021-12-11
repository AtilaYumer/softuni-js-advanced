const posts = document.getElementById('posts');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const postComments = document.getElementById('post-comments');

function viewPost() {
    const selectedPostId = posts.value;
    const postBodyRequest = fetch(`http://localhost:3030/jsonstore/blog/posts/${selectedPostId}`);
    const commentsRequest = fetch('http://localhost:3030/jsonstore/blog/comments');

    Promise.all([postBodyRequest, commentsRequest])
        .then(responses => {
            Promise.all(responses.map(response => {
                const contentType = response.headers.get("content-type");
                if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
                    throw new Error('Error');
                }
                return response.json();
            })).then(data => {
                postTitle.textContent = data[0].title;
                postBody.textContent = data[0].body;
                postComments.innerHTML = '';
                Object.values(data[1]).filter(d => d.postId === selectedPostId)
                    .forEach(c => {
                        const li = document.createElement('li');
                        li.innerText = c.text;
                        postComments.appendChild(li);
                    });
            });
        });
}

function handleLoadPostsData(data) {
    Object.values(data).forEach(d => {
        const option = document.createElement('option');
        option.value = d.id;
        option.textContent = d.title;
        posts.appendChild(option);
    });
}

function loadPosts(event) {
    fetch('http://localhost:3030/jsonstore/blog/posts')
        .then(res => res.json())
        .then(handleLoadPostsData);
}

function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', viewPost)
}


attachEvents();