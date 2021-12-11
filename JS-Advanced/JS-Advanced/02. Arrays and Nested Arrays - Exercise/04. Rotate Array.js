function solve(array, rounds) {
    for (let i = 0; i < rounds % array.length; i++) {
        array.unshift(array.pop());
    }
    return array.join(' ');
}

console.log(solve(['1', '2', '3', '4'], 2));
console.log(solve(['Banana', 'Orange', 'Coconut', 'Apple'], 15));