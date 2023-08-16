class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: {
                nome: 'cafe',
                descricao: "Café",
                tipo: 'P',
                valor: 3.00
            },
            chantily: {
                nome: 'chantily',
                descricao: "Chantily (extra do Café)",
                tipo: 'E',
                valor: 1.50
            },
            suco: {
                nome: 'suco',
                descricao: "Suco Natural",
                tipo: 'P',
                valor: 6.20
            },
            sanduiche: {
                nome: 'sanduiche',
                descricao: "Sanduíche",
                tipo: 'P',
                valor: 6.50
            },
            queijo: {
                nome: 'queijo',
                descricao: "Queijo (extra do Sanduíche)",
                tipo: 'E',
                valor: 2.00
            },
            salgado: {
                nome: 'salgado',
                descricao: "Salgado",
                tipo: 'P',
                valor: 7.25
            },
            combo1: {
                nome: 'combo1',
                descricao: "1 Suco e 1 Sanduíche",
                tipo: 'C',
                valor: 9.50
            },
            combo2: {
                nome: 'combo2',
                descricao: "1 Café e 1 Sanduíche",
                tipo: 'C',
                valor: 7.50
            }
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (!["dinheiro", "debito", "credito"].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length < 1) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        const itensPrincipais = [];
        const itensCombos = [];
        const itensExtras = [];

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            const item = this.cardapio[codigo];

            if (!item || !item.nome || item.nome === 'undefined') {
                return "Item inválido!";
            }

            if (item.tipo === 'P') {
                itensPrincipais.push(item);
            } else if (item.tipo === 'E') {
                itensExtras.push(item);
            } else if (item.tipo === 'C') {
                itensCombos.push(item);
            }

            valorTotal += item.valor * quantidade;

            if (valorTotal <= 0 || !valorTotal) {
                return "Quantidade inválida!";
            }
        }

        if (itensExtras.length > 0 && itensPrincipais.length === 0) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (itensExtras.length > 0 && itensPrincipais.length > 0) {
            const buscaSanduiche = itensPrincipais.some(item => item.nome === 'sanduiche');
            const buscaCafe = itensPrincipais.some(item => item.nome === 'cafe');
            const sanduicheCafe = itensPrincipais.some(item => item.nome === 'sanduiche' || item.nome === 'cafe');

            if (itensExtras.length < 2) {

                for (const itemExtra of itensExtras) {
                    if (itemExtra.nome === 'queijo' && !buscaSanduiche) {
                        return "Item extra não pode ser pedido sem o principal";
                    }

                    if (itemExtra.nome === 'chantily' && !buscaCafe) {
                        return "Item extra não pode ser pedido sem o principal";
                    }
                }
            } else {
                const nomesItensExtras = itensExtras.map(item => item.nome);
                const nomesDiferentes = (nomesItensExtras).size !== 1;

                if (nomesDiferentes && !sanduicheCafe) {
                    return "Item extra não pode ser pedido sem o principal";
                }

                if (!nomesDiferentes) {
                    for (const itemExtra of itensExtras) {
                        if (itemExtra.nome === 'chantily' && !buscaCafe) {
                            return "Item extra não pode ser pedido sem o principal";
                        }

                        if (itemExtra.nome === 'queijo' && !buscaSanduiche) {
                            return "Item extra não pode ser pedido sem o principal";
                        }
                    }
                }
            }
        }


        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === "credito") {
            valorTotal *= 1.03;
        }

        const valorFormatado = valorTotal.toFixed(2).replace('.', ',');

        return `R$ ${valorFormatado}`;
    }

}

export { CaixaDaLanchonete };
