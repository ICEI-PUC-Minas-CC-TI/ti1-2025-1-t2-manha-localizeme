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

// Endpoint para obter categorias
app.get('/api/categorias', (req, res) => {
  fs.readFile(categoriasPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler categorias' });
    res.json(JSON.parse(data));
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

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});