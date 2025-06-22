function carregarBares(categoria = null) {
    // Buscar bares e categorias em paralelo
    Promise.all([
        fetch("/api/estabelecimentos").then((res) => res.json()),
        fetch("/api/categorias").then((res) => res.json()),
    ])
        .then(([bares, categorias]) => {
            // Converte bares para array, caso venha como objeto
            if (!Array.isArray(bares)) {
                bares = Object.values(bares);
            }
            console.log("Bares:", bares);

            // Adicione este log para depuração
            console.log("categorias:", categorias);

            // Se categorias não for array, tente converter
            if (!Array.isArray(categorias)) {
                // Se vier objeto com propriedade 'categorias', use ela
                if (
                    categorias.categorias &&
                    Array.isArray(categorias.categorias)
                ) {
                    categorias = categorias.categorias;
                } else {
                    categorias = [];
                }
            }

            const container =
                document.getElementById("categoria-container") ||
                document.getElementById("destinos-container");
            if (!container) {
                console.error("Elemento container para cards não encontrado!");
                return;
            }

            container.innerHTML = "";

            // Cria um mapa de id -> nome da categoria
            const categoriasMap = {};
            categorias.forEach((cat) => {
                categoriasMap[cat.id] = cat.nome;
            });

            let baresFiltrados = bares;
            if (categoria) {
                // Procura o id da categoria pelo nome
                const categoriaObj = categorias.find(
                    (cat) => cat.nome.toLowerCase() === categoria.toLowerCase(),
                );
                console.log("Categoria encontrada:", categoriaObj);
                if (categoriaObj) {
                    baresFiltrados = [];
                    bares.forEach((bar) => {
                        // Se bar for array, iterar elementos (se for objeto, tratar direto)
                        if (Array.isArray(bar)) {
                            bar.forEach((element) => {
                                if (
                                    Array.isArray(element.categorias) &&
                                    element.categorias.includes(categoriaObj.id)
                                ) {
                                    baresFiltrados.push(element);
                                }
                            });
                        } else {
                            if (
                                Array.isArray(bar.categorias) &&
                                bar.categorias.includes(categoriaObj.id)
                            ) {
                                baresFiltrados.push(bar);
                            }
                        }
                    });
                } else {
                    baresFiltrados = [];
                }
            }

            // Agora, transforme os ids em nomes para exibição
            baresFiltrados.forEach((bar) => {
                if (Array.isArray(bar.categorias)) {
                    bar.categorias = bar.categorias
                        .map((id) => categoriasMap[id])
                        .filter(Boolean);
                } else {
                    bar.categorias = [];
                }
            });

            // Agora bar.categorias é um array de nomes
            console.log("Bares carregados:", baresFiltrados);
            console.log("Categoria para filtro:", categoria);

            if (baresFiltrados.length === 0) {
                container.innerHTML =
                    '<div class="col-12"><p class="text-center">Nenhum bar encontrado para esta categoria.</p></div>';
                return;
            }

            baresFiltrados.forEach((bar) => {
                const categoriasTexto = (bar.categorias || []).join(", ");

                const card = `
                <div class="col-3" style="padding: 10px; margin-left: 10px; margin-right: 10px;">
                    <div class="card h-100">
                        <img src="${bar.imagem_principal}" class="card-img-top" alt="${bar.nome}"
                             onerror="this.src='https://via.placeholder.com/400x200/6c757d/ffffff?text=${encodeURIComponent(bar.nome)}'">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${bar.nome}</h5>
                            <p class="card-text">${bar.endereco}</p>
                            <p class="card-text"><small class="text-muted">Categoria: ${categoriasTexto}</small></p>
                            <!-- Botão "Ver detalhes" removido -->
                        </div>
                    </div>
                </div>
                `;
                container.insertAdjacentHTML("beforeend", card);
            });

            if (
                window.location.pathname.endsWith("index.html") ||
                window.location.pathname === "/" ||
                window.location.pathname.endsWith("/")
            ) {
                criarCarousel(baresFiltrados.slice(0, 5));
            }
        })
        .catch((error) => {
            console.error("Erro ao carregar os bares:", error);
            const container =
                document.getElementById("categoria-container") ||
                document.getElementById("destinos-container");
            if (container) {
                container.innerHTML =
                    '<div class="col-12"><p class="text-danger text-center">Erro ao carregar os bares. Tente novamente mais tarde.</p></div>';
            }
        });
}

