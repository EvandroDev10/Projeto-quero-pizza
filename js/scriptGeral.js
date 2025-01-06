

function limpa_formulário_cep() {
    
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}
function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} 
else {
    
    limpa_formulário_cep();
}
}

function pesquisacep(valor) {


var cep = valor.replace(/\D/g, '');


if (cep != "") {

   
    var validacep = /^[0-9]{8}$/;

    
    if(validacep.test(cep)) {

        
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        
        var script = document.createElement('script');

        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        
        document.body.appendChild(script);

    } 
    else {
        
        limpa_formulário_cep();
    }
} 
else {
    
    limpa_formulário_cep();
}
};

// Variáveis globais para armazenar detalhes do pedido
let orderItems = [];
let totalPrice = 0;

// Função para adicionar pizza selecionada ao pedido
function selecionar(index) {
    const pizzaElements = document.getElementsByClassName('pizza-content');
    const selectedPizza = pizzaElements[index];
    const pizzaName = selectedPizza.querySelector('[name="tipo"]').textContent;
    const pizzaPrice = selectedPizza.querySelector('[name="custo"]').textContent;

    // Verificar se pizza já existe no pedido
    const existingItemIndex = orderItems.findIndex(item => item.name === pizzaName);

    if (existingItemIndex !== -1) {
        // Incrementar quantidade se já existir
        orderItems[existingItemIndex].quantity++;
    } else {
        // Adicionar novo item ao pedido
        orderItems.push({
            name: pizzaName,
            price: pizzaPrice,
            quantity: 1
        });
    }

    // Calcular preço total
    totalPrice += parseFloat(pizzaPrice.replace(',', '.'));

    // Atualizar exibição do pedido
    atualizarListaPedidos();
}

// Função para atualizar lista de pedidos
function atualizarListaPedidos() {
  const orderContainer = document.getElementById('DIVordem');
  const orderList = document.getElementById('order-list') || document.createElement('div');
  orderList.id = 'order-list';
  orderList.innerHTML = orderItems.map((item, idx) =>
      `<div class="pedido-container">
          <div class="pizza-pollar">
              <img src="/img/${item.name}.png" alt="${item.name}" class="pollar">
          </div>
          <div class="desc-container-pedido">
              <span>${item.name}</span>
              <span>R$ ${item.price}</span>
          </div>
          <div class="quantidade-remover-container">
              <button onclick="alterarQuantidade(${idx}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="alterarQuantidade(${idx}, 1)">+</button>
              <button onclick="removerItem(${idx})">❌</button>
          </div>
      </div>`
  ).join('');

  orderContainer.appendChild(orderList);
}

// Função para alterar quantidade de itens
function alterarQuantidade(index, delta) {
    const item = orderItems[index];
    
    // Alterar quantidade
    item.quantity += delta;

    // Atualizar preço total
    totalPrice += delta * parseFloat(item.price.replace(',', '.'));

    // Remover item se quantidade for zero
    if (item.quantity <= 0) {
        orderItems.splice(index, 1);
    }

    // Atualizar lista de pedidos
    atualizarListaPedidos();
}

// Função para remover item completamente
function removerItem(index) {
    const item = orderItems[index];
    
    // Subtrair preço total
    totalPrice -= item.quantity * parseFloat(item.price.replace(',', '.'));

    // Remover item
    orderItems.splice(index, 1);

    // Atualizar lista de pedidos
    atualizarListaPedidos();
}

// Função para registrar pedido e enviar via WhatsApp
function registrarPedido() {
    // Solicitar nome do cliente
    const customerName = prompt('Por favor, digite seu nome:');
    if (!customerName) return;

    // Solicitar endereço de entrega
    const customerAddress = prompt('Digite seu endereço para entrega:');
    if (!customerAddress) return;

    // Validar pedido
    if (orderItems.length === 0) {
        alert('Seu pedido está vazio. Selecione pelo menos uma pizza.');
        return;
    }

    // Construir mensagem do pedido
    const orderMessage = `
*Novo Pedido - Quero Pizza*

*Nome:* ${customerName}
*Endereço:* ${customerAddress}

*Pedido:*
${orderItems.map(item => `• ${item.name} (x${item.quantity}) - R$ ${(parseFloat(item.price.replace(',', '.')) * item.quantity).toFixed(2).replace('.', ',')}`).join('\n')}

*Total:* R$ ${totalPrice.toFixed(2).replace('.', ',')}

Total de itens: ${orderItems.reduce((total, item) => total + item.quantity, 0)}
`;

    // Codificar mensagem para WhatsApp
    const encodedMessage = encodeURIComponent(orderMessage);

    // Número do WhatsApp (número da Quero Pizza)
    const whatsappNumber = '5511937079346';

    // URL do WhatsApp com mensagem pré-preenchida
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');

    // Limpar pedido após envio
    orderItems = [];
    totalPrice = 0;
    atualizarListaPedidos();
}
