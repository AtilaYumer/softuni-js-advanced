function solve(width, height) {
    printMatrix(getMatrix(width, height));

    function getMatrix(width, height) {
        let [count, maxCount, minRow, minCol, maxRow, maxCol] = [0, width * height, 0, 0, width - 1, height - 1];
        let matrix = [];
        for (let r = 0; r < width; r++) matrix[r] = [];
        while (count < maxCount) {
            for (let c = minCol; c <= maxCol && count < maxCount; c++) matrix[minRow][c] = ++count;
            minRow++;
            for (let r = minRow; r <= maxRow && count < maxCount; r++) matrix[r][maxCol] = ++count;
            maxCol--;
            for (let c = maxCol; c >= minCol && count < maxCount; c--) matrix[maxRow][c] = ++count;
            maxRow--;
            for (let r = maxRow; r >= minRow && count < maxCount; r--) matrix[r][minCol] = ++count;
            minCol++;
        }
        return matrix;
    }

    function printMatrix(matrix) {
        matrix.forEach(row => console.log(row.join(' ')));
    }
}

solve(5, 5)