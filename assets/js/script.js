function selecionaModeloCamisa(modeloCamisaSelecionado) {
    const modeloCamisaAnterior = document.querySelector('.modelo-camisa .selecionado');
    if(modeloCamisaAnterior !== null) {
        modeloCamisaAnterior.classList.remove('selecionado');
    }

    modeloCamisaSelecionado.classList.add('selecionado');
    
}

function selecionaGolaCamisa(golaCamisaSelecionada) {
    const golaCamisaAnterior = document.querySelector('.gola-camisa .selecionado');
    if(golaCamisaAnterior !== null) {
        golaCamisaAnterior.classList.remove('selecionado');
    }

    golaCamisaSelecionada.classList.add('selecionado');
}

function selecionaTecidoCamisa(tecidoCamisaSelecionado) {
    const tecidoCamisaAnterior = document.querySelector('.tecido-camisa .selecionado');
    if(tecidoCamisaAnterior !== null) {
        tecidoCamisaAnterior.classList.remove('selecionado');
    }

    tecidoCamisaSelecionado.classList.add('selecionado');
}


