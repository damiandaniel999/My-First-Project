/* ─── Cursor ─── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
let isHovering = false;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
});

function animCursor() {
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)` + (isHovering ? ' scale(1.8)' : '');
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('button, a, .cat-card, .product-card, .brand-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        isHovering = true;
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
        isHovering = false;
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '0.5';
    });
});

// /* ─── Products ─── */
const products = [
    { id: 1, brand: 'Apple', cat: 'Phones', name: 'iPhone 16 Pro Max', specs: { Display: '6.9" LTPO OLED', Chip: 'A18 Pro', Camera: '48MP triple camera', Battery: '4685mAh', OS: 'iOS 18 upgradable' }, price: 1400000, old: 1599000, img: 'images/Apple-iPhone-16-Pro-max.jpg', emoji: '📱', badge: 'new', rating: '★★★★★', desc: "Premium flagship with Dynamic AMOLED 2X display." },
    { id: 2, brand: 'Samsung', cat: 'Phones', name: 'Galaxy S25 Ultra', specs: { Display: '6.8" AMOLED 2X', Chip: 'Snapdragon 8 Elite', Camera: '200MP quad camera', Battery: '5000mAh', OS: 'One UI 8.5 upgradable' }, price: 1300000, old: 1499000, img: 'images/S25.webp', emoji: '📲', badge: 'hot', rating: '★★★★★', desc: "Premium galaxy flagship with built-in S pen. Advanced AI processing, legendary camera system with AI zoom." },
    { id: 3, brand: 'JBL', cat: 'Audio', name: 'JBL Tune 780NC', specs: { ANC: 'Active', Battery: '50hr', Audio: 'Hi-Res Certified' }, price: 100000, old: 110000, img: 'images/jbl-tune-780nc.webp', emoji: '🎧', badge: 'deal', rating: '★★★★☆', desc: "Studio-quality sound with advanced noise cancellation. Perfect for immersive listening." },
    { id: 4, brand: 'Google', cat: 'Phones', name: 'Pixel 9 Pro', specs: { Display: '6.3" LTPO OLED', Chip: 'Tensor G4', Camera: '50MP triple camera', Battery: '4700mAh', OS: 'Pixel UI' }, price: 1200000, old: null, img: 'images/th.webp', emoji: '📱', badge: 'new', rating: '★★★★★', desc: "Google's most powerful phone ever. Enhanced AI features and incredible low-light photography." },
    { id: 5, brand: 'Nothing', cat: 'Phones', name: 'Nothing Phone 3', specs: { Display: '6.67" OLED', Feature: 'Glyph Interface', Chip: "Snapdragon 8s Gen 4", Camera: '50MP triple camera', Battery: '5150mAh', OS: 'Nothing OS' }, price: 699000, old: 799000, img: 'images/nothing.webp', emoji: '📵', badge: 'new', rating: '★★★★☆', desc: "Transparent design with unique Glyph Interface with customizable light animations. Durable and reliable." },
    { id: 6, brand: 'Apple', cat: 'Wearables', name: 'Watch Ultra 3', specs: { Display: '1.98" Retina OLED', Size: '49mm', Chip: 'S10', Connectivity: 'GPS + Cellular', Material: 'Titanium', Battery: '599mAh', }, price: 650000, old: null, img: 'images/Apple-Watch-Ultra-3.jpg', emoji: '⌚', badge: 'new', rating: '★★★★★', desc: "Ultimate sports and action watch. Brightest display ever, faster performance." },
    { id: 7, brand: 'OnePlus', cat: 'Phones', name: 'OnePlus Open 2', specs: { Display: '8.0" foldable AMOLED', Chip: 'Snapdragon 8 Elite', Camera: 'Hasselblad triple 50MP cameras', OS: 'Oxygen OS' }, price: 1599000, old: 1799000, img: 'images/oneplus.webp', emoji: '📖', badge: 'deal', rating: '★★★★☆', desc: "Revolutionary foldable design with advanced imaging. Premium materials and performance." },
    { id: 8, brand: 'Bose', cat: 'Audio', name: 'QuietComfort Ultra', specs: { Audio: 'Immersive', ANC: 'Premium', Bluetooth: '5.3', Battery: '27hr' }, price: 230000, old: 250000, img: 'images/download.jfif', emoji: '🎵', badge: 'hot', rating: '★★★★★', desc: "Best-in-class noise cancellation with spacious sound. Ultimate comfort for all-day wear." },
];

