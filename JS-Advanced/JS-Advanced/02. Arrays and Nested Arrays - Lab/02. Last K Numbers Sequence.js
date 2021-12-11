function solution(n, k) {
    let result = [1];
    for (let i = 0; i < n - 1; i++) {
        let arr = result.slice(-k);
        result.push(sumArr(arr));
    }
    function sumArr(arr) {
        let sum = 0;
        for (let j = 0; j < arr.length; j++) {
            sum += arr[j];
        }
        return sum;
    }
    return result;
}

console.log(solution(6, 3));
console.log(solution(8, 2));