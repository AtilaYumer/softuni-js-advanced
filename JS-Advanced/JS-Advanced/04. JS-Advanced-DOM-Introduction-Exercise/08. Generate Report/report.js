function generateReport() {
    const theader = Array.from(document.querySelectorAll('table thead tr th'));
    const tbody = Array.from(document.querySelectorAll('table tbody tr'));
    let headers = [];
    theader.forEach(header => {
        const checkbox = header.firstElementChild;
        if (checkbox.checked) {
            headers[header.textContent.trim().toLocaleLowerCase()] = theader.indexOf(header);
        }
    });

    let result = [];
    for (const row of tbody) {
        const employee = {};
        for (const header in headers) {
            const index = headers[header];
            employee[header] = row.children[index].textContent;
        }
        result.push(employee);
    }

    document.querySelector('#output').value = JSON.stringify(result, null, 2);
}