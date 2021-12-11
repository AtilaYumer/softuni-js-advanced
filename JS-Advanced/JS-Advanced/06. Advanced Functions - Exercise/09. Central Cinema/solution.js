function solve() {
    const addNew = document.getElementById('add-new');
    addNew.addEventListener('click', addMovie);
    const form = {
        name: addNew.querySelector('input[placeholder="Name"]'),
        hall: addNew.querySelector('input[placeholder="Hall"]'),
        price: addNew.querySelector('input[placeholder="Ticket Price"]'),
        button: addNew.querySelector('button')
    }
    const movies = document.getElementById('movies');
    movies.lastElementChild.addEventListener('click', archiveMovie);
    const archive = document.getElementById('archive');
    archive.lastElementChild.addEventListener('click', (e) => {
        archive.querySelector('ul').innerHTML = '';
    })

    function addMovie(event) {
        event.preventDefault();
        if (event.target.tagName === 'BUTTON') {
            let name = form.name.value;
            let hall = form.hall.value;
            let price = Number(form.price.value);
            if (name !== '' && hall !== '' && form.price.value !== '' && !isNaN(price)) {
                const span = createElement('span', name);
                const hallStrong = createElement('strong', `Hall: ${hall}`);
                const priceStrong = createElement('strong', price.toFixed(2));
                const input = createElement('input');
                input.setAttribute('placeHolder', 'Tickets sold');
                const button = createElement('button');
                button.innerText = 'Archive';
                const div = createElement('div', priceStrong, input, button);
                const li = createElement('li', span, hallStrong, div);
                movies.lastElementChild.appendChild(li);

                Object.values(form).forEach(v => v.value = '');
            }
        }
    }

    function archiveMovie(event) {
        if (event.target.tagName === 'BUTTON') {
            const target = event.target.parentNode.parentNode;
            const div = target.querySelector('div');
            if (div.querySelector('input').value !== '' && !isNaN(Number(div.querySelector('input').value))) {
                const button = createElement('button');
                button.innerText = 'Delete';
                button.addEventListener('click', (e) => {
                    e.target.parentNode.remove();
                })
                let totalPrice = Number(target.querySelector('div').firstElementChild.textContent) * Number(target.querySelector('div input').value);
                const arch = createElement('li', target.firstElementChild,
                    createElement('strong', `Total amount: ${totalPrice.toFixed(2)}`), button);
                target.remove();
                archive.querySelector('ul').appendChild(arch);
            }
        }
    }

    function createElement(type, ...arguments) {
        const el = document.createElement(type);
        arguments.forEach(argument => {
            if (typeof (argument) === 'object') {
                el.appendChild(argument);
            } else {
                el.textContent = argument;
            }
        });
        return el;
    }
}