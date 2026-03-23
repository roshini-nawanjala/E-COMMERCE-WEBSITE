// dummy product data
const products = [
    {
        id: 1,
        name: "Apple MacBook Pro 14 M2 Pro (2023)",
        price: 650000,
        oldPrice: 695000,
        condition: "new",
        category: "business",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 5,
        reviews: 24,
        description: "The 14-inch MacBook Pro with M2 Pro takes power and speed to the next level, whether it's on battery or plugged in.",
        specs: { cpu: "Apple M2 Pro", ram: "16GB Unified", storage: "512GB SSD", display: "14.2-inch Liquid Retina XDR" }
    },
    {
        id: 2,
        name: "Dell XPS 13 9310 Core i7 11th Gen",
        price: 185000,
        oldPrice: null,
        condition: "used",
        category: "business",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 12,
        description: "Precision crafted premium materials, featuring flawless construction, in an ultra-portable business laptop.",
        specs: { cpu: "Intel Core i7-1165G7", ram: "16GB LPDDR4x", storage: "512GB NVMe", display: "13.4-inch FHD+ InfinityEdge" }
    },
    {
        id: 3,
        name: "Asus ROG Strix G15 Ryzen 9 RTX 3070",
        price: 425000,
        oldPrice: null,
        condition: "new",
        category: "gaming",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 38,
        description: "Raise your game with the ROG Strix G15. Designed for heavy-duty gaming and smooth multitasking.",
        specs: { cpu: "AMD Ryzen 9 5900HX", ram: "16GB DDR4", storage: "1TB NVMe", display: "15.6-inch 300Hz FHD" }
    },
    {
        id: 4,
        name: "Lenovo ThinkPad T480s Core i5 8th Gen",
        price: 72000,
        oldPrice: 85000,
        condition: "used",
        category: "business",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.2,
        reviews: 45,
        description: "Lightweight robust corporate workhorse. Perfect for students and day-to-day office tasks.",
        specs: { cpu: "Intel Core i5-8350U", ram: "8GB DDR4", storage: "256GB SSD", display: "14.0-inch FHD IPS" }
    },
    {
        id: 5,
        name: "HP Pavilion 15 Core i5 12th Gen",
        price: 195000,
        oldPrice: 215000,
        condition: "new",
        category: "student",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 18,
        description: "Incredible performance with the latest 12th gen processor in a sleek, lightweight body.",
        specs: { cpu: "Intel Core i5-1240P", ram: "8GB DDR4", storage: "512GB NVMe", display: "15.6-inch FHD" }
    },
    {
        id: 6,
        name: "Acer Nitro 5 Core i7 11th Gen RTX 3050Ti",
        price: 265000,
        oldPrice: 280000,
        condition: "used",
        category: "gaming",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 29,
        description: "Budget gaming laptop that doesn't compromise on cooling and performance.",
        specs: { cpu: "Intel Core i7-11800H", ram: "16GB DDR4", storage: "512GB NVMe", display: "15.6-inch 144Hz FHD" }
    }
];

// Formatting helpers
const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-US')}`;
};

