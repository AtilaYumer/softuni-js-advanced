function solve(array) {
    const [width, height, x, y] = array;
    let matrix = Array.from(Array(width), () => Array(height));

    for (let row = 0; row < width; row++) {
        for (let col = 0; col < height; col++) {
            matrix[row][col] = Math.max(Math.abs(row - x), Math.abs(col - y)) + 1;
        }
    }
    matrix.forEach(row => {
        console.log(row.join(' '));
    })
}

solve([4, 4, 0, 0]);
