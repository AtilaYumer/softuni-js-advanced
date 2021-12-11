function load() {
    if (document.readyState !== 'complete') {
        return;
    }
    let contacts = [
        new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
        new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
        new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
    ];
    contacts.forEach(c => c.render('main'));

    // After 1 second, change the online status to true
    setTimeout(() => contacts[1].online = true, 2000);
}

document.addEventListener('readystatechange', load);

class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._online = false;
    }

    set online(status) {
        this._online = status;
        if (this.userInfo) {
            const header = this.userInfo.querySelector('.title');
            if (this._online === true) {
                header.classList.add('online');
            } else {
                header.classList.remove('online');
            }
        }
    }

    get online() {
        return this._online;
    }

    render(id) {
        const mainEl = document.getElementById(id);
        this.userInfo = document.createElement('article');

        const header = document.createElement('div')
        header.classList.add('title');
        header.textContent = `${this.firstName} ${this.lastName}`;
        if (this._online) {
            header.classList.add('online');
        }


        const infoBtn = document.createElement('button');
        infoBtn.innerText = '\u2139';
        header.appendChild(infoBtn);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        infoDiv.style.display = 'none';

        const phoneSpan = document.createElement('span');
        phoneSpan.textContent = `\u260E ${this.phone}`;

        const emailSpan = document.createElement('span');
        emailSpan.textContent = `\u2709 ${this.email}`;

        infoDiv.appendChild(phoneSpan);
        infoDiv.appendChild(emailSpan);
        this.userInfo.appendChild(header);
        this.userInfo.appendChild(infoDiv);

        mainEl.appendChild(this.userInfo);
        mainEl.addEventListener('click', (e) => {
            const eventTarget = e.target;
            if (eventTarget.tagName === 'BUTTON') {
                eventTarget.parentNode.nextSibling.style.display = eventTarget.parentNode.nextSibling.style.display === 'none' ?
                    'block' : 'none';
            }
        })
    }
}