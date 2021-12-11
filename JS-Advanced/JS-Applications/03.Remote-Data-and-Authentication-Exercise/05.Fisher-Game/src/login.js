const form = document.querySelector('form[id=login]');
form.addEventListener('submit', submit);
const userData = sessionStorage.getItem('userData');
document.querySelector('p span').textContent = userData ? userData.username : 'guest';

function submit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return alert('All fields are required');
    }
    const requestData = {
        email: email,
        password: password
    }

    fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    }).then(response => {
        if (!response.ok) {
            throw response;
        } else {
            return response.json();
        }
    }).then(responseData => {
        const accessToken = responseData.accessToken;
        if (accessToken) {
            const user = JSON.stringify({
                accessToken: accessToken,
                username: responseData.email,
                user_id: responseData._id
            });
            sessionStorage.setItem('userData', user);
            window.location.pathname = '/JS-Applications/03.Remote-Data-and-Authentication-Exercise/05.Fisher-Game/';
        } else {
            throw new Error('No access token provided by server');
        }
    }).catch(error => {
        if (error.message) {
            alert(error.message)
        } else {
            error.text().then(e => alert(JSON.parse(e).message));
        }
    });
}

//{email: "atila@mail.bg", password: "123", _createdOn: 1636887292933, _id: "a1e6879a-8144-444e-845b-409ebaebcd65", accessToken: "8e9923db3e904def497ec91e6ab2bb6711d1f3fb150596906616ff38ff3fe491"}