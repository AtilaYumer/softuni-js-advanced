solution = () => {
    let string = '';

    return {
        append,
        removeStart,
        removeEnd,
        print
    }

    function append(input) {
        string += input;
    }

    function removeStart(n) {
        string = string.slice(n);
    }

    function removeEnd(n) {
        string = string.slice(0, -n);
    }

    function print() {
        console.log(string);
    }
}

let secondZeroTest = solution();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();

