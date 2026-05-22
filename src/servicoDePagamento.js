export default class ServicoDePagamento {
  #pagamento

  constructor() {
    this.#pagamento = [];
  }

  realizarPagamento(cdb, comp, valor) { // Método
   let categoria;

    if (valor > 100.00) {
      categoria = 'cara';
    } else {
      categoria = 'padrão';
    }

    this.#pagamento.push({
    codigoBarras: cdb,
    empresa: comp,
    valor: valor,
    categoria: categoria
  });
}

consultarUltimoPagamento() {
  return this.#pagamento.at(-1);
}
}