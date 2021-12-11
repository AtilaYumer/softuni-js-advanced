window.addEventListener('load', () => {
    loadCatches();

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const addBtn = document.querySelector('button[class=add]');
    const usernameSpan = document.querySelector('p span');
    const userNav = document.getElementById('user');
    const guestNav = document.getElementById('guest');

    addBtn.addEventListener('click', createCatch);
    document.getElementById('logout').addEventListener('click', logout);
    document.querySelector('button[class=load]').addEventListener('click', loadCatches);
    document.querySelector('#catches').addEventListener('click', editCatches);

    if (userData) {
        addBtn.disabled = false;
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';
        usernameSpan.textContent = userData.username;
    } else {
        addBtn.disabled = true;
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
        usernameSpan.textContent = 'guest';
    }
});

function logout() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        return alert('No logged in user');
    }
    fetch('http://localhost:3030/users/logout', {
        headers: { 'X-Authorization': userData.accessToken }
    }).then(response => {
        if (!response.ok) {
            throw response;
        } else {
            sessionStorage.removeItem('userData');
            window.location.pathname = '/JS-Applications/03.Remote-Data-and-Authentication-Exercise/05.Fisher-Game/';
        }
    }).catch(handleCatch);
}

function loadCatches() {
    const catchesDiv = document.getElementById('catches');
    fetch('http://localhost:3030/data/catches')
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        }).then(catches => {
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const user_id = userData ? userData.user_id : undefined;
            document.querySelectorAll('div[class="catch"]').forEach(d => d.parentNode.removeChild(d));
            catches.forEach(c => {
                const catchDiv = document.createElement('div');
                catchDiv.className = 'catch';
                catchDiv.innerHTML = `<label>Angler</label>
                    <input type="text" class="angler" value="${c.angler}" ${c._ownerId !== user_id ? 'disabled' : ''}>
                    <label>Weight</label>
                    <input type="text" class="weight" value="${c.weight}" ${c._ownerId !== user_id ? 'disabled' : ''}>
                    <label>Species</label>
                    <input type="text" class="species" value="${c.species}" ${c._ownerId !== user_id ? 'disabled' : ''}>
                    <label>Location</label>
                    <input type="text" class="location" value="${c.location}" ${c._ownerId !== user_id ? 'disabled' : ''}>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${c.bait}" ${c._ownerId !== user_id ? 'disabled' : ''}>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${c.captureTime}">
                    <button class="update" data-id="${c._id}" ${c._ownerId !== user_id ? 'disabled' : ''}>Update</button>
                    <button class="delete" data-id="${c._id}" ${c._ownerId !== user_id ? 'disabled' : ''}>Delete</button>`;
                catchesDiv.appendChild(catchDiv);
            });
        }).catch(handleCatch);
}

function editCatches(event) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (event.target.className !== 'update' && event.target.className !== 'delete') {
        return;
    }
    if (!userData) {
        return;
    }
    if (event.target.className === 'delete') {
        deleteCatch(userData, event);
    } else {
        updateCatch(userData, event);
    }
}

function createCatch(event) {
    event.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        return alert('No permissions! Only logged in users can create a new cath!');
    }
    const form = document.getElementById('addForm');
    const formData = new FormData(form);

    const angler = formData.get('angler').toString().trim();
    const weight = formData.get('weight').toString().trim();
    const species = formData.get('species').toString().trim();
    const location = formData.get('location').toString().trim();
    const bait = formData.get('bait').toString().trim();
    const captureTime = formData.get('captureTime').toString().trim();

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        return alert('All fields are required');
    }
    if (isNaN(weight) || Number(weight) < 0) {
        return alert('Weight should be a positive number');
    }
    if (isNaN(captureTime) || !Number.isInteger(Number(captureTime) || Number(captureTime) < 0)) {
        return alert('Capture time should be a positive integer number')
    }

    const payload = JSON.stringify({
        angler: angler,
        weight: Number(weight),
        species: species,
        location: location,
        bait: bait,
        captureTime: Number(captureTime)
    });

    fetch('http://localhost:3030/data/catches', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.accessToken
        },
        body: payload
    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    }).then(() => {
        loadCatches();
    }).catch(handleCatch);
}

function deleteCatch(userData, event) {
    const catchId = event.target.getAttribute('data-id');
    fetch(`http://localhost:3030/data/catches/${catchId}`, {
        method: 'delete',
        headers: { 'X-Authorization': userData.accessToken }
    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        loadCatches();
    }).catch(handleCatch);
}

function updateCatch(userData, event) {
    const catchId = event.target.getAttribute('data-id');
    const catchDiv = event.target.parentNode;
    const angler = catchDiv.querySelector('input[class=angler]').value.trim();
    const weight = catchDiv.querySelector('input[class=weight]').value.trim();
    const species = catchDiv.querySelector('input[class=species]').value.trim();
    const location = catchDiv.querySelector('input[class=location]').value.trim();
    const bait = catchDiv.querySelector('input[class=bait]').value.trim();
    const captureTime = catchDiv.querySelector('input[class=captureTime]').value.trim();

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        return alert('All fields are required');
    }
    if (isNaN(weight) || Number(weight) < 0) {
        return alert('Weight should be a positive number');
    }
    if (isNaN(captureTime) || !Number.isInteger(Number(captureTime) || Number(captureTime) < 0)) {
        return alert('Capture time should be a positive integer number')
    }

    const payload = JSON.stringify({
        angler: angler,
        weight: Number(weight),
        species: species,
        location: location,
        bait: bait,
        captureTime: Number(captureTime)
    });

    fetch(`http://localhost:3030/data/catches/${catchId}`, {
        method: 'put',
        headers: { 'X-Authorization': userData.accessToken },
        body: payload
    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    }).then(() => {
        alert('Update successful.');
        loadCatches();
    }).catch(handleCatch);
}

function handleCatch(error) {
    if (error.message) {
        alert(error.message);
    } else {
        error.text().then(e => alert(JSON.parse(e).message));
    }
}