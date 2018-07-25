const fs = require('fs');

class Ticket {

    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }

}

class TicketControl {
    
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) { 
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        }
        else this.restartCount();
    }

    next() {
        this.last++;

        const ticket = new Ticket(this.last, null);

        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        
        if ( this.tickets.length > 0) {
            const numberTicket = this.tickets[0].number;
            this.tickets.shift();

            const attendTicket = new Ticket(numberTicket, desktop);

            this.lastFour.unshift(attendTicket);

            if ( this.lastFour.length > 4 ) {
                this.lastFour.splice(-1, 1);
            }

            console.log('Últimos cuatro', this.lastFour);

            this.saveFile();

            return attendTicket;
        }

        return 'No hay más tickets';
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];

        console.log('Se ha inicializado el sistema');

        this.saveFile();
        
    }

    saveFile() {
        const jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        const jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}