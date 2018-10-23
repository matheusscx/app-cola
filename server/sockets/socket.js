const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.emit('estadoActual', {
        ultimoTicket: ticketControl.getUltimoTicket()
    });

    client.emit('ultimosCuatro',ticketControl.getUltimosCuatro());

    client.on('siguienteTicket', (data, callback) => {
        let ticket = ticketControl.siguienteNumero();
        client.broadcast.emit('siguienteTicket', ticket);
        callback(ticket);
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {

            callback({
                err: true,
                message: 'El numero de escritorio es requerido'
            })
        } else {

            let atenderTicket = ticketControl.atenderTicket(data.escritorio);
            callback(atenderTicket);
        
            client.broadcast.emit('ultimosCuatro',ticketControl.getUltimosCuatro());
        }


    })







});