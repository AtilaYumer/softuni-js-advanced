function sendMessage() {
    const name = document.querySelector('input[name="author"]');
    const content = document.querySelector('input[name="content"]');

    if (name.value.trim() === '' || content.value.trim() === '') {
        alert('Name and Message fields are requiered.');
    }

    const data = {
        author: name.value,
        content: content.value,
    }

    fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => {
        response.json();
    }).then(() => {
        name.value = '';
        content.value = '';
        refreshMessages();
    }).catch(error => {
        alert(error.message);
    });
}

function refreshMessages() {
    const messagesTextArea = document.getElementById('messages');
    fetch('http://localhost:3030/jsonstore/messenger')
        .then(response => {
            return response.json()
        })
        .then(data => {
            let messages = '';
            Object.values(data).forEach(d => {
                messages += `${d.author}: ${d.content}\n`
            });
            messagesTextArea.textContent = messages.substring(0, messages.length - 1);

        }).catch(error => {
            alert(error.message);
        })
}

function attachEvents() {
    document.getElementById('submit').addEventListener('click', sendMessage);
    document.getElementById('refresh').addEventListener('click', refreshMessages);
}

attachEvents();