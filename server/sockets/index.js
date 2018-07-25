const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('client connected');

    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    })

    client.on('attendTicket', (data, callback) => {

        if ( !data.desktop ) return callback(  { err: true, message: 'El escritorio es requerido' } );

        const attendTicket = ticketControl.attendTicket(data.desktop);

        callback( attendTicket );

        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFour()
        })
    })

    client.on('nextTicket', (data, callback) => {
        const next = ticketControl.next();
        console.log(next);
        callback(next);
    })

})