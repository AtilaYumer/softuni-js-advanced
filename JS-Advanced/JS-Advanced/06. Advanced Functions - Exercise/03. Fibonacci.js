getFibonator = () => {
    let num1 = 0, num2 = 0;
    return fib;

    function fib() {
        let sum = num1 === 0 ? 1 : num1 + num2;
        num1 = num2;
        num2 = sum;
        return sum;
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13