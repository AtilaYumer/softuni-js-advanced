function solution() {
    const main = document.getElementById('main');
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                const accordion = createElement('div', { className: 'accordion' },
                    createElement('div', { className: 'head' },
                        createElement('span', {}, element.title),
                        createElement('button', { className: 'button', id: element._id, innerText: 'More', onclick: toggleExtraInfo })),
                    createElement('div', { className: 'extra', style: 'display: none' }));
                main.appendChild(accordion);
            });
        })
        .catch(error => console.log(error.message));

    function toggleExtraInfo(e) {
        const target = e.target;
        const extraInfoDiv = target.parentNode.parentNode.querySelector('div.extra');
        if (extraInfoDiv.style.display === 'none') {
            fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${target.id}`)
                .then(response => {
                    const contentType = response.headers.get("content-type");
                    if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
                        throw new Error('Error');
                    }
                    return response.json();
                }).then(data => {
                    extraInfoDiv.innerHTML = '';
                    extraInfoDiv.appendChild(createElement('p', {}, data.content));
                    extraInfoDiv.style.display = 'inline-block';
                    target.innerText = 'Less';
                }).catch(error => {
                    console.log(error.message);
                });
        } else {
            extraInfoDiv.innerHtml = '';
            extraInfoDiv.style.display = 'none';
            target.innerText = 'More';
        }
    }

    function createElement(type, attributes, ...content) {
        const el = document.createElement(type);
        for (const [attr, value] of Object.entries(attributes)) {
            if (attr.startsWith('on')) {
                el.addEventListener(attr.substring(2), value);
            } else {
                el[attr] = value;
            }
        }
        content.forEach(c => {
            if (typeof (c) === 'string' || typeof (c) === 'number') {
                el.textContent = c;
            } else {
                el.appendChild(c);
            }
        });
        return el;
    }
}

window.onload = solution();