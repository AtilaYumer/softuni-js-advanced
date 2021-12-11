function solve(array) {
    let result = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < array.length; i++) {
        if (Math.max(...array[i]) > result) {
            result = Math.max(...array[i]);
        }
    }
    return result;
}

console.log(solve([[20, 50, 10], [8, 33, 145]]));
console.log(solve([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]]));