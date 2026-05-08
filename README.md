# First-Project-FrontEnd
My First Project using HTML/CSS/JavaScript

PORTUGUES
Este projeto é uma plataforma de e-commerce funcional para jogos digitais, desenvolvida com foco em manipulação dinâmica de DOM e persistência de dados via localStorage. A aplicação permite o gerenciamento completo de produtos através de um painel administrativo e uma experiência de compra fluida para o usuário.

Funcionalidades Implementadas
Página Principal (Home):
rine gerada dinamicamente a partir dos dados salvos.
Sincronização em tempo real com o Painel Admin.
Botão "Adicionar ao Carrinho" com feedback imediato.
Painel Administrativo (Admin):
Sistema CRUD (Create, Read, Delete) para produtos.
Upload simulado de imagens via URL.
Tabela de gerenciamento com opção de exclusão.
Carrinho de Compras:
Cálculo automático de total com limpeza de strings (Regex).
Remoção individual de itens com atualização instantânea da interface.
Persistência de dados: os itens não somem ao atualizar a página.
Global:
Contador de itens no header visível em todas as páginas.
Navegação integrada entre Home, Admin e Carrinho.
Tecnologias Utilizadas
HTML5: Estrutura semântica.
CSS3: Design responsivo e estilização moderna (Flexbox/Grid).
JavaScript: Lógica de negócios, manipulação de arrays e LocalStorage.

ENGLISH
This project is a functional e-commerce platform for digital games, developed with a focus on dynamic DOM manipulation and data persistence via localStorage. The application allows for full product management through an administrative panel and a seamless shopping experience for the user.

Implemented Features
Main Page (Home):
Showcase dynamically generated from saved data.
Real-time synchronization with the Admin Panel.
"Add to Cart" button with immediate feedback.
Administrative Panel (Admin):
CRUD system (Create, Read, Delete) for products.
Simulated image upload via URL.
Management table with a delete option.
Shopping Cart:
Automatic total calculation with string sanitization (Regex).
Individual item removal with instant UI update.
Data persistence: items do not disappear when the page is refreshed.
Global:
Header item counter visible on all pages.
Integrated navigation between Home, Admin, and Cart.
Technologies Used
HTML5: Semantic structure.
CSS3: Responsive design and modern styling (Flexbox/Grid).
JavaScript: Business logic, array manipulation, and LocalStorage.
Technical Insights
State Management: Aprendemos a usar o localStorage como uma "Fonte Única da Verdade" (Single Source of Truth), garantindo que os dados inseridos em uma aba reflitam em todas as outras.
Regex & Data Parsing: Implementamos limpeza de dados para converter strings de moeda (R$ 199,90) em números flutuantes (199.90) para cálculos matemáticos precisos.
Scope & Context: Resolvemos conflitos de funções redundantes e garantimos que funções chamadas via HTML dinâmico estejam no escopo global (window).
