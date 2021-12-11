function solve(car) {
    let result = {};
    result.model = car.model;
    result.engine = engineFactory(car.power);
    result.carriage = { type: car.carriage, color: car.color },
        result.wheels = wheelFactory(car.wheelsize);

    function engineFactory(power) {
        if (power <= 90) {
            return { power: 90, volume: 1800 };
        } else if (power <= 120) {
            return { power: 120, volume: 2400 };
        } else {
            return { power: 200, volume: 3500 }
        }
    }

    function wheelFactory(size) {
        let wheelSize = 2 * Math.floor((size - 1) / 2) + 1;
        return new Array(4).fill(wheelSize, 0);
    }
    return result;
}

console.log(solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));