// Dados dos produtos com imagens
const produtos = [
    {
        id: 1,
        nome: 'Camiseta Básica Premium',
        categoria: 'camisetas',
        preco: 49.90,
        descricao: 'Camiseta 100% algodão, confortável e versátil para o dia a dia',
        tamanhos: ['P', 'M', 'G', 'GG'],
        imagem: 'https://images.pexels.com/photos/3930601/pexels-photo-3930601.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 2,
        nome: 'Calça Jeans Clássica',
        categoria: 'calças',
        preco: 129.90,
        descricao: 'Calça jeans azul clássica com ajuste perfeito e durável',
        tamanhos: ['34', '36', '38', '40', '42'],
        imagem: 'https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 3,
        nome: 'Vestido Floral Elegante',
        categoria: 'vestidos',
        preco: 159.90,
        descricao: 'Vestido elegante com estampa floral perfeito para ocasiões especiais',
        tamanhos: ['P', 'M', 'G', 'GG'],
        imagem: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 4,
        nome: 'Jaqueta de Couro Estilosa',
        categoria: 'jaquetas',
        preco: 299.90,
        descricao: 'Jaqueta de couro sintético, estilosa e perfeita para o frio',
        tamanhos: ['P', 'M', 'G', 'GG'],
        imagem: 'https://images.pexels.com/photos/3945682/pexels-photo-3945682.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 5,
        nome: 'Bolsa de Mão Premium',
        categoria: 'acessórios',
        preco: 89.90,
        descricao: 'Bolsa elegante perfeita para o dia a dia com diversos compartimentos',
        tamanhos: ['Única'],
        imagem: 'https://images.pexels.com/photos/1480520/pexels-photo-1480520.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 6,
        nome: 'Camiseta Estampada Criativa',
        categoria: 'camisetas',
        preco: 59.90,
        descricao: 'Camiseta com estampa exclusiva e criativa para quem tem estilo',
        tamanhos: ['P', 'M', 'G', 'GG'],
        imagem: 'https://images.pexels.com/photos/3849586/pexels-photo-3849586.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 7,
        nome: 'Legging Confortável',
        categoria: 'calças',
        preco: 89.90,
        descricao: 'Legging confortável para treino ou uso casual com tecnologia respirável',
        tamanhos: ['P', 'M', 'G'],
        imagem: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 8,
        nome: 'Vestido Sofisticado',
        categoria: 'vestidos',
        preco: 199.90,
        descricao: 'Vestido sofisticado para ocasiões especiais com acabamento impecável',
        tamanhos: ['P', 'M', 'G'],
        imagem: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 9,
        nome: 'Jaqueta Denim Atemporal',
        categoria: 'jaquetas',
        preco: 169.90,
        descricao: 'Jaqueta denim clássica e atemporal que combina com tudo',
        tamanhos: ['P', 'M', 'G', 'GG'],
        imagem: 'https://images.pexels.com/photos/1926895/pexels-photo-1926895.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 10,
        nome: 'Óculos de Sol Premium',
        categoria: 'acessórios',
        preco: 79.90,
        descricao: 'Óculos de sol com proteção UV e design moderno',
        tamanhos: ['Única'],
        imagem: 'https://images.pexels.com/photos/1926760/pexels-photo-1926760.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 11,
        nome: 'Camiseta Oversized Modern',
        categoria: 'camisetas',
        preco: 69.90,
        descricao: 'Camiseta oversized confortável e moderna para um look descontraído',
        tamanhos: ['P', 'M', 'G', 'GG'],
        imagem: 'https://images.pexels.com/photos/3307748/pexels-photo-3307748.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
        id: 12,
        nome: 'Tênis Esportivo Moderno',
        categoria: 'acessórios',
        preco: 249.90,
        descricao: 'Tênis confortável para esporte e uso diário com tecnologia inovadora',
        tamanhos: ['33', '34', '35', '36', '37', '38', '39', '40'],
        imagem: 'https://images.pexels.com/photos/1389845/pexels-photo-1389845.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
];

let carrinho = [];
let filtroAtual = 'todos';
let produtoSelecionado = null;
let tamanhoSelecionado = '';

// Inicializar
window.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    carregarCarrinho();
    setupSearchListener();
    setupMenuToggle();
});

