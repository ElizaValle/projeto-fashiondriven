let tModeloCamisa, tGola, tTecido;

let nomeUsuario;

function iniciar() {
    nomeUsuario = prompt("Qual o seu nome?");

    while(nomeUsuario === '' || nomeUsuario === null) {
        nomeUsuario = prompt("Qual o seu nome?");
    }

    axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', {name:nomeUsuario});
}
iniciar();

function habilitarBotao() {
    //verificar se modelo camisa foi selecionado
    //verificar se gola foi selecionada
    //verificar se tecido foi selecionado
    if(tModeloCamisa !== undefined && tGola!== undefined && tTecido !== undefined) {
        //verificar se input está vazio
        const url = document.getElementById('url').value;
        if(url.value === '') {
            const botao = document.querySelector('.confirmar-pedido');
            botao.classList.add('ativo');
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


