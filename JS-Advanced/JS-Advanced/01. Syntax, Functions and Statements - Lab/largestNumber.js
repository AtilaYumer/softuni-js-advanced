function largestNumber(a, b, c) {
    let largestNum;
    if (a > b && a > c) {
        largestNum = a;
    } else if (b > a && b > c) {
        largestNum = b;
    } else if (c > a && c > b) {
        largestNum = c;
    }
    console.log(`The largest number is ${largestNum}.`)
}

largestNumber(5, -3, 16);
largestNumber(-3, -5, -22.5);