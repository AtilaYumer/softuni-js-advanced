solve = (array, order) => {
    return array.sort(sortFunction(order));

    function sortFunction(order) {
        if(order === 'asc') {
            return (a, b) => a -b;
        } else {
            return (a, b) => b - a;
        }
    }
}

console.log(solve([14, 7, 17, 6, 8], 'desc'));