calculator = () => {
    let obj = {};

    return {
        init,
        add,
        subtract
    }

    function init(selector1, selector2, result) {
        obj.selector1 = document.querySelector(selector1);
        obj.selector2 = document.querySelector(selector2);
        obj.result = document.querySelector(result);
    }

    function add() {
        let num1 = Number(obj.selector1.value);
        let num2 = Number(obj.selector2.value);
        obj.result.value = num1 + num2;
    }

    function subtract() {
        let num1 = Number(obj.selector1.value);
        let num2 = Number(obj.selector2.value);
        obj.result.value = num1 - num2;
    }
}

const calculate = calculator();
calculate.init('#num1', '#num2', '#result');