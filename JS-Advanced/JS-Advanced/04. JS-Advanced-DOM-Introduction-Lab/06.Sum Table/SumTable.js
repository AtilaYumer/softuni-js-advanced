function sumTable() {
    const rows = document.querySelectorAll('table tr');
    let sum = 0;

    for(let i = 1; i < rows.length - 1; i++) {
        const cellValue = Number(rows[i].lastElementChild.textContent);
        sum += cellValue;
    }
    document.querySelector('#sum').textContent = sum;
}