function solve(arr) {
    return Number(arr.shift()) + Number(arr.pop()); 
}
console.log(solve(['20', '30', '40']));
console.log(solve(['5', '10']));