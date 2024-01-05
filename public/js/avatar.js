// verifica o status da seta next
function checkNext() {
    var currentIndex = $('#avatar').attr('index');

    if (currentIndex >= links.length) {
        $('#nextAvatar').removeClass('text-primary').addClass('text-secondary');
    } else {
        $('#nextAvatar').addClass('text-primary').removeClass('text-secondary');
    };
};

// verifica o status da seta previus
function checkPrevius() {
    var currentIndex = $('#avatar').attr('index');

    if (currentIndex <= 1) {
        $('#previusAvatar').removeClass('text-primary').addClass('text-secondary');
    } else {
        $('#previusAvatar').addClass('text-primary').removeClass('text-secondary');
    };
};

// verifica qual indice da imagem do avatar
function checkAvatar() {
    var index = $('#avatar').attr('index')
    var obj = links.filter((key) => key.id == index);
    var urlImg = obj[0].link;

    $('#avatar').attr('src', urlImg);
};

// salva o indice do avatar no local
function saveHistoryAvatar(index, data) {
    var newObj = JSON.stringify({ index: index, data: data });
    localStorage.setItem('historyAvatar', newObj);
};

// restaura parametros do localstorage
function restoreHistoryAvatar() {
    var historyAvatar = JSON.parse(localStorage.getItem('historyAvatar'));

    $('#avatar').attr('index', historyAvatar.index);
    $('#avatar').attr('src', historyAvatar.data[0].link);

    checkPrevius();
    checkNext();
};

// ADICIONA OU REMOVE INDICE
function controlIndexAvatar(fx) {
    var currentIndex = parseInt($('#avatar').attr('index'));

    if (fx) {
        if (currentIndex < links.length) {
            playSound('audio/click/click.mp3');
            $('#avatar').attr('index', currentIndex = currentIndex + 1);
        }
    } else {
        if (currentIndex > 1) {
            playSound('audio/click/click.mp3');
            $('#avatar').attr('index', currentIndex = currentIndex - 1);
        }
    }

    checkAvatar(); // verifica qual imagem corresponde ao id do avatar atual
    saveHistoryAvatar(currentIndex, links.filter((key) => key.id == currentIndex))
};

// ao clicar em voltar na aba avatar
$('#previusAvatar').on('click', function () {
    controlIndexAvatar(false);
    checkPrevius();
    checkNext();
});

// ao clicar em seguir na aba avatar
$('#nextAvatar').on('click', function () {
    controlIndexAvatar(true);
    checkNext();
    checkPrevius();
});

setTimeout(() => {
    // restaura o backup do avatar ao iniciar uma nova aba
    restoreHistoryAvatar();
}, 1);