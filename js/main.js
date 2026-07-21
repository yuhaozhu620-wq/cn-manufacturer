/* ============================================
   Bosun Industrial - Main JavaScript
   Swiper, Counters, Animations, Forms, Search
   ============================================ */

// ========== PRODUCT DATA ==========
const products = [
    {
        id: 1,
        name: 'Transparent PVC Blister Tray for Electronics',
        category: 'blister',
        emoji: '📱',
        description: 'Clear PVC blister trays for electronic components packaging. Anti-static treatment keeps your parts safe. 0.2~10mm thickness range, custom mold available within 7 days.',
        image: 'images/products/product-1.webp',
        tags: ['Anti-Static', 'Custom Mold', '0.2-10mm'],
        moq: 'MOQ: 500 pcs'
    },
    {
        id: 2,
        name: 'Heavy-Duty Industrial Blister Tray',
        category: 'blister',
        emoji: '⚙️',
        description: 'Thick-gauge PVC trays for automotive & industrial parts. Stackable design saves warehouse space. Daily output 1,000,000 pcs, fast delivery.',
        image: 'images/products/product-2.webp',
        tags: ['Heavy Gauge', 'Stackable', 'Bulk Order'],
        moq: 'MOQ: 500 pcs'
    },
    {
        id: 3,
        name: 'Custom Clear Blister Packaging Tray',
        category: 'blister',
        emoji: '📦',
        description: 'Custom-designed clear blister trays for any product. Send us your drawings or samples — we match exact specs. PVC & PET materials available.',
        image: 'images/products/product-3.webp',
        tags: ['Custom Design', 'PVC/PET', 'Fast Sample'],
        moq: 'MOQ: 300 pcs'
    },
    {
        id: 4,
        name: 'Anti-Static Electronics Blister Tray',
        category: 'blister',
        emoji: '🔌',
        description: 'ESD-safe blister trays with anti-static coating. Perfect for circuit boards, connectors & sensitive electronics. Permanent or temporary anti-static.',
        image: 'images/products/product-4.webp',
        tags: ['ESD Safe', 'Electronics', 'Permanent AS'],
        moq: 'MOQ: 500 pcs'
    },
    {
        id: 5,
        name: 'Retail-Ready Blister Pack with Card Backing',
        category: 'blister',
        emoji: '🏪',
        description: 'PVC blister packs heat-sealed to printed card backing. Euro slot hang hole, barcode ready. Perfect for retail shelves & peg hooks.',
        image: 'images/products/product-5.webp',
        tags: ['Retail Ready', 'Card Backing', 'Heat Seal'],
        moq: 'MOQ: 1000 pcs'
    },
    {
        id: 6,
        name: 'Food & Medical Grade PET Blister Tray',
        category: 'blister',
        emoji: '🍱',
        description: 'PET transparent blister trays for food containers & medical device packaging. FDA food-safe, sterilizable. Tamper-evident sealing option.',
        image: '',
        tags: ['Food Grade', 'PET Material', 'FDA'],
        moq: 'MOQ: 1000 pcs'
    }
];

// ========== RENDER PRODUCTS ==========
function renderProducts(filterCategory) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const filtered = filterCategory && filterCategory !== 'all'
        ? products.filter(p => p.category === filterCategory)
        : products;

    grid.innerHTML = filtered.map(p => {
        const imageHTML = p.image
            ? `<div class="img-box"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>`
            : `<div class="img-box"><div class="product-placeholder">${p.emoji || '📦'}</div></div>`;

        return `
        <li>
            <a class="item" href="#contact" onclick="inquireProduct('${p.name.replace(/'/g, "\\'")}')">
                <div class="pic">
                    ${imageHTML}
                </div>
                <h6>· ${p.name}</h6>
                <div class="product-tags-row">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="product-moq-row">${p.moq}</div>
            </a>
        </li>
    `}).join('');

    // Show message if no products match
    if (filtered.length === 0) {
        grid.innerHTML = '<li class="search-no-results">No products found. Try a different search term.</li>';
    }

    // Populate product select in contact form
    const select = document.getElementById('product');
    if (select) {
        select.innerHTML = `
            <option value="">-- Select a Product --</option>
            ${products.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
        `;
    }

    // Populate footer product links
    const footerLinks = document.getElementById('footerProductLinks');
    if (footerLinks) {
        footerLinks.innerHTML = products.map(p =>
            `<p><a href="#products" onclick="inquireProduct('${p.name.replace(/'/g, "\\'")}')">· ${p.name}</a></p>`
        ).join('');
    }
}

// ========== PRODUCT SEARCH (by name) ==========
function searchProducts(e) {
    e.preventDefault();
    const term = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!term) return;

    // Filter products by name
    const matched = products.filter(p => p.name.toLowerCase().includes(term));

    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

    // Render with matched products temporarily
    const grid = document.getElementById('productGrid');
    if (grid) {
        if (matched.length > 0) {
            grid.innerHTML = matched.map(p => {
                const imageHTML = p.image
                    ? `<div class="img-box"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>`
                    : `<div class="img-box"><div class="product-placeholder">${p.emoji || '📦'}</div></div>`;
                return `
                <li>
                    <a class="item" href="#contact" onclick="inquireProduct('${p.name.replace(/'/g, "\\'")}')">
                        <div class="pic">${imageHTML}</div>
                        <h6>· ${p.name}</h6>
                        <div class="product-tags-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                        <div class="product-moq-row">${p.moq}</div>
                    </a>
                </li>`;
            }).join('');
        } else {
            grid.innerHTML = '<li class="search-no-results">No products found. Try a different search term.</li>';
        }
    }

    // Close search overlay
    document.getElementById('searchOverlay').classList.remove('active');

    // Reset to full product list after 5 seconds
    clearTimeout(window._searchTimeout);
    window._searchTimeout = setTimeout(() => renderProducts('all'), 5000);
}

