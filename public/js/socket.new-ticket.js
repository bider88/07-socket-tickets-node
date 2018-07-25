
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connected on Server');    
})

socket.on('disconnect', function() {
    console.log('Disconnect on Server');
})

socket.on('currentState', function( res ) {
    label.text(res.current);
})

$('button').on('click', function() {
    console.log('click');

    socket.emit('nextTicket', null, function(nextTicket) {

        label.text(nextTicket);

    });
})