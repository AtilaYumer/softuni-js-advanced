function aggregateElements(array) {
    let sum = 0;
    let inverseSum = 0;
    let concat = '';

    array.forEach(element => {
        sum += element;
        inverseSum += 1/element;
        concat += element + '';
    });
    console.log(sum);
    console.log(inverseSum);
    console.log(concat);
}
aggregateElements([1, 2, 3]);
aggregateElements([2, 4, 8, 16]);