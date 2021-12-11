function solve(input) {
    let result = {};
    for (const iterator of input) {
        let [product, price] = iterator.split(' : ');
        price = Number(price);
        let firstLetter = product.charAt(0);
        if (!result[firstLetter]) {
            result[firstLetter] = {};
        }
        result[firstLetter][product] = price;
    }
    let orderedKeys = Object.keys(result).sort((a, b) => a.localeCompare(b));
    for (const key of orderedKeys) {
        console.log(key);
        let values = Object.entries(result[key]).sort((a, b) => a[0].localeCompare(b[0]));
        values.forEach(el => {
            console.log(`  ${el[0]}: ${el[1]}`);
        })
    }
}

solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']);