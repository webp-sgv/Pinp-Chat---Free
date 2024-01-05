function playSound(link, linkAlternative) {
    var pageIsOculta = document.hidden;
    if (pageIsOculta) {
        let sound = new Audio(linkAlternative); /* 'audio/click/click.mp3' */
        sound.play();
    } else {
        let sound = new Audio(link); /* 'audio/click/click.mp3' */
        sound.play();
    }
}