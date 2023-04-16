axios.defaults.headers.common['Authorization'] = '';

const login = prompt('Qual seu lindo nome?');

let message = [];

let user = {
    name: login
};


/*Enviar nome*/

function loginUser () {
    
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', user);
    promisePOST.then(statusUser);
    promisePOST.catch(errorName);
}


/*Verificar status*/

function statusUser () {

    connectedUser();
    setInterval(connectedUser, 5000);

    loadMessages();
    setInterval(loadMessages, 3000);
}


/*Verificar nome*/

function errorName (error) {
    console.log(error.response);

    if (error.response.status === 400){
        alert('Esse nome já está em uso. Digite outro!')
        window.location.reload()
    };
};


/*Usuário conectado*/

function connectedUser() {
    const promisePOST = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', user);
    promisePOST.then(statusConnected);
    promisePOST.catch(statusError);
}

function statusConnected() {
    console.log('Usuário conectado');
}

function statusError() {
    console.log('Usuário desconectado');
}