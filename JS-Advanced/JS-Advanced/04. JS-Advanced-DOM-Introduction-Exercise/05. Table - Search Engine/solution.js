function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        const searchText = document.querySelector('#searchField').value;
        const tableRows = Array.from(document.querySelector('tbody').children);

        for(const row of tableRows) {
            row.classList.remove('select');
        }

        for (const row of tableRows) {
            const cells = Array.from(row.children);
            for (const cell of cells) {
                if (cell.textContent.includes(searchText)) {
                    row.classList.add('select');
                    break;
                }
            }
        }
    }
}