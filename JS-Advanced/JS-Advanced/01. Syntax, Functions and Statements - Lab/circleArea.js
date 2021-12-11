function circleArea(r) {
    if (typeof (r) == 'number') {
        let area = r ** 2 * Math.PI;
        console.log(area.toFixed(2));
    } else {
        console.log(`We can not calculate the circle area, because we receive a ${typeof (r)}.`);
    }
}

circleArea(5);
circleArea('name');