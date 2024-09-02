
// Declaração de variáveis globais para armazenar os nomes dos amigos e os resultados do sorteio //
let amigos = [];
let resultadosSorteio = [];

// Função para adicionar um amigo à lista de amigos. É acionada quando o botão "Adicionar" é clicado.//
function adicionar() {

  // Obtém o valor do campo de entrada (nome do amigo)
  const nomeAmigo = document.getElementById('nome-amigo').value.trim();

  // Verifica se o campo não está vazio e se o nome não está duplicado
  if (nomeAmigo && !amigos.includes(nomeAmigo)) {

    // Adiciona o nome à lista de amigos
    amigos.push(nomeAmigo);

    // Limpa o campo de entrada após adicionar
    document.getElementById('nome-amigo').value = '';

    // Atualiza a exibição dos amigos incluídos
    atualizarListaAmigos();

  } else {
    alert('Por favor, insira um nome válido e não duplicado.');
  }
}

// Função para atualizar a lista de amigos exibida na página.//
function atualizarListaAmigos() {

  const listaAmigos = document.getElementById('lista-amigos');

  // Limpa a lista existente
  listaAmigos.innerHTML = '';

  // Cria uma lista não ordenada (<ul>)
  const ul = document.createElement('ul');

  // Adiciona cada amigo como um item de lista (<li>)
  amigos.forEach((amigo, index) => {

    const li = document.createElement('li');

    li.textContent = amigo;

    // Adiciona um evento de clique para remover o amigo ao clicar no nome
    li.addEventListener('click', () => removerAmigo(index));

    // Adiciona o item à lista não ordenada
    ul.appendChild(li);
  });

  // Adiciona a lista não ordenada ao elemento de exibição
  listaAmigos.appendChild(ul);
}

// Função para remover um amigo da lista quando o nome for clicado.//
function removerAmigo(index) {

  // Remove o amigo do array baseado no índice
  amigos.splice(index, 1);

  // Atualiza a exibição da lista de amigos
  atualizarListaAmigos();
}

// Função para sortear amigos aleatoriamente. É acionada quando o botão "Sortear" é clicado.//
function sortear() {

  // Verifica se há amigos suficientes para realizar o sorteio
  if (amigos.length < 2) {
    alert('Adicione pelo menos dois amigos para realizar o sorteio.');
    return;
  }

  // Cria uma cópia da lista de amigos para o sorteio
  let sorteio = [...amigos];
  resultadosSorteio = [];

  // Embaralha a lista de amigos para garantir aleatoriedade
  sorteio = embaralharArray(sorteio);

  // Realiza o sorteio de pares (quem tira quem)
  sorteio.forEach((amigo, index) => {
    const proximoIndex = (index + 1) % sorteio.length;
    resultadosSorteio.push(`"${amigo}" <<--- tirou --->> "${sorteio[proximoIndex]}"`);
  });

  // Atualiza a exibição dos resultados do sorteio
  atualizarListaSorteio();
}

/**
 * Função para embaralhar um array de forma aleatória.
 * Utiliza o algoritmo de Fisher-Yates.
 * @param {Array} array - O array a ser embaralhado.
 * @returns {Array} - O array embaralhado.
 */
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para atualizar a lista de sorteio exibida na página. //
function atualizarListaSorteio() {
  const listaSorteio = document.getElementById('lista-sorteio');

  // Atualiza o conteúdo do elemento com os resultados do sorteio separados por quebras de linha
  listaSorteio.innerHTML = resultadosSorteio.join('<br>');
}

// Função para reiniciar o sorteio, limpar todas as listas e reiniciar o processo. É acionada quando o link "Reiniciar" é clicado.//
function reiniciar() {
  // Limpa as listas de amigos e de resultados do sorteio
  amigos = [];
  resultadosSorteio = [];

  // Atualiza as exibições para remover todos os nomes
  atualizarListaAmigos();
  atualizarListaSorteio();
}
