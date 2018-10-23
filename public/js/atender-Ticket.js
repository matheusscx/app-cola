$(document).ready(function () {

    var socket = io();
    let searchParams  = new URLSearchParams(window.location.search);
    
    if(!searchParams.has('escritorio')){
        alert('El Numero del escritorio es requerido');
        window.location = 'index.html';
    }
    
    let escritorio = searchParams.get('escritorio');
        
    $('h1').text('Escritorio N° ' + escritorio);
   

    socket.on('connect', function () {
        console.log('Usuario Pantalla publica conectado');

        socket.on('disconnect', function () {
            console.log('Usuario Pantalla publica desconectado');
        });


        $('button').on('click', function () {

            socket.emit('atenderTicket',{escritorio: escritorio},function(resp){
                console.log(resp);
                $('small').text(resp.numTicket);
            })
        });


    })





});