function focused() {
    const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
    inputs.forEach(input => {
        input.addEventListener('focus', (event) => {event.target.parentNode.classList.add('focused')});
        input.addEventListener('blur', (event) => {event.target.parentNode.classList.remove('focused')});
    })
}