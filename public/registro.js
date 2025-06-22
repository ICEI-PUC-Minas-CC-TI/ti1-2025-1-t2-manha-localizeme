$(document).ready(function() {
  // Carregar categorias
  $.get('/api/categorias', function(data) {
    const categorias = data.categorias;
    categorias.forEach(cat => {
      $('#categoriasContainer').append(`
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" name="categorias" value="${cat.id}" id="cat${cat.id}">
          <label class="form-check-label" for="cat${cat.id}">${cat.nome}</label>
        </div>
      `);
    });
  });

  // Adicionar campos de descrição para imagens complementares
  $('input[name="imagens_complementares"]').on('change', function() {
    const files = this.files;
    let html = '';
    for (let i = 0; i < files.length; i++) {
      html += `
        <div class="mb-2">
          <label>Descrição da imagem ${i + 1}</label>
          <input type="text" class="form-control" name="descricao_imagem_${i + 1}">
        </div>
      `;
    }
    $('#descricaoImagens').html(html);
  });

  // Envio do formulário
  $('#formEstabelecimento').on('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    $.ajax({
      url: '/api/registro',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(res) {
        $('#resultado').html('<div class="alert alert-success">Estabelecimento cadastrado com sucesso!</div>');
        $('#formEstabelecimento')[0].reset();
        $('#descricaoImagens').html('');
      },
      error: function() {
        $('#resultado').html('<div class="alert alert-danger">Erro ao cadastrar estabelecimento.</div>');
      }
    });
  });
});