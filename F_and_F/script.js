/* ─── Scroll reveal ─── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  
/* ── MARQUEE ── */
const mqItems = ['Jeans','Nightwears','Sneakers','Dresses',"Kid's wear",'Shirts','Sandals','Bangles','Bags'];
const track = document.getElementById('mqTrack');
const full = [...mqItems,...mqItems,...mqItems,...mqItems]
    .map(i=>`<span class="marquee-item">◆ <span>${i}</span></span>`).join('');
track.innerHTML = full;

/* ══════════════════════════════════════════════════════
    CONFIG — update these values
══════════════════════════════════════════════════════ */
const WA_NUMBER = '+2349066641633'; 

/* ══════════════════════════════════════════════════════
    PRODUCTS DATA
══════════════════════════════════════════════════════ */
const products = [
    { id:1,  name:'Goexer Shoes',      cat:'footwear', emoji:'👠', img:'images/FB_IMG_17779158782885657.jpg', price:32000, badge:'Bestseller', desc:'Shoe with a reactive glaze feel and a tan rubber sole.' },
    { id:2,  name:'Wedge Slippers',  cat:'footwear', emoji:'👠',  img:'images/FB_IMG_17779158561957664.jpg',  price:21500, badge:null,         desc:'Solid slippers, made and soled to perfection.' },
    { id:3,  name:'Woven Ballet Flats',          cat:'footwear', emoji:'👠',    img:'images/FB_IMG_17779157784398814.jpg', price:22000, badge:'New',        desc:'Woven mesh with a signature metallic gold Mary Jane strap.' },
    { id:4,  name:'Two-Tone Kaftan',       cat:'clothing', emoji:'👗',    img:'images/FB_IMG_17779639154209964.jpg', price:45000, badge:null,         desc:'Raw silk and damask brocade Bubu gown with sequin detailing.' },
    { id:5,  name:'Denim T-Shirt',  cat:'clothing', emoji:'👗',   img:'images/FB_IMG_17779157605884180.jpg', price:30000, badge:'New',        desc:'Male casual denim wear.' },
    { id:6,  name:'Miyaki Dress',    cat:'clothing', emoji:'👗',   img:'images/FB_IMG_17779164306873170.jpg', price:35000, badge:null,         desc:'Miyake-inspired dress witth a V-neck bodice.' },
    { id:7,  name:'Clutch Bags',    cat:'bags', emoji:'👜', img:'images/FB_IMG_17779639332578475.jpg',  price:11000, badge:null,         desc:'Silver rhinestone-covered party clutch.' },
    { id:8,  name:'Louis Vuitton Bag',       cat:'bags', emoji:'👜',  img:'images/FB_IMG_17779157280602134.jpg',  price:40000, badge:'Sale',       desc:'Louis Vuitton Capucines mini handbag crafted from texture leather.' },
    { id:9,  name:'Givenchy Bag',       cat:'bags', emoji:'👜', img:'images/FB_IMG_17779155836235196.jpg',  price:28000, badge:null,         desc:'Givenchy Antigona Mini leather bag with silver toned hardware.' },
    { id:10, name:'Female Jewelry Set',          cat:'jewelries', emoji:'💍',    img:'images/FB_IMG_17779642672881618.jpg', price:34000, badge:'Popular',    desc:'Featuring gold-toned Lookworld ladies quartz wristwatch, bracelet witth zirconia stones with teardrop earrings and a pendant neklace.' },
    { id:11, name:'Gold Bangles',        cat:'jewelries', emoji:'💍',    img:'images/FB_IMG_17779163771262404.jpg',  price:13000, badge:null,         desc:' Brazilian gold plated bangle and ring set featuring colorrful zirconia sones.' },
    { id:12, name:'Male Jewelry Set',     cat:'jewelries', emoji:'💍',    img:'images/FB_IMG_17779642910623416.jpg', price:31000, badge:'New',        desc:'Featuring a silver-tone analog wristwatch, matching bracelet and a cross pendant necklace.' },
];

