const dados = {
  "destinos": [
    {
      "id": 1,
      "nome": "Outback Steakhouse",
      "descricao": "Rede de restaurantes com tema australiano que serve vários cortes de carnes e frutos do mar em porções fartas.",
      "conteudo": "O Outback Steakhouse é sinônimo de experiências gastronômicas inesquecíveis, destino ideal para momentos especiais, com amigos, família e aniversários. Nossos clientes desfrutam de uma culinária com carnes nobres, aperitivos clássicos, a famosa Bloomin Onion® nossa cebola gigante, além da clássica Ribs on the Barbie, costela suína preparada em chama aberta, tradição australiana.",
      "destaque": true,
      "imagem_principal": "img/imagem1.jpg",
      "Avaliacoes": "4,6",
      "cardapio": "https://www.outback.com.br/noshttphttps://www.https://www.outback.com.br/nossosprodutos/menu-principal?gad_source=1&gad_campaignid=21404466636&gbraid=0AAAAACW0DhcmTvAAUvO0MQfopL7cjuYYg&gclid=CjwKCAjwz_bABhAGEiwAm-P8YVlyd4psNGuYnSZmK0PedIYIuFGW_0m18njwnVy3sgr6ED9TGymL4BoCWB0QAvD_BwE.com.br/nossosprodutos/menu-principal?gad_source=1&gad_campaignid=21404466636&gbraid=0AAAAACW0DhcmTvAAUvO0MQfopL7cjuYYg&gclid=CjwKCAjwz_bABhAGEiwAm-P8YVlyd4psNGuYnSZmK0PedIYIuFGW_0m18njwnVy3sgr6ED9TGymL4BoCWB0QAvD_BwEs://www.outback.com.br/nossosprodutos/menu-principal?gad_source=1&gad_campaignid=21404466636&gbraid=0AAAAACW0DhcmTvAAUvO0MQfopL7cjuYYg&gclid=CjwKCAjwz_bABhAGEiwAm-P8YVlyd4psNGuYnSZmK0PedIYIuFGW_0m18njwnVy3sgr6ED9TGymL4BoCWB0QAvD_BwEsosprodutos/menu-principal",
      "instagram": "https://www.instagram.com/outbackbrasil?igsh=dzlzZTlzMnV5dDAz",
      "endereco": "BR-356, 3049 - Belvedere, Belo Horizonte. Localizado no BH Shopping.",
      "Maps": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.804087755939!2d-43.948308924771716!3d-19.974739681423788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa697f83742179f%3A0x414cfee4d5829de5!2sOutback%20Steakhouse!5e0!3m2!1spt-BR!2sbr!4v1746735904230!5m2!1spt-BR!2sbr\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
      "categorias": "Churrascaria",
      "imagens_complementares": [
        {
          "id": 1,
          "src": "img/imagem2.jpg",
          "descricao": "Hambúrguer e batatas"
        },
        {
          "id": 2,
          "src": "img/imagem3.jpg",
          "descricao": "Bloomin Onion"
        },
        {
          "id": 3,
          "src": "img/imagem4.jpg",
          "descricao": "Ribs on the Barbie"
        },
        {
          "id": 4,
          "src": "img/imagem5.jpg",
          "descricao": "Mini hambúrguers e batatas"
        },
        {
          "id": 5,
          "src": "img/imagem6.jpg",
          "descricao": "Porção"
        }
      ]
    }
  ]
};
document.addEventListener("click", function (e) {
  if (e.target.closest(".favorite-btn")) {
    const icon = e.target.closest(".favorite-btn").querySelector("i");
    icon.classList.toggle("bi-star");
    icon.classList.toggle("bi-star-fill");
  }
});

// Inicializa os dados se não existirem no localStorage
function inicializarDados() {
  if (!localStorage.getItem('restauranteData')) {
    const dadosIniciais = {
      restaurantes: [
        {
          id: 1,
          comentarios: [
            { id: 1, nome: "Maria", texto: "Gostei muito!", data: "01/06/25" },
            { id: 2, nome: "João", texto: "Muito cheio!", data: "03/06/25" }
          ]
        }
      ],
      ultimoIdRestaurante: 1,
      ultimoIdComentario: 2
    };
    localStorage.setItem('restauranteData', JSON.stringify(dadosIniciais));
  }
}

// Carrega dados do localStorage
function carregarDados() {
  return JSON.parse(localStorage.getItem('restauranteData'));
}

// Salva dados no localStorage
function salvarDados(dados) {
  localStorage.setItem('restauranteData', JSON.stringify(dados));
}

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', function() {
  inicializarDados();
  carregarRestaurante(1); // Carrega o restaurante com ID 1
});

// Operações CRUD para Comentários

