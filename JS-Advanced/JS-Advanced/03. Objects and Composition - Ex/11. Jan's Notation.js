function solve(input) {
    const stack = [];
    let hasError = false;
    for (const el of input) {
        if (typeof (el) === 'number') {
            stack.push(Number(el));
        } else if (typeof (el) === 'string') {
            if (stack.length < 2) {
                console.log('Error: not enough operands!');
                hasError = true;
                break;
            }
            let op2 = stack.pop();
            let op1 = stack.pop();
            switch (el) {
                case '+': stack.push(op1 + op2); break;
                case '-': stack.push(op1 - op2); break;
                case '*': stack.push(op1 * op2); break;
                case '/': stack.push(Math.floor(op1 / op2)); break;
            }

        }
    }
    if (stack.length > 1) {
        console.log('Error: too many operands!');
    } else if (!hasError) {
        console.log(stack[0]);
    }
}

solve([3, 4, '+']);
solve([5, 3, 4, '*', '-']);
solve([7, 33, 8, '-']);
solve([15, '/']);