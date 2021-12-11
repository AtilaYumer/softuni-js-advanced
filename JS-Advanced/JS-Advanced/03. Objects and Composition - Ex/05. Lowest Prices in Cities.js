function solve(input) {
    let result = [];
    for (let iterator of input) {
        let [town, model, price] = iterator.split(' | ');
        price = Number(price);
        if (result[model]) {
            let car = result[model];
            car[town] = price;
        } else {
            result[model] = {};
            result[model][town] = price;
        }
    }
    for (let iterator in result) {
        let currentElement = result[iterator];
        let lowest = Number.MAX_SAFE_INTEGER;
        let towName = '';
        for(let town in currentElement) {
            if(currentElement[town] < lowest) {
                lowest = currentElement[town];
                towName = town;
            }
        }
        console.log(`${iterator} -> ${lowest} (${towName})`);
    }
}

solve(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000']);

    // Audi -> 100000 (Sofia City)
    // BMW -> 99999 (Mexico City)
    // Mitsubishi -> 1000 (New York City)
    // Mercedes -> 1000 (Washington City)
    // NoOffenseToCarLovers -> 0 (Sofia City)