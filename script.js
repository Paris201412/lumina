// --- Database of Premium Products & Dynamic Catalog Elements ---
const PRODUCT_DATA = [
    {
        id: "f1",
        name: "Oversized Lumina Hoodie",
        category: "fashion",
        basePrice: 88.00,
        prices: { "S": 88.00, "M": 88.00, "L": 92.00, "XL": 95.00 },
        visual: '<img src="./hoodie.jpg" alt="Lumina Hoodie" style="width:100%; height:100%; object-fit:cover;">', 
        badge: "",
        variants: { type: "Color", options: ["Lavender", "Cream", "Black"] },
        hasSizes: true,
        isBestSeller: true,
        isFeatured: true
    },
    {
        id: "f2",
        name: "Celestial Lounge Pants",
        category: "fashion",
        basePrice: 74.00,
        prices: { "S": 74.00, "M": 74.00, "L": 78.00, "XL": 82.00 },
        visual: '<img src="./pants.jpg" alt="Lounge Pants" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { type: "Color", options: ["Lavender", "Cream", "Black"] },
        hasSizes: true,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "b1",
        name: "Lumina Lip Gloss",
        category: "beauty",
        basePrice: 24.00,
        visual: '<img src="./lipgloss.jpg" alt="Lumina Lip Gloss" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { 
            type: "Formula", 
            options: [
                "Dream Glow ✨ Clear gloss", 
                "Lavender Kiss 💜 Sheer lavender tint", 
                "Moonlight Shine ⭐ Shimmery gloss"
            ] 
        },
        hasSizes: false,
        isBestSeller: true,
        isFeatured: false
    },
    {
        id: "b2",
        name: "Stardust Ethereal Perfume",
        category: "beauty",
        basePrice: 95.00,
        visual: '<img src="./perfume.jpg" alt="Stardust Perfume" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { type: "Color", options: ["Lavender", "Cream", "Black"] },
        hasSizes: false,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "a1",
        name: "Lumina Star Silk Scrunchie",
        category: "accessories",
        basePrice: 16.00,
        visual: '<img src="./scrunchie.jpg" alt="Lumina Scrunchie" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { type: "Color", options: ["Lavender", "Cream", "Black"] },
        hasSizes: false,
        isBestSeller: false,
        isFeatured: false
    },
    {
        id: "a2",
        name: "Eight-Point Celestial Jewelry",
        category: "accessories",
        basePrice: 120.00,
        visual: '<img src="./ring.jpg" alt="Celestial Jewelry" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { 
            type: "Style", 
            options: [
                "Ring (Men)", "Ring (Women)", 
                "Necklace (Men)", "Necklace (Women)",
                "Bracelet (Men)", "Bracelet (Women)",
                "Earrings (Men)", "Earrings (Women)",
                "Nose Piercing Stud (Men)", "Nose Piercing Stud (Women)"
            ] 
        },
        hasSizes: false,
        isBestSeller: true,
        isFeatured: false
    },
    {
        id: "a3",
        name: "Stardust Crossbody Bag",
        category: "accessories",
        basePrice: 65.00,
        visual: '<img src="./bag.jpg" alt="Stardust Crossbody Bag" style="width:100%; height:100%; object-fit:cover;">',
        badge: "New Drop",
        hasSizes: false,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "s1",
        name: "Lumina Minimalist Journal Notebook",
        category: "school-supplies",
        basePrice: 28.00,
        visual: '<img src="./notebook.jpg" alt="Lumina Notebook" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { type: "Color", options: ["Lavender", "Cream", "Black"] },
        hasSizes: false,
        isBestSeller: true,
        isFeatured: false
    },
    {
        id: "s2",
        name: "Cosmic Soft-Ink Gel Pen Trio",
        category: "school-supplies",
        basePrice: 14.00,
        visual: '<img src="./pen.jpg" alt="Cosmic Pens" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: { type: "Color", options: ["Lavender", "Cream", "Black"] },
        hasSizes: false,
        isBestSeller: false,
        isFeatured: true
    },
    {
        id: "p1",
        name: "Lumi Star Collectible Plushie",
        category: "plushies",
        basePrice: 34.00,
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
        basePrice: 38.00,
        visual: '<img src="./candle.jpg" alt="Calming Candle" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        hasSizes: false,
        isBestSeller: false,
        isFeatured: false
    }
];

