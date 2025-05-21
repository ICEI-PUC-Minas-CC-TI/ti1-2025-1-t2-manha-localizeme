function carregarBares(categoria = null) {
    fetch('assets/js/bares.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('categoria-container') || document.getElementById('destinos-container');
            if (!container) {
                console.error('Elemento container para cards não encontrado!');
                return;
            }

            container.innerHTML = '';


            let baresFiltrados = data;
            if (categoria) {
                baresFiltrados = data.filter(bar => bar.categoria === categoria);
            }

            if (baresFiltrados.length === 0) {
                container.innerHTML = '<p class="text-center">Nenhum bar encontrado.</p>';
                return;
            }

            baresFiltrados.forEach(bar => {
                const card = `
                    <div class="col-md-4 col-sm-6">
                        <div class="card h-100">
                            <img src="${bar.imagem}" class="card-img-top" alt="${bar.nome}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${bar.nome}</h5>
                                <p class="card-text">${bar.bairro}</p>
                                <p class="card-text">Nota: ${bar.nota.toFixed(1)}</p>
                                <a href="#" class="btn btn-primary mt-auto">Ver detalhes</a>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', card);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os bares:', error);
            const container = document.getElementById('categoria-container') || document.getElementById('destinos-container');
            if (container) {
                container.innerHTML = '<p class="text-danger text-center">Erro ao carregar os bares. Tente novamente mais tarde.</p>';
            }
        });
}


document.addEventListener('DOMContentLoaded', () => {
    // Exemplo de pegar o nome da página para decidir a categoria
    const pagina = window.location.pathname.split('/').pop();

    let categoria = null;
    if (pagina === 'musica.html') categoria = 'musica';
    else if (pagina === 'jogos.html') categoria = 'jogos';
    else if (pagina === 'cerveja.html') categoria = 'cerveja';
    else if (pagina === 'esportes.html') categoria = 'esportes';

    carregarBares(categoria);
});
