function solve() {
    let input = document.getElementById('text').value;
    let namingConvention = document.getElementById('naming-convention').value;

    document.getElementById('result').textContent = convertToCase(input, namingConvention);

    function convertToCase(input, namingConvention) {
        let words = input.toLowerCase().split(' ');
        let result = '';
        if (namingConvention === 'Pascal Case') {
            words.forEach(word => {
                result += word[0].toUpperCase() + word.substring(1);
            });
        } else if (namingConvention === 'Camel Case') {
            result += words[0];
            for (let i = 1; i < words.length; i++) {
                result += words[i][0].toUpperCase() + words[i].substring(1);
            }
        } else {
            result = 'Error!'
        }
        return result;
    }
}