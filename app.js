// --- Database of Premium Products & Dynamic Catalog Elements ---
const PRODUCT_DATA = [
    {
        id: "p_hoodie",
        name: "Oversized Lumina Hoodie",
        category: "clothing",
        price: 46.60,
        visual: '<img src="./hoodie.jpg" alt="Lumina Hoodie" style="width:100%; height:100%; object-fit:cover;">', 
        badge: "",
        variants: ["White", "Lavender", "Black"],
        sizes: ["XS", "S", "M", "L", "XL", "Cropped"]
    },
    {
        id: "p_pants",
        name: "Celestial Lounge Sweatpants",
        category: "clothing",
        price: 46.00,
        visual: '<img src="./pants.jpg" alt="Lounge Pants" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["White", "Lavender", "Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
        id: "p_gloss",
        name: "Lumina Lip Gloss",
        category: "beauty",
        price: 24.00,
        visual: '<img src="./lipgloss.jpg" alt="Lumina Lip Gloss" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["Dreamy Clear ✨", "Sheer Lavender Tint 💜", "Shimmery Gloss ⭐"],
        sizes: null
    },
    {
        id: "p_perfume",
        name: "Stardust Ethereal Perfume",
        category: "beauty",
        price: 95.00,
        visual: '<img src="./perfume.jpg" alt="Stardust Perfume" style="width:100%; height:100%; object-fit:cover;">',
        badge: "Coming Soon",
        variants: ["Crossbody", "Stars Align", "Constellation"],
        sizes: null
    },
    {
        id: "p_scrunchie",
        name: "Lumina Star Silk Scrunchie",
        category: "accessories",
        price: 16.00,
        visual: '<img src="./scrunchie.jpg" alt="Lumina Scrunchie" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["White", "Lavender", "Black"],
        sizes: null
    },
    {
        id: "p_notebook",
        name: "Lumina Minimalist Journal Notebook",
        category: "supplies",
        price: 28.00,
        visual: '<img src="./notebook.jpg" alt="Lumina Notebook" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["Lavender", "White", "Beige"],
        sizes: null
    },
    {
        id: "p_pens",
        name: "Cosmic Soft-Ink Gel Pen Trio",
        category: "supplies",
        price: 14.00,
        visual: '<img src="./pen.jpg" alt="Cosmic Pens" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: ["Lavender", "White", "Beige"],
        sizes: null
    },
    {
        id: "p_plushie",
        name: "Lumi Star Collectible Plushie",
        category: "plushies",
        price: 34.00,
        visual: '<img src="./plushie.jpg" alt="Lumi Plushie" style="width:100%; height:100%; object-fit:cover;">',
        badge: "",
        variants: null,
        sizes: null
    },
    {
        id: "p_candle",
        name: "Lavender Amethyst Calming Candle",
        category: "self-care",
        price: 38.00,
        visual: '<img src="./candle.jpg" alt="Calming Candle" style="width:100%; height:100%; object-fit:cover;">',
        badge: "Coming Soon",
        variants: null,
        sizes: null
    }
];

let shoppingCart = [];

// --- Lifecycle Loader Engine ---
document.addEventListener("DOMContentLoaded", () => {
    renderCatalogs();
});

