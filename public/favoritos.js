$(function () {
    $(function () {
        $.get("/api/estabelecimentos")
            .done((data) => {
                console.log("Dados brutos da API /api/estabelecimentos:", data);

                if (data.destinos && data.destinos.length > 0) {
                    console.log("Primeiro destino:", data.destinos[0]);
                } else {
                    console.log("Nenhum destino encontrado na API.");
                }
            })
            .fail(() => {
                console.error("Erro ao carregar dados da API");
            });
    });

    function renderFavoritos(destinos) {
        const $container = $("#favoritosContainer");
        if (destinos.length === 0) {
            $container.html(
                '<div class="col-12 text-center"><p>Você ainda não favoritou nenhum bar.</p></div>',
            );
            return;
        }

        const destinosHTML = destinos
            .slice(0, 6)
            .map((destino) => {
                return `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        ${
                            destino.imagem_principal
                                ? `<img src="${destino.imagem_principal}" class="card-img-top" style="height: 200px; object-fit: cover;">`
                                : '<div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;"><i class="bi bi-image fs-1 text-muted"></i></div>'
                        }
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${destino.nome}</h5>
                            <p class="card-text flex-grow-1">${destino.descricao || ""}</p>
                            ${
                                destino.destaque
                                    ? '<span class="badge bg-warning text-dark mb-2">Destaque</span>'
                                    : ""
                            }
                            <a href="destino.html?id=${destino.id}" class="btn btn-primary mt-auto">
                                <i class="bi bi-eye"></i> Ver Detalhes
                            </a>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="bi bi-geo-alt"></i> ${destino.endereco || "Endereço não informado"}
                            </small>
                            <button type="button" class="btn btn-danger btn-favorite" data-id="${destino.id}" aria-label="Favoritar">
                                <i class="bi bi-heart-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            })
            .join("");

        $container.html(destinosHTML);
    }

    //filtrar só os favoritos
    function carregarFavoritos() {
        $.get("/api/estabelecimentos")
            .done((data) => {
                const todosDestinos = data.destinos || [];
                const favoritos = JSON.parse(
                    localStorage.getItem("favoritos") || "[]",
                );

                const destinosFavoritos = todosDestinos.filter((destino) =>
                    favoritos.includes(destino.id),
                );

                renderFavoritos(destinosFavoritos);
            })
            .fail(() => {
                $("#favoritosContainer").html(
                    '<div class="col-12 text-center"><p>Erro ao carregar favoritos.</p></div>',
                );
            });
    }

    $(document).on("click", ".btn-favorite", function () {
        const $btn = $(this);
        const id = $btn.data("id");
        let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

        favoritos = favoritos.filter((favId) => favId !== id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        // lista mostrando só os favoritos restantes
        carregarFavoritos();
    });

    carregarFavoritos();
});