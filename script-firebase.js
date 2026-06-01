/*
  ========================================
  ملف JavaScript لموقع تليد وجديد
  ========================================
  يحتوي على جميع الوظائف التفاعلية
  مع ربط البيانات من Firebase
*/

// متغيرات عامة
let currentCategory = 'all';
let currentSearchTerm = '';
let allProducts = [];
let allCategories = [];

// تحميل البيانات من Firebase عند فتح الصفحة
window.addEventListener('load', function() {
  loadDataFromFirebase();
});

// تحميل المنتجات والأقسام من Firebase
function loadDataFromFirebase() {
  // سحب المنتجات من Firebase
  getProductsFromFirebase((data) => {
    allProducts = data;
    renderProducts();
    updateCategoryButtons();
    filterProducts();
  });

  // سحب الأقسام من Firebase
  getCategoriesFromFirebase((data) => {
    allCategories = data;
    updateCategoryButtons();
    filterProducts();
  });
}

// رسم المنتجات في الصفحة
function renderProducts() {
  const container = document.getElementById('productsContainer');
  
  // احذف جميع المنتجات القديمة
  container.innerHTML = '';
  
  // أضف المنتجات الجديدة من Firebase
  allProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-category', product.category);
    productCard.setAttribute('data-name', product.name);
    productCard.setAttribute('data-product-id', product.id);
    
    const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(product.name);
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${imageUrl}" alt="${product.name}" style="max-height: 300px; object-fit: cover;">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description || ''}</p>
        <p class="product-price">${product.price} ريال</p>
        <span class="product-category" style="display:none;">${product.category}</span>
        <a href="https://wa.me/966536655941?text=مرحباً، أرغب في الاستفسار عن منتج: ${encodeURIComponent(product.name)}" 
           target="_blank" 
           class="whatsapp-btn">
          💬 استفسر عبر واتساب
        </a>
      </div>
    `;
    
    container.appendChild(productCard);
    
    // إضافة تأثيرات التمرير
    productCard.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    productCard.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// تحديث أزرار الأقسام
function updateCategoryButtons() {
  const categoriesContainer = document.querySelector('.categories-container');
  
  // احتفظ بزر "جميع المنتجات"
  const allBtn = categoriesContainer.querySelector('.category-btn');
  
  // احذف الأزرار القديمة (ما عدا الأول)
  const oldButtons = categoriesContainer.querySelectorAll('.category-btn:not(:first-child)');
  oldButtons.forEach(btn => btn.remove());
  
  // أضف أزرار الأقسام الجديدة
  allCategories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.textContent = category.name;
    btn.onclick = function() { filterByCategory(category.name); };
    categoriesContainer.appendChild(btn);
  });
}

// ========================================
// وظيفة البحث عن المنتجات
// ========================================

function searchProducts() {
  const searchInput = document.getElementById('searchInput');
  currentSearchTerm = searchInput.value.toLowerCase();
  filterProducts();
}

// ========================================
// وظيفة التصفية حسب الفئة
// ========================================

function filterByCategory(category) {
  currentCategory = category;
  
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    
    if (btn.textContent.trim() === category || 
        (category === 'all' && btn.textContent.includes('جميع'))) {
      btn.classList.add('active');
    }
  });
  
  filterProducts();
}

// ========================================
// وظيفة التصفية الرئيسية
// ========================================

function filterProducts() {
  const products = document.querySelectorAll('.product-card');
  
  let visibleCount = 0;
  
  products.forEach(product => {
    const productCategory = product.getAttribute('data-category');
    const productName = product.getAttribute('data-name').toLowerCase();
    
    const categoryMatch = currentCategory === 'all' || productCategory === currentCategory;
    const searchMatch = productName.includes(currentSearchTerm);
    
    if (categoryMatch && searchMatch) {
      product.style.display = 'block';
      visibleCount++;
    } else {
      product.style.display = 'none';
    }
  });
  
  const noResults = document.getElementById('noResults');
  
  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
}

// ========================================
// وظيفة الانتقال السلس عند تحميل الصفحة
// ========================================

window.addEventListener('load', function() {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInDown 1s ease-out';
  }
});

// ========================================
// معالجة مفتاح الإدخال (Enter) في البحث
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        searchProducts();
      }
    });
    
    searchInput.addEventListener('input', function() {
      searchProducts();
    });
  }
});

// ========================================
// سلس التمرير للروابط
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ========================================
// إضافة تأثير عند التمرير على المنتجات
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

console.log('✅ تم تحميل ملف JavaScript بنجاح');
console.log('📱 الموقع جاهز للاستخدام');
console.log('🔐 لوحة التحكم: admin-login.html');
