function solve(arr) {
    let result = [];
    arr.forEach(el => {
        if(el >=  0) {
            result.push(el);
        } else {
            result.unshift(el);
        }
    })
    result.forEach(el => {
        console.log(el);
    })
}

solve([7, -2, 8, 9]);
solve([3, -2, 0, -1]);