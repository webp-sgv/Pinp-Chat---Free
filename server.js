const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];
let hosts = 0;
let sockets = [];
let rooms = [];

// define os dados do solicitante
function setSocketsData(socket, data) {
    if (data.avatar) { sockets.filter((key) => key.id == socket.id)[0].avatar = data.avatar; }
    sockets.filter((key) => key.id == socket.id)[0].room = data.room;
    sockets.filter((key) => key.id == socket.id)[0].author = data.author;
    if (data.msg) { sockets.filter((key) => key.id == socket.id)[0].lastMsg = data.msg; }
    sockets.filter((key) => key.id == socket.id)[0].lastT = data.t;
};

// define as salas em cache local
function setRoomsData(socket, data) {
    var newObj = {};

    if (rooms.filter((key) => key.room == data.room).length == 0) {
        newObj.author = data.author;
        newObj.room = data.room;
        newObj.t = new Date().getTime();
        rooms.push(newObj);
    };
};

io.on('connection', socket => {
    hosts ++;
    //console.log(`Um usuario se conectou no socket: ${socket.id}, total conectados: ${hosts}`);
    sockets.push({id: socket.id});
    console.log(`O usuario: ${socket.id} entrou`);

    // enviou mensagem
    socket.on('sendMessage', data => {
        setSocketsData(socket, data);
        messages.push(data);
        socket.join(data.room);
        socket.to(data.room).emit('recivedMessage', data);
    });

    // esta digitando
    socket.on('hasTyping', data => {
        socket.join(data.room);
        socket.to(data.room).emit('userHasTyping', data);
    });

    // parou de digitar
    socket.on('stopTyping', data => {
        socket.join(data.room);
        socket.to(data.room).emit('userStopTyping', data);
    });

    // entrou em usa sala
    socket.on('join', data => {
        setSocketsData(socket, data);
        setRoomsData(socket, data);
        socket.join(data.room);
        socket.emit('previusMessages', messages.filter((rows) => rows.room == data.room));
        socket.emit('recivedChat', rooms.filter((rows) => rows.room == data.room));
    });

    // disconectou da sessao
    socket.on('disconnect', () => {
        hosts --;
        const newObj = sockets.filter((key) => key.id !== socket.id);
        sockets = newObj;
        console.log(`O usuario: ${socket.id} saiu`);
    });
});

server.listen(3000);