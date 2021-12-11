function solve() {
    const exercise = document.getElementById('exercise');
    exercise.addEventListener('click', onClick);
    const tbody = document.querySelector('tbody');
    tbody.firstElementChild.lastElementChild.firstElementChild.disabled = false;

    function onClick(event) {
        if (event.target.tagName === 'BUTTON') {
            if (event.target.textContent === 'Generate') {
                generateFurniture(event);
            } else {
                buyFurniture(event);
            }
        }
    }

    function generateFurniture(event) {
        let furniture = JSON.parse(event.target.previousElementSibling.value);
        furniture.forEach(f => {
            const obj = {
                image: generateElement('img', f.img),
                name: generateElement('p', f.name),
                price: generateElement('p', f.price),
                decFactor: generateElement('p', f.decFactor),
                mark: generateElement('checkbox')
            }
            const tr = document.createElement('tr');
            tr.appendChild(obj.image);
            tr.appendChild(obj.name);
            tr.appendChild(obj.price);
            tr.appendChild(obj.decFactor);
            tr.appendChild(obj.mark);
            tbody.appendChild(tr);
        });
    }

    function generateElement(type, content) {
        const td = document.createElement('td');
        let el;
        if (type === 'p') {
            el = document.createElement('p');
            el.textContent = content;
        } else if (type === 'img') {
            el = document.createElement('img');
            el.onerror = () => el.src = '';
            el.src = content;
        } else {
            el = document.createElement('input');
            el.type = 'checkbox';
            el.checked = false;
        }
        td.appendChild(el)
        return td;
    }

    function buyFurniture(event) {
        const cart = {};
        let decFactorSum = 0;
        let furnitureCounter = 0;
        Array.from(tbody.children).forEach(child => {
            let mark = child.querySelector('input[type="checkbox"]');
            if (mark.checked) {
                const name = child.children[1].textContent.trim();
                furnitureCounter++;
                decFactorSum += Number(child.children[3].textContent);
                if (cart[name]) {
                    cart[name] += Number(child.children[2].textContent);
                } else {
                    cart[name] = Number(child.children[2].textContent);
                }
            }
        });
        let totalPrice = Object.values(cart).reduce((sum, value) => sum + value, 0);
        const textArea = event.target.previousElementSibling;
        textArea.textContent += `Bought furniture: ${Object.keys(cart).join(', ')}\n`;
        textArea.textContent += `Total price: ${totalPrice.toFixed(2)}\n`
        textArea.textContent += `Average decoration factor: ${(decFactorSum / furnitureCounter)}`
    }
}