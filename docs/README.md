# Introdução

Informações básicas do projeto.

* **Projeto:** LocalizeMe
* **Repositório GitHub:** https://github.com/ICEI-PUC-Minas-CC-TI/ti1-2025-1-t2-manha-localizeme.git
* **Membros da equipe:**

  * Ane Madjarian Viana (https://github.com/anemadjarian)
  * Fernanda Mariana de Oliveira Santos (https://github.com/FeyreJeon)
  * Gabriel Costa Lima (https://github.com/gcl32)
  * Guilherme Almeida Zuim (https://github.com/zoiacode)
  * Mateus Henrique Saturnino Gonçalves (XXXX)
  * Nathan Barros de Carvalho (https://github.com/nthapt)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/processo-dt.pdf)

# Contexto

Detalhes sobre o espaço de problema, os objetivos do projeto, sua justificativa e público-alvo.

## Problema

Belo Horizonte é amplamente reconhecida como a "capital dos bares" no Brasil, oferecendo uma variedade impressionante de estabelecimentos para todos os gostos e preferências. No entanto, essa grande oferta pode tornar a busca pelo bar ideal um desafio, especialmente para quem deseja um local que atenda a critérios específicos.

## Objetivos

O projeto LocalizeMe será um software voltado para oferecer recomendações personalizadas de bares na cidade de Belo Horizonte. Além disso, a plataforma funcionará como um mecanismo de busca, permitindo que os usuários obtenham informações detalhadas sobre cada estabelecimento. O site reunirá dados essenciais, como endereço, cardápio, fotos do local, avaliações e integração com o Instagram para exibição de publicações recentes. Para garantir uma experiência intuitiva, a estrutura do site será projetada de forma clara e acessível, facilitando tanto a administração das páginas pelos proprietários dos estabelecimentos quanto a busca dos clientes pelo bar ideal.

## Justificativa

A motivação para desenvolver o LocalizeMe está diretamente ligada à importância da socialização e da experiência de lazer, tanto para turistas quanto para moradores da cidade. 
Para os turistas, essa dificuldade é ainda maior, pois muitos chegam à cidade sem conhecer bem os bairros, as opções disponíveis e os estilos de bares que mais combinam com suas preferências. 
Já para os moradores da cidade, sair para socializar não é apenas um lazer, mas também uma necessidade para o bem-estar mental. Ter momentos de descontração em um ambiente agradável ajuda a aliviar o estresse, fortalecer vínculos sociais e até melhorar a qualidade de vida. No entanto, muitas pessoas acabam frequentando sempre os mesmos bares por não saberem onde encontrar novas opções alinhadas ao seu gosto.

## Público-Alvo

Existem três perfis para o público-alvo:
1- Donos de estabelecimentos, que administrarão as páginas de seus bares: possuem pouco conhecimento sobre tecnologia, exige um software fácil e prático para entendimento.
2- Pessoas locais.
3-Turistas: pouco ou nenhum conhecimento sobre a cidade de Belo Horizonte.

# Product Discovery

Vamos mergulhar no universo dos usuários para descobrir:

- O que realmente importa para quem busca bares em BH
- Os desafios enfrentados pelos donos de estabelecimentos
- Como criar uma solução eficaz que resolva esses problemas na prática

---

## Etapa de Entendimento

Na **Etapa de Entendimento**, utilizaremos a metodologia **Design Thinking** para compreender profundamente o problema. Durante esse processo, vamos criar e refinar as ferramentas abaixo:

### 1. Matriz CSD
[![matriz.png](../../../../Desktop/matriz.png)](https://miro.com/app/board/uXjVIVEqQjM=/)

### 2. Mapa de Stakeholders
[![stak.png](../../../../Desktop/stak.png)](https://miro.com/app/board/uXjVIVEqQjM=/)

#### Detalhes Importantes:
- **Entrevistados**:  (4 pessoas, 3 donos de bares)
- **Ferramenta**: [Notes]
- **Período de coleta**: 17/Abril/2025

---

## Entrevistas Qualitativas

### Clientes

**Helena** (Estudante de Psicologia)

- **Qual a sua maior dificuldade em encontrar bares da sua preferência?**
  - *"No início, quando cheguei a BH, não tive problemas. Porém, depois de um tempo, comecei a procurar lugares diferentes que não eram recomendados por pessoas próximas. Encontrei dificuldades em achar informações corretas, como fotos do ambiente, cardápio atualizado, horários de funcionamento e avaliações de outros clientes."*

- **Você sente falta de algo ao utilizar essa ferramenta?**
  - *"Sim. Falta um único lugar que centralize tudo o que eu procuro. Eu me irrito ao ter que usar vários aplicativos para encontrar informações sobre um estabelecimento."*

- **Qual ferramenta você usa na hora de buscar um bar?**
  - *"Usava TikTok para vídeos de recomendações, Instagram para ver fotos e o Google Maps para avaliações, endereço e criar listas de lugares."*

---

**Gabriel** (Estudante de Ciência da Computação)

- **Qual a sua maior dificuldade em encontrar bares da sua preferência?**
  - *"A principal dificuldade é não encontrar lugares divididos por categorias, onde todas as informações sejam claras, para não perder tempo procurando."*

- **Você sente falta de algo ao utilizar essa ferramenta?**
  - *"Sim, sinto falta de integração entre os aplicativos. Não há uma ferramenta que reúna todas as informações de forma clara e concisa."*

- **Qual ferramenta você usa na hora de buscar um bar?**
  - *"Recomendações de amigos, Ifood e Google Maps."*

---

**João e Roberta** (Estudantes de Ciência da Computação)

- **Qual a sua maior dificuldade em encontrar bares da sua preferência?**
  - *"Usamos Google Maps, Instagram e recomendações de pessoas."*

- **Você sente falta de algo ao utilizar essa ferramenta?**
  - *"Fotos falsas que não representam fielmente o que é mostrado nas redes sociais."*

- **Qual ferramenta você usa na hora de buscar um bar?**
  - *"Informações atualizadas sobre o local e localização."*

---

### Donos de Bares

**Denilson** (Dono do "Coreu Bar")

- **Qual a sua maior dificuldade em encontrar clientes?**
  - *"Atualmente, não enfrento dificuldades em encontrar clientes."*

- **Você sente falta de algo na plataforma que usa?**
  - *"Sinto falta de uma coordenação mais eficaz das redes sociais, devido ao uso de uma empresa terceirizada."*

- **Você utiliza alguma plataforma para encontrar novos clientes?**
  - *"Sim, uso Instagram."*

---

**Everton** (Dono do "Tacos")

- **Qual a sua maior dificuldade em encontrar clientes?**
  - *"Nunca tive dificuldades para encontrar clientes."*

- **Você sente falta de alguma ferramenta?**
  - *"Falta receber feedbacks e críticas dos clientes."*

- **Você utiliza alguma plataforma para encontrar novos clientes?**
  - *"Sim, uso Instagram e Facebook, com suporte de uma empresa terceirizada."*

---

**Hugo** (Dono do "A Granel")

- **Qual a sua maior dificuldade em encontrar clientes?**
  - *"Não tive dificuldades."*

- **Você sente falta de alguma ferramenta?**
  - *"Sinto falta de feedbacks mais diretos."*

- **Você utiliza alguma plataforma para encontrar novos clientes?**
  - *"Uso Instagram e apoio de uma empresa terceirizada."*

---

## Highlights da Pesquisa

- **Principais queixas**:
  - Falta de informações sobre preços e condições do local
  - Lugares lotados ou com atendimento ruim
  - Falta de feedback dos clientes

---
## Etapa de Definição

### Dores Principais

---

#### **Clientes**

1. **Informações desencontradas/dispersas**  
   A falta de centralização e organização das informações disponíveis causa frustração na hora da busca.

2. **Falta de transparência**  
   Fotos imprecisas ou desatualizadas e preços escondidos dificultam a decisão dos consumidores.

3. **Dificuldade em filtrar por preferências**  
   Os clientes não conseguem facilmente filtrar os bares de acordo com suas preferências pessoais (ex: ambiente, preço, tipo de comida).

---

#### **Donos de Bares**

1. **Gestão ineficiente de redes sociais**  
   A falta de uma estratégia bem definida para as redes sociais compromete o alcance e o engajamento.

2. **Pouco feedback qualificado**  
   Há uma escassez de comentários úteis e construtivos que ajudem a melhorar os serviços e a experiência do cliente.

3. **Dificuldade em destacar diferenciais**  
   Não há uma plataforma eficaz que ajude os donos a se diferenciarem no mercado competitivo de bares, perdendo oportunidades de atrair clientes.

---

### Personas

[![persona.png](../../../../Desktop/persona.png)](https://miro.com/app/board/uXjVIVEqQjM=/)]

#### 📍 **Perfil Cris**

| **Nome**    | Cris                         |
|-------------|------------------------------|
| **Idade**   | 30 anos                      |
| **Ocupação**| Professora                   |
| **Hobbies** | Sair e beber                 |
| **Personalidade** | Festeira, conectada, extrovertida |
| **Sonhos**  | Viajar pelo mundo            |

#### 📍 **Perfil Miguel**

| **Nome**    | Miguel                       |
|-------------|------------------------------|
| **Idade**   | 24 anos                      |
| **Ocupação**| Designer                     |
| **Hobbies** | Jogos de tabuleiro           |
| **Personalidade** | Introvertido, calmo, paciente |
| **Sonhos**  | Viver uma vida confortável e estável |

#### 📍 **Perfil Adenor**

| **Nome**    | Adenor                       |
|-------------|------------------------------|
| **Idade**   | 58 anos                      |
| **Ocupação**| Dono de bar                  |
| **Hobbies** | Jogar sinuca                 |
| **Personalidade** | Carismático, organizado, proativo |
| **Sonhos**  | Se aposentar com uma boa reserva e ver os netos crescerem |

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...`PERSONA` | QUERO/PRECISO ...`FUNCIONALIDADE`        | PARA ...`MOTIVO/VALOR`               |
| --------------------- | ------------------------------------------ | -------------------------------------- |
| Usuário do sistema   | Registrar minhas tarefas ⚠️ EXEMPLO ⚠️ | Não esquecer de fazê-las             |
| Administrador         | Alterar permissões ⚠️ EXEMPLO ⚠️      | Permitir que possam administrar contas |

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.
>
> **Orientações**:
>
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Proposta de Valor

**✳️✳️✳️ APRESENTE O DIAGRAMA DA PROPOSTA DE VALOR PARA CADA PERSONA ✳️✳️✳️**

##### Proposta para Persona XPTO ⚠️ EXEMPLO ⚠️

![Exemplo de proposta de valor](images/exemplo-proposta-valor.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O mapa da proposta de valor é uma ferramenta que nos ajuda a definir qual tipo de produto ou serviço melhor atende às personas definidas anteriormente.

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | Permitir que o usuário cadastre tarefas ⚠️ EXEMPLO ⚠️ | ALTA       |
| RF-002 | Emitir um relatório de tarefas no mês ⚠️ EXEMPLO ⚠️ | MÉDIA     |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ser responsivo para rodar em um dispositivos móvel ⚠️ EXEMPLO ⚠️ | MÉDIA     |
| RNF-002 | Deve processar requisições do usuário em no máximo 3s ⚠️ EXEMPLO ⚠️          | BAIXA      |

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Os requisitos de um projeto são classificados em dois grupos:
>
> - [Requisitos Funcionais (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
>   correspondem a uma funcionalidade que deve estar presente na plataforma (ex: cadastro de usuário).
> - [Requisitos Não Funcionais (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
>   correspondem a uma característica técnica, seja de usabilidade, desempenho, confiabilidade, segurança ou outro (ex: suporte a dispositivos iOS e Android).
>
> Lembre-se que cada requisito deve corresponder à uma e somente uma característica alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas Histórias de Usuário foram cobertos.
>
> **Orientações**:
>
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

**✳️✳️✳️ COLOQUE AQUI OS PROTÓTIPOS DE TELAS COM TÍTULO E DESCRIÇÃO ✳️✳️✳️**

##### TELA XPTO ⚠️ EXEMPLO ⚠️

Descrição para a tela XPTO

![Exemplo de wireframe](images/exemplo-wireframe.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Wireframes são protótipos das telas da aplicação usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante ao layout de elementos fundamentais na interface.
>
> **Orientações**:
>
> - [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
> - [Figma](https://www.figma.com/)
> - [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
> - [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)

### User Flow

**✳️✳️✳️ COLOQUE AQUI O DIAGRAMA DE FLUXO DE TELAS ✳️✳️✳️**

![Exemplo de fluxo de telas](images/exemplo-userflow.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.
>
> **Orientações**:
>
> - [User Flow: O Quê É e Como Fazer?](https://medium.com/7bits/fluxo-de-usu%C3%A1rio-user-flow-o-que-%C3%A9-como-fazer-79d965872534)
> - [User Flow vs Site Maps](http://designr.com.br/sitemap-e-user-flow-quais-as-diferencas-e-quando-usar-cada-um/)
> - [Top 25 User Flow Tools &amp; Templates for Smooth](https://www.mockplus.com/blog/post/user-flow-tools)

### Protótipo Interativo

**✳️✳️✳️ COLOQUE AQUI UM IFRAME COM SEU PROTÓTIPO INTERATIVO ✳️✳️✳️**

✅ [Protótipo Interativo (MarvelApp)](https://marvelapp.com/prototype/4hd6091?emb=1&iosapp=false&frameless=false)  ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Um protótipo interativo apresenta o projeto de interfaces e permite ao usuário navegar pelas funcionalidades como se estivesse lidando com o software pronto. Utilize as mesmas ferramentas de construção de wireframes para montagem do seu protótipo interativo. Inclua o link para o protótipo interativo do projeto.

# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| --------------------------- | ---------- | -------------------------------------------------- |
| Processo de Design Thinking | Miro       | https://miro.com/app/board/uXjVIVEqQjM=/           |
| Repositório de código       | GitHub     | https://github.com/ICEI-PUC-Minas-CC-TI/ti1-2025-1-t2-manha-localizeme     |
| Comunicação                 | WhatsApp   | -------------------------------------------------- |
| Slides de apresentação      | Canva      | https://www.canva.com/design/DAGjVXS_89E/y6HKoV64FoL0SPhNwxDk7Q/edit       |
| Reuniões                    | Discord    | -------------------------------------------------- |
| Criação de wireframe        | Figma      | https://www.figma.com/design/3WndzITf1qMX9vyyRNxPGJ/Untitled               |
| Kanban                      | Trello     | https://trello.com/b/yILpng7m/kanban-localizeme    |

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

| Papel                                      | Membro                                   |
| ------------------------------------------ | ---------------------------------------- |
| Gestão do CSS                              | Ane Madjarian Viana                      |
| Incorporação com o Instagram               | Fernanda Mariana de Oliveira Santos      |
| Gestão do HTML                             | Gabriel Costa Lima                       |
| Gestão do JS                               | Guilherme Almeida Zuim                   |
| Implementação de responsividade e animação | Mateus Henrique Saturnino Gonçalves      |
| Implementação de mapas                     | Nathan Barros de Carvalho                |

![Kanban](https://trello.com/b/yILpng7m/kanban-localizeme)


# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada e direta.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Registro/Login, recomendação de preferências, busca com filtro, informações relevantes sobre o estabelecimento

##### Funcionalidade 1 - Registro

Haverá uma tela de registro para cada usuário.

* **Estrutura de dados:** [Login](#ti_ed_registro)
* **Instruções de acesso:**
  * Abra o site e efetue o login
* **Tela da funcionalidade**:
![Tela de Funcionalidade](images/LoginPrint.png)

##### Funcionalidade 2 - Recomendação de preferências

Haverão recomendações personalizadas de acordo com as preferências de cada usuário

* **Estrutura de dados:** [Recomendações](#ti_ed_recomendacoes)
* **Instruções de acesso:**
  * Registre suas preferências e receba recomendações personalizadas
* **Tela da funcionalidade**:
![Tela de Funcionalidade](images/RecomendacoesPrint.png)

##### Funcionalidade 1 - Busca

Haverá uma divisão por categorias e busca por nome ou tema do local

* **Estrutura de dados:** [Busca](#ti_ed_busca)
* **Instruções de acesso:**
  * Abra o site e busque um local
* **Tela da funcionalidade**:
![Tela de Funcionalidade](images/BuscaPrint.png)

##### Funcionalidade 1 - Informações

Haverá uma tela com informações relevantes para cada estabelecimento

* **Estrutura de dados:** [Login](#ti_ed_informacoes)
* **Instruções de acesso:**
  * Abra o site, abra um local desejado e tenha acesso a todas as informacoes relevantes a respeito.
* **Tela da funcionalidade**:
![Tela de Funcionalidade](images/InformacoesPrint.png)

## Estruturas de Dados

Exemplo de um perfil criado com todos os dados informados, incluindo as categorias de interesse da pessoa.

##### Estrutura de Dados - Perfis

Contatos da aplicação

```json
  {
    "id": 1,
    "nome": "Leanne Graham",
    "email": "Sincere@april.biz",
    "idade": "25",
    "telefone": "1-770-736-8031",
    "cidade": "Belo Horizonte",
    "categorias": "tematico",
  }
```

##### Estrutura de Dados - Usuários

Registro dos usuários do sistema utilizados para login e para o perfil do sistema

```json
  {
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    email: "joana@abc.com",
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    login: "user",
    nome: "Usuário do Sistema",
    senha: "123"
  }
```

> **Orientações:**
>
> * [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
> * [Trabalhando com JSON - Aprendendo desenvolvimento web | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) 

**Fonts:**

* Icons Font Face - [https://fontawesome.com/](https://fontawesome.com/) 

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/) 
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/) 

# Referências

As referências utilizadas no trabalho foram:

* SEBRAE. Os principais desafios de bares e restaurantes com a retomada do turismo. Sebrae, 2025. Disponível em: https://sebrae.com.br/sites/PortalSebrae/artigos/os-principais-desafios-de-bares-e-restaurantes-com-retomada-do-turismo,ec33102229056810VgnVCM1000001b00320aRCRD. Acesso em: 4 abr. 2025.
* UNIMED. A importância do convívio social para a saúde mental. Unimed, 2025. Disponível em: https://www.unimed.coop.br/site/web/amparo/-/a-importancia-do-convivio-social-para-a-saude-mental#:~:text=O%20conv%C3%ADvio%20social%20tem%20um,essenciais%20para%20nossa%20sa%C3%BAde%20mental. Acesso em: 4 abr. 2025.
* G1. Golpistas aproveitam férias para criar páginas falsas de restaurantes e passeios na internet. Bom Dia Brasil, 18 jul. 2023. Disponível em: https://g1.globo.com/bom-dia-brasil/noticia/2023/07/18/golpistas-aproveitam-ferias-para-criar-paginas-falsas-de-restaurantes-e-passeios-na-internet.ghtml. Acesso em: 4 abr. 2025.
