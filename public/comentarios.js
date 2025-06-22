document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-comentario");
    const comentariosContainer = document.getElementById(
        "comentarios-container",
    );
    const postId = document.getElementById("postId").value;

    // Carregar comentários ao iniciar
    carregarComentarios();

    // Formulário de envio
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const texto = document.getElementById("texto").value;

        try {
            const response = await fetch("/api/comentarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, texto, postId }),
            });

            if (!response.ok) throw new Error("Erro ao enviar comentário");

            form.reset();
            carregarComentarios();
        } catch (error) {
            alert(error.message);
        }
    });

    // Carregar comentários
    async function carregarComentarios() {
        try {
            const response = await fetch(`/api/comentarios?postId=${postId}`);
            if (!response.ok) throw new Error("Erro ao carregar comentários");

            const comentarios = await response.json();
            exibirComentarios(comentarios);
        } catch (error) {
            console.error(error);
            comentariosContainer.innerHTML =
                '<p class="text-danger">Erro ao carregar comentários</p>';
        }
    }

    // Exibir comentários na tela
    function exibirComentarios(comentarios) {
        comentariosContainer.innerHTML = "";

        if (comentarios.length === 0) {
            comentariosContainer.innerHTML =
                "<p>Nenhum comentário ainda. Seja o primeiro!</p>";
            return;
        }

        comentarios.forEach((comentario) => {
            const comentarioDiv = document.createElement("div");
            comentarioDiv.className = "comentario mb-3 p-3 border rounded";
            comentarioDiv.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h5>${comentario.nome}</h5>
                        <p class="mb-1">${comentario.texto}</p>
                        <small class="text-muted">${formatarData(comentario.data)}</small>
                        ${
                            comentario.editado
                                ? `<small class="text-muted ms-2">(editado em ${formatarData(comentario.dataEdicao)})</small>`
                                : ""
                        }
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-2 editar-btn" data-id="${comentario.id}">Editar</button>
                        <button class="btn btn-sm btn-outline-danger excluir-btn" data-id="${comentario.id}">Excluir</button>
                    </div>
                </div>
                <div id="edit-form-${comentario.id}" class="mt-2" style="display: none;">
                    <textarea id="edit-texto-${comentario.id}" class="form-control mb-2">${comentario.texto}</textarea>
                    <button class="btn btn-sm btn-success salvar-edicao-btn" data-id="${comentario.id}">Salvar</button>
                    <button class="btn btn-sm btn-secondary cancelar-edicao-btn" data-id="${comentario.id}">Cancelar</button>
                </div>
            `;
            comentariosContainer.appendChild(comentarioDiv);
        });

        // Configurar eventos dos botões
        document.querySelectorAll(".excluir-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                if (
                    confirm("Tem certeza que deseja excluir este comentário?")
                ) {
                    try {
                        const response = await fetch(
                            `/api/comentarios/${btn.dataset.id}`,
                            {
                                method: "DELETE",
                            },
                        );

                        if (!response.ok) throw new Error("Erro ao excluir");

                        carregarComentarios();
                    } catch (error) {
                        alert(error.message);
                    }
                }
            });
        });

        document.querySelectorAll(".editar-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const formId = `edit-form-${btn.dataset.id}`;
                document.getElementById(formId).style.display = "block";
            });
        });

        document.querySelectorAll(".cancelar-edicao-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                document.getElementById(
                    `edit-form-${btn.dataset.id}`,
                ).style.display = "none";
            });
        });

        document.querySelectorAll(".salvar-edicao-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const novoTexto = document.getElementById(
                    `edit-texto-${btn.dataset.id}`,
                ).value;

                if (!novoTexto.trim()) {
                    alert("O comentário não pode estar vazio");
                    return;
                }

                try {
                    const response = await fetch(
                        `/api/comentarios/${btn.dataset.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ texto: novoTexto }),
                        },
                    );

                    if (!response.ok) throw new Error("Erro ao editar");

                    document.getElementById(
                        `edit-form-${btn.dataset.id}`,
                    ).style.display = "none";
                    carregarComentarios();
                } catch (error) {
                    alert(error.message);
                }
            });
        });
    }

    // Formatar data para exibição
    function formatarData(dataString) {
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dataString).toLocaleString("pt-BR", options);
    }
});
