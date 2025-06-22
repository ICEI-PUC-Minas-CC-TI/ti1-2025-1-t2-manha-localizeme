// Função para carregar o carousel
function carregarCarousel() {
    const destaques = dados.destinos.filter(destino => destino.destaque);
    const carouselInner = $('#carousel-inner');
    const indicators = $('#carousel-indicators');

    destaques.forEach((destino, index) => {
        // Criar indicadores
        indicators.append(`
            <button type="button" data-bs-target="#carouselDestinos" 
                    data-bs-slide-to="${index}" 
                    class="${index === 0 ? 'active' : ''}"
                    aria-current="${index === 0 ? 'true' : 'false'}"
                    aria-label="Slide ${index + 1}">
            </button>
        `);

        // Criar slides
        carouselInner.append(`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${destino.imagem_principal}" class="d-block w-100" alt="${destino.nome}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${destino.nome}</h5>
                    <p>${destino.descricao}</p>
                    <a href="detalhe.html?id=${destino.id}" class="btn btn-primary">Saiba mais</a>
                </div>
            </div>
        `);
    });
}

// Função para carregar os cards
function carregarCards() {
    const container = $('#destinos-container');

    dados.destinos.forEach(destino => {
        container.append(`
            <div class="col-md-4 col-sm-6">
                <div class="card h-100 fade-in">
                    <img src="${destino.imagem_principal}" class="card-img-top" alt="${destino.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${destino.nome}</h5>
                        <p class="card-text">${destino.descricao}</p>
                        <a href="detalhe.html?id=${destino.id}" class="btn btn-primary">Ver detalhes</a>
                    </div>
                </div>
            </div>
        `);
    });
}

// Inicialização
$(document).ready(function () {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarCarousel();
        carregarCards();
    }
});