/* ══════════════════════════════════════════════════════
    REVIEWS DATA
══════════════════════════════════════════════════════ */
const reviews = [
    { name:'Grace M.', emoji:'👩', location:'Ikorodu, Lagos', stars:5, product:'Miyaki dress', text:"I ordered the miyaki dress as a birthday gift and my daughter cried when she opened it. The embroidery is genuinely incredible. Already ordered one for myself." },
    { name:'James O.',  emoji:'🧔', location:'Egbeda, Lagos',   stars:5, product:'Baggy Trousers',        text:"The baggy trousers arrived beautifully packaged — it looked like something from a luxury boutique. WhatsApp ordering was super easy and Damilola responded within minutes." },
    { name:'Bolanle K.', emoji:'👩🏾', location:'Shagamu, Ogun',  stars:5, product:'Louis Vuitton bag',   text:"I've bought bags from everywhere and these are the best I've ever had. The design is quite detailed and the quality is unreal. Will 100% be back." },
    { name:'Tomiwa R.',   emoji:'🧔🏾', location:'Oshodi, Lagos', stars:5, product:'Nike sneakers',   text:"My morning jogs feels different in these sneakers — I know that sounds somehow, but the weight and texture genuinely make the experience better. A workout staple now." },
    { name:'Tishe W.',  emoji:'👩🏼', location:'Ijebu Ode, Ogun',   stars:4, product:' Bone Straight wig',        text:"Love the wig — looks stunning and feels so luxurious. The sizing was exactly as described. One star off only because I wish it came in more colours!" },
    { name:'Kehinde B.', emoji:'🧑🏿', location:'Abeokuta, Ogun',    stars:5, product:'Jewelry Set',  text:"Ordered the jewelry set as a gift for my wife and she now uses it every single outing. The packaging alone made her emotional. Thank you Damilola — you are blessed." },
];

/* ══════════════════════════════════════════════════════
    STATE
══════════════════════════════════════════════════════ */
let cart = [];
let currentCat = 'all';

/* ══════════════════════════════════════════════════════
    DOM REFS
══════════════════════════════════════════════════════ */
const grid       = document.getElementById('productGrid');
const cartDrawer = document.getElementById('cartDrawer');
const overlay    = document.getElementById('overlay');
const cartItems  = document.getElementById('cartItems');
const cartCount  = document.getElementById('cartCount');
const totalVal   = document.getElementById('totalVal');
const waBtn      = document.getElementById('waBtn');
const toast      = document.getElementById('toast');

/* ══════════════════════════════════════════════════════
    RENDER PRODUCTS
══════════════════════════════════════════════════════ */
function renderProducts() {
    const list = currentCat === 'all' ? products : products.filter(p => p.cat === currentCat);
    grid.innerHTML = '';
    list.forEach((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    const card   = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = (i * 55) + 'ms';
    card.innerHTML = `
        <div class="product-img-wrap">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" style="width: 70%;height:70%;object-fit:cover;border-radius:8px;"/>
        </div>
        <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
            <div class="product-price">₦${p.price.toFixed(2)}</div>
            <button class="add-btn${inCart?' added':''}" data-id="${p.id}" aria-label="Add ${p.name}">${inCart?'✓':'+'}</button>
        </div>
        </div>`;
    grid.appendChild(card);
    });
    grid.querySelectorAll('.add-btn').forEach(b => b.addEventListener('click', () => addToCart(+b.dataset.id)));
}

/* ══════════════════════════════════════════════════════
    RENDER REVIEWS
══════════════════════════════════════════════════════ */
function renderReviews() {
    const rg = document.getElementById('reviewsGrid');
    rg.innerHTML = reviews.map((r, i) => `
    <div class="review-card" style="animation-delay:${i*60}ms">
        <div class="review-stars">${'<span class="star">★</span>'.repeat(r.stars)}${'<span class="star" style="opacity:.25">★</span>'.repeat(5-r.stars)}</div>
        <p class="review-text">${r.text}</p>
        <div class="reviewer">
        <div class="reviewer-avatar">${r.emoji}</div>
        <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-meta">${r.location} · ${r.product}</div>
        </div>
        </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════════
    CART LOGIC
══════════════════════════════════════════════════════ */
function addToCart(id) {
    const p = products.find(p => p.id === id);
    const ex = cart.find(c => c.id === id);
    ex ? ex.qty++ : cart.push({ ...p, qty: 1 });
    updateCartMeta();
    renderProducts();
    showToast(`${p.emoji} ${p.name} added to cart`);
}

function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    updateCartMeta();
    renderCartDrawer();
    renderProducts();
}

function updateCartMeta() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const count = cart.reduce((s, i) => s + i.qty, 0);
    totalVal.textContent = '₦' + total.toFixed(2);
    cartCount.textContent = count;
    cartCount.classList.toggle('show', count > 0);
    if (count > 0) { waBtn.href = buildWALink(); waBtn.classList.remove('disabled'); }
    else           { waBtn.href = '#'; waBtn.classList.add('disabled'); }
}

function renderCartDrawer() {
    if (cart.length === 0) {
    cartItems.innerHTML = `<div class="cart-empty"><span class="cart-empty-icon">🛒</span><span>Your cart is empty</span><span style="font-size:.78rem;color:var(--sand)">Add items to get started</span></div>`;
    return;
    }
    cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
        ${item.img
            ? `<img src="${item.img}" alt="${item.name}" class="ci-img"/>`
            :  `<span class="ci-emoji">${item.emoji}</span>`
        }
        <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">₦${(item.price*item.qty).toFixed(2)}</div>
        </div>
        <div class="ci-qty">
        <button class="qty-btn" data-id="${item.id}" data-d="-1">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-d="1">+</button>
        </div>
    </div>`).join('');
    cartItems.querySelectorAll('.qty-btn').forEach(b => b.addEventListener('click', () => changeQty(+b.dataset.id, +b.dataset.d)));
}

