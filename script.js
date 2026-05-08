// No topo do arquivo, fora de qualquer função
const productForm = document.getElementById('product-form');

// Só tenta adicionar o evento se o formulário existir (ou seja, se estivermos no Admin)
if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Buscamos a lista atual do storage
        let products = JSON.parse(localStorage.getItem('nexus-products')) || [];

        const newProduct = {
            id: Date.now(),
            name: document.getElementById('prod-name').value,
            price: document.getElementById('prod-price').value,
            img: document.getElementById('prod-img').value,
            category: document.getElementById('prod-category').value
        };

        products.push(newProduct);
        localStorage.setItem('nexus-products', JSON.stringify(products));
        
        alert("Produto cadastrado com sucesso!");
        productForm.reset();
        
        // Se o modal estiver aberto, fecha ele
        const modal = document.getElementById('modal-product');
        if (modal) modal.style.display = 'none';

        // Atualiza a tabela se ela existir
        if (typeof renderAdminTable === 'function') renderAdminTable();
    });
}

// Garante que o código só rode após o HTML carregar
document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('modal-product');
    const btnOpenModal = document.querySelector('.btn-add-item');
    const btnCloseModal = document.querySelector('.close-btn');

    if (btnOpenModal && modal) {
        btnOpenModal.addEventListener('click', () => {
            console.log("Botão clicado!"); // Teste no F12
            modal.style.display = 'flex';
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
});



// --- CONFIGURAÇÃO INICIAL ---
// Selecionamos os elementos que vamos manipular
const cartCountElement = document.getElementById('cart-count');
const addButtons = document.querySelectorAll('.btn-add');

// Inicializamos o carrinho pegando dados do LocalStorage ou um array vazio
// --- CONFIGURAÇÃO INICIAL ---
// Importante: Sempre buscar o valor mais recente do localStorage ao iniciar
let cart = JSON.parse(localStorage.getItem('nexus-cart')) || [];

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal-value');
    const totalElement = document.getElementById('cart-total-value');

    // 1. Verificação de Segurança
    if (!container) return;

    // 2. Busca os dados atualizados do LocalStorage
    const cartItems = JSON.parse(localStorage.getItem('nexus-cart')) || [];
    
    // 3. Limpa o container antes de desenhar
    container.innerHTML = '';
    let totalSum = 0;

    // 4. Caso o carrinho esteja vazio
    if (cartItems.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">Seu carrinho está vazio. Vá buscar uns loots!</p>';
        if (subtotalElement) subtotalElement.innerText = 'R$ 0,00';
        if (totalElement) totalElement.innerText = 'R$ 0,00';
        return;
    }

    // 5. Desenha os itens e calcula o total
    cartItems.forEach((item, index) => {
        // Limpeza de preço robusta (Regex)
        let cleanPrice = item.price.replace(/[^\d,]/g, '').replace(',', '.');
        const numericPrice = parseFloat(cleanPrice);

        if (!isNaN(numericPrice)) {
            totalSum += numericPrice;
        }

        // Criamos o HTML do item
        container.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p style="font-size: 0.8rem; color: #888;">Entrega Digital</p>
                </div>
                <div class="item-price">
                    <span>${item.price}</span>
                    <button onclick="removeItem(${index})" class="btn-remove" style="margin-left: 15px; color: #ff4d4d; background: none; border: none; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // 6. Formatação e Exibição dos Totais
    const formatted = totalSum.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });

    if (subtotalElement) subtotalElement.innerText = formatted;
    if (totalElement) totalElement.innerText = formatted;
}

// Chamar a função explicitamente
document.addEventListener('DOMContentLoaded', renderCart);

// --- FUNÇÕES ---

// Função para atualizar o número visual no ícone do carrinho
function updateCartIcon() {
    const cartCountElement = document.getElementById('cart-count');
    
    // SÓ executa se o elemento existir nesta página
    if (cartCountElement) {
        const totalItems = cart.length;
        cartCountElement.innerText = totalItems;
    }
}

// Função para adicionar item ao carrinho
function addToCart(event) {
    // Buscamos os dados do "pai" do botão (o card do produto)
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = productCard.querySelector('.price').innerText;

    // Criamos um objeto do produto
    const product = {
        name: productName,
        price: productPrice,
        id: Date.now() // ID único temporário
    };

    // Adicionamos ao array e salvamos no navegador
    cart.push(product);
    localStorage.setItem('nexus-cart', JSON.stringify(cart));

    // Atualizamos a interface
    updateCartIcon();
    
    console.log(`Sucesso: ${productName} adicionado!`);
}

// --- EVENTOS ---
// Adicionamos o "ouvidor" de cliques em todos os botões da vitrine
addButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Ao carregar a página, atualiza o ícone com o que já estava salvo
updateCartIcon();

//Pula

// --- LÓGICA DA PÁGINA DE CARRINHO ---



