class List {
    constructor() {
        this.arr = [];
        this.size = 0;
    }

    add(element) {
        if (typeof (Number(element)) === 'number') {
            this.arr.push(Number(element));
        }
        this.size++;
        this.sort();
    }

    remove(index) {
        index = Number(index);
        if (isNaN(index) || index < 0 || index >= this.arr.length) {
            throw new Error('Incorrect index');
        }
        this.arr.splice(index, 1);
        this.size--;
        this.sort();

    }

    get(index) {
        index = Number(index);
        if (isNaN(index) || index < 0 || index >= this.arr.length) {
            throw new Error('Incorrect index');
        }
        return this.arr[index];
    }

    sort() {
        this.arr.sort((a, b) => a - b);
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));