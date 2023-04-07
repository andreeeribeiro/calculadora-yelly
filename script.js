const valorVendaInput = document.getElementById("valor-venda");
const modalidadeSelect = document.getElementById("modalidade");
const quantidadeParcelasSelect = document.getElementById("quantidade-parcelas");
const valorParcelasInput = document.getElementById("valor-parcelas");
const valorTotalInput = document.getElementById("valor-total");
const calcularButton = document.getElementById("calcular");

const taxas = {
  debito: 1.3899961389996,
  credito: {
    1: 3.050280305028,
    2: 4.5696964569696,
    3: 5.3296745329675,
    4: 6.1007946100795,
    5: 6.8718606871861,
    6: 7.6426207642621,
    7: 8.4834008483401,
    8: 9.2657349265735,
    9: 10.0594270059427,
    10: 10.8401770840177,
    11: 11.6445251644525,
    12: 12.4479912447991,
    13: 13.2502873250287,
    14: 14.0510894051089,
    15: 14.8501274850127,
    16: 15.6738075673808,
    17: 16.4958136495814,
    18: 17.3158217315822,
  },
};

// Função para formatar um número como um valor em BRL
function formatarValorBRL(valor) {
  return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
}

function calcularValorParcelas(valor, quantidadeParcelas, taxa) {
  const valorParcela = (valor / quantidadeParcelas) * (1 + taxa / 100);
  return valorParcela;
}

// Função para calcular o valor total da venda
function calcularValorTotal(valor, modalidade, quantidadeParcelas) {
  if (modalidade === "debito") {
    return valor * (1 + taxas.debito / 100);
  } else {
    const taxa = taxas.credito[quantidadeParcelas];
    const valorParcelas = calcularValorParcelas(
      valor,
      quantidadeParcelas,
      taxa
    );
    valorParcelasInput.value = formatarValorBRL(valorParcelas);
    return valor + valor * (taxa / 100);
  }
}

// Função para atualizar o valor total da venda
function atualizarValorTotal() {
  const valor = parseFloat(valorVendaInput.value);
  const modalidade = modalidadeSelect.value;
  const quantidadeParcelas = parseInt(quantidadeParcelasSelect.value);
  if (!isNaN(valor)) {
    const valorTotal = calcularValorTotal(
      valor,
      modalidade,
      quantidadeParcelas
    );
    valorTotalInput.value = formatarValorBRL(valorTotal);
  } else {
    valorTotalInput.value = "";
  }
}

// Evento de mudança na modalidade para mostrar ou esconder a quantidade de parcelas
modalidadeSelect.addEventListener("change", function () {
  if (modalidadeSelect.value === "credito") {
    document.getElementById("parcelas").style.display = "block";
  } else {
    document.getElementById("parcelas").style.display = "none";
  }
});

// Evento de mudança na quantidade de parcelas para atualizar o valor total da venda
quantidadeParcelasSelect.addEventListener("change", function () {
  atualizarValorTotal();
});

calcularButton.addEventListener("click", atualizarValorTotal);
modalidadeSelect.addEventListener("change", atualizarValorTotal);
quantidadeParcelasSelect.addEventListener("change", atualizarValorTotal);
