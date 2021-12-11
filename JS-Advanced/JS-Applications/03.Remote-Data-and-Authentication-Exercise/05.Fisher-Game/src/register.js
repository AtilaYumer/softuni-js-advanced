const form = document.querySelector('form[id=register]');
form.addEventListener('submit', registerUser);
const userData = sessionStorage.getItem('userData');
    document.querySelector('p span').textContent = userData ? userData.username : 'guest';

function registerUser(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').toString().trim();
    const password = formData.get('password').toString().trim();
    const rePass = formData.get('rePass').toString().trim();

    if(!email || !password || !rePass) {
        return alert('All field are required!');
    }
    if(password !== rePass) {
        return alert('Password and rePass do not match!');
    }

    const payloadData = {
        email: email,
        password: password
    }

    fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payloadData)
    }).then(response => {
        if(!response.ok) {
            throw response;
        } else {
            return response.json();
        }
    }).then(responseData => {
        const accessToken = responseData.accessToken;
        if(accessToken) {
            const user = JSON.stringify({
                accessToken: accessToken,
                username: responseData.email,
                user_id: responseData._id
            });
            sessionStorage.setItem('userData', user);
            window.location.pathname = '/JS-Applications/03.Remote-Data-and-Authentication-Exercise/05.Fisher-Game/';
        } else {
            throw new Error('No access token provided!');
        }
    }).catch(error => {
        if(error.message) {
            alert(error.message);
        } else {
            error.text().then(e => alert(JSON.parse(e).message));
        }
    });
}