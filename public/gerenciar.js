$(function () {
  const $tbody = $('#tblEst tbody');
  const modal   = new bootstrap.Modal('#modalEdit');
  let cacheCategorias = [];

  // Carrega categorias uma vez
  $.get('/api/categorias', d => cacheCategorias = d.categorias);

  // --- Carregar lista ---
  function carregar() {
    $.get('/api/estabelecimentos').done(data => {
      const linhas = data.destinos.map(e => {
        const nomesCats = e.categorias.map(id => {
          const c = cacheCategorias.find(c=>c.id===id);
          return c ? c.nome : id;
        }).join(', ');
        return `
          <tr data-id="${e.id}">
            <td>${e.id}</td>
            <td>${e.nome}</td>
            <td>${nomesCats}</td>
            <td>${e.destaque ? '⭐' : ''}</td>
            <td>
              <button class="btn btn-sm btn-warning btn-editar">Editar</button>
              <button class="btn btn-sm btn-danger  btn-excluir">Excluir</button>
            </td>
          </tr>`;
      }).join('');
      $tbody.html(linhas || '<tr><td colspan="5">Nenhum registro.</td></tr>');
    });
  }
  carregar();

  // --- Excluir ---
  $tbody.on('click','.btn-excluir', function(){
    const id = $(this).closest('tr').data('id');
    if (!confirm('Excluir definitivamente?')) return;

    $.ajax({ url:`/api/estabelecimentos/${id}`, type:'DELETE' })
      .done(()=>carregar())
      .fail(()=>alert('Erro ao excluir'));
  });

  // --- Abrir modal de edição ---
  $tbody.on('click','.btn-editar', function(){
    const id = $(this).closest('tr').data('id');
    $.get('/api/estabelecimentos').done(d=>{
      const est = d.destinos.find(x=>x.id===id);
      if(!est) return;
      preencherModal(est);
      modal.show();
    });
  });

  // Preenche campos do modal
  function preencherModal(est){
    const f = $('#formEdit')[0];
    f.id.value            = est.id;
    f.nome.value          = est.nome;
    f.descricao.value     = est.descricao;
    f.conteudo.value      = est.conteudo;
    f.endereco.value      = est.endereco;
    f.cardapio.value      = est.cardapio;
    f.instagram.value     = est.instagram;
    f.avaliacoes.value    = est.Avaliacoes;
    f.maps.value          = est.Maps;
    f.destaque.checked    = est.destaque;

    // categorias (checkbox dinâmico)
    const wrap = $('#editCategorias').empty();
    cacheCategorias.forEach(cat=>{
      wrap.append(`
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="${cat.id}" id="eCat${cat.id}" name="categorias">
          <label class="form-check-label" for="eCat${cat.id}">${cat.nome}</label>
        </div>
      `);
    });
    est.categorias.forEach(id=>$('#eCat'+id).prop('checked',true));
  }

  // --- Salvar edição ---
  $('#formEdit').on('submit', function(e){
    e.preventDefault();
    const id = this.id.value;
    const fd = new FormData(this);

    // sem o field id no body (já está na URL)
    fd.delete('id');

    $.ajax({
      url:`/api/estabelecimentos/${id}`,
      type:'PUT',
      data:fd,
      processData:false,
      contentType:false
    })
    .done(()=>{
      modal.hide();
      carregar();
    })
    .fail(()=>alert('Erro ao salvar'));
  });
});