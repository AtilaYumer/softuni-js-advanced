function greatestCommonDevisor(a, b) {
    if (a == 0) {
        console.log(b);
        return;
    }

    while (b != 0) {
        if (a > b) {
            a -= b;
        } else {
            b -= a;
        }
    }
    console.log(a);
}

greatestCommonDevisor(15, 5);
greatestCommonDevisor(2154, 458);