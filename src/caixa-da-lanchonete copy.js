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
        if (itens.length < 1) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        const itensPrincipais = [];
        const itensCombo = [];
        const itensExtras = [];

        for (const itemInfo of itens) {

            const [codigo, quantidade] = itemInfo.split(',');

            const item = this.cardapio[codigo];

            if (!item || !item.nome || item.nome === 'undefined') return "Item inválido!";

            if (codigo.includes('chantily') && quantidade < 2) {
                if (!(item.nome).includes('cafe')) {
                    return "Item extra não pode ser pedido sem o principal"
                }
            }

            if (codigo.includes('queijo') && quantidade < 2) {
                if (!(item.nome).includes('sanduiche')) {
                    return "Item extra não pode ser pedido sem o principal"
                }
            }



            valorTotal += item.valor * quantidade;

            if (valorTotal <= 0 || !valorTotal) return "Quantidade inválida!"

        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === "credito") {
            valorTotal *= 1.03;
        } else if (metodoDePagamento !== "debito") {
            return "Forma de pagamento inválida!";
        }

        const valorFormatado = valorTotal.toFixed(2).replace('.', ',');

        return `R$ ${valorFormatado}`;
    }
}

export { CaixaDaLanchonete };
