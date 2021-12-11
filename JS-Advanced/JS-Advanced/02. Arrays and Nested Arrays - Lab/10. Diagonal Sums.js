function solve(matrix) {
    let mainDiagonalSum = 0
    let secondaryDiagonalSum = 0;
    for (let row = 0; row < matrix.length; row++) {
        let rowLength = matrix[row].length - 1;
        mainDiagonalSum += matrix[row][row];
        secondaryDiagonalSum += matrix[row][rowLength - row];
    }
    console.log(mainDiagonalSum, secondaryDiagonalSum);
}

solve([[20, 40],
[10, 60]]);

solve([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]]);