const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {

        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        let data = require('../data/data.json')

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimos4 = data.ultimos4
        } else {
            this.reiniciarConteo()
        }
    }

    siguiente() {
        this.ultimo += 1

        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)

        this.grabarArchivo()

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4
    }

    atenderTicket(escritorio) {

        console.log(this);
        if (0 === this.tickets.length) {
            return 'No hay tickets'
        }

        let numeroTiket = this.tickets[0].numero
        this.tickets.shift()

        let ticket = new Ticket(numeroTiket, escritorio)

        this.ultimos4.unshift(ticket)

        if (4 < this.ultimos4.length) {
            this.ultimos4.splice(-1, 1) //borra el último
        }

        console.log('Ultimos 4')
        console.log(this.ultimos4)

        this.grabarArchivo()

        return ticket
    }

    reiniciarConteo() {

        this.ultimo = 0
        this.tickets = []
        this.ultimos4 = []

        this.grabarArchivo()
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData))
    }
}

module.exports = {
    TicketControl
}