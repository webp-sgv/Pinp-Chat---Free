const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const sqlite = require('../db/config'); // BIBLIOTECA QUE CONECTA AO SQLITE
const sqlQuery = require('../db/query'); // BIBLIOTECA QUE EXECULTA QUERY'S
const port = process.env.PORT || 3000;

module.exports = function () {

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

    // execulta query
    async function execulteQuery(command, params) {
        const conn = new sqlite();
        const query = new sqlQuery();
        const db = await conn.connection();
        const resultQuery = await query.execulteQuery(db, command, params);
        return resultQuery;
    };

    app.use(express.static(path.join(__dirname, '../public')));
    app.set('views', path.join(__dirname, '../public'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    let messages = [];
    let hosts = 0;
    let sockets = [];
    let rooms = [];

    io.on('connection', socket => {

        hosts++;

        sockets.push({ id: socket.id });

        // enviou mensagem
        socket.on('sendMessage', async (data) => {
            var query = `
                INSERT INTO message (
                    author,
                    type,
                    msg,
                    room,
                    avatar,
                    t
                ) VALUES (
                    $author,
                    $type,
                    $msg,
                    $room,
                    $avatar,
                    $t
                );
            `;
            var params = {
                "$author": data.author,
                "$type": 'chat',
                "$msg": data.msg,
                "$room": data.room,
                "$avatar": data.avatar,
                "$t": data.t
            };
            execulteQuery(query, params);
            setSocketsData(socket, data);
            messages.push(data);
            socket.join(data.room);
            socket.to(data.room).emit('recivedMessage', data);
        });

        // esta digitando
        socket.on('hasTyping', data => {
            socket.to(data.room).emit('userHasTyping', data);
        });

        // parou de digitar
        socket.on('stopTyping', data => {
            socket.to(data.room).emit('userStopTyping', data);
        });

        // entrou em usa sala
        socket.on('join', async (data) => {
            setSocketsData(socket, data);
            setRoomsData(socket, data);
            socket.join(data.room);

            var query = `
                SELECT 
                *
                FROM message
                WHERE room = $room
                ORDER BY id ASC
                LIMIT 100;
            `;
            var params = {
                "$room": data.room
            };
            const filds = await execulteQuery(query, params);
            socket.emit('previusMessages', filds);
            socket.emit('recivedChat', rooms.filter((rows) => rows.room == data.room));
            socket.to(data.room).emit('userJoinChat', data);
        });

        // disconectou da sessao
        socket.on('disconnect', () => {
            hosts--;
            const newObj = sockets.filter((key) => key.id !== socket.id);
            sockets = newObj;
            console.log(`O usuario: ${socket.id} saiu`);
        });

    });

    server.listen(port);

    return app;

};