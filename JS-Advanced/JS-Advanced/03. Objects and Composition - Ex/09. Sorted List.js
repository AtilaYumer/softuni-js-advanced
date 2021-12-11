function createSortedList() {
    return {
        elemenents: [],
        size: 0,
        add: function (number) {
            this.elemenents.push(Number(number));
            this.size++;
            this.sort();
        },
        remove: function (index) {
            if (Number(index) <= this.size - 1 && index >= 0) {
                this.elemenents.splice(Number(index), 1);
                this.size--;
                this.sort();
            }
        },
        get: function (index) {
            if (Number(index) <= this.size - 1 && index >= 0) {
                return this.elemenents[Number(index)];
            }
        },
        sort() {
            this.elemenents.sort((a, b) => a - b);
        }
    }
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));