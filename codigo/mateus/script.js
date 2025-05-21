
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
