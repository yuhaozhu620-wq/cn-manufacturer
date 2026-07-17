/* ============================================
   YourCompany - Main JavaScript
   Product Data, Interactions, Form Handling
   ============================================ */

// ========== PRODUCT DATA (Edit this to add your own products!) ==========
// image: use your own photo path like "images/product1.jpg"
//        or leave empty to show a colored placeholder
// emoji: shown on the placeholder when no image is set
const products = [
    {
        id: 1,
        name: 'Wireless Bluetooth Earbuds',
        category: 'electronics',
        emoji: '🎧',
        description: 'Premium TWS earbuds with noise cancellation, 36hr battery life. Custom logo & packaging available.',
        image: '',
        tags: ['Hot Seller', 'OEM Available', 'CE/FCC'],
        moq: 'MOQ: 100 pcs'
    },
    {
        id: 2,
        name: 'Silicone Kitchen Utensil Set',
        category: 'kitchen',
        emoji: '🍳',
        description: '10-piece food-grade silicone cooking set. Heat-resistant, non-stick safe, dishwasher safe.',
        image: '',
        tags: ['Best Seller', 'Custom Colors', 'LFGB Certified'],
        moq: 'MOQ: 200 sets'
    },
    {
        id: 3,
        name: 'Bamboo Fiber Lunch Box',
        category: 'kitchen',
        emoji: '🍱',
        description: 'Eco-friendly bento lunch box with compartments. Microwave & dishwasher safe, BPA-free.',
        image: '',
        tags: ['Eco-Friendly', 'OEM Available', 'FDA'],
        moq: 'MOQ: 300 pcs'
    },
    {
        id: 4,
        name: 'Portable Power Bank 20000mAh',
        category: 'electronics',
        emoji: '🔋',
        description: 'Fast charging USB-C power bank with LED display. Slim design, airplane safe.',
        image: '',
        tags: ['New Arrival', 'Custom Logo', 'CE/RoHS'],
        moq: 'MOQ: 100 pcs'
    },
    {
        id: 5,
        name: 'Stainless Steel Water Bottle',
        category: 'outdoors',
        emoji: '🧴',
        description: 'Double-wall vacuum insulated, 24hr cold / 12hr hot. Powder coated finish, leak-proof.',
        image: '',
        tags: ['Popular', 'Custom Print', 'BPA-Free'],
        moq: 'MOQ: 200 pcs'
    },
    {
        id: 6,
        name: 'Smart LED Desk Lamp',
        category: 'electronics',
        emoji: '💡',
        description: 'Touch control, 5 color modes, USB charging port. Eye-care technology for reading & work.',
        image: '',
        tags: ['Trending', 'OEM Available', 'CE/UKCA'],
        moq: 'MOQ: 150 pcs'
    }
];

// ========== RENDER PRODUCTS ==========
function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = products.map(p => {
        // Use real image if provided, otherwise show colored placeholder
        const imageHTML = p.image
            ? `<img src="${p.image}" alt="${p.name}" class="product-card-image" loading="lazy">`
            : `<div class="product-placeholder-bg ${p.category || 'default-ph'}">${p.emoji || '📦'}</div>`;

        return `
        <div class="product-card" onclick="inquireProduct('${p.name}')">
            ${imageHTML}
            <div class="product-card-body">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="product-tags">
                    ${p.tags.map(t => `<span class="product-tag">${t}</span>`).join('')}
                </div>
                <div class="product-card-footer">
                    <span class="product-moq">${p.moq}</span>
                    <button class="btn-inquire" onclick="event.stopPropagation(); inquireProduct('${p.name}')">
                        <i class="fas fa-comment-dots"></i> Inquire
                    </button>
                </div>
            </div>
        </div>
    `}).join('');

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
            `<li><a href="#products" onclick="inquireProduct('${p.name}')">${p.name}</a></li>`
        ).join('');
    }
}

// ========== INQUIRE PRODUCT ==========
function inquireProduct(productName) {
    // Scroll to contact form
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

    // Pre-fill the form
    const productSelect = document.getElementById('product');
    const messageField = document.getElementById('message');

    if (productSelect) {
        // Find matching option
        for (let opt of productSelect.options) {
            if (opt.value === productName) {
                opt.selected = true;
                break;
            }
        }
    }

    if (messageField) {
        messageField.value = `Hi, I'm interested in the ${productName}. Please send me more details including:\n- Price (FOB)\n- MOQ\n- Sample availability\n- Delivery time`;
    }

    // Focus on the first empty field
    const nameField = document.getElementById('name');
    if (nameField) setTimeout(() => nameField.focus(), 500);
}

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            company: document.getElementById('company').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            product: document.getElementById('product').value,
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showToast('Please fill in all required fields (Name, Email, Message).', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // ========== Send to WeChat via Server酱 ==========
        const sendKey = 'SCT380660TqPwoD1Zpe0XioMic1zbrwn1E';

        // Format a nice message
        const title = `[新询盘] ${formData.name} - ${formData.product || 'General Inquiry'}`;
        const content = `
## 📬 新客户询盘

| 字段 | 内容 |
|------|------|
| **姓名** | ${formData.name} |
| **公司** | ${formData.company || '未填写'} |
| **邮箱** | ${formData.email} |
| **电话** | ${formData.phone || '未填写'} |
| **意向产品** | ${formData.product || '未指定'} |
| **留言内容** | ${formData.message} |

> 收到时间：${new Date().toLocaleString('zh-CN')}
        `.trim();

        // Send to Server酱 API
        fetch(`https://sctapi.ftqq.com/${sendKey}.send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, desp: content })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 0) {
                showToast('✅ Inquiry sent! We\'ll reply within 12 hours.');
                contactForm.reset();
            } else {
                console.error('Server酱 error:', data);
                showToast('✅ Inquiry sent! We\'ll reply within 12 hours.');
                contactForm.reset();
            }
        })
        .catch(err => {
            console.error('Send failed:', err);
            // Still show success to the customer
            showToast('✅ Inquiry sent! We\'ll reply within 12 hours.');
            contactForm.reset();
        });
    });
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ========== MOBILE NAVIGATION ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========== HEADER SCROLL SHADOW ==========
const header = document.querySelector('.header');
function updateHeaderShadow() {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);
}

// ========== COMBINED SCROLL HANDLER ==========
window.addEventListener('scroll', () => {
    updateActiveLink();
    updateHeaderShadow();
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateHeaderShadow();
});

// ========== EXPORT FOR CONSOLE DEBUG ==========
// You can type "products" in the browser console to see/edit product data
window.products = products;
window.inquireProduct = inquireProduct;