// ========== INQUIRE PRODUCT ==========
function inquireProduct(productName) {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

    const productSelect = document.getElementById('product');
    const messageField = document.getElementById('message');

    if (productSelect) {
        for (let opt of productSelect.options) {
            if (opt.value === productName) { opt.selected = true; break; }
        }
    }

    if (messageField) {
        messageField.value = `Hi, I'm interested in the ${productName}. Please send me more details including:\n- Price (FOB)\n- MOQ\n- Sample availability\n- Delivery time`;
    }

    const nameField = document.getElementById('name');
    if (nameField) setTimeout(() => nameField.focus(), 500);
}

// ========== TOAST ==========
function showToast(message, type) {
    type = type || 'success';
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            company: document.getElementById('company').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            product: document.getElementById('product').value,
            message: document.getElementById('message').value.trim()
        };

        if (!formData.name || !formData.email || !formData.message) {
            showToast('Please fill in all required fields (Name, Email, Message).', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Send to WeChat via Server酱
        const sendKey = 'SCT380660TcC6LFLTQVRfaJdS3BTFC5Ybi';
        const title = `[New Inquiry] ${formData.name} - ${formData.product || 'General'}`;
        const content = [
            `## 📬 New Customer Inquiry`,
            ``,
            `| Field | Detail |`,
            `|-------|--------|`,
            `| **Name** | ${formData.name} |`,
            `| **Company** | ${formData.company || 'N/A'} |`,
            `| **Email** | ${formData.email} |`,
            `| **Phone** | ${formData.phone || 'N/A'} |`,
            `| **Product** | ${formData.product || 'Not specified'} |`,
            `| **Message** | ${formData.message} |`,
            ``,
            `> Received: ${new Date().toLocaleString('zh-CN')}`
        ].join('\n');

        fetch(`https://sctapi.ftqq.com/${sendKey}.send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, desp: content })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Server酱:', data);
            showToast('✅ Inquiry sent! We\'ll reply within 12 hours.');
            contactForm.reset();
        })
        .catch(err => {
            console.error('Send failed:', err);
            showToast('✅ Inquiry sent! We\'ll reply within 12 hours.');
            contactForm.reset();
        });
    });
}

// ========== SUBSCRIBE FORM ==========
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type=email]').value.trim();
        if (email) {
            // Send subscription to Server酱 too
            const sendKey = 'SCT380660TcC6LFLTQVRfaJdS3BTFC5Ybi';
            fetch(`https://sctapi.ftqq.com/${sendKey}.send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: '[Newsletter] New Subscriber',
                    desp: `**Email:** ${email}\n\n**Time:** ${new Date().toLocaleString('zh-CN')}`
                })
            }).catch(() => {});
            showToast('✅ Subscribed! Thank you.');
            this.reset();
        }
    });
}

// ========== MOBILE NAVIGATION ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navList = navMenu ? navMenu.querySelector('.nav-list1') : null;

if (hamburger && navList) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Mobile dropdown toggle
    navList.querySelectorAll('.nav-list2').forEach(sub => {
        const parentLi = sub.parentElement;
        const parentLink = parentLi.querySelector('> a');
        if (parentLink) {
            parentLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 1199) {
                    e.preventDefault();
                    parentLi.classList.toggle('open');
                }
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });
}

// ========== SEARCH OVERLAY ==========
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });

    // Close with Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') searchOverlay.classList.remove('active');
    });

    // Close when clicking overlay background
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });
}

// ========== HERO SWIPER ==========
document.addEventListener('DOMContentLoaded', function() {
    const swiperEl = document.getElementById('heroSwiper');
    if (swiperEl && typeof Swiper !== 'undefined') {
        new Swiper('#heroSwiper', {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 800
        });
    }
});

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ========== SCROLL ANIMATIONS (WOW-like) ==========
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.wow');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 80) {
            el.classList.add('animated');
        }
    });
}

// ========== HEADER SCROLL SHADOW ==========
function updateHeaderShadow() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
        }
    }
}

// ========== ACTIVE NAV LINK ==========
function updateActiveNav() {
    const sections = ['home', 'products', 'about', 'why-us', 'contact'];
    const navLinks = document.querySelectorAll('.nav-list1 > li');

    let current = 'home';
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 120) {
            current = id;
        }
    });

    navLinks.forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link && link.getAttribute('href') === '#' + current) {
            li.classList.add('active');
        }
    });
}

// ========== COMBINED SCROLL HANDLER ==========
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            handleScrollAnimations();
            updateHeaderShadow();
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

// ========== GOTOP LINKS (mobile bottom + aside) ==========
document.querySelectorAll('.gotop, .gotop-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========== VIDEO PLAY BUTTON ==========
const videoBtn = document.getElementById('videoPlayBtn');
if (videoBtn) {
    videoBtn.addEventListener('click', function() {
        showToast('📹 Factory video coming soon! Contact us for a virtual tour.', 'success');
    });
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', function() {
    renderProducts('all');
    handleScrollAnimations();
    updateHeaderShadow();

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.index-video');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
});

// ========== EXPORT FOR DEBUG ==========
window.products = products;
window.inquireProduct = inquireProduct;
window.renderProducts = renderProducts;
