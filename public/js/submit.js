// ao clicar no botao enviar
$('#chat').submit(function () {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var room = $('input[name=room]').val();
    var msg = $('#inputSendNewMsg')[0].innerText;
    var avatar = $('#avatar').attr('src');
    var objMsg = {};

    objMsg.author = author;
    objMsg.msg = msg;
    objMsg.room = room;
    objMsg.avatar = avatar;
    objMsg.t = new Date().getTime();

    $('input[name=message]').val('');

    socket.emit('sendMessage', objMsg);
    
    stopTyping(); // sinaliza ao servidor que o usuario parou de digitar
    renderMessage(objMsg);
});

// ao clicar em sair do chat atual
$('#sair').submit(function () {
    event.preventDefault();

    closeSession(); // finaliza a sessao atual

    $('#chat').hide();
    $('#navbar').hide();
    $('#join').show();
});

// quando clicar em procurar uma nova conversa
$('#search').submit(function () {
    event.preventDefault();
});

// quando iniciar a sessao
$('#join').submit(function () {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var room = $('input[name=room]').val();
    var avatar = $('#avatar').attr('src');
    var newObj = {};

    newObj.author = author;
    newObj.room = room;
    newObj.avatar = avatar;
    newObj.t = new Date().getTime();

    joinSession(newObj);

    $('#join').hide();
    $('#navbar').show();
    $('#chat').show();

});