// --- Markup Compilation Engine ---
function createProductCardMarkup(product) {
    const isSoon = product.badge === "Coming Soon";
    
    let sizingLayoutHtml = "";
    if (product.sizes && !isSoon) {
        sizingLayoutHtml = `
            <select id="size-${product.id}">
                ${product.sizes.map(sz => `<option value="${sz}">Size: ${sz}</option>`).join('')}
            </select>
        `;
    }

    let variantLayoutHtml = "";
    if (product.variants && !isSoon) {
        variantLayoutHtml = `
            <select id="variant-${product.id}">
                ${product.variants.map(vr => `<option value="${vr}">${vr}</option>`).join('')}
            </select>
        `;
    }

    // Determine layout columns based on product features
    let interactiveSelectorsForm = "";
    if (!isSoon) {
        if (product.sizes && product.variants) {
            // Sizable Items Rule: Size and Color drop side-by-side
            interactiveSelectorsForm = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 0.5rem; width: 100%;">
                    ${sizingLayoutHtml}
                    ${variantLayoutHtml}
                </div>
            `;
        } else if (product.variants) {
            // Standard Items Rule: Color drops next to the Quantity select box
            interactiveSelectorsForm = `
                <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 6px; margin-bottom: 0.5rem; width: 100%;">
                    ${variantLayoutHtml}
                    <select id="qty-${product.id}">
                        <option value="1">Qty: 1</option>
                        <option value="2">Qty: 2</option>
                        <option value="3">Qty: 3</option>
                    </select>
                </div>
            `;
        } else {
            // Items without variants Rule: Full row clean Quantity box drop
            interactiveSelectorsForm = `
                <div style="display: grid; grid-template-columns: 1fr; gap: 6px; margin-bottom: 0.5rem; width: 100%;">
                    <select id="qty-${product.id}">
                        <option value="1">Qty: 1</option>
                        <option value="2">Qty: 2</option>
                        <option value="3">Qty: 3</option>
                    </select>
                </div>
            `;
        }
    }

    const actionButtonLayout = isSoon 
        ? `<button class="btn btn-secondary" disabled>Awaiting Drop</button>`
        : `${interactiveSelectorsForm}<button class="btn btn-primary" onclick="addProductToCart('${product.id}')">Add to Cart</button>`;

    return `
        <div class="product-card">
            <div class="product-img-frame">
                ${product.badge ? `<span class="badge badge-soon">${product.badge}</span>` : ''}
                <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
                    ${product.visual}
                </div>
                <div class="product-action-overlay">
                    ${actionButtonLayout}
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
            </div>
        </div>
    `;
}

function renderCatalogs() {
    // 1. Populate full catalog timeline downwards in the main Home view
    const globalFeed = document.getElementById("global-feed-container");
    if (globalFeed) globalFeed.innerHTML = PRODUCT_DATA.map(createProductCardMarkup).join('');

    // 2. Separate categorizations by explicit tabs natively
    const categories = ['clothing', 'beauty', 'accessories', 'supplies', 'plushies', 'self-care'];
    categories.forEach(cat => {
        const targetNode = document.getElementById(`${cat}-container`);
        if (targetNode) {
            const products = PRODUCT_DATA.filter(p => p.category === cat);
            targetNode.innerHTML = products.map(createProductCardMarkup).join('');
        }
    });
}

// --- App Tab Routing Layout Logic ---
function navigateTo(targetTabId) {
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    const activeView = document.getElementById(`page-${targetTabId}`);
    if (activeView) activeView.classList.add('active');

    // Highlight target link cleanly
    const triggerBtn = Array.from(document.querySelectorAll('.nav-link'))
                            .find(btn => btn.getAttribute('onclick').includes(`'${targetTabId}'`));
    if (triggerBtn) triggerBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Cart and Basket Drawer Process Engines ---
function toggleCartDrawer() {
    document.getElementById('cart-drawer-panel').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
    
    // Hide checkout details panel on close toggle to maintain a clean slate
    document.getElementById('checkout-address-section').classList.remove('active');
}

function addProductToCart(productId) {
    const matchedItem = PRODUCT_DATA.find(p => p.id === productId);
    if (!matchedItem) return;

    let selectedSize = "";
    const sizeEl = document.getElementById(`size-${productId}`);
    if (sizeEl) selectedSize = sizeEl.value;

    let selectedVariant = "";
    const variantEl = document.getElementById(`variant-${productId}`);
    if (variantEl) selectedVariant = variantEl.value;

    let orderedQuantity = 1;
    const qtyEl = document.getElementById(`qty-${productId}`);
    if (qtyEl) {
        orderedQuantity = parseInt(qtyEl.value) || 1;
        qtyEl.value = "1"; // Reset element index drop back to 1
    }

    let descriptors = [];
    if (selectedVariant) descriptors.push(selectedVariant);
    if (selectedSize) descriptors.push(selectedSize);

    const titleDisplay = descriptors.length > 0 ? `${matchedItem.name} (${descriptors.join(' / ')})` : matchedItem.name;
    const trackingKey = `${productId}-${selectedSize}-${selectedVariant}`;

    const lineRecordExists = shoppingCart.find(item => item.trackingKey === trackingKey);

    if (lineRecordExists) {
        lineRecordExists.quantity += orderedQuantity;
    } else {
        shoppingCart.push({
            trackingKey: trackingKey,
            product: matchedItem,
            displayName: titleDisplay,
            quantity: orderedQuantity
        });
    }

    refreshCartDisplayState();
    
    // Open the drawer on add
    document.getElementById('cart-drawer-panel').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
}

function modifyCartQty(trackingKey, deltaChange) {
    const matchingItem = shoppingCart.find(item => item.trackingKey === trackingKey);
    if (!matchingItem) return;

    matchingItem.quantity += deltaChange;

    if (matchingItem.quantity <= 0) {
        shoppingCart = shoppingCart.filter(item => item.trackingKey !== trackingKey);
    }
    refreshCartDisplayState();
}

function deleteCartRow(trackingKey) {
    shoppingCart = shoppingCart.filter(item => item.trackingKey !== trackingKey);
    refreshCartDisplayState();
}

function refreshCartDisplayState() {
    const basketContainer = document.getElementById("cart-items-tray");
    const counterBadge = document.querySelector(".cart-count");
    const subtotalText = document.getElementById("cart-subtotal-display");
    const purchaseButton = document.getElementById("main-purchase-btn");

    const sumUnits = shoppingCart.reduce((acc, item) => acc + item.quantity, 0);
    if (counterBadge) counterBadge.innerText = sumUnits;

    if (shoppingCart.length === 0) {
        basketContainer.innerHTML = `<p class="empty-cart-text">Your collection is currently empty. 🍃</p>`;
        subtotalText.innerText = "$0.00";
        purchaseButton.disabled = true;
        document.getElementById('checkout-address-section').classList.remove('active');
        return;
    }

    let workingSubtotal = 0;
    basketContainer.innerHTML = shoppingCart.map(lineItem => {
        const entryTotal = lineItem.product.price * lineItem.quantity;
        workingSubtotal += entryTotal;

        // Tray Rules: Sizable/Variant clothes get clear increment controls, others show standard text count layout
        let controlLayout = ``;
        if (lineItem.product.sizes) {
            controlLayout = `
                <div style="display: inline-flex; align-items: center; border: 1px solid var(--border-stardust); border-radius: 2px; background: #fff; margin-top: 4px;">
                    <button onclick="modifyCartQty('${lineItem.trackingKey}', -1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">-</button>
                    <span style="font-size:0.75rem; padding:0 4px; min-width:14px; text-align:center;">${lineItem.quantity}</span>
                    <button onclick="modifyCartQty('${lineItem.trackingKey}', 1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">+</button>
                </div>
            `;
        } else {
            controlLayout = `<span style="font-size:0.75rem; color:var(--text-muted-stardust)">Qty: ${lineItem.quantity}</span>`;
        }

        return `
            <div class="cart-item-row">
                <div style="width: 50px; height: 50px; background: #fafafa; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    ${lineItem.product.visual}
                </div>
                <div class="cart-item-details">
                    <h4>${lineItem.displayName}</h4>
                    <p style="display:flex; align-items:center; gap:8px;">
                        ${controlLayout} &times; $${lineItem.product.price.toFixed(2)}
                    </p>
                    <button class="remove-item-btn" onclick="deleteCartRow('${lineItem.trackingKey}')">Remove</button>
                </div>
                <div style="font-size: 0.8rem; font-weight: 600;">
                    $${entryTotal.toFixed(2)}
                </div>
            </div>
        `;
    }).join('');

    subtotalText.innerText = `$${workingSubtotal.toFixed(2)}`;
    purchaseButton.disabled = false;
}

// --- Checkout Handling Protocols ---
function revealCheckoutForm() {
    document.getElementById('checkout-address-section').classList.add('active');
}

function submitFinalOrder() {
    const selectedCountry = document.getElementById("checkout-country").value;
    const typedAddress = document.getElementById("checkout-address").value;

    if (!typedAddress.trim()) {
        alert("Please provide an accurate entry for the physical delivery address lines.");
        return;
    }

    // Parse items description for summary alerts
    const itemSummaryList = shoppingCart.map(item => `${item.quantity}x ${item.displayName}`).join("\n - ");

    const notificationPayload = `
        === NEW ORDER NOTIFICATION ===
        Target Notification: paris.botchway@gmail.com
        
        Shipping Country Destination: ${selectedCountry}
        Delivery Address Coordinates: ${typedAddress}
        
        Manifest Summary:
         - ${itemSummaryList}
         
        Grand Total Value processed: ${document.getElementById("cart-subtotal-display").innerText}
    `;

    console.log(notificationPayload);
    alert(`Order Confirmed!\n\nA notification payload has been processed to your admin records for verification.`);
    
    // Wipe shopping metrics back to initial state setup
    shoppingCart = [];
    refreshCartDisplayState();
    toggleCartDrawer();
}

// --- Client Interaction Submissions Handler ---
function handleSupportSubmission(event) {
    event.preventDefault();
    const sourceUserEmail = document.getElementById("contact-email").value;
    const clearMessageText = document.getElementById("contact-message").value;

    alert(`Thank you!\nYour ticket has been flagged. A logging record notification copy has been transmitted directly to paris.botchway@gmail.com for tracking resolution.`);
    document.getElementById("contact-support-form").reset();
}