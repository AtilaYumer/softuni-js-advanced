solve = (commands) => {
    const list = {};
    execute();


    function execute() {
        commands.forEach(c => {
            if (c.includes('inherit')) {
                const [, name, , parentName] = c.split(' ');
                list[name] = Object.create(list[parentName]);
            } else if (c.includes('create')) {
                const [, name] = c.split(' ');
                list[name] = {}
            } else if (c.includes('set')) {
                const [, name, key, value] = c.split(' ');
                list[name][key] = value;
            } else if (c.includes('print')) {
                const [, name] = c.split(' ');
                let result = [];
                for (let key in list[name]) {
                    result.push(`${key}:${list[name][key]}`);
                }
                console.log(result.join(','));
            }
        });
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'])