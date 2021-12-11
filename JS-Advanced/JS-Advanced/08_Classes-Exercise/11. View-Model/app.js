class Textbox {
    constructor(selector, regex) {
        this._value = '';
        this._invalidSymbols = regex;
        this.selectWith(selector);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        Array.from(this._elements).forEach(e => {
            e.value = value;
        })
    }

    //TODO return as NodeList
    get elements() {
        return this._elements;
    }

    selectWith(selector) {
        this._elements = document.querySelectorAll(selector);
        Array.from(this._elements).forEach(e => {
            e.addEventListener('change', (e) => {
                this.value = e.target.value;
            });
        })
    }

    isValid() {
        const inputs = Array.from(this._elements);
        for (let el in inputs) {
            const curr = inputs[el];
            if (curr.value && this._invalidSymbols.test(curr.value)) {
                return false;
            }
        }
        return true;
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('.textbox');

inputs.addEventListener('click', function () {
    console.log(textbox.value);
});