// Toggle Menu Mobile
function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Renderizar produtos
function carregarProdutos() {
    const container = document.getElementById('produtos');
    container.innerHTML = '';

    let produtosFiltrados = produtos;

    if (filtroAtual !== 'todos') {
        produtosFiltrados = produtos.filter(p => p.categoria === filtroAtual);
    }

    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" onclick="abrirProduto(${produto.id})">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            </div>
            <div class="product-info">
                <p class="product-category">${produto.categoria}</p>
                <h3 class="product-name">${produto.nome}</h3>
                <p class="product-description">${produto.descricao}</p>
                <div class="product-footer">
                    <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
                    <button class="btn-view" onclick="abrirProduto(${produto.id})">Ver Detalhes</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filtrar por categoria
function filterByCategory(categoria) {
    filtroAtual = categoria;
    carregarProdutos();
    document.getElementById('navMenu').classList.remove('active');
}

// Buscar produtos
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const container = document.getElementById('produtos');
        container.innerHTML = '';

        const resultados = produtos.filter(p => 
            p.nome.toLowerCase().includes(termo) ||
            p.descricao.toLowerCase().includes(termo) ||
            p.categoria.toLowerCase().includes(termo)
        );

        if (resultados.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #95a5a6;">Nenhum produto encontrado</p>';
            return;
        }

        resultados.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image" onclick="abrirProduto(${produto.id})">
                    <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                </div>
                <div class="product-info">
                    <p class="product-category">${produto.categoria}</p>
                    <h3 class="product-name">${produto.nome}</h3>
                    <p class="product-description">${produto.descricao}</p>
                    <div class="product-footer">
                        <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
                        <button class="btn-view" onclick="abrirProduto(${produto.id})">Ver Detalhes</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

// Abrir modal do produto
function abrirProduto(id) {
    produtoSelecionado = produtos.find(p => p.id === id);
    tamanhoSelecionado = '';

    document.getElementById('modalImage').src = produtoSelecionado.imagem;
    document.getElementById('modalProductName').textContent = produtoSelecionado.nome;
    document.getElementById('modalCategory').textContent = produtoSelecionado.categoria;
    document.getElementById('modalPrice').textContent = `R$ ${produtoSelecionado.preco.toFixed(2)}`;
    document.getElementById('modalDescription').textContent = produtoSelecionado.descricao;
    document.getElementById('quantityInput').value = 1;

    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';

    produtoSelecionado.tamanhos.forEach(tamanho => {
        const btn = document.createElement('button');
        btn.className = 'size-option';
        btn.textContent = tamanho;
        btn.onclick = () => selecionarTamanho(tamanho, btn);
        sizeOptions.appendChild(btn);
    });

    document.getElementById('productModal').style.display = 'block';
}

// Selecionar tamanho
function selecionarTamanho(tamanho, btn) {
    document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    tamanhoSelecionado = tamanho;
}

// Fechar modal do produto
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Adicionar ao carrinho do modal
function addToCartFromModal() {
    if (!tamanhoSelecionado) {
        alert('Por favor, selecione um tamanho!');
        return;
    }

    const quantidade = parseInt(document.getElementById('quantityInput').value);
    
    adicionarAoCarrinho(produtoSelecionado.id, quantidade, tamanhoSelecionado);
    closeProductModal();
}

// Adicionar ao carrinho
function adicionarAoCarrinho(produtoId, quantidade = 1, tamanho = '') {
    const produto = produtos.find(p => p.id === produtoId);
    
    const itemExistente = carrinho.find(item => 
        item.id === produtoId && item.tamanho === tamanho
    );

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            id: produtoId,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidade,
            tamanho: tamanho || 'Padrão',
            imagem: produto.imagem
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    alert(`${produto.nome} adicionado ao carrinho!`);
}

// Atualizar contagem do carrinho
function atualizarCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    document.getElementById('cartCount').textContent = totalItens;
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Carregar carrinho do localStorage
function carregarCarrinho() {
    const saved = localStorage.getItem('carrinho');
    if (saved) {
        carrinho = JSON.parse(saved);
        atualizarCarrinho();
    }
}

// Abrir carrinho
document.getElementById('cartBtn').addEventListener('click', () => {
    const modal = document.getElementById('cartModal');
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');

    cartItemsDiv.innerHTML = '';

    if (carrinho.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #95a5a6; padding: 40px;">Seu carrinho está vazio</p>';
        totalPriceSpan.textContent = '0.00';
    } else {
        let total = 0;

        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">📦 ${item.nome} (${item.tamanho})</div>
                    <div>Quantidade: ${item.quantidade}</div>
                    <div class="cart-item-price">R$ ${subtotal.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            cartItemsDiv.appendChild(cartItem);
        });

        totalPriceSpan.textContent = total.toFixed(2);
    }

    modal.style.display = 'block';
});

// Fechar carrinho
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Remover do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();

    // Reabrir o modal para atualizar
    document.getElementById('cartBtn').click();
}

// Finalizar compra
function checkout() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const mensagem = `Olá! Gostaria de finalizar a compra de:\n\n${carrinho.map(item => `📦 ${item.quantidade}x ${item.nome} (${item.tamanho}) - R$ ${(item.preco * item.quantidade).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;

    const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappLink, '_blank');

    // Limpar carrinho
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
    closeCart();
}

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');

    if (event.target === cartModal) {
        closeCart();
    }
    if (event.target === productModal) {
        closeProductModal();
    }
});