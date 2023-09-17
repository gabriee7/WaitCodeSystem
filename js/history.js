
document.addEventListener('DOMContentLoaded', () => {
    displayHistory();

    setInterval(() => {
        if (localStorage.getItem('historyUpdated') === 'true') {
            displayHistory();
            if(JSON.parse(localStorage.getItem('history')).length != 0){
                entrarEmTelaCheia();
                playAlertSound();
                setTimeout(() => {
                    sairDaTelaCheia();
                }, 6500);
            }
            localStorage.setItem('historyUpdated', 'false');
        }
    }, 1000); 
});

function displayHistory() {
    const historyList = document.getElementById('history-list');
    const historyData = JSON.parse(localStorage.getItem('history')) || [];
    const spanLast = document.getElementById('span-last');

    const reversedHistoryData = historyData.slice().reverse();

    const limitedHistory = reversedHistoryData.slice(1,8);
    const last = reversedHistoryData.slice(0,1);

    historyList.innerHTML = limitedHistory.map(item => `<li>${item}</li>`).join('');
    spanLast.innerText = last.map(item => item).join('');


}

function playAlertSound() {
    const audio = new Audio('../mp3/alerta.mp3'); 

    audio.play();
    // setTimeout(() => {
    //     speakLastCalledPwd();
    // }, 2500);

}

// function speakLastCalledPwd() {
//     if ('speechSynthesis' in window) {
//         const synth = window.speechSynthesis;
//         const historyData = JSON.parse(localStorage.getItem('history')) || [];
//         const pwd = historyData[historyData.length - 1] || '';
//         const utterance = new SpeechSynthesisUtterance(`Senha: ${pwd}`);
//         utterance.lang = 'pt-BR';
//         utterance.rate = 1.0;
//         synth.speak(utterance);
//     }
// }

function entrarEmTelaCheia() {
    const divLastCalled = document.getElementById('last-called');
    divLastCalled.classList.add('fullscreen');
}

function sairDaTelaCheia() {
    const divLastCalled = document.getElementById('last-called');
    divLastCalled.classList.remove('fullscreen');
}
