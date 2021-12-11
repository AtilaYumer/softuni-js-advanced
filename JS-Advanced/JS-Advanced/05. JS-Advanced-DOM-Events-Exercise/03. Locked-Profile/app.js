function lockedProfile() {
    document.getElementById('main').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.parentNode.children[4].checked) {
            const display = event.target.previousElementSibling.style.display;
            event.target.previousElementSibling.style.display = display === 'none' || display === '' ? 'inline-block' : 'none';
            event.target.textContent = event.target.textContent === 'Show more' ? 'Hide it' : 'Show more';
        }
    });
}