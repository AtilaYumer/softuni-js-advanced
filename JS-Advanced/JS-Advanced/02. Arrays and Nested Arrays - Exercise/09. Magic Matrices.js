function solve(matrix) {
    const reduce = (prev, curr) => prev + curr;
    let sum = matrix[0].reduce(reduce);
    for (let row = 0; row < matrix.length; row++) {
        let rowSum = matrix[row].reduce(reduce);
        if (rowSum !== sum) {
            return false;
        }
        if (row === 0) {
            for (let col = 0; col < matrix[row].length; col++) {
                let columSum = 0;
                for (let i = 0; i < matrix.length; i++) {
                    columSum += matrix[col][i];
                }
                if (columSum !== sum) {
                    return false;
                }
            }
        }
    }
    return true;
}

console.log(solve([[4, 5, 6], [6, 5, 4], [5, 5, 5]]));
console.log(solve([[11, 32, 45], [21, 0, 1], [21, 1, 1]]));
console.log(solve([[1, 0, 0], [0, 0, 1], [0, 1, 0]]));