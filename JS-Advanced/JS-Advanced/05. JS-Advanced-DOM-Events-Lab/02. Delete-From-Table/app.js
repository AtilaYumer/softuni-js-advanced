function deleteByEmail() {
    const email = document.querySelector('input[name="email"]');
    const tbody = Array.from(document.querySelectorAll('tbody tr'));
    const result = document.getElementById('result');
    let rowsSize = 0;
    for (const row of tbody) {
        if (row.textContent.includes(email.value)) {
            row.remove();
            rowsSize++;
        }
    }
    result.textContent = rowsSize === 0 ? 'Not found.' : 'Deleted';
}