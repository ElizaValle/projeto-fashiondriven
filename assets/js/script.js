let tModeloCamisa, tGola, tTecido;

let userName = prompt('Digite seu nome');

let author = userName;
let owner = userName;

let shirt;
let recentShirts = [];

let url = document.querySelector('#url').value;
console.log(typeof(url));

let input = document.querySelector('input');
input.addEventListener('keydown', enableButton);

//rendeiza página adicionando nova blusa
function updateRecentShirtsList() {
    let recentShirts = document.querySelector('.ultimos-pedidos');

    let recentShirstsHTML = '';

    for(let i = 0; i < recentShirts.length; i++) {
        
        let template = `
            <div class="ultimo-pedido">
                <div class="foto-camisa">
                    <img src="${shirt.image}" />
                </div>
                <div class="titulo-criador"><span>Criador:</span> &nbsp ${shirt.author}</div>
            </div>
        `;

        recentShirstsHTML.innerHTML += template;
    }
}

// Função para buscar blusas recentes do servidor
function getRecentShirts() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(response => {
        if (response.status === 200) {
            return response;
        } else {
            throw new Error("Erro ao buscar blusas recentes");
        }
    })
    .then(data => {
        recentShirts = data;
        updateRecentShirtsList();
    })
    .catch(error => {
        console.log(error)
        alert("Ops, não conseguimos buscar as blusas recentes");
    });
  }

//faz requisição para adicionar nova blusa ao servidor
function sendRequest() {

     let infoCamisa = {
        model: tModeloCamisa,
        neck: tGola,
        material: tTecido,
        image: url,
        owner: owner,
        author: author
    };
    console.log(infoCamisa);
    console.log(typeof(infoCamisa)); 

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', infoCamisa);
    promise.then(response => {
        if(response.status === 201) {
            return response;
        } else {
            throw new Error('Erro ao criar blusa');
        }
    })
    .then(data => {
        //adiciona blusa criada à lista de blusas recentes
        recentShirts.unshift(data);

        // Chama a função para buscar blusas recentes do servidor ao carregar a página
        getRecentShirts();

        //exibe alerta confirmando encomenda
        alert('Blusa personalizada encomendada com sucesso!');
    })
    .catch(error => {
        console.log(error);
        alert('Ops, não conseguimos processar sua encomenda.');
        window.location.reload();
    });
}

function enableButton() {
    if(tModeloCamisa && tGola && tTecido) {
        //verificar se input está vazio
        const url = document.getElementById('url');
        if(url.value !== '') {
            const botao = document.querySelector('.confirmar-pedido');
            botao.classList.add('ativo');
            botao.removeAttribute('disabled');

            sendRequest();
        }
    }
}

function selecionaModeloCamisa(modeloCamisaSelecionado) {
    const modeloCamisaAnterior = document.querySelector('.modelo-camisa .selecionado');
    if(modeloCamisaAnterior !== null) {
        modeloCamisaAnterior.classList.remove('selecionado');
    }

    modeloCamisaSelecionado.querySelector('.imagem').classList.add('selecionado');
    console.log(modeloCamisaSelecionado);

    tModeloCamisa = modeloCamisaSelecionado.querySelector('.titulo').innerHTML;
    console.log(tModeloCamisa);

    enableButton(); 
}

function selecionaGolaCamisa(golaCamisaSelecionada) {
    const golaCamisaAnterior = document.querySelector('.gola-camisa .selecionado');
    if(golaCamisaAnterior !== null) {
        golaCamisaAnterior.classList.remove('selecionado');
    }

    golaCamisaSelecionada.querySelector('.imagem').classList.add('selecionado');
    console.log(golaCamisaSelecionada);

    tGola = golaCamisaSelecionada.querySelector('.titulo').innerHTML;
    console.log(tGola);

    enableButton();
}

function selecionaTecidoCamisa(tecidoCamisaSelecionado) {
    const tecidoCamisaAnterior = document.querySelector('.tecido-camisa .selecionado');
    if(tecidoCamisaAnterior !== null) {
        tecidoCamisaAnterior.classList.remove('selecionado');
    }

    tecidoCamisaSelecionado.querySelector('.imagem').classList.add('selecionado');
    console.log(tecidoCamisaSelecionado);

    tTecido = tecidoCamisaSelecionado.querySelector('.titulo').innerHTML;
    console.log(tTecido);

    enableButton();
}
