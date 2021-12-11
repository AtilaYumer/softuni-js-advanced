function roadRadar(speedString, area) {
    speed = Number(speedString);
    const motorwayLimit = 130;
    const interstateLimit = 90;
    const cityLimit = 50;
    const residentialLimit = 20;


    let speedLimit;
    let isOverLimit = false;
    let difference = 0;
    switch (area) {
        case "motorway":
            speedLimit = motorwayLimit;
            if (speed > motorwayLimit) {
                isOverLimit = true;
                difference = speed - motorwayLimit;
            }
            break;
        case "interstate":
            speedLimit = interstateLimit;
            if (speed > interstateLimit) {
                isOverLimit = true;
                difference = speed - interstateLimit;
            }
            break;
        case "city":
            speedLimit = cityLimit;
            if (speed > cityLimit) {
                isOverLimit = true;
                difference = speed - cityLimit;
            }
            break;
        case "residential":
            speedLimit = residentialLimit;
            if (speed > residentialLimit) {
                isOverLimit = true;
                difference = speed - residentialLimit;
            } break;
    }

    let status;
    if (isOverLimit) {
        if (difference <= 20) {
            status = "speeding";
        } else if (difference <= 40) {
            status = "excessive speeding";
        } else {
            status = "reckless driving";
        }
        console.log(`The speed is ${difference} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
    } else {
        console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
    }
}

roadRadar(40, 'city');
roadRadar(21, 'residential');
roadRadar(120, 'interstate');
roadRadar(200, 'motorway');