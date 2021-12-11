function solve(...params) {
    let types = {};

    params.forEach(param => {
        let type = typeof(param);
        if(types[type]) {
            types[type]++;
        } else {
            types[type] = 1;
        }
        console.log(`${type}: ${param}`);
    });
    Object.entries(types).sort((a, b) => {
        return b[1]-a[1];
    }).forEach(entry => {
        console.log(`${entry[0]} = ${entry[1]}`);
    })
}

solve({ name: 'bob'}, 3.333, 9.999)