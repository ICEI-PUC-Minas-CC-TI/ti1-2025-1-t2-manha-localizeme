const dados = {
  "destinos": [
    {
      "id": 1,
      "nome": "Outback Steakhouse",
      "descricao": "Rede de restaurantes com tema australiano que serve vários cortes de carnes e frutos do mar em porções fartas.",
      "conteudo": "O Outback Steakhouse é sinônimo de experiências gastronômicas inesquecíveis, destino ideal para momentos especiais, com amigos, família e aniversários. Nossos clientes desfrutam de uma culinária com carnes nobres, aperitivos clássicos, a famosa Bloomin Onion® nossa cebola gigante, além da clássica Ribs on the Barbie, costela suína preparada em chama aberta, tradição australiana.",
      "destaque": true,
      "imagem_principal": "img/imagem1.jpg",
      "Avaliacoes": "4,6",
      "cardapio": "https://www.outback.com.br/noshttphttps://www.https://www.outback.com.br/nossosprodutos/menu-principal?gad_source=1&gad_campaignid=21404466636&gbraid=0AAAAACW0DhcmTvAAUvO0MQfopL7cjuYYg&gclid=CjwKCAjwz_bABhAGEiwAm-P8YVlyd4psNGuYnSZmK0PedIYIuFGW_0m18njwnVy3sgr6ED9TGymL4BoCWB0QAvD_BwE.com.br/nossosprodutos/menu-principal?gad_source=1&gad_campaignid=21404466636&gbraid=0AAAAACW0DhcmTvAAUvO0MQfopL7cjuYYg&gclid=CjwKCAjwz_bABhAGEiwAm-P8YVlyd4psNGuYnSZmK0PedIYIuFGW_0m18njwnVy3sgr6ED9TGymL4BoCWB0QAvD_BwEs://www.outback.com.br/nossosprodutos/menu-principal?gad_source=1&gad_campaignid=21404466636&gbraid=0AAAAACW0DhcmTvAAUvO0MQfopL7cjuYYg&gclid=CjwKCAjwz_bABhAGEiwAm-P8YVlyd4psNGuYnSZmK0PedIYIuFGW_0m18njwnVy3sgr6ED9TGymL4BoCWB0QAvD_BwEsosprodutos/menu-principal",
      "instagram": "https://www.instagram.com/outbackbrasil?igsh=dzlzZTlzMnV5dDAz",
      "endereco": "BR-356, 3049 - Belvedere, Belo Horizonte. Localizado no BH Shopping.",
      "Maps": "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.804087755939!2d-43.948308924771716!3d-19.974739681423788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa697f83742179f%3A0x414cfee4d5829de5!2sOutback%20Steakhouse!5e0!3m2!1spt-BR!2sbr!4v1746735904230!5m2!1spt-BR!2sbr\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
      "categorias": "Churrascaria",
      "imagens_complementares": [
        {
          "id": 1,
          "src": "img/imagem2.jpg",
          "descricao": "Hambúrguer e batatas"
        },
        {
          "id": 2,
          "src": "img/imagem3.jpg",
          "descricao": "Bloomin Onion"
        },
        {
          "id": 3,
          "src": "img/imagem4.jpg",
          "descricao": "Ribs on the Barbie"
        },
        {
          "id": 4,
          "src": "img/imagem5.jpg",
          "descricao": "Mini hambúrguers e batatas"
        },
        {
          "id": 5,
          "src": "img/imagem6.jpg",
          "descricao": "Porção"
        }
      ]
    }
  ]
};
document.addEventListener("click", function (e) {
  if (e.target.closest(".favorite-btn")) {
    const icon = e.target.closest(".favorite-btn").querySelector("i");
    icon.classList.toggle("bi-star");
    icon.classList.toggle("bi-star-fill");
  }
});