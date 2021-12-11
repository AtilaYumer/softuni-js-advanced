function solve(input) {
    let result = input.split(/[\W]+/).filter(w => w.length > 0).join(', ');
    console.log(result.toUpperCase());
}

solve('Hi, how are you?')
solve('hello')