function solve(array) {
    const dashboard = [[false, false, false], [false, false, false], [false, false, false]];
    let currentPlayer = 'X';
    let counter = 0;

    for (const el of array) {
        let [x, y] = el.split(' ');
        let position = dashboard[x][y];
        if (position === 'X' || position === 'O') {
            console.log('This place is already taken. Please choose another!');
            continue;
        } else {
            dashboard[x][y] = currentPlayer;
            counter++;
        }
        if (isGameOver()) {
            console.log(`Player ${currentPlayer} wins!`);
            printDashboard();
            return;
        } else if (counter === 9) {
            console.log('The game ended! Nobody wins :(');
            printDashboard();
            return;
        }
        currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
    }
    console.log('The game ended! Nobody wins :(');
    printDashboard();

    function printDashboard() {
        dashboard.forEach(row => {
            console.log(row.join('\t'));
        });
    }

    function isGameOver() {
        //check rows
        for (let row = 0; row < dashboard.length; row++) {
            if (dashboard[row][0] &&
                dashboard[row][0] === dashboard[row][1] &&
                dashboard[row][1] === dashboard[row][2]) {
                return true;
            }
        }

        //check columns
        for (let col = 0; col < dashboard[0].length; col++) {
            if (dashboard[0][col] &&
                dashboard[0][col] === dashboard[1][col] &&
                dashboard[1][col] === dashboard[2][col]) {
                return true;
            }
        }

        //check diagonals
        if (dashboard[0][0] &&
            dashboard[0][0] === dashboard[1][1] &&
            dashboard[1][1] === dashboard[2][2]) {
            return true;
        } else if (dashboard[0][2] &&
            dashboard[0][2] === dashboard[1][1] &&
            dashboard[1][1] === dashboard[2][0]) {
            return true
        }
        return false;
    }
}

console.log('===== test 1 =====');
solve(["0 1", "0 0", "0 2", "2 0", "1 0", "1 1", "1 2", "2 2", "2 1", "0 0"]);
console.log('===== test 2 =====');
solve(["0 0", "0 0", "1 1", "0 1", "1 2", "0 2", "2 2", "1 2", "2 2", "2 1"]);
console.log('===== test 3 =====');
solve(["0 1", "0 0", "0 2", "2 0", "1 0", "1 2", "1 1", "2 1", "2 2", "0 0"]);