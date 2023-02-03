let tModeloCamisa, tGola, tTecido;

let owner = prompt('Digite seu nome');
let author;

let listaCamisas = [];

const image = document.getElementById('url').value;

const infoCamisa = {
    "model": tModeloCamisa,
    "neck": tGola,
    "material": tTecido,
    "image": image,
    "owner": owner,
    "author": "Nome do author da camisa"
};
console.log(infoCamisa);

let input = document.querySelector('input');
input.addEventListener('keydown', habilitarBotao);

// Função para encomendar uma blusa da lista


function renderizaCamisa() {
    // adiciona a nova blusa à lista de últimos pedidos
    for(let i = 0; i < listaCamisas.length; i++) {

        const ultimosPedidos = document.querySelector('.ultimos-pedidos');

        ultimosPedidos.innerHTML = '';

        let template = `
            <li class="ultimo-pedido">
                <div class="foto-camisa">
                    <img src="${infoCamisa.image}" />
                </div>
                <div class="titulo-criador"><span>Criador:</span> &nbsp ${infoCamisa.author}</div>
            </li>
        `;

        ultimosPedidos.innerHTML += template;
        
        //adiciona no início da lista
        /* const ultimoPedidoFeito = document.querySelector('.ultimos-pedidos li:first-child'); */
        listaCamisas.insertBefore(ultimosPedidos, listaCamisas.firstChild);
    } 
    return template;
}

function sucessoAoBuscarInfoCamisa(resposta) {
    console.log(resposta);

    renderizaCamisa();
}

function erroAoBuscarInfoCamisa(error) {
    console.log('Erro ao buscar informações da camisa');
    //alert();
}

function buscaInfoCamisa() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(sucessoAoBuscarInfoCamisa);
    promise.catch(erroAoBuscarInfoCamisa);
}

function confirmarPedido() {

    infoCamisa.model = tModeloCamisa;
    infoCamisa.neck = tGola;
    infoCamisa.material = tTecido;
    infoCamisa.image = image;
    infoCamisa.owner = owner;
    infoCamisa.author = author;

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', infoCamisa);
    promise.then(resposta => {
        if(resposta.data === 201) {
            // Exibe um alerta de sucesso
            console.log(resposta.data);
            alert("Sua encomenda foi confirmada!");

            renderizaCamisa();
        }
    })
    .catch(error => {
        if(error.resposta === 422) {
            console.log('Erro na requisição: ' + error.resposta.data);
            alert('Ops, não conseguimos processar sua encomenda.');
            window.location.reload(true);
        } 
    });
}

function alertFunc() {
    alert('Encomenda confirmada!')
}

function timeoutFunc () {
    timeout = () => setTimeout(alertFunc, 500);
}

function habilitarBotao() {
    console.log(tModeloCamisa);
    console.log(tGola);
    console.log(tTecido);
    //verificar se modelo camisa foi selecionado
    //verificar se gola foi selecionada
    //verificar se tecido foi selecionado
    if(tModeloCamisa !== undefined && tGola!== undefined && tTecido !== undefined) {
        //verificar se input está vazio
        const url = document.getElementById('url');
        if(url.value !== '') {
            const botao = document.querySelector('.confirmar-pedido');
            botao.classList.add('ativo');
            botao.removeAttribute('disabled');

            alertFunc();
            confirmarPedido();
        }
    }
}

function selecionaModeloCamisa(modeloCamisaSelecionado) {
    const modeloCamisaAnterior = document.querySelector('.modelo-camisa .selecionado');
    if(modeloCamisaAnterior !== null) {
        modeloCamisaAnterior.classList.remove('selecionado');
    }

    modeloCamisaSelecionado.querySelector('.imagem').classList.add('selecionado');

    tModeloCamisa = modeloCamisaSelecionado.querySelector('.titulo').innerHTML;

    habilitarBotao();
    
}

function selecionaGolaCamisa(golaCamisaSelecionada) {
    const golaCamisaAnterior = document.querySelector('.gola-camisa .selecionado');
    if(golaCamisaAnterior !== null) {
        golaCamisaAnterior.classList.remove('selecionado');
    }

    golaCamisaSelecionada.querySelector('.imagem').classList.add('selecionado');

    tGola = golaCamisaSelecionada.querySelector('.titulo').innerHTML;

    habilitarBotao();
}

function selecionaTecidoCamisa(tecidoCamisaSelecionado) {
    const tecidoCamisaAnterior = document.querySelector('.tecido-camisa .selecionado');
    if(tecidoCamisaAnterior !== null) {
        tecidoCamisaAnterior.classList.remove('selecionado');
    }

    tecidoCamisaSelecionado.querySelector('.imagem').classList.add('selecionado');

    tTecido = tecidoCamisaSelecionado.querySelector('.titulo').innerHTML;

    habilitarBotao();
}
