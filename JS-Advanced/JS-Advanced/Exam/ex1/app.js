window.addEventListener('load', solve);

function solve() {
    const allHitsContainer = document.querySelector('.all-hits-container');
    const savedHits = document.querySelector('.saved-container');
    const likes = document.querySelector('.likes').firstElementChild;
    const form = {
        genre: document.getElementById('genre'),
        name: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date'),
        addBtn: document.getElementById('add-btn')
    }
    form.addBtn.addEventListener('click', addSong);
    savedHits.addEventListener('click', handleSong)

    function addSong(e) {
        e.preventDefault();
        const genre = form.genre.value;
        const name = form.name.value;
        const author = form.author.value;
        const date = form.date.value;

        if(!genre || !name || !author || !date) {
            return;
        }

        const mainDiv = document.createElement('div');
        mainDiv.classList.add('hits-info');
        mainDiv.innerHTML = `<img src="./static/img/img.png">` +
        `<h2>Genre: ${genre}</h2>` +
        `<h2>Name: ${name}</h2>` +
        `<h2>Author: ${author}</h2>` +
        `<h3>Date: ${date}</h3>` +
        `<button class="save-btn">Save song</button>` +
        `<button class="like-btn">Like song</button>` +
        `<button class="delete-btn">Delete</button>`;

        allHitsContainer.addEventListener('click', handleSong)

        allHitsContainer.appendChild(mainDiv);
        Object.values(form).forEach(v => v.value = '');
    }

    function handleSong(e) {
        if(e.target.className === 'save-btn') {
            savedHits.appendChild(e.target.parentNode);
            e.target.parentNode.querySelector('.like-btn').remove();
            e.target.parentNode.querySelector('.save-btn').remove();
        } else if (e.target.className === 'like-btn') {
            e.target.disabled = true;
            let [text, totalLikes] = likes.textContent.split(': ')
            likes.textContent = `${text}: ${++totalLikes}`;
        } else if (e.target.className === 'delete-btn') {
            e.target.parentNode.remove();
        }
    }

}