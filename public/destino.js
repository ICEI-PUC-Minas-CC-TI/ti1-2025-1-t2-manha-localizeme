$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        showError();
        return;
    }

    carregarDestino(postId);

    function carregarDestino(id) {
        $.get(`/api/estabelecimentos/${id}`)
            .done((destino) => {
                exibirDestino(destino);
                carregarCategorias(destino.categorias);
                carregarComentarios();
            })
            .fail(() => {
                showError();
            });
    }

    function exibirDestino(destino) {
        document.title = `${destino.nome} - Turismo DIW`;

        $("#heroImage").attr(
            "src",
            destino.imagem_principal ||
                "https://via.placeholder.com/1200x400?text=Sem+Imagem",
        );
        $("#heroImage").attr("alt", destino.nome);
        $("#destinoNome").text(destino.nome);
        $("#destinoDescricao").text(destino.descricao);
        $("#destinoConteudo").text(
            destino.conteudo || "Informações detalhadas não disponíveis.",
        );
        $("#destinoEndereco").text(
            destino.endereco || "Endereço não informado",
        );

        if (destino.Maps) {
            $("#mapsContainer").html(destino.Maps);
        }

        // Montar os links úteis (Instagram e Cardápio)
        let linksHTML = "";

        if (destino.instagram) {
            linksHTML += `
          <a href="${destino.instagram}" target="_blank" class="btn btn-outline-primary mb-2 w-100 d-flex align-items-center justify-content-center gap-2">
            <i class="bi bi-instagram"></i> Instagram
          </a>
        `;
        }

        if (destino.cardapio) {
            linksHTML += `
          <a href="${destino.cardapio}" target="_blank" class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2">
            <i class="bi bi-journal-text"></i> Cardápio
          </a>
        `;
        }

        if (linksHTML === "") {
            linksHTML = `<p class="text-muted">Nenhum link disponível</p>`;
        }

        $("#linksContainer").html(linksHTML);

        // Galeria de imagens complementares
        if (
            destino.imagens_complementares &&
            destino.imagens_complementares.length > 0
        ) {
            const galeriaHTML = destino.imagens_complementares
                .map(
                    (img) => `
              <div class="col-md-6 mb-3">
                <img src="${img.src}" alt="${img.descricao}" 
                  class="img-fluid gallery-image rounded" 
                  data-bs-toggle="modal" 
                  data-bs-target="#imageModal"
                  data-src="${img.src}"
                  data-description="${img.descricao}">
              </div>
            `,
                )
                .join("");
            $("#galeriaContainer").html(galeriaHTML);
            $("#galeriaSection").show();
        } else {
            $("#galeriaSection").hide();
        }

        $("#loading").hide();
        $("#destinoContent").show();
    }

    function carregarCategorias(categoriaIds) {
        if (!categoriaIds || categoriaIds.length === 0) {
            $("#categoriasContainer").html(
                '<p class="text-muted">Nenhuma categoria</p>',
            );
            return;
        }

        $.get("/api/categorias")
            .done((data) => {
                const categorias = data.categorias.filter((cat) =>
                    categoriaIds.includes(cat.id),
                );
                const html = categorias
                    .map(
                        (cat) =>
                            `<span class="badge bg-secondary me-1">${cat.nome}</span>`,
                    )
                    .join("");
                $("#categoriasContainer").html(html);
            })
            .fail(() => {
                $("#categoriasContainer").html(
                    '<p class="text-muted">Erro ao carregar categorias</p>',
                );
            });
    }

    function showError() {
        $("#loading").hide();
        $("#errorSection").show();
    }

    $(document).on("click", ".gallery-image", function () {
        const src = $(this).data("src");
        const description = $(this).data("description");
        $("#modalImage").attr("src", src);
        $("#modalImageDescription").text(description || "Sem descrição");
    });

    // --------------------------------
    // COMENTÁRIOS: CARREGAR / ADICIONAR / EXCLUIR / EDITAR
    // --------------------------------

    function carregarComentarios() {
        $.get(`/api/comentarios?postId=${postId}`)
            .done((comentarios) => {
                exibirComentarios(comentarios);
            })
            .fail(() => {
                $("#comentarios-container").html(
                    '<p class="text-danger">Erro ao carregar comentários.</p>',
                );
            });
    }

    function exibirComentarios(comentarios) {
        const container = $("#comentarios-container");
        container.empty();

        if (comentarios.length === 0) {
            container.html("<p>Nenhum comentário ainda. Seja o primeiro!</p>");
            return;
        }

        comentarios.forEach((comentario) => {
            const comentarioHTML = `
                <div class="comentario mb-3 p-3 border rounded" data-id="${comentario.id}">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5>${comentario.nome}</h5>
                            <p>${comentario.texto}</p>
                            <small class="text-muted">${new Date(comentario.data).toLocaleString("pt-BR")}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-2 btn-editar">Editar</button>
                            <button class="btn btn-sm btn-outline-danger btn-excluir">Excluir</button>
                        </div>
                    </div>
                    <div class="edit-form mt-2" style="display:none;">
                        <textarea class="form-control mb-2">${comentario.texto}</textarea>
                        <button class="btn btn-success btn-sm salvar-edicao">Salvar</button>
                        <button class="btn btn-secondary btn-sm cancelar-edicao">Cancelar</button>
                    </div>
                </div>
            `;
            container.append(comentarioHTML);
        });
    }

    // Adicionar novo comentário
    $("#form-comentario").on("submit", function (e) {
        e.preventDefault();

        const nome = $("#nome").val();
        const texto = $("#texto").val();

        if (!nome || !texto) {
            alert("Preencha todos os campos.");
            return;
        }

        $.ajax({
            url: "/api/comentarios",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                postId: postId,
                nome: nome,
                texto: texto,
            }),
        })
            .done(() => {
                $("#form-comentario")[0].reset();
                carregarComentarios();
            })
            .fail(() => {
                alert("Erro ao enviar comentário.");
            });
    });

    // Excluir comentário
    $(document).on("click", ".btn-excluir", function () {
        const id = $(this).closest(".comentario").data("id");

        if (confirm("Tem certeza que deseja excluir este comentário?")) {
            $.ajax({
                url: `/api/comentarios/${id}`,
                method: "DELETE",
            })
                .done(() => {
                    carregarComentarios();
                })
                .fail(() => {
                    alert("Erro ao excluir o comentário.");
                });
        }
    });

    // Mostrar formulário de edição
    $(document).on("click", ".btn-editar", function () {
        const comentarioDiv = $(this).closest(".comentario");
        comentarioDiv.find(".edit-form").show();
    });

    // Cancelar edição
    $(document).on("click", ".cancelar-edicao", function () {
        $(this).closest(".edit-form").hide();
    });

    // Salvar edição
    $(document).on("click", ".salvar-edicao", function () {
        const comentarioDiv = $(this).closest(".comentario");
        const id = comentarioDiv.data("id");
        const novoTexto = comentarioDiv.find("textarea").val();

        if (!novoTexto.trim()) {
            alert("O texto do comentário não pode estar vazio.");
            return;
        }

        $.ajax({
            url: `/api/comentarios/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ texto: novoTexto }),
        })
            .done(() => {
                carregarComentarios();
            })
            .fail(() => {
                alert("Erro ao editar o comentário.");
            });
    });
});
