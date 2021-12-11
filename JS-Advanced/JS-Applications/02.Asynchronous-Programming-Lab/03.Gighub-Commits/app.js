function loadCommits() {
    // Try it with Fetch API
    const commits = document.getElementById('commits');
    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;

    function handleData(data) {
        commits.textContent = '';
        for (const currentData of data) {
            const commit = currentData.commit;
            const li = document.createElement('li');
            li.textContent = `${commit.author.name}: ${commit.message}`;
            commits.appendChild(li);
        }
    }

    function handleResponse(response) {
        if (response.status !== 200) {
            throw new Error(`Error: ${response.status} (Not Found)`)
        }
        return response.json();
    }

    function handleError(error) {
        const errorLi = document.createElement('li');
        errorLi.textContent = error.message;
        commits.appendChild(errorLi);
    }

    fetch(`https://api.github.com/repos/${username}/${repository}/commits`)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);
}