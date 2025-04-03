const itens = [];

function adicionar(item) {
    if (validar_item_a_cadastrar(item)) {
        itens.push(item);
        return `Item ${item.nome} adicionado com sucesso!`;
    }
    return "Erro ao adicionar item.";
}

function listar() {
    return itens;
}

function editar(id, qtd) {
    return editar_item(id, qtd);
}

function remover(id) {
    if (!is_numerico(id) || id <= 0) {
        return "ID inválido!";
    }

    for (let i = 0; i < itens.length; i++) {
        if (itens[i].id === id) {
            itens.splice(i, 1); // Remove o item do array
            return `Item com ID ${id} removido com sucesso.`;
        }
    }

    return "ID não encontrado!";
}

module.exports = { adicionar, listar, editar, remover };

// Funções auxiliares
function is_numerico(n) {
    return !isNaN(n) && n !== null;
}

function is_id_cadastrado(id) {
    return itens.some(item => item.id === id);
}

function validar_item_a_cadastrar(item) {
    return (
        is_numerico(item.id) && item.id > 0 &&
        !is_id_cadastrado(item.id) &&
        is_numerico(item.qtd) && item.qtd >= 0 &&
        item.nome.length > 0
    );
}

function editar_item(id, qtd) {
    if (!is_numerico(id) || id <= 0) return "ID inválido!";
    if (!is_id_cadastrado(id)) return "ID não cadastrado!";
    if (!is_numerico(qtd) || qtd < 0) return "Quantidade inválida!";

    for (let item of itens) {
        if (item.id === id) {
            item.qtd = qtd;
            return `Item ${item.nome} atualizado para ${qtd} unidades.`;
        }
    }
}