let shoppingCart = [];

// --- Lifecycle Initialization Engine ---
document.addEventListener("DOMContentLoaded", () => {
    initializeHomeGridDisplay();
    setupInterfaceEventHandlers();
    
    window.addEventListener('hashchange', handleUrlRoutingCheck);
    if (!window.location.hash) {
        window.location.hash = '#home';
    } else {
        handleUrlRoutingCheck();
    }
});

function updateCardPriceDisplay(productId) {
    const p = PRODUCT_DATA.find(prod => prod.id === productId);
    if (!p || !p.hasSizes) return;
    
    const sizeSelect = document.getElementById(`size-${productId}`);
    const priceText = document.getElementById(`price-display-${productId}`);
    if (sizeSelect && priceText) {
        const selectedSize = sizeSelect.value;
        const targetPrice = p.prices[selectedSize] || p.basePrice;
        priceText.innerText = `$${targetPrice.toFixed(2)}`;
    }
}

// --- Premium Card Generator UI Module ---
function createProductCardMarkup(product) {
    let sizeSelectorHtml = "";
    if (product.hasSizes) {
        sizeSelectorHtml = `
            <select id="size-${product.id}" onchange="updateCardPriceDisplay('${product.id}')" style="margin-bottom: 0.5rem; padding: 0.35rem; font-family: inherit; font-size: 0.75rem; width: 100%; border:1px solid #ddd; background:#fff; border-radius:2px;">
                <option value="S">Size: S</option>
                <option value="M" selected>Size: M</option>
                <option value="L">Size: L</option>
                <option value="XL">Size: XL</option>
            </select>
        `;
    }

    let variantSelectorHtml = "";
    if (product.variants) {
        variantSelectorHtml = `
            <select id="variant-${product.id}" style="margin-bottom: 0.5rem; padding: 0.35rem; font-family: inherit; font-size: 0.75rem; width: 100%; border:1px solid #ddd; background:#fff; border-radius:2px;">
                ${product.variants.options.map(opt => `<option value="${opt}">${product.variants.type}: ${opt}</option>`).join('')}
            </select>
        `;
    }

    const quantitySelectorHtml = `
        <div style="display:flex; align-items:center; margin-bottom:0.75rem; background:#fff; border:1px solid #ddd; border-radius:2px; padding:0 0.25rem;">
            <span style="font-size:0.7rem; color:#888; padding-left:0.25rem;">Qty:</span>
            <input id="qty-${product.id}" type="number" value="1" min="1" max="20" style="padding:0.35rem; border:none; outline:none; font-family:inherit; font-size:0.75rem; width:100%; text-align:right; background:transparent;">
        </div>
    `;

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img-frame" style="padding:0; background:#FAF9FB; position:relative; overflow:hidden;">
                ${product.badge ? `<span class="badge badge-soon">${product.badge}</span>` : ''}
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    ${product.visual}
                </div>
                <div class="product-action-overlay" style="flex-direction: column; align-items: stretch; padding:1.25rem; justify-content:center; background: rgba(255,255,255,0.95);">
                    ${sizeSelectorHtml}
                    ${variantSelectorHtml}
                    ${quantitySelectorHtml}
                    <button class="btn btn-primary" onclick="addProductToCart('${product.id}')" style="width:100%; font-size:0.7rem; padding:0.6rem; text-transform:uppercase; letter-spacing:0.05em;">Add to Cart</button>
                </div>
            </div>
            <div class="product-info" style="display:flex; justify-content:space-between; align-items:center; padding-top:0.75rem;">
                <h3 style="font-size:0.9rem; font-weight:400; margin:0; color:#1a1a1a;">${product.name}</h3>
                <div class="product-price" id="price-display-${product.id}" style="font-size:0.9rem; font-weight:500; color:#7E57C2;">$${product.basePrice.toFixed(2)}</div>
            </div>
        </div>
    `;
}

function initializeHomeGridDisplay() {
    const featuredTarget = document.getElementById("featured-products-container");
    const bestTarget = document.getElementById("best-sellers-container");

    if(featuredTarget) featuredTarget.innerHTML = PRODUCT_DATA.filter(p => p.isFeatured).map(createProductCardMarkup).join('');
    if(bestTarget) bestTarget.innerHTML = PRODUCT_DATA.filter(p => p.isBestSeller).map(createProductCardMarkup).join('');
}

function navigateTo(targetRoute) {
    window.location.hash = '#' + targetRoute;
}

function renderPageView(targetRoute) {
    const routesMap = {
        'home': { type: 'static', elementId: 'page-home' },
        'about': { type: 'static', elementId: 'page-about' },
        'contact': { type: 'static', elementId: 'page-contact' },
        'fashion': { type: 'catalog', title: 'Fashion Line', desc: 'Premium luxury garments crafted in signature colorways.' },
        'beauty': { type: 'catalog', title: 'Cosmetics & Beauty', desc: 'Stardust formulations and ethereal visual pigments.' },
        'accessories': { type: 'catalog', title: 'Accessories Studio', desc: 'Delicate jewelry details and minimal carry staples.' },
        'school-supplies': { type: 'catalog', title: 'Stationery Toolkit', desc: 'Minimal executive utility items for creative workspace structuring.' },
        'plushies': { type: 'catalog', title: 'Celestial Plushies', desc: 'Plush companions mapped with cloud-soft luxury fabrics.' },
        'self-care': { type: 'catalog', title: 'Self-Care Rituals', desc: 'Atmospheric design elements to calm interior environments.' }
    };

    const targetConfig = routesMap[targetRoute] || routesMap['home'];

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    
    if (targetConfig.type === 'static') {
        const el = document.getElementById(targetConfig.elementId);
        if (el) el.classList.add('active');
    } else if (targetConfig.type === 'catalog') {
        const titleEl = document.getElementById('current-catalog-title');
        const descEl = document.getElementById('current-catalog-desc');
        const containerEl = document.getElementById('catalog-products-container');
        
        if (titleEl) titleEl.innerText = targetConfig.title;
        if (descEl) descEl.innerText = targetConfig.desc;
        
        const products = PRODUCT_DATA.filter(p => p.category === targetRoute);
        if (containerEl) containerEl.innerHTML = products.map(createProductCardMarkup).join('');
        
        const catalogPage = document.getElementById('page-catalog');
        if (catalogPage) catalogPage.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + targetRoute) link.classList.add('active');
    });

    document.querySelector('.nav-menu').classList.remove('open');
    document.querySelector('.mobile-nav-toggle').classList.remove('open');
}

// --- Cart Panel tab System Configuration ---
function switchCartTab(targetTab) {
    document.querySelectorAll('.cart-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.cart-tab-content').forEach(view => view.classList.remove('active'));
    
    document.getElementById(`tab-${targetTab}`).classList.add('active');
    document.getElementById(`cart-${targetTab}-view`).classList.add('active');
}

// --- Transaction Data Matrix ---
function toggleCart() {
    document.querySelector('.cart-drawer').classList.toggle('open');
    document.querySelector('.cart-drawer-overlay').classList.toggle('open');
    switchCartTab('items');
}

function addProductToCart(productId) {
    const matchItem = PRODUCT_DATA.find(p => p.id === productId);
    if (!matchItem) return;

    let selectedSize = "";
    let itemPrice = matchItem.basePrice;
    if (matchItem.hasSizes) {
        const sizeSel = document.getElementById(`size-${productId}`);
        if (sizeSel) {
            selectedSize = sizeSel.value;
            itemPrice = matchItem.prices[selectedSize] || matchItem.basePrice;
        }
    }

    let selectedVariant = "";
    if (matchItem.variants) {
        const varSel = document.getElementById(`variant-${productId}`);
        if (varSel) selectedVariant = varSel.value;
    }

    let parsedQty = 1;
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) parsedQty = parseInt(qtyInput.value) || 1;

    let customTitle = matchItem.name;
    if (selectedSize && selectedVariant) {
        customTitle += ` (${selectedVariant} / Size ${selectedSize})`;
    } else if (selectedSize) {
        customTitle += ` (Size ${selectedSize})`;
    } else if (selectedVariant) {
        customTitle += ` (${selectedVariant})`;
    }

    const trackId = `${productId}-${selectedSize}-${selectedVariant}`;
    const existingIndex = shoppingCart.findIndex(item => item.trackId === trackId);

    if (existingIndex > -1) {
        shoppingCart[existingIndex].quantity += parsedQty;
    } else {
        shoppingCart.push({
            trackId: trackId,
            product: matchItem,
            name: customTitle,
            price: itemPrice,
            quantity: parsedQty
        });
    }

    if(qtyInput) qtyInput.value = 1;

    refreshCartDisplayState();
    document.querySelector('.cart-drawer').classList.add('open');
    document.querySelector('.cart-drawer-overlay').classList.add('open');
}

function removeCartLineItem(trackId) {
    shoppingCart = shoppingCart.filter(item => item.trackId !== trackId);
    refreshCartDisplayState();
}

function refreshCartDisplayState() {
    const container = document.getElementById("cart-items");
    const countBadge = document.querySelector(".cart-count");
    const subtotalText = document.getElementById("cart-subtotal-val");
    const finalCheckoutText = document.getElementById("checkout-final-total");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const checkoutTabHead = document.getElementById("tab-checkout");

    const sumUnits = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    countBadge.innerText = sumUnits;

    if (shoppingCart.length === 0) {
        container.innerHTML = `<p class="empty-cart-text">Your collection is currently empty.</p>`;
        subtotalText.innerText = "$0.00";
        finalCheckoutText.innerText = "$0.00";
        checkoutBtn.disabled = true;
        checkoutTabHead.disabled = true;
        return;
    }

    let totalVal = 0;
    let orderDescriptionString = "";

    container.innerHTML = shoppingCart.map(item => {
        const rowCost = item.price * item.quantity;
        totalVal += rowCost;
        orderDescriptionString += `• [${item.quantity}x] ${item.name} @ $${item.price.toFixed(2)} each (Sub: $${rowCost.toFixed(2)})\n`;
        
        return `
            <div class="cart-item-row" style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid rgba(126,87,194,0.06);">
                <div style="width:50px; height:50px; border-radius:2px; background:#F9F8FA; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                    ${item.product.visual}
                </div>
                <div style="flex:1;">
                    <h4 style="font-size:0.8rem; line-height:1.2; font-weight:500;">${item.name}</h4>
                    <p style="font-size:0.7rem; color:var(--text-muted-stardust); margin-top:2px;">Qty: ${item.quantity} &times; $${item.price.toFixed(2)}</p>
                    <button class="remove-item-btn" onclick="removeCartLineItem('${item.trackId}')" style="background:none; border:none; color:#C62828; font-size:0.65rem; text-decoration:underline; cursor:pointer; padding:0;">Remove</button>
                </div>
                <div style="font-size:0.8rem; font-weight:500;">$${rowCost.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    subtotalText.innerText = `$${totalVal.toFixed(2)}`;
    finalCheckoutText.innerText = `$${totalVal.toFixed(2)}`;
    
    document.getElementById("hidden-order-summary").value = orderDescriptionString;
    document.getElementById("hidden-order-total").value = `$${totalVal.toFixed(2)}`;

    checkoutBtn.disabled = false;
    checkoutTabHead.disabled = false;
}

function setupInterfaceEventHandlers() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.classList.toggle('open');
        });
    }

    const orderForm = document.getElementById("order-submission-form");
    if(orderForm) {
        orderForm.addEventListener("submit", () => {
            setTimeout(() => {
                shoppingCart = [];
                refreshCartDisplayState();
                toggleCart();
                orderForm.reset();
            }, 500);
        });
    }
}

function handleUrlRoutingCheck() {
    const currentHash = window.location.hash.replace('#', '');
    if(currentHash) renderPageView(currentHash);
}