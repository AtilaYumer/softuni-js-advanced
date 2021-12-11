const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const userData = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userData)
    }).then(response => {
        if (!response.ok) {
            throw response;
        } else {
            return response.json();
        }
    }).then(data => {
        if(data.accessToken) {
            sessionStorage.setItem('accessToken', data.accessToken);
        }
        window.location.pathname = '/JS-Applications/03.Remote-Data-And-Authentication-Lab/Cookbook-Part-2/';
    }).catch(error => {
        error.text().then(text => alert(JSON.parse(text).message));
    });
});