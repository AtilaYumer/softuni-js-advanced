function solution(number, op1, op2, op3, op4, op5) {
    let num = Number(number);
    let operations = [op1, op2, op3, op4, op5];
    operations.forEach(operation => {
        switch (operation) {
            case "chop":
                console.log(num /= 2);
                break;
            case "dice":
                num = Math.sqrt(num);
                console.log(num);
                break;
            case "spice":
                console.log(++num);
                break;
            case "bake":
                console.log(num *= 3);
                break;
            default:
                num -= num * 20 / 100;
                console.log(num);
                break;
        }
    })
}

solution('32', 'chop', 'chop', 'chop', 'chop', 'chop');
console.log('=========================================');
solution('9', 'dice', 'spice', 'chop', 'bake', 'fillet');