// Função para remover item
function removeItem(index) {
    cart.splice(index, 1); // Remove do array
    localStorage.setItem('nexus-cart', JSON.stringify(cart)); // Atualiza o storage
    renderCart(); // Redesenha a página
    updateCartIcon(); // Atualiza o contador lá no topo
}

// Chamamos a função de renderizar sempre que o script carregar
renderCart();

// Selecionando elementos do Modal
const modal = document.getElementById('modal-product');
const btnOpenModal = document.querySelector('.btn-add-item');
const btnCloseModal = document.querySelector('.close-btn');

// Abrir modal ao clicar no botão que você já tinha criado
if (btnOpenModal) {
    btnOpenModal.onclick = () => modal.style.display = 'flex';
}

// Fechar modal ao clicar no X
if (btnCloseModal) {
    btnCloseModal.onclick = () => modal.style.display = 'none';
}

// Fechar modal ao clicar fora dele
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
}

// Lógica de salvar (mesma de antes, mas agora fecha o modal)
if (productForm) {
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(),
            name: document.getElementById('prod-name').value,
            price: document.getElementById('prod-price').value,
            img: document.getElementById('prod-img').value,
            category: document.getElementById('prod-category').value
        };

        products.push(newProduct);
        localStorage.setItem('nexus-products', JSON.stringify(products));
        
        alert("Produto cadastrado!");
        productForm.reset();
        modal.style.display = 'none'; // Fecha após salvar
        
        // Se houver uma função de listar os produtos na tabela do admin, chame-a aqui
        if (typeof renderAdminTable === 'function') renderAdminTable();
    });
}
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const products = JSON.parse(localStorage.getItem('nexus-products')) || [];
    grid.innerHTML = '';

    products.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <button class="btn-add" onclick="addSpecificToCart('${product.name}', '${product.price}')">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

// --- FUNÇÃO PARA O PAINEL ADMIN ---
function renderAdminTable() {
    // Procuramos o corpo da tabela que você criou no HTML do Admin
    const tableBody = document.querySelector('.admin-table tbody');
    
    // Proteção: Se não estivermos na página de Admin, não faz nada
    if (!tableBody) return;

    // Buscamos os produtos do "banco de dados" (LocalStorage)
    // Se não houver nada, usamos uma lista vazia []
    const storedProducts = JSON.parse(localStorage.getItem('nexus-products')) || [];

    // Limpamos a tabela para não duplicar os itens
    tableBody.innerHTML = '';

    // Criamos uma linha (tr) para cada produto da nossa lista
    storedProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>#${index + 1}</td>
            <td><img src="${product.img}" alt="thumb" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>Em estoque</td>
            <td>
                <button onclick="deleteProduct(${index})" class="del-btn" style="color: #ff4d4d; background: none; border: none; cursor: pointer; font-size: 1.1rem;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// --- FUNÇÃO PARA DELETAR PRODUTOS ---
window.deleteProduct = function(index) {
    // 1. Pega a lista atual
    let storedProducts = JSON.parse(localStorage.getItem('nexus-products')) || [];
    
    // 2. Confirma a exclusão
    if (confirm(`Tem certeza que deseja excluir "${storedProducts[index].name}"?`)) {
        // 3. Remove o item do array pelo índice
        storedProducts.splice(index, 1);
        
        // 4. Salva a lista atualizada de volta no LocalStorage
        localStorage.setItem('nexus-products', JSON.stringify(storedProducts));
        
        // 5. Atualiza a tabela e a vitrine imediatamente
        renderAdminTable();
        if (typeof renderProducts === 'function') renderProducts();
        
        alert("Produto removido com sucesso!");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Tenta renderizar a vitrine (se estiver na Home)
    renderProducts();
    
    // Tenta renderizar a tabela (se estiver no Admin)
    renderAdminTable();
    
    // Tenta carregar o formulário (se estiver no Admin)
    if (typeof setupAdminForm === 'function') setupAdminForm();
});

// Função Global para adicionar ao carrinho
window.addSpecificToCart = function(name, price) {
    // 1. Pega o que já tem no carrinho (Garante que começamos com o dado real)
    let currentCart = JSON.parse(localStorage.getItem('nexus-cart')) || [];

    // 2. Cria o novo produto
    const product = {
        id: Date.now(),
        name: name,
        price: price
    };

    // 3. Adiciona na lista
    currentCart.push(product);

    // 4. SALVA PRIMEIRO (Isso é crucial!)
    localStorage.setItem('nexus-cart', JSON.stringify(currentCart));
    
    // 5. ATUALIZA A VARIÁVEL GLOBAL (Se você usar uma variável 'cart' no topo do script)
    if (typeof cart !== 'undefined') {
        cart = currentCart;
    }

    // 6. AGORA CHAMA A ATUALIZAÇÃO DO ÍCONE
    updateCartIcon();

    console.log(`Item adicionado! Novo total: ${currentCart.length}`);
};