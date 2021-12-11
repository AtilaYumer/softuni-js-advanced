function solve(input) {
    let result = [];
    for (let i = 1; i < input.length; i++) {
        let [town, latitude, longitude] = input[i].substring(2, input[i].length - 1).split(' | ');
        latitude = Number(latitude);
        longitude = Number(longitude);
        result.push({ 'Town': town, 'Latitude': Number(latitude.toFixed(2)), 'Longitude': Number(longitude.toFixed(2)) })
    }
    return JSON.stringify(result);
}

console.log(solve(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']))