function solve(area, vol, input) {
    return JSON.parse(input).map(i => {
        return {
            area: area.apply(i),
            volume: vol.apply(i)
        }
    });
}

function area() {
    return Math.abs(this.x * this.y);
};

function vol() {
    return Math.abs(this.x * this.y * this.z);
};

let input = `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`

console.log(solve(area, vol, input));