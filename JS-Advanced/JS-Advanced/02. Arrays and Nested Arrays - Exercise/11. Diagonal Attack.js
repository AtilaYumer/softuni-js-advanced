function solve(matrix) {
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    matrix = matrix.map(row => row.split(' ').map(Number));

    for (let row = 0; row < matrix.length; row++) {
        mainDiagonalSum += matrix[row][row];
        secondaryDiagonalSum += matrix[row][matrix[row].length - 1 - row];
    }

    if (mainDiagonalSum === secondaryDiagonalSum) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (col === row || col === matrix[row].length - 1 - row) {
                    continue;
                }
                matrix[row][col] = mainDiagonalSum;
            }
        }
    }
    matrix.forEach(row => {
        console.log(row.join(' '));
    })
}

solve(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']);
console.log();
solve(['1 1 1',
    '1 1 1',
    '1 1 0']);