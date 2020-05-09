const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguienteTicket = ticketControl.siguiente()

        callback(siguienteTicket)
    })

    // Emite evento estadoActual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: {
                    mensaje: 'El escritorio es necesario'
                }
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })
})