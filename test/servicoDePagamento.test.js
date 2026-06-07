import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de Serviço de Pagamento', () => {

    it('Validar que o pagamento foi adicionado corretamente e é maior que 100.00', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        //Act
        servicoDePagamento.realizarPagamento('111-222-333', 'JulioBank', 101.00);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(pagamento.codigoBarras, '111-222-333');
        assert.equal(pagamento.empresa, 'JulioBank');
        assert.equal(pagamento.valor, 101.00);
        assert.equal(pagamento.categoria, 'cara');
    })

    it('Validar que o pagamento é menor ou igual a 100.00', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();

        //Act
        servicoDePagamento.realizarPagamento('111-222-333', 'JulioBank', 99.99);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(pagamento.codigoBarras, '111-222-333');
        assert.equal(pagamento.empresa, 'JulioBank');
        assert.equal(pagamento.valor, 99.99);
        assert.equal(pagamento.categoria, 'padrão');
    })

    it('Validar que o pagamento de exatamente 100.00 é categorizado como padrão', () => {
    // Arrange
    const servicoDePagamento = new ServicoDePagamento();

    // Act
    servicoDePagamento.realizarPagamento('111-222-333', 'JulioBank', 100.00);

    const pagamento = servicoDePagamento.consultarUltimoPagamento();

    // Assert
    assert.equal(pagamento.valor, 100.00);
    assert.equal(pagamento.categoria, 'padrão');
});

    it('Validar que retorna o último pagamento realizado', () => {
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.realizarPagamento('111-222-333', 'JulioBank', 50.00);
        servicoDePagamento.realizarPagamento('222-333-444', 'LeãoBank', 80.00);
        servicoDePagamento.realizarPagamento('333-444-555', 'DenysBank', 150.00);

        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(ultimoPagamento.codigoBarras, '333-444-555');
        assert.equal(ultimoPagamento.empresa, 'DenysBank');
        assert.equal(ultimoPagamento.valor, 150.00);
        assert.equal(ultimoPagamento.categoria, 'cara');
        
    });
});