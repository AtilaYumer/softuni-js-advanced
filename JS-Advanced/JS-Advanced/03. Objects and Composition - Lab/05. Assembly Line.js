function createAssemblyLine() {
    return {
        hasClima: function (vehicle) {
            vehicle.temp = 21;
            vehicle.tempSettings = 21;
            vehicle.adjustTemp = () => {
                if (vehicle.temp < vehicle.tempSettings) {
                    vehicle.temp++;
                } else if (vehicle.temp > vehicle.tempSettings) {
                    vehicle.temp--;
                }
            }
        },

        hasAudio: function (vehicle) {
            vehicle.currentTrack = null,
                vehicle.nowPlaying = () => {
                    if (vehicle.currentTrack !== null) {
                        console.log(`Now playing '${vehicle.currentTrack.name}' by ${vehicle.currentTrack.artist}`);
                    }
                }
        },

        hasParktronic: function (vehicle) {
            vehicle.checkDistance = (distance) => {
                if (distance < 0.1) {
                    console.log('Beep! Beep! Beep!');
                } else if (distance < 0.25) {
                    console.log('Beep! Beep!');
                } else if (distance < 0.5) {
                    console.log('Beep!');
                } else {
                    console.log('');
                }
            }
        }
    };
}

const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);

assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();

assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);

console.log(myCar);