// funcao para apagar todas as mensagens no chat
function clearMessages() {
    $('#contentChat').empty();
}

// funcao que renderiza a mensagem no scopo
function renderMessage(message, type) {

    var userCurrent = $('input[name=username]').val();
    var lastMsg = $('#contentChat').children().last();
    var lastAuthorMsg = $(lastMsg).attr('name');
    var contentLastMsg = $(lastMsg).children().last();
    var dateSend = moment(message.t).calendar();
    var author = message.author;
    var msg = message.msg;
    var avatar = message.avatar;
    var typeChat = type == 'previusMsg' ? 'bodyDialogGroup' : 'bodyDialog'

    var me = `
        <div id="${message.type}_${message.t}_${author}_${message.room}" class="d-flex flex-row d-flex align-items-start cardMsgDialog meSendMessage" name="${author}">
            <img src="${avatar}" class="rounded-circle object-fit-cover border border-2 m-2 imgDialog">
            <div class="${typeChat} boxMe">
                <div id="${message.id}_${message.type}_${message.t}_${author}_${message.room}" class="p-2 rounded bg-white chatDialogLeftContentDefault mt-2 mb-2 text-break">
                    ${msg}
                </div>
            </div>
        </div>
    `;
    var meAlone = `
        <div id="${message.id}_${message.type}_${message.t}_${author}_${message.room}" class="p-2 rounded bg-white chatDialogLeftContentDefault mt-2 mb-2 meSendMessage text-break">
            ${msg}
        </div>
    `;
    var you = `
        <div id="${message.type}_${message.t}_${author}_${message.room}" class="d-flex flex-row-reverse d-flex align-items-start cardMsgDialog youSendMessage" name="${author}">
            <img src="${avatar}" class="rounded-circle object-fit-cover border border-2 m-2 imgDialog">
            <div class="${typeChat} boxYou d-flex flex-column align-items-end">
                <div id="${message.id}_${message.type}_${message.t}_${author}_${message.room}" class="p-2 rounded chatDialogRightContentDefault mt-2 mb-2 text-break">
                    ${msg}
                </div>
            </div>
        </div>
    `;
    var youAlone = `
        <div id="${message.id}_${message.type}_${message.t}_${author}_${message.room}" class="p-2 rounded chatDialogRightContentDefault mt-2 mb-2 youSendMessage text-break">
            ${msg}
        </div>
    `;

    // verefica que enviou a mensagem
    if (userCurrent == author) {
        if (lastAuthorMsg == author) {
            $(contentLastMsg).append(meAlone);
        } else {
            $('#contentChat').append(me);
        }
    } else {
        if (lastAuthorMsg == author) {
            $(contentLastMsg).append(youAlone);
        } else {
            $('#contentChat').append(you);
        }
    }

};