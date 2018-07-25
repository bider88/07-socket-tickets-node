var socket = io();

var seatchParams = new URLSearchParams( window.location.search );

if ( !seatchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

var desktop = seatchParams.get('escritorio');

$('h1').text('Escritorio ' + desktop);

var small = $('small');

socket.on('connect', function() {
    console.log('Connected on Server');    
})

socket.on('disconnect', function() {
    console.log('Disconnect on Server');
})

$('button').on('click', function() {

    socket.emit('attendTicket', { desktop: desktop }, function(res) {

        if (res.err) { 
            small.text(res.message);
            return;
        }

        if ( res === 'No hay más tickets') {
            small.text(res);
            return;
        }

        small.text('Ticket ' + res.number);

    });
})