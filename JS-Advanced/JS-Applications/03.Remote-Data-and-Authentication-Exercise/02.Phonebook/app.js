function deleteLi(id, event) {
    fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'delete'
    })
        .then(response => {
            if (!response.ok) {
                response.text()
                    .then(text => {
                        throw new Error(text);
                    });
            }
            event.target.parentNode.remove();
        }).catch(error => alert(error.message));
}

function create() {
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    if (!personInput.value || !phoneInput.value) {
        return alert('All fields are required');
    }

    fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ person: personInput.value, phone: phoneInput.value })
    }).then(response => {
        if (!response.ok) {
            response.text()
                .then(text => {
                    throw new Error(text);
                });
        }
    }).then(() => {
        personInput.value = '';
        phoneInput.value = '';
        loadPhonebook();
    }).catch(error => alert(error.message));
}

function loadPhonebook() {
    const phonebook = document.getElementById('phonebook');

    fetch('http://localhost:3030/jsonstore/phonebook')
        .then(response => {
            if (!response.ok) {
                response.text()
                    .then(text => {
                        throw new Error(text);
                    });
            }
            return response.json();
        }).then(data => {
            phonebook.innerHTML = '';
            Object.values(data).forEach(contact => {
                const li = document.createElement('li');
                li.textContent = `${contact.person}:${contact.phone}`

                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.addEventListener('click', deleteLi.bind(this, contact._id));
                li.appendChild(deleteBtn);
                phonebook.appendChild(li);
            });
        }).catch(error => alert(error.message))
}

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadPhonebook);
    document.getElementById('btnCreate').addEventListener('click', create);
}

attachEvents();