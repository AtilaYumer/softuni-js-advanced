function fromJSONToHTMLTable(input) {
    let array = JSON.parse(input);
    let table = ["<table>"];
    table.push(makeKeyRow(array));
    array.forEach(obj => table.push(makeValueRow(obj)));
    table.push('</table>');

    function makeKeyRow(array) {
        let header = '<tr>';
        let keys = Object.keys(array[0]);
        for (let key of keys) {
            header += `<th>${escapeHtml(key)}</th>`;
        }
        header += '</tr>';
        return header;
    }

    function makeValueRow(object) {
        let row = '<tr>';
        let values = Object.values(object);
        for (let value of values) {
            row += `<td>${escapeHtml(value)}</td>`;
        }
        row += '</tr>';
        return row;
    }

    function escapeHtml(value) {
        if (value instanceof Number) {
            return value;
        }
        return value
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    console.log(table.join('\n'));
}

fromJSONToHTMLTable(`[{"Name":"Stamat",
"Score":5.5},
{"Name":"Rumen",
"Score":6}]`);