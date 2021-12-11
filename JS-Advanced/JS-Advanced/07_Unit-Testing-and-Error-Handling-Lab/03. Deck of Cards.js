function deckOfCards(array) {
    const cards = [];
    for (let i = 0; i < array.length; i++) {
        const face = array[i].substring(0, array[i].length - 1);
        const suit = array[i].charAt(array[i].length - 1);
        try {
            cards.push(createCard(face, suit));
        } catch (error) {
            console.log(`Invalid card: ${array[i]}`);
            return;
        }
    }
    console.log(cards.join(' '));

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
}

deckOfCards(['AS', '10D', 'KH', '2C']);
deckOfCards(['5S', '3D', 'QD', '1C']);