function criarCarousel(bares) {
    const carouselInner = document.getElementById("carousel-inner");
    const carouselIndicators = document.getElementById("carousel-indicators");

    if (!carouselInner || !carouselIndicators || bares.length === 0) return;

    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    bares.forEach((bar, index) => {
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselDestinos");
        indicator.setAttribute("data-bs-slide-to", index);
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        if (index === 0) {
            indicator.classList.add("active");
            indicator.setAttribute("aria-current", "true");
        }
        carouselIndicators.appendChild(indicator);

        const slideDiv = document.createElement("div");
        slideDiv.className = `carousel-item ${index === 0 ? "active" : ""}`;
        slideDiv.innerHTML = `
            <img src="${bar.imagem_principal}" class="d-block w-100" alt="${bar.nome}"
                 onerror="this.src='https://via.placeholder.com/1200x400/6c757d/ffffff?text=${encodeURIComponent(bar.nome)}'">
            <div class="carousel-caption d-none d-md-block">
                <h5>${bar.nome}</h5>
            </div>
        `;
        carouselInner.appendChild(slideDiv);
    });
}

function realizarBusca() {
    const searchInput = document.getElementById("searchInput");
    const termo = searchInput ? searchInput.value.toLowerCase().trim() : "";

    fetch("/api/estabelecimentos")
        .then((response) => response.json())
        .then((data) => {
            let baresFiltrados = data;

            if (termo) {
                baresFiltrados = data.filter(
                    (bar) =>
                        bar.nome.toLowerCase().includes(termo) ||
                        bar.endereco.toLowerCase().includes(termo) ||
                        (bar.categoria && bar.categoria.toLowerCase().includes(termo)),
                );
            }

            const container =
                document.getElementById("categoria-container") ||
                document.getElementById("destinos-container");
            if (!container) return;

            container.innerHTML = "";

            if (baresFiltrados.length === 0) {
                container.innerHTML =
                    '<div class="col-12"><p class="text-center">Nenhum bar encontrado para sua pesquisa.</p></div>';
                return;
            }

            baresFiltrados.forEach((bar) => {
                const categoriasTexto = bar.categoria || "";

                const card = `
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="card h-100">
                            <img src="${bar.imagem_principal}" class="card-img-top" alt="${bar.nome}"
                                 onerror="this.src='https://via.placeholder.com/400x200/6c757d/ffffff?text=${encodeURIComponent(bar.nome)}'">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${bar.nome}</h5>
                                <p class="card-text">${bar.endereco}</p>
                                <p class="card-text"><small class="text-muted">Categoria: ${categoriasTexto}</small></p>
                                <!-- Botão "Ver detalhes" removido -->
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML("beforeend", card);
            });
        })
        .catch((error) => {
            console.error("Erro ao buscar:", error);
        });
}

function filtrarPorCategoria(categoria) {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    carregarBares(categoria);
}

document.addEventListener("DOMContentLoaded", function () {
    const pagina = window.location.pathname.split("/").pop();
    let categoria = null;

    if (pagina === "musica.html") categoria = "musica";
    else if (pagina === "jogos.html") categoria = "jogos";
    else if (pagina === "cerveja.html") categoria = "cerveja";
    else if (pagina === "esportes.html") categoria = "esportes";

    carregarBares(categoria);

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    if (searchInput) {
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                realizarBusca();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", realizarBusca);
    }
});