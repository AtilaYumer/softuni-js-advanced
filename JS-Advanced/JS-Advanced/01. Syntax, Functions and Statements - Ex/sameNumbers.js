function sameNumbers(number) {
    let stringNumber = number.toString();
    let isSame = true;
    let sum = 0;
    for (let i = 0; i < stringNumber.length; i++) {
        sum += Number(stringNumber.charAt(i));
        if (i > 0 && stringNumber.charAt(i) !== stringNumber.charAt(i - 1)) {
            isSame = false;
        }
    }
    console.log(isSame);
    console.log(sum);
}

sameNumbers(2222222);
sameNumbers(1234);