/* ══════════════════════════════════════════════════════
    WHATSAPP LINK
══════════════════════════════════════════════════════ */
function buildWALink() {
    const lines = cart.map(i => `• ${i.name} x${i.qty} — $${(i.price*i.qty).toFixed(2)}`);
    const total = cart.reduce((s, i) => s + i.price*i.qty, 0);
    const msg = ['🛍️ *New Order – F & F*','', ...lines,'',`*Total: $${total.toFixed(2)}*`,'','Please confirm availability and delivery. Thank you! 🙏'].join('\n');
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ══════════════════════════════════════════════════════
    DRAWER
══════════════════════════════════════════════════════ */
function openCart()  { renderCartDrawer(); cartDrawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
function closeCart() { cartDrawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; }

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key==='Escape') closeCart(); });

/* ══════════════════════════════════════════════════════
   CATEGORY PILLS
══════════════════════════════════════════════════════ */
document.getElementById('categoryPills').addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  currentCat = pill.dataset.cat;
  renderProducts();
});

/* ══════════════════════════════════════════════════════
    CONTACT FORM
══════════════════════════════════════════════════════ */
document.getElementById('cfSubmit').addEventListener('click', () => {
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const msg     = document.getElementById('cf-msg').value.trim();
    if (!name || !email || !msg) { showToast('⚠️ Please fill in all required fields'); return; }
  // Build a WhatsApp message from the contact form
  const waMsg = `💌 *Contact Form – Maison & Co.*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject||'General'}\n\n*Message:*\n${msg}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
    document.getElementById('cfSuccess').style.display = 'flex';
    document.getElementById('cf-name').value = '';
    document.getElementById('cf-email').value = '';
    document.getElementById('cf-subject').value = '';
    document.getElementById('cf-msg').value = '';
});

/* ══════════════════════════════════════════════════════
    NEWSLETTER
══════════════════════════════════════════════════════ */
document.getElementById('nlBtn').addEventListener('click', () => {
    const email = document.getElementById('nlEmail').value.trim();
    if (!email || !email.includes('@')) { showToast('⚠️ Please enter a valid email address'); return; }
    document.getElementById('nlSuccess').classList.add('show');
    document.getElementById('nlEmail').value = '';
    document.getElementById('nlBtn').textContent = '✓ Done';
    document.getElementById('nlBtn').style.background = 'var(--wa-d)';
});
document.getElementById('nlEmail').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('nlBtn').click();
});

/* ══════════════════════════════════════════════════════
    TOAST
══════════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ══════════════════════════════════════════════════════
    INIT
══════════════════════════════════════════════════════ */
renderProducts();
renderReviews();
updateCartMeta();

/* ══════════════════════════════════════════════════════
   HAMBURGER MENU
══════════════════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobOverlay = document.getElementById('mobOverlay');

function openMobileMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  mobOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
function toggleMobileMenu() {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
}

hamburger.addEventListener('click', toggleMobileMenu);
mobOverlay.addEventListener('click', closeMobileMenu);

// Close on any mobile link tap
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMobileMenu(); closeCart(); }
});

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
renderProducts();
renderReviews();
updateCartMeta();