function lockedProfile() {
    const main = document.getElementById('main');
    main.addEventListener('click', toggleInfo);

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(handleResponse)
        .then(handleData)
        .catch(error => console.log(error));

    function handleResponse(response) {
        const contentType = response.headers.get("content-type");
        if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
            throw new Error('Error');
        }
        return response.json();
    }

    function toggleInfo(e) {
        const target = e.target;
        if (target.tagName !== 'BUTTON') {
            return;
        }
        const unlocked = target.parentNode.querySelector('[type=radio][value=unlock]');
        if (unlocked.checked) {
            const hidden = target.parentNode.querySelector('[id$=HiddenFields]');
            hidden.style.display = hidden.style.display === '' || hidden.style.display === 'none' ? 'block' : 'none';
        }
    }

    function handleData(data) {
        data = Object.values(data);
        const profilesDivs = [];
        for (const d in data) {
            const profileDiv = document.createElement('div');
            profileDiv.classList.add('profile');
            profileDiv.innerHTML = addInnerHtml(d + 1, data[d]);
            profilesDivs.push(profileDiv);
        }
        main.innerHTML = '';
        profilesDivs.forEach(pd => main.appendChild(pd));
    }

    function addInnerHtml(index, data) {
        return `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${index}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${index}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${index}Username" value=${data.username} disabled readonly />
            <div id="user${index}HiddenFields" style="display: none">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${index}Email" value=${data.email} disabled readonly />
                <label>Age:</label>
                <input type="email" name="user${index}Age" value=${data.age} disabled readonly />
            </div>
            <button>Show more</button>`;
    }
}