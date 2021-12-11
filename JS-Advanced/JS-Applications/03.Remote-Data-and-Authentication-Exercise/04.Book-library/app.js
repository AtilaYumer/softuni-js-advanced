function handleResponse(response) {
    if (!response.ok) {
        response.text().then(errorText => { throw new Error(errorText); });
    } else {
        return response.json();
    }
}

function onUpdate(id, event) {
    updateBook(id, event)
}

function editBook(event) {
    const tr = event.target.parentNode.parentNode;
    const bookId = tr.id;

    const form = document.querySelector('form');
    fetch(`http://localhost:3030/jsonstore/collections/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                response.text().then(errorText => { throw new Error(errorText) });
            } else {
                return response.json();
            }
        }).then(book => {
            form.elements['title'].value = book.title;
            form.elements['author'].value = book.author;
            form.lastElementChild.innerText = 'Save';
            form.removeEventListener('submit', createBook);
            form.addEventListener('submit', updateBook);
        });

        function updateBook(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const title = formData.get('title');
            const author = formData.get('author');
        
            if (!title || title === '' || !author || author == '') {
                return alert('All fields are required');
            }
        
            const data = {
                title: title,
                author: author
            }
        
            fetch(`http://localhost:3030/jsonstore/collections/books/${bookId}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    response.tex().then(errorText => { throw new Error(errorText); })
                } else {
                    event.target.removeEventListener('submit', updateBook);
                    event.target.addEventListener('submit', createBook);
                    event.target.lastElementChild.innerText = 'Submit';
                    event.target.reset();
                    loadBooks();
                }
            }).catch(error => alert(error.message));
        }
}

function deleteBook(event) {
    const tr = event.target.parentNode.parentNode;
    fetch(`http://localhost:3030/jsonstore/collections/books/${tr.id}`, {
        method: 'delete',
    }).then(response => {
        if (!response.ok) {
            response.text().then(errorText => { throw new Error(errorText); });
        }
        tr.remove();
        loadBooks();
    }).catch(error => alert(error.message));
}

function loadBooks() {
    const loadBooks = document.querySelector('table tbody');
    fetch('http://localhost:3030/jsonstore/collections/books')
        .then(handleResponse)
        .then(books => {
            loadBooks.innerHTML = '';
            Object.entries(books).forEach(([id, book]) => {
                const tr = document.createElement('tr');
                tr.id = id;
                tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td><button onclick="editBook(event)">Edit</button><button onclick="deleteBook(event)">Delete</button></td>`;
                loadBooks.appendChild(tr);
            });
        }).catch(error => alert(error.message));
}

function createBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');


    if (!title || title === '' || !author || author == '') {
        return alert('All fields are required');
    }

    const data = {
        title: title,
        author: author
    }

    fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            response.text().then(errorText => { throw new Error(errorText); });
        } else {
            loadBooks();
            event.target.reset();
        }
    })
}

function attachEvents() {
    document.querySelector('form').addEventListener('submit', createBook);
    document.getElementById('loadBooks').addEventListener('click', loadBooks);
}

attachEvents();
loadBooks();