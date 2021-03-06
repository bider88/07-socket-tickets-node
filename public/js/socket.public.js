var socket = io();

var seatchParams = new URLSearchParams( window.location.search );

var small = $('small');

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [ 
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
var lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];

socket.on('connect', function() {
    console.log('Connected on Server');
})

socket.on('disconnect', function() {
    console.log('Disconnect on Server');
})

socket.on('currentState', function(data) {
    updateHTML(data.lastFour);
})

socket.on('lastFour', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.lastFour);
})

function updateHTML(lastFour) {
    for ( var i = 0; i< lastFour.length; i++ ) {
        lblTickets[i].text('Ticket ' + lastFour[i].number);
        lblEscritorios[i].text('Escritorio ' + lastFour[i].desktop);
    }
}
