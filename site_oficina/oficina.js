// --- 1. LÓGICA DE CADASTRO E ARMAZENAMENTO DE CLIENTES ---

// Recupera os clientes do localStorage ou inicia com uma lista vazia
let listaClientes = JSON.parse(localStorage.getItem('dinocar_clientes')) || [];

const formCadastro = document.getElementById('formCadastro');
const corpoTabela = document.getElementById('corpoTabela');

// Função para atualizar a tabela na tela
function atualizarTabela() {
  corpoTabela.innerHTML = '';

  if (listaClientes.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#8b949e;">Nenhum cliente cadastrado ainda.</td></tr>`;
    return;
  }

  listaClientes.forEach((cliente) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.modelo}</td>
      <td>${cliente.placa}</td>
    `;
    corpoTabela.appendChild(linha);
  });
}

// Evento de submissão do formulário de Cadastro
formCadastro.addEventListener('submit', function (event) {
  event.preventDefault();

  const novoCliente = {
    nome: document.getElementById('cadNome').value,
    telefone: document.getElementById('cadTelefone').value,
    modelo: document.getElementById('cadModelo').value,
    placa: document.getElementById('cadPlaca').value,
  };

  // Adiciona ao array e salva no armazenamento local do navegador
  listaClientes.push(novoCliente);
  localStorage.setItem('dinocar_clientes', JSON.stringify(listaClientes));

  // Atualiza a tabela na tela e limpa os campos
  atualizarTabela();
  formCadastro.reset();

  alert('Cliente cadastrado com sucesso!');
});

// Executa a renderização da tabela ao carregar a página
atualizarTabela();


// --- 2. LÓGICA DE AGENDAMENTO VIA WHATSAPP ---

const formAgendamento = document.getElementById('formAgendamento');

formAgendamento.addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('agendNome').value;
  const veiculo = document.getElementById('agendVeiculo').value;
  const servico = document.getElementById('agendTipoServico').value;
  const data = document.getElementById('agendData').value;
  const obs = document.getElementById('agendObs').value;

  // Insira aqui o número do WhatsApp da DINOCAR (com DDD, sem pontos ou traços)
  const numeroWhatsapp = "5511999651832";

  // Formatação do texto da mensagem
  const mensagem = `*AGENDAMENTO - DINOCAR*%0A%0A` +
    `*Nome:* ${nome}%0A` +
    `*Veículo:* ${veiculo}%0A` +
    `*Serviço:* ${servico}%0A` +
    `*Data Pretendida:* ${data}%0A` +
    `*Observações:* ${obs || 'Nenhuma'}`;

  const linkWa = `https://wa.me/${numeroWhatsapp}?text=${mensagem}`;

  // Abre o WhatsApp em uma nova aba
  window.open(linkWa, '_blank');
});