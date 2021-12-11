class Stringer {
    constructor(text, length) {
        this.innerString = text;
        this.innerLength = length;
    }

    increase(length) {
        length = Number(length);
        if (!isNaN(length) && length >= 0) {
            this.innerLength += length;
        }
    }

    decrease(length) {
        length = Number(length);
        if (!isNaN(length) && length >= 0) {
            this.innerLength -= length;
        }
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        if (this.innerString.length > this.innerLength) {
            return this.innerString.slice(0, this.innerLength - this.innerString.length) + '...';
        }
        return this.innerString;
    }
}

let stringer = new Stringer('Test', 5);
console.log(stringer.toString());

stringer.decrease(3);
console.log(stringer.toString());

stringer.decrease(5);
console.log(stringer.toString());

stringer.increase(5);
console.log(stringer.toString());