let cart = [];
let currentFilter = 'All';
let totalSpent = 0;

const badgeClass = { new: 'badge-new', hot: 'badge-hot', deal: 'badge-deal' };

/* ─── Filter tabs ─── */
function setFilter(el) {
    document.querySelectorAll('.filter').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

/* ─── Countdown ─── */
let totalSecs = 8 * 3600 + 29 * 60 + 59;
function tick() {
    if (totalSecs <= 0) return;
    totalSecs--;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}
setInterval(tick, 1000);

/* ─── Newsletter ─── */
function subscribeNewsletter() {
    const inp = document.querySelector('.newsletter-input');
    const btn = document.querySelector('.newsletter-btn');
    const email = inp.value.trim();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        inp.style.borderColor = 'var(--red)';
        inp.style.boxShadow = '0 0 10px rgba(255, 59, 107, 0.3)';
        showToast('❌ Please enter a valid email address');
        return;
    }

    // Success state
    inp.style.borderColor = 'var(--cyan)';
    inp.style.boxShadow = '0 0 15px rgba(0, 230, 200, 0.3)';
    inp.style.backgroundColor = 'rgba(0, 230, 200, 0.05)';

    // Disable inputs and update button
    const originalBtn = btn.textContent;
    btn.textContent = '✅ Subscribed!';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, rgba(0, 230, 200, 0.8), rgba(240, 180, 41, 0.6))';
    btn.style.boxShadow = '0 0 20px rgba(0, 230, 200, 0.4)';
    inp.disabled = true;

    showToast('🎉 Welcome to Oddyson! Check your email for exclusive deals.');

    // Reset after delay
    setTimeout(() => {
        inp.value = '';
        inp.disabled = false;
        btn.disabled = false;
        btn.textContent = originalBtn;
        btn.style.background = '';
        btn.style.boxShadow = '';
        inp.style.borderColor = '';
        inp.style.boxShadow = '';
        inp.style.backgroundColor = '';
    }, 3000);
}

/* ─── Scroll reveal ─── */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));


/* ── PAGES ── */
function showPage(name) {
    // Close all modals
    document.querySelectorAll('.page-overlay').forEach(p => p.classList.remove('active'));

    // Open specific modal if not 'shop'
    if (name !== 'shop') {
        const modal = document.getElementById('page-' + name);
        if (modal) modal.classList.add('active');
    }

    // Close cart panel when going to shop
    if (name === 'shop') {
        closeCart();
    }
}

