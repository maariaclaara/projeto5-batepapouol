axios.defaults.headers.common['Authorization'] = 'yIyePyljKKLlAAqdxoXrNeHd';

let user = {
    name: ''
};

while (user.name === '' || user.name === null){
    user.name = prompt('Qual o seu nome?');
    console.log(user.name);
};


/*Enviar nome*/

function loginUser () {

    const promisePOST = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', user);
    promisePOST.then(statusUser);
    promisePOST.catch(errorName);
};


/*Verificar status*/

function statusUser (response) {

    if(response.status === 200){
    connectedUser();
    setInterval(connectedUser, 5000);
    loadMessages();
    setInterval(loadMessages, 3000);
    };
};


/*Verificar nome*/

function errorName (error) {
    console.log(error.response);

    if (error.response.status === 400){
        alert('Esse nome já está em uso. Digite outro!')
        window.location.reload()
    };
};


/*Verificar conexão*/

function connectedUser() {
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', user);
    promisePOST.then(statusConnected);
    promisePOST.catch(statusError);
};

function statusConnected() {
    console.log('Usuário conectado');
};

function statusError() {
    console.log('Usuário desconectado');
    window.location.reload();
};


/*Carregar mensagens*/

function loadMessages() {
    const promiseGET = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseGET.then(messageConnected);
    promiseGET.catch(messageError);
};

function messageConnected(message) {
    const messages = message.data

    let containerContent = document.querySelector('.content');

    containerContent.innerHTML = '';

    for (let i = 0; i < messages.length; i++){

        switch (messages[i].type){

            case 'status':
                containerContent.innerHTML += `
                <div data-test="message" class='divMessage'>
                    <p>
                        <span class='time'>(${messages[i].time})</span>
                        <strong class='name'>${messages[i].from}</strong>
                        <span class='text'>${messages[i].text}</span>
                    </p>
                </div>
                `;
            break;

            case 'message':
                containerContent.innerHTML += `
                <div data-test="message" class='divMessage2'>
                    <p>
                        <span class='time'>(${messages[i].time})</span>
                        <strong class='name'>${messages[i].from}</strong>
                        <span class='text'>para</span>
                        <strong class='name'>${messages[i].to}:</strong>
                        <span class='text'>${messages[i].text}</span> 
                    </p>
                </div>
                `;
            break;
        };
    };
    containerContent.lastElementChild.scrollIntoView();
};

function messageError() {
    window.location.reload();
};


/*Enviar mensagens*/

function send () {

    const sendMessage = document.querySelector('.sendMessage').value;
    document.querySelector('.sendMessage').value = '';
    if (sendMessage === ''){
        return sendMessage;
    };

    const newText = {
        from: user.name,
        to: 'Todos',
        text: sendMessage,
        type: 'message'
    };

    const promisePOST = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', newText);
    promisePOST.then(loadMessages);
    promisePOST.catch(messageError);
};


/*Executar funcoes*/

loginUser();
connectedUser();
loadMessages();
send();