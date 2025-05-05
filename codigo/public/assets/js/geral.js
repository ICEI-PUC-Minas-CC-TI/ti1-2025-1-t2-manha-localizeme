// Dados dos bares
const dados = { // placeholders provisorios 
    "destinos": [
        {
            "id": 1,
            "nome": "placeholder 1",
            "descricao": "-----------------",
            "conteudo": "------------------",
            "categoria": "------------",
            "destaque": true,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "---------",
                    "descricao": "----------"
                },
                {
                    "id": 2,
                    "src": "--------------",
                    "descricao": "-------------"
                },
                {
                    "id": 3,
                    "src": "------------------",
                    "descricao": "------------"
                }
            ]
        },
        {
            "id": 2,
            "nome": "placeholder 2",
            "descricao": "-----------------------",
            "conteudo": "------------------------",
            "categoria": "-----------",
            "destaque": true,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "---------------",
                    "descricao": "----------------"
                },
                {
                    "id": 2,
                    "src": "----------------",
                    "descricao": "-------------"
                },
                {
                    "id": 3,
                    "src": "--------------",
                    "descricao": "-----------------"
                }
            ]
        },
        {
            "id": 3,
            "nome": "placeholder 3",
            "descricao": "---------------------",
            "conteudo": "------------------------------",
            "categoria": "------------------",
            "destaque": true,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "-------------------",
                    "descricao": "----------------"
                },
                {
                    "id": 2,
                    "src": "-----------------------",
                    "descricao": "---------------------"
                },
                {
                    "id": 3,
                    "src": "----------------------",
                    "descricao": "-------------------"
                }
            ]
        },
        {
            "id": 4,
            "nome": "placeholder 4",
            "descricao": "----------------------",
            "conteudo": "--------------------------",
            "categoria": "-------------------",
            "destaque": true,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "---------------",
                    "descricao": "--------"
                },
                {
                    "id": 2,
                    "src": "------------------",
                    "descricao": "--------------"
                },
                {
                    "id": 3,
                    "src": "------------------",
                    "descricao": "-----------------"
                }
            ]
        },
        {
            "id": 5,
            "nome": "placeholder 5",
            "descricao": "-----------------------",
            "conteudo": "----------------------------------",
            "categoria": "------------",
            "destaque": false,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "-----------------",
                    "descricao": "---------------------"
                },
                {
                    "id": 2,
                    "src": "-----------------",
                    "descricao": "----------------"
                },
                {
                    "id": 3,
                    "src": "--------------------",
                    "descricao": "---------------------"
                }
            ]
        },
        {
            "id": 6,
            "nome": "placeholder 6",
            "descricao": "-------------------------------",
            "conteudo": "--------------------------------------",
            "categoria": "---------------",
            "destaque": true,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "-------------------",
                    "descricao": "----------------"
                },
                {
                    "id": 2,
                    "src": "------------------",
                    "descricao": "------------------"
                },
                {
                    "id": 3,
                    "src": "-----------------------",
                    "descricao": "-----------------"
                }
            ]
        },
        {
            "id": 7,
            "nome": "placeholder 7",
            "descricao": "----------------------",
            "conteudo": "-------------------------",
            "categoria": "------------",
            "destaque": true,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "-------------------",
                    "descricao": "-----------------"
                },
                {
                    "id": 2,
                    "src": "--------------------",
                    "descricao": "------------------"
                },
                {
                    "id": 3,
                    "src": "--------------",
                    "descricao": "----------------"
                }
            ]
        },
        {
            "id": 8,
            "nome": "placeholder 8",
            "descricao": "---------------",
            "conteudo": "------------------------",
            "categoria": "--------------------",
            "destaque": false,
            "imagem_principal": "https://picsum.photos/1920/1080",
            "imagens_complementares": [
                {
                    "id": 1,
                    "src": "------------",
                    "descricao": "--------------"
                },
                {
                    "id": 2,
                    "src": "--------------",
                    "descricao": "--------------"
                },
                {
                    "id": 3,
                    "src": "---------------",
                    "descricao": "------------------"
                }
            ]
        }
    ]
};

// Função para carregar o carousel
function carregarCarousel() {
    const destaques = dados.destinos.filter(destino => destino.destaque);
    const carouselInner = $('#carousel-inner');
    const indicators = $('#carousel-indicators');

    destaques.forEach((destino, index) => {
        // Criar indicadores
        indicators.append(`
            <button type="button" data-bs-target="#carouselDestinos" 
                    data-bs-slide-to="${index}" 
                    class="${index === 0 ? 'active' : ''}"
                    aria-current="${index === 0 ? 'true' : 'false'}"
                    aria-label="Slide ${index + 1}">
            </button>
        `);

        // Criar slides
        carouselInner.append(`
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${destino.imagem_principal}" class="d-block w-100" alt="${destino.nome}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${destino.nome}</h5>
                    <p>${destino.descricao}</p>
                    <a href="detalhe.html?id=${destino.id}" class="btn btn-primary">Saiba mais</a>
                </div>
            </div>
        `);
    });
}

// Inicialização
$(document).ready(function () {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        carregarCarousel();
        carregarCards();
    } else if (window.location.pathname.includes('detalhe.html')) {
        carregarDetalhes();
    }
});