function solve(input) {
    const bottlesMap = new Map();
    const juiceMap = new Map();
    input.forEach(e => {
        let [juice, quantity] = e.split(' => ');
        quantity = Number(quantity);
        if (juiceMap.has(juice)) {
            juiceMap.set(juice, juiceMap.get(juice) + quantity);
        } else {
            juiceMap.set(juice, quantity);
        }
        if (juiceMap.get(juice) >= 1000) {
            const bottles = Math.floor(juiceMap.get(juice) / 1000);
            const left = juiceMap.get(juice) % 1000;
            if (bottlesMap.has(juice)) {
                bottlesMap.set(juice, bottlesMap.get(juice) + bottles);
            } else {
                bottlesMap.set(juice, bottles);
            }
            juiceMap.set(juice, left);
        }
    });
    Array.from(bottlesMap.entries()).forEach(e => {
        console.log(`${e[0]} => ${e[1]}`);
    })
}

solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789'])