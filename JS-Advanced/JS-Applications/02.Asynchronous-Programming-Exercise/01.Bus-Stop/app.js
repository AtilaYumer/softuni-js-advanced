function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    stopName.textContent = 'Loading...';
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
                throw new Error('Error');
            }
            return response.json()
        })
        .then(data => {
            stopName.textContent = data.name;
            buses.innerHTML = '';
            for (const [busId, time] of Object.entries(data.buses)) {
                const li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time} minutes`;
                buses.appendChild(li);
            }
        })
        .catch(error => {
            stopName.textContent = error.message;
            buses.innerHTML = '';
        });
}