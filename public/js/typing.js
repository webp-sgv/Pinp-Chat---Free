// ao digitar mensage
function debounce(func, timeout = 2000) {
    var timer;
    var author = $('input[name=username]').val();
    var room = $('input[name=room]').val();
    var avatar = $('#avatar').attr('src');
    var newObj = {};

    newObj.author = author;
    newObj.room = room;
    newObj.avatar = avatar;
    newObj.t = new Date().getTime();

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
        var arrayFilterUser = typing.filter((key) => key.author == author);
        if (arrayFilterUser.length == 0) {
            typing.push({ "author": author, "room": room, "avatar": avatar, "t": newObj.t });
            socket.emit('hasTyping', newObj);
        }
    };
}

// envia um sinal sinalizando que parou de digitar
function stopTyping() {
    var author = $('input[name=username]').val();
    var room = $('input[name=room]').val();
    var avatar = $('#avatar').attr('src');
    var newObj = {};

    newObj.author = author;
    newObj.room = room;
    newObj.avatar = avatar;
    newObj.t = new Date().getTime();

    socket.emit('stopTyping', newObj);

    var newArray = typing.filter((key) => key.author != author);
    typing = newArray;
}

const startTyping = debounce(() => stopTyping());