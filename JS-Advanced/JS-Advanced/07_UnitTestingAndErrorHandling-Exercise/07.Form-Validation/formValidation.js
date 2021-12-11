function validate() {
    const userNamePattern = /^[a-zA-Z0-9]{3,20}$/gm;
    const passwordPattern = /^[\w]{5,15}$/gm;
    const confPasswordPattern = /^[\w]{5,15}$/gm;
    const emailPattern = /.*@.*\..*/gm;

    const form = {
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPass: document.getElementById('confirm-password'),
        companyCheckbox: document.getElementById('company'),
        companyInfo: document.getElementById('companyInfo'),
        companyNumber: document.getElementById('companyNumber'),
        valid: document.getElementById('valid')
    }
    const submitBtn = document.getElementById('submit');
    form.companyCheckbox.addEventListener('change', () => {
        form.companyInfo.style.display = form.companyCheckbox.checked ? 'block' : 'none';
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = true;
        form.valid.style.display = 'none';
        if (userNamePattern.test(form.username.value)) {
            form.username.style.border = 'none';
        } else {
            isValid = false;
            form.username.style.borderColor = 'red';
        }

        const passCheck = passwordPattern.test(form.password.value);
        if (passCheck) {
            form.password.style.border = 'none';
        } else {
            isValid = false;
            form.password.style.borderColor = 'red';
        }

        const confirmPassCheck = confPasswordPattern.test(form.confirmPass.value)
        if (confirmPassCheck) {
            form.confirmPass.style.border = 'none';
        } else {
            isValid = false;
            form.confirmPass.style.borderColor = 'red';
        }

        if (form.confirmPass.value !== form.password.value) {
            isValid = false;
            form.password.style.border = '2px inset';
            form.confirmPass.style.border = '2px inset';
            form.password.style.borderColor = 'red';
            form.confirmPass.style.borderColor = 'red';
        }

        if (emailPattern.test(form.email.value)) {
            form.email.style.border = 'none';
        } else {
            isValid = false;
            form.email.style.borderColor = 'red';
        }

        if (form.companyCheckbox.checked) {
            if (!Number.isInteger(form.companyNumber)
                && Number(form.companyNumber.value) >= 1000
                && Number(form.companyNumber.value <= 9999)) {
                form.companyNumber.style.border = 'none';
            } else {
                isValid = false;
                form.companyNumber.style.borderColor = 'red';
            }
        } else {
            form.companyNumber.style.border = 'none';
        }

        if (isValid) {
            form.valid.style.display = 'block';
        }
    })
}