// Application State
let cart = JSON.parse(localStorage.getItem('ashlapmart_cart')) || [];

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Add to Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast(`Added ${product.name} to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    if(window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    showToast(`Removed item from cart.`);
}

function updateQuantity(productId, dt) {
    const item = cart.find(i => i.id === productId);
    if(item) {
        item.quantity += dt;
        if(item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            if(window.location.pathname.includes('cart.html')) {
                renderCart();
            }
        }
    }
}

function saveCart() {
    localStorage.setItem('ashlapmart_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountSpans = document.querySelectorAll('.absolute.-top-2.-right-2.bg-primary');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpans.forEach(span => {
        if(span.innerHTML !== undefined) span.innerHTML = totalCount;
    });
}

// Toast Notifications
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Generate Stars UI
function generateStars(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    for(let i=0; i<fullStars; i++) {
        html += '<i class="fas fa-star text-yellow-400 text-sm"></i>';
    }
    if(hasHalf) {
        html += '<i class="fas fa-star-half-alt text-yellow-400 text-sm"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for(let i=0; i<emptyStars; i++) {
        html += '<i class="far fa-star text-yellow-400 text-sm"></i>';
    }
    return html;
}

// Generate Product Card HTML
function createProductCard(product) {
    const badge = product.condition === 'new' 
        ? `<span class="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">BRAND NEW</span>`
        : `<span class="absolute top-4 left-4 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">USED</span>`;
    
    const oldPriceHtml = product.oldPrice 
        ? `<p class="text-gray-500 text-sm line-through">${formatPrice(product.oldPrice)}</p>` 
        : '';

    return `
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group border border-gray-100 flex flex-col h-full">
        <div class="relative pt-4 px-4">
            ${badge}
            <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors focus:outline-none">
                <i class="far fa-heart text-xl"></i>
            </button>
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300">
            </a>
        </div>
        <div class="p-5 flex-1 flex flex-col">
            <div class="text-xs ${product.condition==='new' ? 'text-blue-600' : 'text-gray-500'} font-semibold mb-1 uppercase tracking-wider">${product.condition === 'new' ? 'Brand New' : 'Second Hand'}</div>
            <a href="product-detail.html?id=${product.id}" class="text-lg font-bold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">${product.name}</a>
            <div class="flex items-center gap-1 mb-3">
                ${generateStars(product.rating)}
                <span class="text-gray-500 text-xs ml-1">(${product.reviews})</span>
            </div>
            <div class="mt-auto">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        ${oldPriceHtml}
                        <p class="text-xl font-bold text-gray-900">${formatPrice(product.price)}</p>
                    </div>
                </div>
                <button onclick="addToCart(${product.id})" class="w-full bg-gray-900 hover:bg-primary text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    </div>
    `;
}

// Rendering Logic based on page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const path = window.location.pathname;

    // Remove loader if any
    const loader = document.getElementById('global-loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    }

    if (path.includes('products.html')) {
        renderProductsPage();
    } else if (path.includes('product-detail.html')) {
        renderProductDetailPage();
    } else if (path.includes('cart.html')) {
        renderCart();
    }
});

// Products Listing Page Logic
function renderProductsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterCondition = urlParams.get('condition');
    const filterCategory = urlParams.get('category');
    
    let filteredProducts = [...products];
    
    // Set UI dropdowns/filters based on url
    if(filterCondition) {
        const conditionSelect = document.getElementById('filter-condition');
        if(conditionSelect) conditionSelect.value = filterCondition;
        filteredProducts = filteredProducts.filter(p => p.condition === filterCondition);
    }
    if(filterCategory) {
        const categorySelect = document.getElementById('filter-category');
        if(categorySelect) categorySelect.value = filterCategory;
        filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
    }

    // Bind event listeners to filters
    const applyFilters = () => {
        let temp = [...products];
        const cond = document.getElementById('filter-condition')?.value;
        const cat = document.getElementById('filter-category')?.value;
        const sort = document.getElementById('sort-by')?.value;

        if(cond && cond !== 'all') temp = temp.filter(p => p.condition === cond);
        if(cat && cat !== 'all') temp = temp.filter(p => p.category === cat);
        
        if(sort === 'price-low') temp.sort((a,b) => a.price - b.price);
        if(sort === 'price-high') temp.sort((a,b) => b.price - a.price);

        renderProductGrid(temp);
    };

    ['filter-condition', 'filter-category', 'sort-by'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.addEventListener('change', applyFilters);
    });

    renderProductGrid(filteredProducts);
}

function renderProductGrid(items) {
    const grid = document.getElementById('products-grid');
    if(!grid) return;
    
    const countSpan = document.getElementById('results-count');
    if(countSpan) countSpan.textContent = items.length;

    if(items.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-10 text-center text-gray-500">No laptops found matching your criteria.</div>';
        return;
    }

    grid.innerHTML = items.map(p => createProductCard(p)).join('');
}

// Product Details Page Logic
function renderProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id') || '1');
    const product = products.find(p => p.id === productId);

    if(!product) {
        document.getElementById('product-content').innerHTML = `
            <div class="text-center py-20 px-4">
                <h2 class="text-2xl font-bold mb-4">Product Not Found</h2>
                <a href="products.html" class="text-primary hover:underline">Return to Laptops</a>
            </div>
        `;
        return;
    }

    // Populate Breadcrumb
    document.getElementById('bc-name').textContent = product.name;
    
    // Replace content
    document.getElementById('pd-image').src = product.image;
    document.getElementById('pd-name').textContent = product.name;
    
    const condBadge = product.condition === 'new' 
        ? `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Brand New</span>`
        : `<span class="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">Used / Second Hand</span>`;
    document.getElementById('pd-badges').innerHTML = condBadge;
    
    document.getElementById('pd-rating').innerHTML = generateStars(product.rating) + `<span class="text-sm text-gray-500 ml-2">(${product.reviews} reviews)</span>`;
    
    document.getElementById('pd-price').textContent = formatPrice(product.price);
    if(product.oldPrice) {
        document.getElementById('pd-old-price').textContent = formatPrice(product.oldPrice);
    } else {
        document.getElementById('pd-old-price').classList.add('hidden');
    }
    
    document.getElementById('pd-desc').textContent = product.description;
    
    // Specs
    document.getElementById('spec-cpu').textContent = product.specs.cpu;
    document.getElementById('spec-ram').textContent = product.specs.ram;
    document.getElementById('spec-storage').textContent = product.specs.storage;
    document.getElementById('spec-display').textContent = product.specs.display;

    // Action button
    document.getElementById('pd-add-btn').onclick = () => {
        const qty = parseInt(document.getElementById('pd-qty').value || 1);
        for(let i=0; i<qty; i++) addToCart(product.id);
    };

    // Related products (same category or condition, exclude current)
    const related = products.filter(p => p.id !== product.id && (p.category === product.category || p.condition === product.condition)).slice(0, 4);
    const relatedGrid = document.getElementById('related-products');
    if(relatedGrid) {
        relatedGrid.innerHTML = related.map(p => createProductCard(p)).join('');
    }
}

// Cart Logic
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const orderSummaryContainer = document.getElementById('order-summary');
    
    if(!cartItemsContainer || !orderSummaryContainer) return;

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12 px-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-shopping-cart text-3xl text-gray-400"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p class="text-gray-500 mb-6">Looks like you haven't added any laptops yet.</p>
                <a href="products.html" class="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                    Start Shopping
                </a>
            </div>
        `;
        orderSummaryContainer.classList.add('hidden');
        return;
    }

    orderSummaryContainer.classList.remove('hidden');
    let subtotal = 0;

    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
        <div class="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 relative">
            <button onclick="removeFromCart(${item.id})" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                <i class="fas fa-times"></i>
            </button>
            <div class="w-24 h-24 shrink-0">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1 text-center sm:text-left">
                <h4 class="font-bold text-gray-900 mb-1">${item.name}</h4>
                <p class="text-sm text-gray-500 mb-2">${item.condition === 'new' ? 'Brand New' : 'Used'}</p>
                <p class="font-bold text-primary">${formatPrice(item.price)}</p>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="updateQuantity(${item.id}, -1)" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors">
                    <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="font-semibold w-6 text-center">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
            <div class="w-full sm:w-auto mt-4 sm:mt-0 text-center sm:text-right">
                <p class="text-sm text-gray-500 mb-1">Total</p>
                <p class="font-bold text-gray-900 text-lg">${formatPrice(itemTotal)}</p>
            </div>
        </div>
        `;
    }).join('');

    // Update Summary
    document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('summary-total').textContent = formatPrice(subtotal); // Since shipping is handled differently
}
