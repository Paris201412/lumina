// --- Database of Premium Products & Dynamic Catalog Elements ---
const PRODUCT_DATA = [
    {
        id: "f1",
        name: "Oversized Lumina Hoodie",
        category: "fashion",
        price: 88.00,
        visual: '<img src="./hoodie.jpg" alt="Lumina Hoodie" style="width:100%; height:100%; object-fit:cover;">', 
        badge: "",
        hasSizes: true,
        isBestSeller: true,
        isFeatured: true
    },
    {
        id: "f2",
        name: "Celestial Lounge Pants",
        category: "fashion",
        price: 74.00,
        visual: '<img src="./pants.jpg" alt="Lounge Pants" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: true,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "b1",
        name: "Lumina Lip Gloss (Moonlight Glow)",
        category: "beauty",
        price: 24.00,
        visual: '<img src="./lipgloss.jpg" alt="Lumina Lip Gloss" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: true,
        isFeatured: false
    },
    {
        id: "b2",
        name: "Stardust Ethereal Perfume",
        category: "beauty",
        price: 95.00,
        visual: '<img src="./perfume.jpg" alt="Stardust Perfume" style="width:100%; height:100%; object-fit:cover;">',
        badge: "Coming Soon",
        hasSizes: false,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "a1",
        name: "Lumina Star Silk Scrunchie",
        category: "accessories",
        price: 16.00,
        visual: '<img src="./scrunchie.jpg" alt="Lumina Scrunchie" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: false,
        isFeatured: false
    },
    {
        id: "a2",
        name: "Eight-Point Celestial Ring",
        category: "accessories",
        price: 120.00,
        visual: '<img src="./ring.jpg" alt="Celestial Ring" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: true,
        isFeatured: false
    },
    {
        id: "s1",
        name: "Lumina Minimalist Journal Notebook",
        category: "school-supplies",
        price: 28.00,
        visual: '<img src="./notebook.jpg" alt="Lumina Notebook" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: true,
        isFeatured: false
    },
    {
        id: "s2",
        name: "Cosmic Soft-Ink Gel Pen Trio",
        category: "school-supplies",
        price: 14.00,
        visual: '<img src="./pen.jpg" alt="Cosmic Pens" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "p1",
        name: "Lumi Star Collectible Plushie",
        category: "plushies",
        price: 34.00,
        visual: '<img src="./plushie.jpg" alt="Lumi Plushie" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: true,
        isFeatured: true
    },
    {
        id: "c1",
        name: "Lavender Amethyst Calming Candle",
        category: "self-care",
        price: 38.00,
        visual: '<img src="./candle.jpg" alt="Calming Candle" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: false,
        isFeatured: false
    }
];

let shoppingCart = [];

document.addEventListener("DOMContentLoaded", () => {
    initializeHomeGridDisplay();
    setupInterfaceEventHandlers();
    handleUrlRoutingCheck();
});

function createProductCardMarkup(product) {
    const isSoon = product.badge === "Coming Soon";
    
    let sizeSelectorHtml = "";
    if (product.hasSizes && !isSoon) {
        sizeSelectorHtml = `
            <select id="size-${product.id}" style="margin-bottom: 0.5rem; padding: 0.25rem; font-family: inherit; font-size: 0.75rem; width: 100%;">
                <option value="S">Size: S</option>
                <option value="M" selected>Size: M</option>
                <option value="L">Size: L</option>
                <option value="XL">Size: XL</option>
            </select>
        `;
    }

    const actionBtnHtml = isSoon 
        ? `<button class="btn btn-secondary" disabled style="width:100%; font-size:0.7rem;">Awaiting Drop</button>`
        : `${sizeSelectorHtml}<button class="btn btn-primary" onclick="addProductToCart('${product.id}')" style="width:100%; font-size:0.7rem;">Add to Cart</button>`;
        
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img-frame" style="padding: 0; background: #FAF9FB;">
                ${product.badge ? `<span class="badge badge-soon">${product.badge}</span>` : ''}
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    ${product.visual}
                </div>
                <div class="product-action-overlay" style="flex-direction: column; align-items: center;">
                    ${actionBtnHtml}
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `;
}

function initializeHomeGridDisplay() {
    const featuredTarget = document.getElementById("featured-products-container");
    const bestTarget = document.getElementById("best-sellers-container");

    const featuredItems = PRODUCT_DATA.filter(p => p.isFeatured);
    const bestItems = PRODUCT_DATA.filter(p => p.isBestSeller);

    if(featuredTarget) featuredTarget.innerHTML = featuredItems.map(createProductCardMarkup).join('');
    if(bestTarget) bestTarget.innerHTML = bestItems.map(createProductCardMarkup).join('');
}

function navigateTo(targetRoute) {
    const routesMap = {
        'home': { type: 'static', elementId: 'page-home' },
        'about': { type: 'static', elementId: 'page-about' },
        'contact': { type: 'static', elementId: 'page-contact' },
        'fashion': { type: 'catalog', title: 'Fashion Collection', desc: 'Premium, modern streetwear engineered with celestial detail.' },
        'beauty': { type: 'catalog', title: 'Beauty & Cosmetics', desc: 'Dreamy self-care pigments and stellar skincare formulations.' },
        'accessories': { type: 'catalog', title: 'Luxury Accessories', desc: 'Minimal statement jewelry and delicate accents.' },
        'school-supplies': { type: 'catalog', title: 'School Supplies & Stationery', desc: 'Elevated productivity planners and creative notebooks.' },
        'plushies': { type: 'catalog', title: 'Collectible Plushies', desc: 'Meet Lumi and variants—your soft celestial guides.' },
        'self-care': { type: 'catalog', title: 'Self-Care Rituals', desc: 'Calming tools designed to elevate wellness environments.' }
    };

    const targetConfig = routesMap[targetRoute] || routesMap['home'];

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    
    if (targetConfig.type === 'static') {
        document.getElementById(targetConfig.elementId).classList.add('active');
    } else if (targetConfig.type === 'catalog') {
        document.getElementById('current-catalog-title').innerText = targetConfig.title;
        document.getElementById('current-catalog-desc').innerText = targetConfig.desc;
        
        const filteredProducts = PRODUCT_DATA.filter(p => p.category === targetRoute);
        document.getElementById('catalog-products-container').innerHTML = filteredProducts.map(createProductCardMarkup).join('');
        
        document.getElementById('page-catalog').classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${targetRoute}`) {
            link.classList.add('active');
        }
    });

    document.querySelector('.nav-menu').classList.remove('open');
    document.querySelector('.mobile-nav-toggle').classList.remove('open');
}

