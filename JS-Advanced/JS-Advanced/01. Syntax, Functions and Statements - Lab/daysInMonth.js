function daysInMonth(month, year) {
    let date  = new Date(year, month, 1);
    date.setDate(date.getDate() - 1);
    return date.getDate();
}

console.log(daysInMonth(1, 2012));
console.log(daysInMonth(2, 2021));