/* ── RENDER PRODUCTS ── */
function renderProducts(filter) {
    const grid = document.getElementById('productsGrid');
    const filtered = filter === 'All' ? products : products.filter(p => p.cat === filter);
    grid.innerHTML = filtered.map((p, i) => {
        // Use image if available and valid, otherwise use emoji
        const imgDisplay = p.img
            ? `<img src="${p.img}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.replaceWith((() => {const div = document.createElement('div'); div.style.cssText = 'display: flex; align-items: center; justify-content: center; font-size: 3rem;'; div.textContent = '${p.emoji}'; return div;})())">`
            : `<div style="display: flex; align-items: center; justify-content: center; font-size: 3rem;">${p.emoji}</div>`;

        return `
          <div class="product-card" style="animation-delay:${i * 0.06}s" onclick="openProduct(${p.id})">
            ${p.badge ? `<span class="product-badge ${badgeClass[p.badge]}">${p.badge.toUpperCase()}</span>` : ''}
            <div class="product-img" style="background: linear-gradient(135deg, var(--border) 0%, rgba(0,230,200,0.1) 100%);">
              ${imgDisplay}
            </div>
            <div class="product-info">
              ${p.rating ? `<div class="rating">${p.rating}</div>` : ''}
              <div class="product-brand">${p.brand}</div>
              <div class="product-name">${p.name}</div>
              <div class="product-specs">${p.desc}</div>
              <div class="product-footer">
                <div class="price-wrap">
                  <div class="price-current">₦${p.price.toLocaleString()}</div>
                  ${p.old ? `<div class="price-old">₦${p.old.toLocaleString()}</div>` : ''}
                </div>
                <button class="add-btn" onclick="event.stopPropagation();addToCart(${p.id},this)" title="Add to Cart">+</button>
              </div>
            </div>
          </div>
        `;
    }).join('');
}

function filterProducts(cat) {
    currentFilter = cat;
    // Update filter bar buttons
    document.querySelectorAll('.filter').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === cat);
    });
    renderProducts(cat);
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
}

/* ── PRODUCT DETAIL ── */
function openProduct(id) {
    const p = products.find(x => x.id === id);
    const imgDisplay = p.img
        ? `<img src="${p.img}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;" onerror="this.replaceWith((() => {const div = document.createElement('div'); div.style.cssText = 'background: linear-gradient(135deg, var(--border) 0%, rgba(0,230,200,0.1) 100%); border-radius:12px; display: flex; align-items: center; justify-content: center; min-height: 400px; font-size: 6rem;'; div.textContent = '${p.emoji}'; return div;})())">`
        : `<div style="background: linear-gradient(135deg, var(--border) 0%, rgba(0,230,200,0.1) 100%); border-radius:12px; display: flex; align-items: center; justify-content: center; min-height: 400px; font-size: 6rem;">${p.emoji}</div>`;
    document.getElementById('detailVisual').innerHTML = imgDisplay;
    document.getElementById('detailInfo').innerHTML = `
      <div class="detail-cat">${p.cat}</div>
      <div class="detail-name">${p.name}</div>
      ${p.badge ? `<div style="margin-bottom:20px"><span class="product-badge ${badgeClass[p.badge]}" style="position:static;display:inline-block">${p.badge.toUpperCase()}</span></div>` : ''}
      <p class="detail-desc">${p.desc}</p>
      <div class="detail-price">₦${p.price.toLocaleString()}</div>
      <button class="btn-primary" id="detail-add-btn" onclick="addToCart(${p.id},this)">Add to Cart</button>
      <div class="detail-meta">
        ${Object.entries(p.specs).map(([k, v]) => `
          <div class="meta-item">
            <div class="meta-label">${k}</div>
            <div class="meta-val">${v}</div>
          </div>
        `).join('')}
      </div>
    `;
    showPage('detail');
}

function addToCart(id, btn) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Check if product already in cart
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            emoji: product.emoji
        });
    }

    updateCartCount();

    // Show feedback on button
    if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('added');
        }, 1200);
    }

    showToast(`✓ ${product.name} added to cart`);
}

function updateCartCount() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').textContent = total;
}

