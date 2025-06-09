const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ADICIONADO: Para processar dados de formulário
app.use(express.static('public'));

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgs/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Caminhos dos arquivos JSON
const destinosPath = path.join(__dirname, 'data', 'destinos.json');
const categoriasPath = path.join(__dirname, 'data', 'categorias.json');
const notificationsPath = path.join(__dirname, 'data', 'notifications.json');

// Função para criar diretórios e arquivos se não existirem
function inicializarArquivos() {
    // Criar pasta data se não existir
    if (!fs.existsSync(path.join(__dirname, 'data'))) {
        fs.mkdirSync(path.join(__dirname, 'data'));
    }
    
    // Criar arquivo notifications.json se não existir
    if (!fs.existsSync(notificationsPath)) {
        fs.writeFileSync(notificationsPath, JSON.stringify({ notifications: [] }, null, 2));
    }
}

// Inicializar arquivos ao iniciar o servidor
inicializarArquivos();

// Endpoint para obter categorias
app.get('/api/categorias', (req, res) => {
  fs.readFile(categoriasPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler categorias' });
    res.json(JSON.parse(data));
  });
});

// LISTAR todos os estabelecimentos
app.get('/api/estabelecimentos', (req, res) => {
  fs.readFile(destinosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler destinos' });
    res.json(JSON.parse(data));
  });
});

// ATUALIZAR (PUT)
app.put('/api/estabelecimentos/:id', upload.single('nova_imagem_principal'), (req, res) => {
  const id = Number(req.params.id);

  fs.readFile(destinosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Falha ao ler arquivo' });

    const json = JSON.parse(data);
    const idx  = json.destinos.findIndex(e => e.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Estabelecimento não encontrado' });

    const b = req.body;
    const atual = json.destinos[idx];

    atual.nome       = b.nome;
    atual.descricao  = b.descricao;
    atual.conteudo   = b.conteudo;
    atual.destaque   = b.destaque === 'on';
    atual.endereco   = b.endereco;
    atual.Avaliacoes = b.avaliacoes;
    atual.cardapio   = b.cardapio;
    atual.instagram  = b.instagram;
    atual.Maps       = b.maps;
    atual.categorias = b.categorias
        ? (Array.isArray(b.categorias) ? b.categorias.map(Number) : [Number(b.categorias)])
        : [];

    if (req.file) {
      atual.imagem_principal = 'imgs/' + req.file.filename;
    }

    fs.writeFile(destinosPath, JSON.stringify(json, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Falha ao salvar' });
      res.json({ sucesso: true, estabelecimento: atual });
    });
  });
});

// REMOVER
app.delete('/api/estabelecimentos/:id', (req, res) => {
  const id = Number(req.params.id);

  fs.readFile(destinosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Falha ao ler arquivo' });

    const json = JSON.parse(data);
    const idx = json.destinos.findIndex(e => e.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });

    json.destinos.splice(idx,1);

    fs.writeFile(destinosPath, JSON.stringify(json, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Falha ao salvar' });
      res.json({ sucesso:true });
    });
  });
});

// Endpoint para registrar estabelecimento
app.post('/api/registro', upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_complementares', maxCount: 10 }
]), (req, res) => {
  // Lê o arquivo de destinos
  fs.readFile(destinosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler destinos' });

    let destinos = JSON.parse(data).destinos || [];
    const novoId = destinos.length ? destinos[destinos.length - 1].id + 1 : 1;

    // Monta o novo estabelecimento
    const body = req.body;
    const files = req.files;

    const imagensComplementares = (files.imagens_complementares || []).map((file, idx) => ({
      id: idx + 1,
      src: 'imgs/' + file.filename,
      descricao: body['descricao_imagem_' + (idx + 1)] || ''
    }));

    const novoEstabelecimento = {
      id: novoId,
      nome: body.nome,
      descricao: body.descricao,
      conteudo: body.conteudo,
      destaque: body.destaque === 'on',
      imagem_principal: files.imagem_principal ? 'imgs/' + files.imagem_principal[0].filename : '',
      Avaliacoes: body.avaliacoes,
      cardapio: body.cardapio,
      instagram: body.instagram,
      endereco: body.endereco,
      Maps: body.maps,
      categorias: body.categorias ? (Array.isArray(body.categorias) ? body.categorias.map(Number) : [Number(body.categorias)]) : [],
      imagens_complementares: imagensComplementares
    };

    destinos.push(novoEstabelecimento);

    // Salva o novo arquivo
    fs.writeFile(destinosPath, JSON.stringify({ destinos }, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar destino' });
      res.json({ sucesso: true, estabelecimento: novoEstabelecimento });
    });
  });
});

