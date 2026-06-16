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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Dream Glow ✨", "Lavender Kiss 💜", "Moonlight Shine ⭐"],
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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Ring (M)", "Ring (W)", "Necklace (M)", "Necklace (W)", "Bracelet (M)", "Bracelet (W)", "Earrings", "Nose Stud"],
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
        name: "Lumina Journal Notebook",
        category: "school-supplies",
        basePrice: 28.00,
        visual: '<img src="./notebook.jpg" alt="Lumina Notebook" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Lavender", "Cream", "Black"],
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

// --- Dynamic Card Generator UI Module ---
function createProductCardMarkup(product) {
    let internalControlsRowHtml = "";

    if (product.hasSizes && product.variants) {
        // [ Size Dropdown ] and [ Color Dropdown ] side-by-side
        internalControlsRowHtml = `
            <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 6px; margin-bottom: 10px; width: 100%;">
                <select id="size-${product.id}" onchange="updateCardPriceDisplay('${product.id}')" style="padding: 6px; font-family: inherit; font-size: 11px; border: 1px solid #e2d4f0; background: #fff; border-radius: 4px; outline: none; color: #555;">
                    <option value="S">S</option>
                    <option value="M" selected>M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <select id="variant-${product.id}" style="padding: 6px; font-family: inherit; font-size: 11px; border: 1px solid #e2d4f0; background: #fff; border-radius: 4px; outline: none; color: #555;">
                    ${product.variants.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            </div>
        `;
    } else if (product.variants) {
        // No sizes: [ Color Dropdown ] and [ Quantity Dropdown ] side-by-side
        internalControlsRowHtml = `
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 6px; margin-bottom: 10px; width: 100%;">
                <select id="variant-${product.id}" style="padding: 6px; font-family: inherit; font-size: 11px; border: 1px solid #e2d4f0; background: #fff; border-radius: 4px; outline: none; color: #555; width:100%;">
                    ${product.variants.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
                <select id="qty-${product.id}" style="padding: 6px; font-family: inherit; font-size: 11px; border: 1px solid #e2d4f0; background: #fff; border-radius: 4px; outline: none; color: #555; width:100%;">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        `;
    } else {
        internalControlsRowHtml = `<div style="margin-bottom: 4px; width: 100%;"></div>`;
    }

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img-frame" style="padding:0; background:#FAF9FB; position:relative; overflow:hidden;">
                ${product.badge ? `<span class="badge badge-soon">${product.badge}</span>` : ''}
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                    ${product.visual}
                </div>
                <div class="product-action-overlay" style="flex-direction: column; align-items: stretch; padding: 14px; justify-content: center; background: rgba(255, 255, 255, 0.96);">
                    ${internalControlsRowHtml}
                    <button class="btn btn-primary" onclick="addProductToCart('${product.id}')" style="width:100%; font-size:11px; padding:9px; text-transform:uppercase; letter-spacing:0.05em; border-radius:4px;">Add to Cart</button>
                </div>
            </div>
            <div class="product-info" style="display:flex; justify-content:space-between; align-items:center; padding-top:10px;">
                <h3 style="font-size:14px; font-weight:400; margin:0; color:#1a1a1a;">${product.name}</h3>
                <div class="product-price" id="price-display-${product.id}" style="font-size:14px; font-weight:500; color:#7E57C2;">$${product.basePrice.toFixed(2)}</div>
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
        'fashion': { type: 'catalog', title: 'Fashion Collection', desc: 'Premium luxury garments crafted in signature colorways.' },
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

function switchCartTab(targetTab) {
    document.querySelectorAll('.cart-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.cart-tab-content').forEach(view => view.classList.remove('active'));
    
    document.getElementById(`tab-${targetTab}`).classList.add('active');
    document.getElementById(`cart-${targetTab}-view`).classList.add('active');
}

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
    if (!matchItem.hasSizes) {
        const qtyInput = document.getElementById(`qty-${productId}`);
        if (qtyInput) {
            parsedQty = parseInt(qtyInput.value) || 1;
            qtyInput.value = "1";
        }
    }

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

    refreshCartDisplayState();
    document.querySelector('.cart-drawer').classList.add('open');
    document.querySelector('.cart-drawer-overlay').classList.add('open');
}

function changeCartItemQty(trackId, adjustmentAmount) {
    const targetIndex = shoppingCart.findIndex(item => item.trackId === trackId);
    if (targetIndex === -1) return;

    shoppingCart[targetIndex].quantity += adjustmentAmount;

    if (shoppingCart[targetIndex].quantity <= 0) {
        shoppingCart = shoppingCart.filter(item => item.trackId !== trackId);
    }

    refreshCartDisplayState();
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
            <div class="cart-item-row" style="display:flex; align-items:center; gap:12px; margin-bottom:1rem; padding-bottom:1rem; border-bottom:1px solid rgba(126,87,194,0.06);">
                <div style="width:55px; height:55px; border-radius:4px; background:#F9F8FA; overflow:hidden; display:flex; align-items:center; justify-content:center; border:1px solid #f0eaf7;">
                    ${item.product.visual}
                </div>
                <div style="flex:1;">
                    <h4 style="font-size:0.8rem; line-height:1.3; font-weight:500; color:#1a1a1a; margin:0;">${item.name}</h4>
                    <p style="font-size:0.75rem; color:#7E57C2; margin-top:2px; font-weight:500;">$${item.price.toFixed(2)}</p>
                    
                    <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
                        <div style="display:inline-flex; align-items:center; border:1px solid #e2d4f0; border-radius:4px; background:#fff; overflow:hidden;">
                            <button type="button" onclick="changeCartItemQty('${item.trackId}', -1)" style="border:none; background:none; padding:2px 8px; font-size:12px; cursor:pointer; font-weight:600; color:#7E57C2;">-</button>
                            <span style="font-size:11px; padding:0 4px; min-width:14px; text-align:center; font-weight:500; color:#333;">${item.quantity}</span>
                            <button type="button" onclick="changeCartItemQty('${item.trackId}', 1)" style="border:none; background:none; padding:2px 8px; font-size:12px; cursor:pointer; font-weight:600; color:#7E57C2;">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeCartLineItem('${item.trackId}')" style="background:none; border:none; color:#999; font-size:0.65rem; text-decoration:none; cursor:pointer; padding:0; margin-left:4px;">Remove</button>
                    </div>
                </div>
                <div style="font-size:0.8rem; font-weight:600; color:#1a1a1a;">$${rowCost.toFixed(2)}</div>
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