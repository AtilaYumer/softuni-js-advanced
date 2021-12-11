function squareOfStars(input = 5) {

    let stars;
    for (let i = 0; i < input; i++) {
        stars = '';
        for (let j = 0; j < input; j++) {
            stars += '* ';
        }
        console.log(stars);
    }
}

//squareOfStars(5);
squareOfStars();