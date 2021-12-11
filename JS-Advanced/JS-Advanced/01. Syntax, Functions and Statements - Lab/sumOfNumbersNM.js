function sumNumbers(n, m) {
    let from = Number(n);
    let to = Number(m);

    let result = 0;
    for (let i = from; i <= to; i++) {
        result += i;
    }
    return result;
}
console.log(sumNumbers('1', '5'));
console.log(sumNumbers('-8', '20'));