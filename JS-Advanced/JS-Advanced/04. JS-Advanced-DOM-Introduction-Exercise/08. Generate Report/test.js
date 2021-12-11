function test() {
    document.body.innerHTML = `
<table>
    <thead>
        <tr>
            <th>First <input type="checkbox" name="first"></th>
            <th>Second <input type="checkbox" name="second"></th>
            <th>Third <input type="checkbox" name="third"></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Word1</td>
            <td>Word2</td>
            <td>Word3</td>
        </tr>
        <tr>
            <td>Word4</td>
            <td>Word5</td>
            <td>Word6</td>
        </tr>
        <tr>
            <td>Word7</td>
            <td>Word8</td>
            <td>Word9</td>
        </tr>
    </tbody>
</table>
<textarea id="output"></textarea>
`;

    const boxes = [document.querySelector('input[name="second"]')];
    boxes.forEach(b => {
        b.setAttribute('checked', 'true');
        b.checked = true;
    });

    // result();
    //
    // let data;
    // try {
    //     data = JSON.parse(document.getElementById('output').value);
    // } catch (err) {
    //     throw new Error('Error parsing output - you must provide valid JSON');
    // }
    //
    // expect(data.length).to.equal(3, 'Number of parsed objects doesn\'t match number of table rows');
    //
    // expect(data[0].second).to.equal('Word2', 'Missing expected property on parsed object');
    // expect(Object.keys(data[0]).length).to.equal(1, 'Too many properties on parsed object');


}