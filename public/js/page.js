// VERIFICA SE A PAGINA JA CARREGOU
window.addEventListener('load', async function () {
    
    await delay(2000);

    $('#contentHasTyping').hide(); // oculta o card usuario esta digitando
    
    // oculta o splash cloud
    $('.tagSplashcloudBg').addClass('fxSplashSlideBgOut');
    $('.tagSplashcloud:nth(0)').addClass('fxSplashSlideOut1').removeClass('fxSplashSlideIn1');
    $('.tagSplashcloud:nth(1)').addClass('fxSplashSlideOut2').removeClass('fxSplashSlideIn2');
    $('.tagSplashcloud:nth(2)').addClass('fxSplashSlideOut3').removeClass('fxSplashSlideIn3');

    // verifica se ja esta conectado
    checkAuthor();
})