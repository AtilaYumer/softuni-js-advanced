function solve() {
    const rows = Array.from(document.querySelectorAll('tbody tr'));
    const btnCheck = document.querySelectorAll('button')[0];
    const btnClear = document.querySelectorAll('button')[1];

    const border = document.querySelector('table');
    const check = document.querySelector('#check p');

    btnCheck.addEventListener('click', onCheckClick);
    btnClear.addEventListener('click', clear);

    function onCheckClick() {
        let matrix = [];
        let isSolved = true;
        rows.forEach(row => {
            matrix.push(Array.from(row.children).map(e => e.firstElementChild.value));
        });
        for (let i = 0; i < matrix.length; i++) {
            const set = new Set(matrix[i]);
            if (set.size !== matrix[i].length) {
                isSolved = false;
                break;
            }
            let columnSet = new Set();
            for (let j = 0; j < matrix.length; j++) {
                columnSet.add(matrix[j][i]);
            }
            if (columnSet.size !== matrix.length) {
                isSolved = false;
                break;
            }
        }

        if (isSolved) {
            border.style.border = '2px solid green';
            check.textContent = 'You solve it! Congratulations!'
            check.style.color = 'green';
        } else {
            border.style.border = '2px solid red';
            check.textContent = 'NOP! You are not done yet...'
            check.style.color = 'red';
        }
    }

    function clear() {
        border.style.border = 'none';
        check.textContent = ''
        rows.forEach(row => {
            Array.from(row.children).forEach(e => e.firstElementChild.value = '');
        });
    }
}