function stringLength(a, b, c) {
    let totalLength = a.length + b.length + c.length;
    let avgLength = Math.floor(totalLength / 3);
    console.log(totalLength);
    console.log(avgLength);
}

stringLength('chocolate', 'ice cream', 'cake');
stringLength('pasta', '5', '22.3');