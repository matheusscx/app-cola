


$(document).ready(function () {
    var socket = io();

    labelTicket = $('#lblNuevoTicket');
    socket.on('connect', function () {
        console.log('Conectado con el servidor');
    });

    socket.on('disconnect', function () {
        console.log('Perdimos la conexión con el servidor');

    });

    socket.on('estadoActual', function (msj) {
        labelTicket.text(msj.ultimoTicket);
    })

    socket.on('siguienteTicket', function (msj) {
        labelTicket.text(msj);
    })

    $('button').on('click', function () {
        socket.emit('siguienteTicket',null,function(siguienteTicket){
            labelTicket.text(siguienteTicket);

        });
    });




});


