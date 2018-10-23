
$(document).ready(function () {

    socket = io();
    let escritorio1 = $('#lblEscritorio1');
    let escritorio2 = $('#lblEscritorio2');
    let escritorio3 = $('#lblEscritorio3');
    let escritorio4 = $('#lblEscritorio4');

    let ticket1 = $('#lblTicket1');
    let ticket2 = $('#lblTicket2');
    let ticket3 = $('#lblTicket3');
    let ticket4 = $('#lblTicket4');

    let escritorios = [escritorio1, escritorio2, escritorio3, escritorio4];
    let tickets = [ticket1, ticket2, ticket3, ticket4];



    socket.on('ultimosCuatro', function (resp) {
        
         var audio = new Audio('audio/new-ticket.mp3')
         audio.play();
        for (let i = 0; i < resp.length; i++) {
            escritorios[i].text('Escritorio n° ' + resp[i].escritorio);
            tickets[i].text('Ticket: ' + resp[i].numTicket);
        }

    })

});

