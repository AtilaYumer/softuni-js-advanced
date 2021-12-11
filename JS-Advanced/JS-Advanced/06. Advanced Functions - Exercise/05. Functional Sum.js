function solve(input) {
    let sum = input;

    function add(input) {
        sum += Number(input);
        return add;
    }

    add.toString = () => {
        return sum;
    }

    return add;
}

console.log(solve(1)(6)(-3).toString());