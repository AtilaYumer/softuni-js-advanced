function timeToWalk(steps, footPrint, speed) {
    const distance = steps * footPrint;
    let restsInMinutes = Math.floor(distance / 500);
    let time = (distance / (speed * 0.277777778)) + restsInMinutes * 60;

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let secs = Math.round(time - (minutes * 60));

    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (secs < 10) { secs = "0" + secs }

    console.log(`${hours}:${minutes}:${secs}`);
}

timeToWalk(4000, 0.60, 5);
timeToWalk(2564, 0.70, 5.5);