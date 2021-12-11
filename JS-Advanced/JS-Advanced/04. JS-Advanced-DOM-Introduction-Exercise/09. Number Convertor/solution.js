function solve() {
    appendOptions(document.getElementById('selectMenuTo'));
    document.querySelector('button').addEventListener('click', convert);

    function appendOptions(select) {
        select.firstElementChild.value = 'binary';
        select.firstElementChild.textContent = 'Binary';
        select.appendChild(document.createElement('option'));
        select.lastElementChild.value = 'hexadecimal';
        select.lastElementChild.textContent = 'Hexadecimal';
    }

    function convert() {
        let value = Number(document.getElementById('input').value);
        let convertTo = document.getElementById('selectMenuTo').value;
        const result = document.getElementById('result');
        console.log(convertTo)
        if (!value) {
            return;
        }
        if (convertTo === 'binary') {
            result.value = (value >>> 0).toString(2);
        } else if (convertTo === 'hexadecimal') {
            result.value = (value >>> 0).toString(16).toUpperCase();
        }
    }
}