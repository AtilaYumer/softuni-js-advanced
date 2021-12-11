solve = (data) => {
    let list = [];
    execute();

    function execute() {
        data.forEach(c => {
            let command = c === 'print' ? 'print' : c.split(' ');
            if (command === 'print') {
                console.log(list.join(','));
            } else if (command[0] === 'add') {
                list.push(command[1]);
            } else {
                list = list.filter(e => e !== command[1]);
            }
        })
    }
}

solve(['add pesho', 'add george', 'add peter', 'remove peter','print']);