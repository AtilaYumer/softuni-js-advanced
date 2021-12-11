function loadRepos() {
	const username = document.getElementById('username').value;

	function handleResponse(response) {
		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error(`${response.status}, ${response.error()}`)
		}
	}

	function handleData(data) {
		const list = document.getElementById('repos').firstElementChild;
		list.innerHTML = '';
		for (const current in data) {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.textContent = data[current].full_name;
			a.href = data[current].url;
			li.appendChild(a);
			list.appendChild(li);
		}
	}

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(handleResponse)
		.then(handleData);
}