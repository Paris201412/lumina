// --- Database of Premium Products & Dynamic Catalog Elements ---
const PRODUCT_DATA = [
    {
        id: "f1",
        name: "Oversized Lumina Hoodie",
        category: "fashion",
        price: 88.00,
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
        price: 74.00,
        visual: '<img src="./pants.jpg" alt="Lounge Pants" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Dream Glow ✨", "Lavender Kiss 💜", "Moonlight Shine ⭐"],
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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Ring (M)", "Ring (W)", "Necklace (M)", "Necklace (W)", "Bracelet (M)", "Bracelet (W)", "Earrings", "Nose Stud"],
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
        variants: ["Lavender", "Cream", "Black"],
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
        variants: ["Lavender", "Cream", "Black"],
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

// --- Lifecycle Initialization Engine ---
document.addEventListener("DOMContentLoaded", () => {
    initializeHomeGridDisplay();
    setupInterfaceEventHandlers();
    
    // Check url on open, if empty set default home hash
    if (!window.location.hash) {
        window.location.hash = '#home';
    } else {
        handleUrlRoutingCheck();
    }
});

// --- Dynamic Grid Rendering Protocols ---
function createProductCardMarkup(product) {
    const isSoon = product.badge === "Coming Soon";
    
    let optionsRowHtml = "";
    if (!isSoon) {
        if (product.hasSizes) {
            // Clothes: Size and Color side-by-side
            optionsRowHtml = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 0.5rem; width: 100%;">
                    <select id="size-${product.id}" style="padding: 0.25rem; font-family: inherit; font-size: 0.75rem; width: 100%;">
                        <option value="S">Size: S</option>
                        <option value="M" selected>Size: M</option>
                        <option value="L">Size: L</option>
                        <option value="XL">Size: XL</option>
                    </select>
                    <select id="variant-${product.id}" style="padding: 0.25rem; font-family: inherit; font-size: 0.75rem; width: 100%;">
                        ${product.variants ? product.variants.map(opt => `<option value="${opt}">${opt}</option>`).join('') : '<option value="Default">Default</option>'}
                    </select>
                </div>
            `;
        } else if (product.variants) {
            // No sizes: Color and Quantity side-by-side
            optionsRowHtml = `
                <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 6px; margin-bottom: 0.5rem; width: 100%;">
                    <select id="variant-${product.id}" style="padding: 0.25rem; font-family: inherit; font-size: 0.75rem; width: 100%;">
                        ${product.variants.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                    <select id="qty-${product.id}" style="padding: 0.25rem; font-family: inherit; font-size: 0.75rem; width: 100%;">
                        <option value="1">Qty: 1</option>
                        <option value="2">Qty: 2</option>
                        <option value="3">Qty: 3</option>
                        <option value="4">Qty: 4</option>
                        <option value="5">Qty: 5</option>
                    </select>
                </div>
            `;
        }
    }

    const actionBtnHtml = isSoon 
        ? `<button class="btn btn-secondary" disabled style="width:100%; font-size:0.7rem;">Awaiting Drop</button>`
        : `${optionsRowHtml}<button class="btn btn-primary" onclick="addProductToCart('${product.id}')" style="width:100%; font-size:0.7rem;">Add to Cart</button>`;
        
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

// --- App Navigation Routing Logic ---
function navigateTo(targetRoute) {
    window.location.hash = targetRoute;
}

function renderPageView(targetRoute) {
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

    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
    });
    
    if (targetConfig.type === 'static') {
        const targetEl = document.getElementById(targetConfig.elementId);
        if (targetEl) targetEl.classList.add('active');
    } else if (targetConfig.type === 'catalog') {
        const titleEl = document.getElementById('current-catalog-title');
        const descEl = document.getElementById('current-catalog-desc');
        const containerEl = document.getElementById('catalog-products-container');
        
        if (titleEl) titleEl.innerText = targetConfig.title;
        if (descEl) descEl.innerText = targetConfig.desc;
        
        const filteredProducts = PRODUCT_DATA.filter(p => p.category === targetRoute);
        if (containerEl) containerEl.innerHTML = filteredProducts.map(createProductCardMarkup).join('');
        
        const catalogPageEl = document.getElementById('page-catalog');
        if (catalogPageEl) catalogPageEl.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${targetRoute}'`)) {
            link.classList.add('active');
        }
    });

    document.querySelector('.nav-menu').classList.remove('open');
    document.querySelector('.mobile-nav-toggle').classList.remove('open');
}

// --- Dynamic Shopping Cart Transaction Handlers ---
function toggleCart() {
    document.querySelector('.cart-drawer').classList.toggle('open');
    document.querySelector('.cart-drawer-overlay').classList.toggle('open');
}

function addProductToCart(productId) {
    const matchItem = PRODUCT_DATA.find(p => p.id === productId);
    if (!matchItem) return;

    let selectedSize = "";
    if (matchItem.hasSizes) {
        const sizeSelectElement = document.getElementById(`size-${productId}`);
        if (sizeSelectElement) selectedSize = sizeSelectElement.value;
    }

    let selectedVariant = "";
    const variantSelectElement = document.getElementById(`variant-${productId}`);
    if (variantSelectElement) selectedVariant = variantSelectElement.value;

    let parsedQty = 1;
    if (!matchItem.hasSizes) {
        const qtySelectElement = document.getElementById(`qty-${productId}`);
        if (qtySelectElement) {
            parsedQty = parseInt(qtySelectElement.value) || 1;
            qtySelectElement.value = "1"; // Reset card back to 1
        }
    }

    let displayName = matchItem.name;
    if (selectedSize && selectedVariant) {
        displayName += ` (${selectedVariant} / ${selectedSize})`;
    } else if (selectedSize) {
        displayName += ` (${selectedSize})`;
    } else if (selectedVariant) {
        displayName += ` (${selectedVariant})`;
    }

    const cartItemId = `${productId}-${selectedSize}-${selectedVariant}`;
    const existingRecord = shoppingCart.find(item => item.cartItemId === cartItemId);

    if (existingRecord) {
        existingRecord.quantity += parsedQty;
    } else {
        shoppingCart.push({ 
            cartItemId: cartItemId,
            product: matchItem, 
            displayName: displayName,
            quantity: parsedQty 
        });
    }

    refreshCartDisplayState();
    
    document.querySelector('.cart-drawer').classList.add('open');
    document.querySelector('.cart-drawer-overlay').classList.add('open');
}

function changeCartItemQty(cartItemId, amount) {
    const targetItem = shoppingCart.find(item => item.cartItemId === cartItemId);
    if (!targetItem) return;

    targetItem.quantity += amount;

    if (targetItem.quantity <= 0) {
        removeCartLineItem(cartItemId);
    } else {
        refreshCartDisplayState();
    }
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
        
        // Items with sizes get interactive +/- buttons in the tray
        let qtyControlHtml = `Qty: ${lineItem.quantity}`;
        if (lineItem.product.hasSizes) {
            qtyControlHtml = `
                <div style="display: inline-flex; align-items: center; border: 1px solid #e2d4f0; border-radius: 4px; overflow: hidden; background: #fff; margin-top: 2px;">
                    <button onclick="changeCartItemQty('${lineItem.cartItemId}', -1)" style="border: none; background: none; padding: 2px 8px; cursor: pointer; font-weight: bold; color: #7E57C2;">-</button>
                    <span style="font-size: 0.8rem; padding: 0 4px; min-width: 14px; text-align: center;">${lineItem.quantity}</span>
                    <button onclick="changeCartItemQty('${lineItem.cartItemId}', 1)" style="border: none; background: none; padding: 2px 8px; cursor: pointer; font-weight: bold; color: #7E57C2;">+</button>
                </div>
            `;
        }

        return `
            <div class="cart-item-row" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <div style="width: 50px; height: 50px; background: #F9F8FA; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                    ${lineItem.product.visual}
                </div>
                <div class="cart-item-details" style="flex:1; padding-left:0.5rem;">
                    <h4 style="font-size:0.85rem; line-height:1.2; margin: 0;">${lineItem.displayName}</h4>
                    <p style="font-size:0.75rem; margin: 0.2rem 0 0 0; display: flex; align-items: center; gap: 6px;">
                        ${qtyControlHtml} &times; $${lineItem.product.price.toFixed(2)}
                    </p>
                    <button class="remove-item-btn" onclick="removeCartLineItem('${lineItem.cartItemId}')" style="margin-top: 2px;">Remove</button>
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
        renderPageView(currentHash);
    }
}

// Watch for manual URL changes and hash navigation actions
window.addEventListener('hashchange', handleUrlRoutingCheck);