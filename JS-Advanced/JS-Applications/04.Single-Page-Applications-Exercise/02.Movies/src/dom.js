const main = document.querySelector('main');
const userNav = document.getElementById('user');
const guestNav = document.getElementById('guest');
const welcomeMessage = userNav.querySelector('#welcome-message');

export function showSection(section) {
    if (!section) {
        throw new Error('Section is undefined.');
    }
    main.innerHTML = '';
    main.appendChild(section);
}

export function showNavigation() {
    const token = sessionStorage.getItem('accessToken');
    const email = sessionStorage.getItem('email');
    if(token) {
        userNav.style.display = 'flex';
        welcomeMessage.innerHTML = `Welcome, ${email}!`;
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'flex';
    }
}

export function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}