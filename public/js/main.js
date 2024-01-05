var host = window.location.hostname;
var socket = io(`http://${host}:3000`);
var links = [
    { id: 1, link: "img/avatar/img1.jpg" },
    { id: 2, link: "img/avatar/img2.jpg" },
    { id: 3, link: "img/avatar/img3.jpg" },
    { id: 4, link: "img/avatar/img4.jpg" },
    { id: 5, link: "img/avatar/img5.jpg" },
    { id: 6, link: "img/avatar/img6.jpg" },
    { id: 7, link: "img/avatar/img7.jpg" },
    { id: 8, link: "img/avatar/img11.jpg" },
];
var typing = [];

moment.locale('pt-br');

// inicializa a sessao
function joinSession(data) {
    socket.emit('join', data);
    playSound('audio/click/click.mp3');
};

// funcao que verifica se existe texto nos inputs de iniciar sessao
function checkAuthor() {
    var author = $('input[name=username]').val();
    var room = $('input[name=room]').val();
    var newObj = {};

    newObj.author = author;
    newObj.room = room;
    newObj.t = new Date().getTime();

    if (author && room) {
        joinSession(newObj);

        $('#join').hide();
        $('#navbar').show();
        $('#chat').show();
    } else {
        $('#navbar').hide();
        $('#chat').hide();
        $('#join').show();
    };
};

// apaga o usuario e a sessao
function closeSession() {
    var author = $('input[name=username]').val('');
    var room = $('input[name=room]').val('');
};