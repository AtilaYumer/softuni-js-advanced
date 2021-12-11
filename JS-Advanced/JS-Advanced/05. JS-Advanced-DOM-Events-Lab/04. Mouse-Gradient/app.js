function attachGradientEvents() {
    document.getElementById('gradient').addEventListener('mousemove', displayGradient);

    function displayGradient(event) {
        let gradient = Math.floor(event.offsetX / event.target.clientWidth * 100);
        document.getElementById('result').textContent = `${gradient}\%`;
    }
}