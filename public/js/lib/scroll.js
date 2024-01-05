// move o scroll da pagina ou elemento com animacao
function scrollMove(el, delay) {
    // ex: '#contentChat'
    let sizeScroll = $(el).height();
    $(el).animate({ scrollTop: sizeScroll }, delay);
}