// Função para ler notificações
function lerNotificacoes() {
    try {
        const data = fs.readFileSync(notificationsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler notificações:', err);
        return { notifications: [] };
    }
}

// Função para salvar notificações
function salvarNotificacoes(data) {
    try {
        fs.writeFileSync(notificationsPath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Erro ao salvar notificações:', err);
    }
}

// LISTAR todas as notificações
app.get('/api/notifications', (req, res) => {
    const data = lerNotificacoes();
    res.json(data);
});

// CRIAR nova notificação
app.post('/api/notifications', (req, res) => {
    console.log('Dados recebidos:', req.body); // DEBUG
    
    // Verificar se os dados necessários estão presentes
    if (!req.body.titulo || !req.body.mensagem) {
        return res.status(400).json({ 
            error: 'Título e mensagem são obrigatórios',
            received: req.body 
        });
    }
    
    const data = lerNotificacoes();
    const novaNotificacao = {
        id: data.notifications.length ? data.notifications[data.notifications.length - 1].id + 1 : 1,
        titulo: req.body.titulo,
        mensagem: req.body.mensagem,
        tipo: req.body.tipo || 'info',
        ativa: true,
        created_at: new Date().toISOString()
    };
    
    data.notifications.push(novaNotificacao);
    salvarNotificacoes(data);
    
    console.log('Notificação criada:', novaNotificacao); // DEBUG
    res.json({ sucesso: true, notification: novaNotificacao });
});

// EDITAR notificação
app.put('/api/notifications/:id', (req, res) => {
    console.log('Editando notificação:', req.params.id, req.body); // DEBUG
    
    const id = Number(req.params.id);
    const data = lerNotificacoes();
    const notificacao = data.notifications.find(n => n.id === id);
    
    if (!notificacao) {
        return res.status(404).json({ error: 'Notificação não encontrada' });
    }
    
    // Verificar se os dados necessários estão presentes
    if (!req.body.titulo || !req.body.mensagem) {
        return res.status(400).json({ 
            error: 'Título e mensagem são obrigatórios',
            received: req.body 
        });
    }
    
    notificacao.titulo = req.body.titulo;
    notificacao.mensagem = req.body.mensagem;
    notificacao.tipo = req.body.tipo || notificacao.tipo;
    notificacao.ativa = req.body.ativa === 'on' || req.body.ativa === 'true' || req.body.ativa === true;
    
    salvarNotificacoes(data);
    res.json({ sucesso: true, notification: notificacao });
});

// EXCLUIR notificação
app.delete('/api/notifications/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = lerNotificacoes();
    const index = data.notifications.findIndex(n => n.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Notificação não encontrada' });
    }
    
    data.notifications.splice(index, 1);
    salvarNotificacoes(data);
    res.json({ sucesso: true });
});

// BUSCAR estabelecimento por ID
app.get('/api/estabelecimentos/:id', (req, res) => {
  const id = Number(req.params.id);
  
  fs.readFile(destinosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler destinos' });
    
    const json = JSON.parse(data);
    const destino = json.destinos.find(d => d.id === id);
    
    if (!destino) {
      return res.status(404).json({ error: 'Destino não encontrado' });
    }
    
    res.json(destino);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});