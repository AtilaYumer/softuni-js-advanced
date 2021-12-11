function createCard(face, suit) {
    const cards = {
        faces: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        suits: {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663'
        }
    }
    if (!cards.faces.includes(face)) {
        throw Error(`Invalid face : ${face}`);
    }
    if(!Object.keys(cards.suits).includes((suit))) {
        throw Error(`Invalid suit: ${suit}`)
    }
    return `${face}${cards.suits[suit]}`
}

console.log(createCard('A', 'S'));
console.log(createCard('10', 'S'));
console.log(createCard('1', 'C'));