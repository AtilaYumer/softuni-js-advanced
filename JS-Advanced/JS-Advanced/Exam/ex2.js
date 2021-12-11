class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = {"child": 150, "student": 300, "collegian": 500}
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, price) {
        if (!Object.keys(this.priceForTheCamp).includes(condition)) {
            throw new Error('Unsuccessful registration at the camp.');
        } else if (price < this.priceForTheCamp[condition]) {
            return 'The money is not enough to pay the stay at the camp.'
        } else if (this.listOfParticipants[name]) {
            return `The ${name} is already registered at the camp.`;
        }
        this.listOfParticipants[name] = {name, condition, power: 100, wins: 0};
        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        if (!this.listOfParticipants[name]) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }
        delete this.listOfParticipants[name];
        return `The ${name} removed successfully.`;
    }

    timeToPlay(typeOfGame, participant1, participant2) {
        const p1 = this.listOfParticipants[participant1];
        if (typeOfGame === 'WaterBalloonFights') {
            const p2 = this.listOfParticipants[participant2];
            if (!p1 || !p2) {
                throw new Error('Invalid entered name/s.');
            } else if (p1.condition !== p2.condition) {
                throw new Error('Choose players with equal condition.');
            }
            if (p1.power === p2.power) {
                return 'There is no winner.'
            } else if (p1.power > p2.power) {
                p1.wins++;
                return `The ${participant1} is winner in the game ${typeOfGame}.`;
            } else if(p2.power > p1.power){
                p2.wins++;
                return `The ${participant2} is winner in the game ${typeOfGame}.`;
            }
        } else if (typeOfGame === 'Battleship') {
            if (!p1) {
                throw new Error('Invalid entered name/s.');
            }
            p1.power += 20;
            return `The ${participant1} successfully completed the game ${typeOfGame}.`
        }
    }

    toString() {
        let result = `${this.organizer} will take ${Object.keys(this.listOfParticipants).length} participants on camping to ${this.location}\n`
        let sortedParticipants = Object.values(this.listOfParticipants).sort((a, b) => {
            return b.wins - a.wins;
        });
        for (let p in sortedParticipants) {
            const participant = sortedParticipants[p];
            result += `${participant.name} - ${participant.condition} - ${participant.power} - ${participant.wins}\n`
        }
        return result.substring(0, result.length - 1);
    }
}

// TEST 1
// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 200));
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.registerParticipant("Leila Wolfe", "childd", 200));

//TEST 2
// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.unregisterParticipant("Petar"));
// console.log(summerCamp.unregisterParticipant("Petar Petarson"));

//TEST 3
// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
// console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
// console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

//TEST 4
// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
// console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
// console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));
// console.log(summerCamp.toString());

//TEST JUDGE
// let camp = new SummerCamp('Jane Austen', 'Pancharevo Sofia 1137, Bulgaria');
// camp.registerParticipant('Petar Petarson', 'child', 300); //"The Petar Petarson was successfully registered.
// camp.registerParticipant('Sara Dickinson', 'child', 200); // "The Sara Dickinson was successfully registered.");
// camp.timeToPlay('Battleship', 'Sara Dickinson'); //"The Sara Dickinson successfully completed the game Battleship.");
// camp.timeToPlay('WaterBalloonFights', 'Sara Dickinson','Petar Petarson'); //"The Sara Dickinson is winner in the game WaterBalloonFights.");
// console.log(camp.toString());
//
// `Jane Austen will take 2 participants on camping to Pancharevo Sofia 1137, Bulgaria
// Sara Dickinson - child - 120 - 1
// Petar Petarson - child - 100 - 0`

let camp = new SummerCamp('Atila', 'Sofia');
conscamp.registerParticipant('gosho', 'student', 300);
camp.registerParticipant('persho', 'student', 300);
camp.timeToPlay('WaterBalloonFights', 'gosho', 'pesho');
console.log(camp.toString());