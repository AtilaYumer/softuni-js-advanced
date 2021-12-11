const form = document.querySelector('form');
form.addEventListener('submit', submit);

function submit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n').map(i => i.trim()).filter(i => i !== ''),
        steps: formData.get('steps').split('\n').map(s => s.trim()).filter(s => s !== '')
    }
    const token = sessionStorage.getItem('accessToken');
    if(!token) {
        console.log('no token');
    }
    fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status === 200) {
            window.location.pathname = '/JS-Applications/03.Remote-Data-And-Authentication-Lab/Cookbook-Part-2/';
        } else {
            throw new Error(response);
        }
    }).catch(error => {
        error.json().then(json => alert(json.message));
    });
}