function addItem() {
    const newItemText = document.getElementById('newItemText');
    const newEl = document.createElement('li');
    newEl.textContent = newItemText.value;
    document.getElementById('items').appendChild(newEl);
    newItemText.value = '';
}