
async function carregarBares() {
  const response = await fetch('bares.json');
  const bares = await response.json();
  const container = document.querySelector('.bar-container');

  bares.forEach(bar => {
    const card = document.createElement('div');
    card.className = 'bar-card';
    card.id = bar.id;
    card.innerHTML = `
      <img src="${bar.imagem}" alt="${bar.nome}" />
      <h3>${bar.nome}</h3>
      <p>${bar.descricao}</p>
    `;
    card.addEventListener('click', () => abrirModal(bar));
    container.appendChild(card);
  });
}

function abrirModal(bar) {
  document.getElementById('modalTitle').textContent = bar.nome;
  document.getElementById('modalDescription').textContent = bar.descricao;
  document.getElementById('barModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('barModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', carregarBares);

//atualização do codigo js para a pagina meus favoritos

let currentBarId = null;

async function carregarBares() {
  const bares = [
    {
      "id": "bar1",
      "nome": "Bar do Lopes",
      "imagem": "assets/bar do lopes.webp",
      "descricao": "Tradicional bar de Belo Horizonte, conhecido por sua vasta seleção de cervejas e petiscos saborosos."
    },
    {
      "id": "bar2",
      "nome": "Juscelino Bar",
      "imagem": "assets/juscelino bar.jpg",
      "descricao": "Um bar aconchegante, famoso pelos drinques exclusivos e o ambiente agradável."
    },
    {
      "id": "bar3",
      "nome": "Mercearia 130",
      "imagem": "assets/Mercearia 130.jpg",
      "descricao": "Barzinho descolado na Savassi, com ótimos petiscos e um ótimo clima para happy hour."
    },
    {
      "id": "bar4",
      "nome": "Birosca S2",
      "imagem": "assets/birosca.png",
      "descricao": "Bar mais descontraído e sempre com música boa. A carne de sol é imperdível!"
    },
    {
      "id": "bar5",
      "nome": "Patorroco",
      "imagem": "assets/paotorroco.JPG",
      "descricao": "Ambiente boêmio e excelente para quem gosta de uma boa música e comida típica mineira."
    },
    {
      "id": "bar6",
      "nome": "Montê Bar",
      "imagem": "assets/montebar.webp",
      "descricao": "Um clássico de BH, o Bar do Cid é perfeito para quem gosta de uma boa cerveja e um petisco simples e gostoso."
    },
    {
      "id": "bar7",
      "nome": "Redentor Bar",
      "imagem": "assets/redentor.webp",
      "descricao": "Com ambiente rústico e descontraído, a Serralheria é famosa por suas cervejas artesanais e petiscos de qualidade."
    },
    {
      "id": "bar8",
      "nome": "Tizé Bar e Butequim",
      "imagem": "assets/tize.webp",
      "descricao": "Especializada em cervejas artesanais, a Falke oferece uma grande variedade de sabores e um ambiente acolhedor."
    }
  ];

  const container = document.querySelector('.bar-container');
  container.innerHTML = '';

  bares.forEach(bar => {
    const card = document.createElement('div');
    card.className = 'bar-card';
    card.innerHTML = `
      <img src="${bar.imagem}" alt="${bar.nome}" />
      <h3>${bar.nome}</h3>
      <p>${bar.descricao}</p>
    `;
    card.addEventListener('click', () => abrirModal(bar));
    container.appendChild(card);
  });
}

function abrirModal(bar) {
  currentBarId = bar.id;
  document.getElementById('modalTitle').textContent = bar.nome;
  document.getElementById('modalDescription').textContent = bar.descricao;

  const favoritarIcon = document.getElementById('favoritarIcon');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};
  if (favoritos[currentBarId]) {
    favoritarIcon.classList.add('favorito');
    favoritarIcon.textContent = '❤️';
  } else {
    favoritarIcon.classList.remove('favorito');
    favoritarIcon.textContent = '🤍';
  }

  carregarComentarios();
  carregarFotos();

  document.getElementById('barModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('barModal').style.display = 'none';
  currentBarId = null;
}

document.getElementById('favoritarBtn').addEventListener('click', () => {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};
  const favoritarIcon = document.getElementById('favoritarIcon');

  if (favoritos[currentBarId]) {
    delete favoritos[currentBarId];
    favoritarIcon.classList.remove('favorito');
    favoritarIcon.textContent = '🤍';
  } else {
    favoritos[currentBarId] = true;
    favoritarIcon.classList.add('favorito');
    favoritarIcon.textContent = '❤️';
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));
});

const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = commentInput.value.trim();
  if (!texto) return;

  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
  if (!comentarios[currentBarId]) comentarios[currentBarId] = [];
  comentarios[currentBarId].push(texto);
  localStorage.setItem('comentarios', JSON.stringify(comentarios));

  commentInput.value = '';
  carregarComentarios();
});

function carregarComentarios() {
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
  const comentariosDoBar = comentarios[currentBarId] || [];
  commentList.innerHTML = '';

  comentariosDoBar.forEach((comentario, index) => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.textContent = comentario;

    const remover = document.createElement('span');
    remover.className = 'comment-remove';
    remover.textContent = '×';
    remover.title = 'Remover comentário';
    remover.addEventListener('click', () => {
      removerComentario(index);
    });

    div.appendChild(remover);
    commentList.appendChild(div);
  });
}

function removerComentario(index) {
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || {};
  if (!comentarios[currentBarId]) return;
  comentarios[currentBarId].splice(index, 1);
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
  carregarComentarios();
}

const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');

photoInput.addEventListener('change', () => {
  const file = photoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const src = e.target.result;
    let fotos = JSON.parse(localStorage.getItem('fotos')) || {};
    if (!fotos[currentBarId]) fotos[currentBarId] = [];
    fotos[currentBarId].push(src);
    localStorage.setItem('fotos', JSON.stringify(fotos));
    carregarFotos();
  };
  reader.readAsDataURL(file);
  photoInput.value = '';
});

function carregarFotos() {
  const fotosBar = JSON.parse(localStorage.getItem('fotos')) || {};
  const fotos = fotosBar[currentBarId] || [];
  photoPreview.innerHTML = '';

  fotos.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Foto do bar';
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => abrirPhotoModal(src));
    photoPreview.appendChild(img);
  });
}

const photoModal = document.getElementById('photoModal');
const photoModalImg = document.getElementById('photoModalImg');

function abrirPhotoModal(src) {
  photoModal.style.display = 'block';
  photoModalImg.src = src;
}

function closePhotoModal() {
  photoModal.style.display = 'none';
}

photoModal.addEventListener('click', (event) => {
  if (event.target === photoModal) {
    closePhotoModal();
  }
});

window.onload = carregarBares;

