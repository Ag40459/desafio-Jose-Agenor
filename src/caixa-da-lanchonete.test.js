import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 9,03', ['combo1,1']],
        ['credito', 'R$ 9,79', ['combo1,1']],
        ['debito', 'R$ 9,50', ['combo1,1']],
        ['debito', 'R$ 28,50', ['combo1,3']],
        ['dinheiro', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
        ['credito', 'R$ 24,21', ['cafe,2', 'sanduiche,1', 'combo1,1', 'chantily,1']],
        ['boleto', 'Forma de pagamento inválida!', ['cafe,1']],
    ])('compra %p deve resultar em %p', validaTeste);

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

        test.each([
            ['dinheiro', 'R$ 9,03', ['combo1,1']],
            ['credito', 'R$ 9,79', ['combo1,1']],
            ['debito', 'R$ 9,50', ['combo1,1']],
            ['debito', 'R$ 28,50', ['combo1,3']],
            ['dinheiro', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
            ['dinheiro', 'R$ 6,17', ['cafe,1', 'queijo,1','chantily,1']],
            ['dinheiro', 'Item extra não pode ser pedido sem o principal', [ 'queijo,1','chantily,1']],
            ['dinheiro', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,3',]],
            ['boleto', 'Forma de pagamento inválida!', ['cafe,1']],
            ['dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
            ['credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
            ['credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
            ['debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
        ])('compra %p deve resultar em %p', validaTeste);

        test.each([
            ['dinheiro', 'R$ 9,03', ['combo1,1']],
            ['credito', 'R$ 9,79', ['combo1,1']],
            ['debito', 'R$ 9,50', ['combo1,1']],
            ['debito', 'R$ 28,50', ['combo1,3']],
            ['dinheiro', 'R$ 4,27', ['cafe,1', 'chantily,1']],
            ['dinheiro', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
            ['credito', 'R$ 24,21', ['cafe,2', 'sanduiche,1', 'combo1,1', 'chantily,1']],
            ['boleto', 'Forma de pagamento inválida!', ['cafe,1']],
            ['dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
            ['credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
            ['credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
            ['debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
            ['dinheiro', 'R$ 10,92', ['sanduiche,1', 'cafe,1', 'queijo,1']],
            ['credito', 'R$ 11,85', ['sanduiche,1', 'cafe,1', 'queijo,1']],
            ['debito', 'R$ 11,50', ['sanduiche,1', 'cafe,1', 'queijo,1']],
            ['dinheiro', 'R$ 10,45', ['sanduiche,1', 'cafe,1', 'chantily,1']],
            ['credito', 'R$ 11,33', ['sanduiche,1', 'cafe,1', 'chantily,1']],
            ['debito', 'R$ 11,00', ['sanduiche,1', 'cafe,1', 'chantily,1']],
            ['dinheiro', 'R$ 17,10', ['combo1,1', 'sanduiche,1', 'queijo,1']],
            ['credito', 'R$ 18,54', ['combo1,1', 'sanduiche,1', 'queijo,1']],
            ['debito', 'R$ 18,00', ['combo1,1', 'sanduiche,1', 'queijo,1']],
            ['dinheiro', 'R$ 9,97', ['combo2,1', 'cafe,1']],
            ['credito', 'R$ 10,81', ['combo2,1', 'cafe,1']],
            ['debito', 'R$ 10,50', ['combo2,1', 'cafe,1']],
        ])('compra %p deve resultar em %p', validaTeste);
        
        
});
