document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('call-button').addEventListener('click', callCustomer);
    document.getElementById('reset-button').addEventListener('click', confirmReset);
    displayHistoryIndex();



    window.addEventListener('storage', (event) => {
        if (event.key === 'historyUpdated') {
            displayHistoryIndex();
        }
    });
});


function callCustomer() {
    const customerPwdInput = document.getElementById('customer-pwd');
    const customerPwd = customerPwdInput.value.trim();

    let verifyInt = parseInt(customerPwd);

    if (customerPwd !== '' && Number.isInteger(verifyInt) && !isNaN(verifyInt)) {
        addToHistory(customerPwd);

        customerPwdInput.value = '';

        localStorage.setItem('historyUpdated', 'true');

        displayHistoryIndex();

        openOrFocusHistoryPage();
    } else {
        alert('Por favor, insira a senha do cliente corretamente.');
    }
}

function openOrFocusHistoryPage() {
    const historyPage = window.open('./html/history.html', 'Histórico de Chamadas');
    historyPage.focus();
}

function displayHistoryIndex() {
    const historyList = document.getElementById('history-list-index');
    const historyData = JSON.parse(localStorage.getItem('history')) || [];

    const resetRequested = JSON.parse(localStorage.getItem('resetRequested')) || false;

    if (resetRequested) {
        clearHistory();
        localStorage.setItem('resetRequested', false);
    }

    const reversedHistoryData = historyData.slice().reverse();

    historyList.innerHTML = reversedHistoryData.map(item => `<li>${item}</li>`).join('');
}

function addToHistory(customerPwd) {
    const historyData = JSON.parse(localStorage.getItem('history')) || [];
    historyData.push(customerPwd);
    localStorage.setItem('history', JSON.stringify(historyData));

}

function clearHistory() {
    localStorage.removeItem('history');
}

function confirmReset() {
    const confirmation = confirm('Tem certeza de que deseja limpar o histórico? Esta ação não pode ser desfeita.');

    if (confirmation) {
        localStorage.setItem('historyUpdated', 'true');
        clearHistory();
        displayHistoryIndex();
    }
}
