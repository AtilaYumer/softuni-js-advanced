function solve(commands) {
    let num = 1;
    let result = [];
    commands.forEach(command => {
        if (command === 'add') {
            result.push(num);
        } else {
            result.pop();
        }
        num++;
    });
    if (result.length) {
        result.forEach(el => console.log(el));
    } else {
        console.log("Empty");
    }
}

solve(['add', 'add', 'add', 'add']);
console.log('=====================');
solve(['add', 'add', 'remove', 'add', 'add'])
console.log('======================');
solve(['remove', 'remove', 'remove']);