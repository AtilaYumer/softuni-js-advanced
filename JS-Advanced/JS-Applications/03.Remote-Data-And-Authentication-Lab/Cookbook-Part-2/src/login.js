const form = document.querySelector('form');
form.addEventListener('submit', submit);

function submit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    }).then(data => {
        if (data.accessToken) {
            sessionStorage.setItem('accessToken', data.accessToken);
            window.location.pathname = '/JS-Applications/03.Remote-Data-And-Authentication-Lab/Cookbook-Part-2/';
        } else {
            throw new Error('No access token provided by server');
        }
    }).catch(error => {
        if(error.message) {
            alert(error.message);
        } else {
            error.text().then(text => alert(JSON.parse(text).message));
        }
    });
}