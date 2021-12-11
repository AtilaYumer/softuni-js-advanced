function calc() {
    // TODO: sum = num1 + num2
    const num1 = Number(document.querySelector('#num1').value);
    const num2 = Number(document.querySelector('#num2').value);

    const sum = num1 + num2;
    document.querySelector('#sum').value = sum;
}
