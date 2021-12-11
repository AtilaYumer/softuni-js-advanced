function solve(array) {
    array.sort((a, b) => {
        if (a.length - b.length === 0) {
            return a.localeCompare(b);
        } else {
            return a.length - b.length;
        }
    }).forEach(el => console.log(el));
}

console.log('===== test 1 =====');
solve(['alpha', 'beta', 'gamma']);
console.log('===== test 2 =====');
solve(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']);
console.log('===== test 3 =====');
solve(['test', 'Deny', 'omen', 'Default']);