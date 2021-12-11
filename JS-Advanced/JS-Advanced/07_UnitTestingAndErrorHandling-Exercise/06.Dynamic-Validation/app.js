function validate() {
    const pattern = /[a-z]+@[a-z]+\.[a-z]+/;
    document.getElementById('email').addEventListener('change', (e) => {
        const input = e.target;
        if(pattern.test(input.value)) {
            input.classList.remove('error');
        } else {
            input.classList.add('error');
        }
    });
}