function openCart() {
    renderCart();
    document.getElementById('cartPanel').classList.add('open');
    document.getElementById('overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    closeCart.open = true;
}

function closeCart() {
    document.getElementById('cartPanel').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
    document.body.style.overflow = '';
}

function renderCart() {
    const el = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
        el.innerHTML = `<div class="cart-empty"><div class="e-icon">🛒</div><p>Your cart is empty</p></div>`;
        footer.style.display = 'none';
        return;
    }
    el.innerHTML = cart.map(i => {
        const product = products.find(p => p.id === i.id);
        return `
      <div class="cart-item">
        <div class="cart-item-img">
          ${product.img ? `<img src="${product.img}" alt="${i.name}" onerror="this.replaceWith((() => {const div = document.createElement('div'); div.style.cssText = 'display: flex; align-items: center; justify-content: center; font-size: 1.8rem;'; div.textContent = '${product.emoji}'; return div;})())">` : `<div style="display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">${product.emoji}</div>`}
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-price">₦${i.price.toLocaleString()}</div>
        </div>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${i.id},-1)">−</button>
          <div class="qty-num">${i.qty}</div>
          <button class="qty-btn" onclick="changeQty(${i.id},1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${i.id})">✕</button>
      </div>
    `;
    }).join('');
    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const ship = sub >= 150000 ? 0 : 5000;
    document.getElementById('cfSubtotal').textContent = '₦' + sub.toLocaleString();
    document.getElementById('cfShipping').textContent = ship === 0 ? 'Free' : '₦' + ship.toLocaleString();
    document.getElementById('cfTotal').textContent = '₦' + (sub + ship).toLocaleString();
    footer.style.display = 'block';
}

function changeQty(id, d) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + d);
    updateCartCount(); renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartCount(); renderCart();
}

/* ── CHECKOUT ── */
function goCheckout() {
    if (cart.length === 0) {
        showToast('🛒 Your cart is empty!');
        return;
    }
    closeCart();
    renderOrderSummary();
    showPage('checkout');
}

function closeCheckout() {
    showPage('shop');
    openCart();
}

function backToCart() {
    closeCheckout();
}

function renderOrderSummary() {
    document.getElementById('orderItems').innerHTML = cart.map(i => {
        const product = products.find(p => p.id === i.id);
        return `
      <div class="order-item">
        <div class="order-item-img">
          ${product.img ? `<img src="${product.img}" alt="${i.name}" onerror="this.replaceWith((() => {const div = document.createElement('div'); div.style.cssText = 'display: flex; align-items: center; justify-content: center; font-size: 2rem;'; div.textContent = '${product.emoji}'; return div;})())">` : `<div style="display: flex; align-items: center; justify-content: center; font-size: 2rem;">${product.emoji}</div>`}
        </div>
        <div class="order-item-details">
          <span>${i.name} ×${i.qty}</span>
        </div>
        <span class="order-item-price">₦${(i.price * i.qty).toLocaleString()}</span>
      </div>
    `;
    }).join('');
    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const ship = sub >= 150000 ? 0 : 5000;
    document.getElementById('co-sub').textContent = '₦' + sub.toLocaleString();
    document.getElementById('co-ship').textContent = ship === 0 ? 'Free' : '₦' + ship.toLocaleString();
    document.getElementById('co-total').textContent = '₦' + (sub + ship).toLocaleString();
}

function formatCard(el) {
    let v = el.value.replace(/\D/g, '').slice(0, 16);
    el.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function validateForm() {
    const fields = ['f-name', 'f-email', 'f-addr', 'f-city', 'f-zip', 'f-card', 'f-exp', 'f-cvc'];
    const ok = fields.every(id => document.getElementById(id).value.trim().length > 0);
    document.getElementById('placeBtn').disabled = !ok;
}

function placeOrder() {
    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    totalSpent += sub;
    cart = [];
    updateCartCount();
    ['f-name', 'f-email', 'f-addr', 'f-city', 'f-zip', 'f-card', 'f-exp', 'f-cvc'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('placeBtn').disabled = true;
    showPage('success');
}

function continueShoppingFromSuccess() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    renderProducts('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToShop() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
}

/* ══════════════════════════════════════════════════════
    TOAST
══════════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
    const toastEl = document.getElementById('toast');
    if (!toastEl) {
        console.warn('Toast element not found');
        alert(msg);
        return;
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

/* ── INIT ── */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const grid = document.getElementById('productsGrid');
        if (grid) renderProducts('All');
    });
} else {
    const grid = document.getElementById('productsGrid');
    if (grid) renderProducts('All');
}