// Adiciona novo comentário
function adicionarComentario(restauranteId, comentario) {
  const dados = carregarDados();
  const restaurante = dados.restaurantes.find(r => r.id === restauranteId);
  
  if (restaurante) {
    comentario.id = ++dados.ultimoIdComentario;
    comentario.data = new Date().toISOString().split('T')[0];
    restaurante.comentarios.push(comentario);
    salvarDados(dados);
    return true;
  }
  return false;
}

// Obtém todos os comentários de um restaurante
function obterComentarios(restauranteId) {
  const dados = carregarDados();
  const restaurante = dados.restaurantes.find(r => r.id === restauranteId);
  return restaurante ? restaurante.comentarios : [];
}

// Atualiza um comentário existente
function atualizarComentario(restauranteId, comentarioAtualizado) {
  const dados = carregarDados();
  const restaurante = dados.restaurantes.find(r => r.id === restauranteId);
  
  if (restaurante) {
    const index = restaurante.comentarios.findIndex(c => c.id === comentarioAtualizado.id);
    if (index !== -1) {
      restaurante.comentarios[index] = {
        ...restaurante.comentarios[index],
        nome: comentarioAtualizado.nome,
        texto: comentarioAtualizado.texto
      };
      salvarDados(dados);
      return true;
    }
  }
  return false;
}

// DELETE - Remove um comentário
function removerComentario(restauranteId, comentarioId) {
  const dados = carregarDados();
  const restaurante = dados.restaurantes.find(r => r.id === restauranteId);
  
  if (restaurante) {
    restaurante.comentarios = restaurante.comentarios.filter(c => c.id !== comentarioId);
    salvarDados(dados);
    return true;
  }
  return false;
}

// Interface do Usuário

function carregarRestaurante(restauranteId) {
  const dados = carregarDados();
  const restaurante = dados.restaurantes.find(r => r.id === restauranteId);
  
  if (restaurante) {
    document.getElementById('restaurante-nome').textContent = restaurante.nome;
    exibirComentarios(restauranteId);
    configurarFormulario(restauranteId);
  }
}

function exibirComentarios(restauranteId) {
  const comentarios = obterComentarios(restauranteId);
  const comentariosList = document.getElementById('comentarios-list');
  comentariosList.innerHTML = '';
  
  comentarios.forEach(comentario => {
    const comentarioElement = document.createElement('div');
    comentarioElement.className = 'list-group-item';
    comentarioElement.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${comentario.nome}</h5>
        <small>${formatarData(comentario.data)}</small>
      </div>
      <p class="mb-1">${comentario.texto}</p>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-primary editar-btn" data-id="${comentario.id}">Editar</button>
        <button class="btn btn-outline-danger excluir-btn" data-id="${comentario.id}">Excluir</button>
      </div>
    `;
    comentariosList.appendChild(comentarioElement);
  });
  
  // Adiciona eventos aos botões
  document.querySelectorAll('.editar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      editarComentarioClick(restauranteId, parseInt(this.dataset.id));
    });
  });
  
  document.querySelectorAll('.excluir-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      excluirComentarioClick(restauranteId, parseInt(this.dataset.id));
    });
  });
}

function configurarFormulario(restauranteId) {
  const form = document.getElementById('comentario-form');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const texto = document.getElementById('texto').value;
    const comentarioId = document.getElementById('comentario-id').value;
    
    if (comentarioId) {
      // Atualizar comentário existente
      if (atualizarComentario(restauranteId, {
        id: parseInt(comentarioId),
        nome,
        texto
      })) {
        resetFormulario();
        exibirComentarios(restauranteId);
      }
    } else {
      // Adicionar novo comentário
      if (adicionarComentario(restauranteId, { nome, texto })) {
        resetFormulario();
        exibirComentarios(restauranteId);
      }
    }
  });
  
  cancelBtn.addEventListener('click', resetFormulario);
}

function editarComentarioClick(restauranteId, comentarioId) {
  const comentarios = obterComentarios(restauranteId);
  const comentario = comentarios.find(c => c.id === comentarioId);
  
  if (comentario) {
    document.getElementById('comentario-id').value = comentario.id;
    document.getElementById('nome').value = comentario.nome;
    document.getElementById('texto').value = comentario.texto;
    
    document.getElementById('submit-btn').textContent = 'Atualizar';
    document.getElementById('cancel-btn').style.display = 'inline-block';
    
    // Rolagem suave até o formulário
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
  }
}

function excluirComentarioClick(restauranteId, comentarioId) {
  if (confirm('Tem certeza que deseja excluir este comentário?')) {
    if (removerComentario(restauranteId, comentarioId)) {
      exibirComentarios(restauranteId);
    }
  }
}

function resetFormulario() {
  document.getElementById('comentario-form').reset();
  document.getElementById('comentario-id').value = '';
  document.getElementById('submit-btn').textContent = 'Enviar';
  document.getElementById('cancel-btn').style.display = 'none';
}

function formatarData(dataString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dataString).toLocaleDateString('pt-BR', options);
}