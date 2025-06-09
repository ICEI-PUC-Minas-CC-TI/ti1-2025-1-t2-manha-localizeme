$(function() {
    // Obter ID do destino da URL
    const urlParams = new URLSearchParams(window.location.search);
    const destinoId = urlParams.get('id');
    
    if (!destinoId) {
        showError();
        return;
    }
    
    // Carregar dados do destino
    carregarDestino(destinoId);
    
    function carregarDestino(id) {
        $.get(`/api/estabelecimentos/${id}`)
            .done(destino => {
                exibirDestino(destino);
                carregarCategorias(destino.categorias);
            })
            .fail(() => {
                showError();
            });
    }
    
    function exibirDestino(destino) {
        // Atualizar título da página
        document.title = `${destino.nome} - Turismo DIW`;
        
        // Hero Section
        $('#heroImage').attr('src', destino.imagem_principal || 'https://via.placeholder.com/1200x400?text=Sem+Imagem');
        $('#heroImage').attr('alt', destino.nome);
        $('#destinoNome').text(destino.nome);
        $('#destinoDescricao').text(destino.descricao);
        
        if (destino.destaque) {
            $('#destinoDestaque').html('<span class="badge bg-warning text-dark fs-6"><i class="bi bi-star-fill"></i> Destaque</span>');
        }
        
        // Conteúdo principal
        $('#destinoConteudo').text(destino.conteudo || 'Informações detalhadas não disponíveis.');
        
        // Endereço
        $('#destinoEndereco').text(destino.endereco || 'Endereço não informado');
        
        // Google Maps
        if (destino.Maps) {
            $('#mapsContainer').html(`"${destino.Maps}" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);
        } else {
            $('#mapsContainer').html('<p class="text-muted">Mapa não disponível</p>');
        }
        
        // Links úteis
        const links = [];
        if (destino.Avaliacoes) {
            links.push(`<a href="${destino.Avaliacoes}" target="_blank" class="btn btn-outline-primary btn-sm mb-2 w-100"><i class="bi bi-star"></i> Avaliações</a>`);
        }
        if (destino.cardapio) {
            links.push(`<a href="${destino.cardapio}" target="_blank" class="btn btn-outline-primary btn-sm mb-2 w-100"><i class="bi bi-menu-button-wide"></i> Cardápio</a>`);
        }
        if (destino.instagram) {
            links.push(`<a href="${destino.instagram}" target="_blank" class="btn btn-outline-primary btn-sm mb-2 w-100"><i class="bi bi-instagram"></i> Instagram</a>`);
        }
        
        if (links.length > 0) {
            $('#linksContainer').html(links.join(''));
        } else {
            $('#linksContainer').html('<p class="text-muted">Nenhum link disponível</p>');
        }
        
        // Galeria de imagens complementares
        if (destino.imagens_complementares && destino.imagens_complementares.length > 0) {
            const galeriaHTML = destino.imagens_complementares.map(img => `
                <div class="col-md-6 mb-3">
                    <img src="${img.src}" alt="${img.descricao}" 
                         class="img-fluid gallery-image rounded" 
                         data-bs-toggle="modal" 
                         data-bs-target="#imageModal"
                         data-src="${img.src}"
                         data-description="${img.descricao}">
                </div>
            `).join('');
            
            $('#galeriaContainer').html(galeriaHTML);
            $('#galeriaSection').show();
        }
        
        // Mostrar conteúdo e esconder loading
        $('#loading').hide();
        $('#destinoContent').show();
    }
    
    function carregarCategorias(categoriaIds) {
        if (!categoriaIds || categoriaIds.length === 0) {
            $('#categoriasContainer').html('<p class="text-muted">Nenhuma categoria</p>');
            return;
        }
        
        $.get('/api/categorias')
            .done(data => {
                const categorias = data.categorias || [];
                const categoriasDestino = categorias.filter(cat => categoriaIds.includes(cat.id));
                
                if (categoriasDestino.length > 0) {
                    const categoriasHTML = categoriasDestino.map(cat => 
                        `<span class="badge bg-secondary me-1 mb-1">${cat.nome}</span>`
                    ).join('');
                    $('#categoriasContainer').html(categoriasHTML);
                } else {
                    $('#categoriasContainer').html('<p class="text-muted">Nenhuma categoria</p>');
                }
            })
            .fail(() => {
                $('#categoriasContainer').html('<p class="text-muted">Erro ao carregar categorias</p>');
            });
    }
    
    function showError() {
        $('#loading').hide();
        $('#errorSection').show();
    }
    
    // Modal de imagem
    $(document).on('click', '.gallery-image', function() {
        const src = $(this).data('src');
        const description = $(this).data('description');
        
        $('#modalImage').attr('src', src);
        $('#modalImageDescription').text(description || 'Sem descrição');
        $('#imageModalTitle').text('Galeria de Imagens');
    });
});