// recebe o backup de todas as mensagens
socket.on('previusMessages', function (messages) {
    clearMessages(); // limpa todas as mensagens

    for (message of messages) {
        renderMessage(message);
    };

    scrollMove('#contentChat', 600); // move o scroll para baixo a fim de mostrar a mensagem mais nova
});

// esculta todas mensagens recebidas no canal
socket.on('recivedMessage', function (message) {
    renderMessage(message);
    playSound('audio/chat/chat2.mp3', 'audio/chat/chat3.mp3');
    scrollMove('#contentChat', 1000); // move o scroll para baixo a fim de mostrar a mensagem mais nova
});

// recebe dados do chata
socket.on('recivedChat', function (data) {
    var nameChat = $('input[name=room]').val();
    var optionTime = ['L', 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll'];
    var formatTime = moment(data[0].t).format(optionTime[Math.floor(Math.random() * optionTime.length)]);

    if (data.length > 0) {
        $('#idChat').text(`#${data[0].room}`);
        $('#captionChat').text(`Chat criado: ${formatTime}, por: ${data[0].author}`);
    } else {
        $('#idChat').text(`#${nameChat}`);
    };
});

// ao receber que o usuario esta escrevendo
socket.on('userHasTyping', function (data) {
    var author = data.author;
    var room = data.room;
    var t = data.room;
    $('#textUserHasTyping')[0].innerText = `${author} está digitando`; 
    $('#contentHasTyping').show();
});

// ao receber que o usuario parou de digitar
socket.on('userStopTyping', function (data) {
    $('#textUserHasTyping')[0].innerText = "";
    $('#contentHasTyping').hide();
});