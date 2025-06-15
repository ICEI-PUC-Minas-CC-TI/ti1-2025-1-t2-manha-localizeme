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

            // Criar carousel apenas na página principal
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                criarCarousel(baresFiltrados.slice(0, 5));
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os bares:', error);
            const container = document.getElementById('categoria-container') || document.getElementById('destinos-container');
            if (container) {
                container.innerHTML = '<p class="text-danger text-center">Erro ao carregar os bares. Tente novamente mais tarde.</p>';
            }
        });
}

// Função para criar carousel
function criarCarousel(bares) {
    const carouselInner = document.getElementById('carousel-inner');
    const carouselIndicators = document.getElementById('carousel-indicators');

    if (!carouselInner || !carouselIndicators || bares.length === 0) return;

    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    bares.forEach((bar, index) => {
        // Indicadores
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#carouselDestinos');
        indicator.setAttribute('data-bs-slide-to', index);
        if (index === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);

        // Slides
        const slideDiv = document.createElement('div');
        slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        slideDiv.innerHTML = `
            <img src="${bar.imagem}" class="d-block w-100" alt="${bar.nome}"
                 onerror="this.src='https://via.placeholder.com/1200x400/6c757d/ffffff?text=${encodeURIComponent(bar.nome)}'">
            <div class="carousel-caption d-none d-md-block">
                <h5>${bar.nome}</h5>
                <p>${bar.bairro} - Nota: ${bar.nota.toFixed(1)}</p>
            </div>
        `;
        carouselInner.appendChild(slideDiv);
    });
}

// Função de busca
function realizarBusca() {
    const searchInput = document.getElementById('searchInput');
    const termo = searchInput ? searchInput.value.toLowerCase().trim() : '';

    fetch('assets/js/bares.json')
        .then(response => response.json())
        .then(data => {
            let baresFiltrados = data;

            if (termo) {
                baresFiltrados = data.filter(bar =>
                    bar.nome.toLowerCase().includes(termo) ||
                    bar.bairro.toLowerCase().includes(termo) ||
                    bar.categoria.toLowerCase().includes(termo)
                );
            }

            const container = document.getElementById('categoria-container') || document.getElementById('destinos-container');
            if (!container) return;

            container.innerHTML = '';

            if (baresFiltrados.length === 0) {
                container.innerHTML = '<p class="text-center">Nenhum bar encontrado para sua pesquisa.</p>';
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
            console.error('Erro ao buscar:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // Determinar categoria baseada na página atual
    const pagina = window.location.pathname.split('/').pop();
    let categoria = null;

    if (pagina === 'musica.html') categoria = 'musica';
    else if (pagina === 'jogos.html') categoria = 'jogos';
    else if (pagina === 'cerveja.html') categoria = 'cerveja';
    else if (pagina === 'esportes.html') categoria = 'esportes';

    // Carregar bares
    carregarBares(categoria);

    // Event listener para busca
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusca();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', realizarBusca);
    }
});