function toggleCart() {
    document.querySelector('.cart-drawer').classList.toggle('open');
    document.querySelector('.cart-drawer-overlay').classList.toggle('open');
}

function addProductToCart(productId) {
    const matchItem = PRODUCT_DATA.find(p => p.id === productId);
    if (!matchItem) return;

    let selectedSize = "";
    const sizeSelectElement = document.getElementById(`size-${productId}`);
    if (sizeSelectElement) {
        selectedSize = sizeSelectElement.value;
    }

    const displayName = selectedSize ? `${matchItem.name} (${selectedSize})` : matchItem.name;
    const cartItemId = selectedSize ? `${productId}-${selectedSize}` : productId;

    const existingRecord = shoppingCart.find(item => item.cartItemId === cartItemId);

    if (existingRecord) {
        existingRecord.quantity += 1;
    } else {
        shoppingCart.push({ 
            cartItemId: cartItemId,
            product: matchItem, 
            displayName: displayName,
            quantity: 1 
        });
    }

    refreshCartDisplayState();
    
    document.querySelector('.cart-drawer').classList.add('open');
    document.querySelector('.cart-drawer-overlay').classList.add('open');
}

function removeCartLineItem(cartItemId) {
    shoppingCart = shoppingCart.filter(item => item.cartItemId !== cartItemId);
    refreshCartDisplayState();
}

function refreshCartDisplayState() {
    const container = document.getElementById("cart-items");
    const countBadge = document.querySelector(".cart-count");
    const subtotalText = document.getElementById("cart-subtotal-val");
    const checkoutBtn = document.querySelector(".checkout-btn");

    const totalUnits = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    countBadge.innerText = totalUnits;

    if (shoppingCart.length === 0) {
        container.innerHTML = `<p class="empty-cart-text">Your collection is currently empty.</p>`;
        subtotalText.innerText = "$0.00";
        checkoutBtn.disabled = true;
        return;
    }

    let calculatedTotal = 0;
    container.innerHTML = shoppingCart.map(lineItem => {
        const cost = lineItem.product.price * lineItem.quantity;
        calculatedTotal += cost;
        return `
            <div class="cart-item-row">
                <div style="width: 50px; height: 50px; background: #F9F8FA; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                    ${lineItem.product.visual}
                </div>
                <div class="cart-item-details" style="flex:1; padding-left:0.5rem;">
                    <h4 style="font-size:0.85rem; line-height:1.2;">${lineItem.displayName}</h4>
                    <p style="font-size:0.75rem; margin-top:0.2rem;">Qty: ${lineItem.quantity} &times; $${lineItem.product.price.toFixed(2)}</p>
                    <button class="remove-item-btn" onclick="removeCartLineItem('${lineItem.cartItemId}')">Remove</button>
                </div>
                <div style="font-size: 0.85rem; font-weight:500;">
                    $${cost.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');

    subtotalText.innerText = `$${calculatedTotal.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

function setupInterfaceEventHandlers() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const menuEl = document.querySelector('.nav-menu');

    if (mobileToggle && menuEl) {
        mobileToggle.addEventListener('click', () => {
            menuEl.classList.toggle('open');
            mobileToggle.classList.toggle('open');
        });
    }
}

function handleUrlRoutingCheck() {
    const currentHash = window.location.hash.replace('#', '');
    if(currentHash) {
        navigateTo(currentHash);
    }
}

window.addEventListener('hashchange', handleUrlRoutingCheck);