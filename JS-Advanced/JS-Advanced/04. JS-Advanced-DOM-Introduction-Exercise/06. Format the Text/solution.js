function solve() {
    let input = document.getElementById('input').value;
    let sentences = input.split('.').filter(el => el.length > 0);

    let output = '';
    for (let i = 0; i < sentences.length; i += 3) {
        let chunk = sentences.slice(i, i + 3);
        let paragraph = chunk.join('. ') + '.'
        output += `<p>${paragraph}</p>`
    }
    document.getElementById('output').innerHTML = output;
}