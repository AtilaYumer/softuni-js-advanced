function solve(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (i % 2 == 1) {
            result.push(array[i] * 2);
        }
    }
    return result.reverse();
}

console.log(solve([10, 15, 20, 25]));
console.log(solve([3, 0, 10, 4, 7, 3]));