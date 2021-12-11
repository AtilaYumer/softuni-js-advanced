function validate() {
    const email = document.getElementById('email');
    email.addEventListener('change', validate);

    function validate() {
        const pattern = /[a-z]+@[a-z]+.[a-z]+$/
        if (this.value.match(pattern)) {
            this.classList.remove('error');
        } else {
            this.classList.add('error');
        }
    }
}