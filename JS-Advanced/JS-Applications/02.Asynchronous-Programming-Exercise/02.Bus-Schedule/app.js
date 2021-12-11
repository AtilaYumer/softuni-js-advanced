function solve() {
    const info = document.getElementById('info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let currentStop = {
        name: '',
        next: 'depot'
    }

    function depart() {
        departBtn.disabled = true;
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStop.next}`)
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
                    throw new Error('Error');
                }
                return response.json();
            }).then(data => {
            currentStop = data;
            info.firstElementChild.textContent = `Next stop ${currentStop.name}`;
            arriveBtn.disabled = false;
        }).catch(error => {
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            info.firstElementChild.textContent = error.message;
        })
    }

    function arrive() {
        arriveBtn.disabled = true;
        info.firstElementChild.textContent = `Arriving at ${currentStop.name}`
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();