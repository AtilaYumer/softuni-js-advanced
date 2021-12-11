function solve(input) {
    const store = new Map();
    input.forEach(element => {
        let [brand, model, quantity] = element.split(' | ');
        quantity = Number(quantity);

        if(store.has(brand)) {
            let make = store.get(brand);
            if(make.has(model)) {
                make.set(model, make.get(model) + quantity);
            } else {
                make.set(model, quantity);
            }
        } else {
            store.set(brand, new Map().set(model, quantity));
        }
    });
    Array.from(store.entries()).forEach(brand => {
        console.log(brand[0]);
        Array.from(brand[1].entries()).forEach(model => {
            console.log(`###${model[0]} -> ${model[1]}`);
        });
    })
}

solve(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']);