$(function() {
    const $tbody = $('#tblNotificacoes tbody');
    const modal = new bootstrap.Modal('#modalEdit');
    const $resultado = $('#resultado');

    // Carregar lista de notificações
    function carregarNotificacoes() {
        $.get('/api/notifications').done(data => {
            const linhas = data.notifications.map(n => {
                const tipoClass = {
                    'info': 'text-info',
                    'success': 'text-success', 
                    'warning': 'text-warning',
                    'danger': 'text-danger'
                };

                return `
                    <tr data-id="${n.id}">
                        <td>${n.id}</td>
                        <td>${n.titulo}</td>
                        <td><span class="${tipoClass[n.tipo] || 'text-info'}">${n.tipo}</span></td>
                        <td>${n.ativa ? '<span class="badge bg-success">Ativa</span>' : '<span class="badge bg-secondary">Inativa</span>'}</td>
                        <td>${new Date(n.created_at).toLocaleString()}</td>
                        <td>
                            <button class="btn btn-sm btn-warning btn-editar">Editar</button>
                            <button class="btn btn-sm btn-danger btn-excluir">Excluir</button>
                        </td>
                    </tr>
                `;
            }).join('');

            $tbody.html(linhas || '<tr><td colspan="6">Nenhuma notificação encontrada.</td></tr>');
        });
    }

    // Carregar ao iniciar
    carregarNotificacoes();

    // Criar nova notificação
    $('#formNova').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            url: '/api/notifications',
            type: 'POST',
            data: $(this).serialize(),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .done(response => {
            if (response.sucesso) {
                this.reset();
                carregarNotificacoes();
                $resultado.html('<div class="alert alert-success">Notificação criada com sucesso!</div>');
                setTimeout(() => $resultado.empty(), 3000);
            }
        })
        .fail((xhr, status, error) => {
            console.error('Erro:', xhr.responseText);
            $resultado.html('<div class="alert alert-danger">Erro ao criar notificação: ' + error + '</div>');
            setTimeout(() => $resultado.empty(), 3000);
        });
    });

    // Abrir modal de edição
    $tbody.on('click', '.btn-editar', function() {
        const id = $(this).closest('tr').data('id');

        $.get('/api/notifications').done(data => {
            const notificacao = data.notifications.find(n => n.id === id);
            if (!notificacao) return;

            const form = $('#formEdit')[0];
            form.id.value = notificacao.id;
            form.titulo.value = notificacao.titulo;
            form.mensagem.value = notificacao.mensagem;
            form.tipo.value = notificacao.tipo;
            form.ativa.checked = notificacao.ativa;

            modal.show();
        });
    });

    // Salvar edição
    $('#formEdit').on('submit', function(e) {
        e.preventDefault();
        const id = this.id.value;

        $.ajax({
            url: `/api/notifications/${id}`,
            type: 'PUT',
            data: $(this).serialize(),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
        .done(response => {
            if (response.sucesso) {
                modal.hide();
                carregarNotificacoes();
                $resultado.html('<div class="alert alert-success">Notificação atualizada com sucesso!</div>');
                setTimeout(() => $resultado.empty(), 3000);
            }
        })
        .fail((xhr, status, error) => {
            console.error('Erro:', xhr.responseText);
            $resultado.html('<div class="alert alert-danger">Erro ao atualizar notificação: ' + error + '</div>');
            setTimeout(() => $resultado.empty(), 3000);
        });
    });

    // Excluir notificação
    $tbody.on('click', '.btn-excluir', function() {
        const id = $(this).closest('tr').data('id');

        if (!confirm('Tem certeza que deseja excluir esta notificação?')) return;

        $.ajax({
            url: `/api/notifications/${id}`,
            type: 'DELETE'
        })
        .done(response => {
            if (response.sucesso) {
                carregarNotificacoes();
                $resultado.html('<div class="alert alert-success">Notificação excluída com sucesso!</div>');
                setTimeout(() => $resultado.empty(), 3000);
            }
        })
        .fail((xhr, status, error) => {
            console.error('Erro:', xhr.responseText);
            $resultado.html('<div class="alert alert-danger">Erro ao excluir notificação: ' + error + '</div>');
            setTimeout(() => $resultado.empty(), 3000);
        });
    });
});