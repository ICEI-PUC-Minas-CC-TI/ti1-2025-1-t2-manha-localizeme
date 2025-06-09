$(function() {
    const dismissedKey = 'dismissedNotifications';
    let allNotifications = [];
    
    // Recuperar notificações descartadas do localStorage
    function getDismissedNotifications() {
        return JSON.parse(localStorage.getItem(dismissedKey) || '[]');
    }
    
    // Salvar notificação descartada no localStorage
    function addDismissedNotification(id) {
        const dismissed = getDismissedNotifications();
        const idString = id.toString(); // Garantir que seja string
        if (!dismissed.includes(idString)) {
            dismissed.push(idString);
            localStorage.setItem(dismissedKey, JSON.stringify(dismissed));
        }
    }
    
    // Criar HTML da notificação para o dropdown
    function createNotificationHTML(notification) {
        const typeClass = {
            'info': 'notification-type-info',
            'success': 'notification-type-success',
            'warning': 'notification-type-warning',
            'danger': 'notification-type-danger'
        };
        
        const typeIcon = {
            'info': 'bi-info-circle-fill text-info',
            'success': 'bi-check-circle-fill text-success',
            'warning': 'bi-exclamation-triangle-fill text-warning',
            'danger': 'bi-x-circle-fill text-danger'
        };
        
        return `
            <li class="notification-item ${typeClass[notification.tipo] || 'notification-type-info'}" 
                data-notification-id="${notification.id}">
                <div class="d-flex">
                    <div class="me-2">
                        <i class="bi ${typeIcon[notification.tipo] || typeIcon.info}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${notification.titulo}</h6>
                        <p class="mb-1 small text-muted">${notification.mensagem}</p>
                        <small class="text-muted">
                            ${new Date(notification.created_at).toLocaleString()}
                        </small>
                    </div>
                    <div class="ms-2">
                        <button class="btn btn-sm btn-outline-secondary btn-dismiss-notification" 
                                data-id="${notification.id}" title="Descartar">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                </div>
            </li>
        `;
    }
    
    // Atualizar contador de notificações
    function updateNotificationCount() {
        const dismissed = getDismissedNotifications();
        const activeNotifications = allNotifications.filter(n => 
            n.ativa && !dismissed.includes(n.id.toString()) // Converter para string para comparação
        );
        
        const count = activeNotifications.length;
        const $counter = $('#notificationCount');
        
        if (count > 0) {
            $counter.text(count).show();
        } else {
            $counter.hide();
        }
    }
    
    // Carregar e exibir notificações
    function carregarNotificacoes() {
        console.log('Carregando notificações...'); // DEBUG
        
        $.get('/api/notifications').done(data => {
            console.log('Notificações recebidas:', data); // DEBUG
            
            allNotifications = data.notifications || [];
            const dismissed = getDismissedNotifications();
            
            console.log('Notificações descartadas:', dismissed); // DEBUG
            
            const activeNotifications = allNotifications.filter(n => 
                n.ativa && !dismissed.includes(n.id.toString()) // Converter para string para comparação
            );
            
            console.log('Notificações ativas:', activeNotifications); // DEBUG
            
            const $list = $('#notificationList');
            const $noNotifications = $('#noNotifications');
            
            // Limpar notificações antigas (manter header e divider)
            $list.find('.notification-item').remove();
            
            if (activeNotifications.length === 0) {
                $noNotifications.show();
            } else {
                $noNotifications.hide();
                
                // Adicionar notificações (mais recentes primeiro)
                activeNotifications
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .forEach(notification => {
                        $list.append(createNotificationHTML(notification));
                    });
            }
            
            updateNotificationCount();
        }).fail((xhr, status, error) => {
            console.error('Erro ao carregar notificações:', error);
        });
    }
    
    // Carregar destinos
    function carregarDestinos() {
        $.get('/api/estabelecimentos').done(data => {
            const destinos = data.destinos || [];
            const $container = $('#destinosContainer');
            
            if (destinos.length === 0) {
                $container.html('<div class="col-12 text-center"><p>Nenhum destino encontrado.</p></div>');
                return;
            }
            
            const destinosHTML = destinos.slice(0, 6).map(destino => `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        ${destino.imagem_principal ? 
                            `<img src="${destino.imagem_principal}" class="card-img-top" style="height: 200px; object-fit: cover;">` : 
                            '<div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;"><i class="bi bi-image fs-1 text-muted"></i></div>'
                        }
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${destino.nome}</h5>
                            <p class="card-text flex-grow-1">${destino.descricao}</p>
                            ${destino.destaque ? '<span class="badge bg-warning text-dark mb-2">Destaque</span>' : ''}
                            <a href="destino.html?id=${destino.id}" class="btn btn-primary mt-auto">
                                <i class="bi bi-eye"></i> Ver Detalhes
                            </a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">
                                <i class="bi bi-geo-alt"></i> ${destino.endereco || 'Endereço não informado'}
                            </small>
                        </div>
                    </div>
                </div>
            `).join('');
            
            $container.html(destinosHTML);
        }).fail(() => {
            $('#destinosContainer').html('<div class="col-12 text-center"><p>Erro ao carregar destinos.</p></div>');
        });
    }
    
    // Event listeners
    $(document).on('click', '.btn-dismiss-notification', function(e) {
        e.stopPropagation();
        const id = $(this).data('id').toString(); // Converter para string
        const $item = $(this).closest('.notification-item');
        
        console.log('Descartando notificação:', id); // DEBUG
        
        $item.fadeOut(() => {
            $item.remove();
            addDismissedNotification(id);
            updateNotificationCount();
            
            // Verificar se não há mais notificações
            if ($('#notificationList .notification-item').length === 0) {
                $('#noNotifications').show();
            }
        });
    });
    
    // Função para limpar notificações descartadas (útil para debug)
    window.limparNotificacoesDescartadas = function() {
        localStorage.removeItem(dismissedKey);
        console.log('Notificações descartadas foram limpas!');
        carregarNotificacoes(); // Recarregar notificações
    };
    
    // Carregar dados iniciais
    carregarNotificacoes();
    carregarDestinos();
    
    // Recarregar notificações a cada 30 segundos
    setInterval(carregarNotificacoes, 30000);
});