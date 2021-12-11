solution = () => {
    const stock = {
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
        protein: 0
    };
    const recipes = {
        apple: { carbohydrate: 1, flavour: 2 },
        lemonade: { carbohydrate: 10, flavour: 20 },
        burger: { carbohydrate: 5, fat: 7, flavour: 3 },
        eggs: { protein: 5, fat: 1, flavour: 1 },
        turkey: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 }
    }
    return execute;

    function execute(input) {
        if (input === 'report') {
            return report();
        } else if (input.includes('restock')) {
            let [, microelement, quantity] = input.split(' ');
            quantity = Number(quantity);
            stock[microelement] += quantity;
            return 'Success';
        } else if (input.includes('prepare')) {
            let [, order, quantity] = input.split(' ');
            quantity = Number(quantity);
            return prepare(order, quantity);
        }
    }

    function report() {
        const proteingQty = stock.protein ? stock.protein : 0;
        const carbohydrateQty = stock.carbohydrate ? stock.carbohydrate : 0;
        const flavourQty = stock.flavour ? stock.flavour : 0;
        const fatQty = stock.fat ? stock.fat : 0;
        return `protein=${proteingQty} carbohydrate=${carbohydrateQty} fat=${fatQty} flavour=${flavourQty}`;
    }

    function prepare(order, quantity) {
        let recipe = recipes[order];
        for (let microelement in recipe) {
            if (stock[microelement] === undefined ||
                stock[microelement] < recipe[microelement] * quantity) {
                return `Error: not enough ${microelement} in stock`;
            }
        }
        for (let microelement in recipe) {
            stock[microelement] -= recipe[microelement] * quantity;
        }
        return 'Success';
    }
}

let manager = solution();
console.log(manager("restock protein 10")); // Success 
console.log(manager("restock carbohydrate 10")); // Success 
console.log(manager("restock fat 9")); // Success 
console.log(manager("restock flavour 9")); // Success
console.log(manager('prepare turkey 1'));
console.log(manager('report'));