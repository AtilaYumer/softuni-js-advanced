function addItem() {
    const items = document.getElementById('items');
    const newItemText = document.getElementById('newItemText');

    let newElement = document.createElement('li');
    newElement.textContent = newItemText.value;

    const deleteBtn = document.createElement('a');
    deleteBtn.addEventListener('click', (event) => {
        event.target.parentNode.remove();
        console.log(event);
    });
    deleteBtn.href = '#';
    deleteBtn.textContent = '[Delete]'
    newElement.appendChild(deleteBtn);
    items.appendChild(newElement);
}