function solve(ticketDescriptions, sortingCriteria) {
    let tickets = [];
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }

        static sort(a, b, criteria) {
            if(criteria === 'price') {
                 return a.price - b.price;
            } else {
                return a[criteria].localeCompare(b[criteria]);
            }
        }
    }
    ticketDescriptions.forEach(td => {
        let [destination, price, status] = td.split('|');
        price = Number(price);
        tickets.push(new Ticket(destination, price, status));
    });
    return tickets.sort((a, b) => Ticket.sort(a, b, sortingCriteria));
}

console.log(solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'));