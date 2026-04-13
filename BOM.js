/*men*/
// استهداف العناصر من الـ DOM
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const searchInput = document.getElementById('searchInput');
const products = document.querySelectorAll('.product-card');

/**
 * وظيفة الفلترة الأساسية
 * تقوم بفحص القسم، السعر، والبحث بالاسم في نفس الوقت
 */
function filterProducts() {
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    products.forEach(product => {
        // 1. فحص القسم (Category)
        const productCategoryMatch = product.classList.contains(categoryValue) || categoryValue === 'all';
        
        // 2. فحص السعر (Price)
        const productPrice = parseInt(product.getAttribute('data-price'));
        let priceMatch = false;

        if (priceValue === 'all') {
            priceMatch = true;
        } else if (priceValue === 'low' && productPrice < 3000) {
            priceMatch = true;
        } else if (priceValue === 'mid' && productPrice >= 3000 && productPrice <= 8000) {
            priceMatch = true;
        } else if (priceValue === 'high' && productPrice > 8000) {
            priceMatch = true;
        }

        // 3. فحص البحث بالاسم (Search)
        const productName = product.querySelector('.product-name').innerText.toLowerCase();
        const searchMatch = productName.includes(searchValue);

        // التنفيذ: إذا تحققت كل الشروط اظهر المنتج، وإلا اخفيه
        if (productCategoryMatch && priceMatch && searchMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// إضافة المستمعات (Event Listeners) لتشغيل الفلتر عند كل تغيير
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);


/*item men*/

// --- وظائف صفحة المنتج (Product Details) ---

// 1. وظيفة تبديل الصور
function changeImg(smallImgSrc) {
    const fullImg = document.getElementById("mainImg");
    if (fullImg) {
        fullImg.src = smallImgSrc;
    }
}

// 2. وظيفة زيادة ونقصان الكمية
function changeQty(val) {
    const qtyInput = document.getElementById("qty");
    if (qtyInput) {
        let currentVal = parseInt(qtyInput.value) || 1;
        let newVal = currentVal + val;
        
        if (newVal >= 1) {
            qtyInput.value = newVal;
        }
    }
}

/*my account*/
// 1. وظائف الـ Modal (فتح وقفل)
function openEditModal() {
    document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// 2. تحديث البيانات (Save Changes)
document.addEventListener('submit', (e) => {
    if (e.target.id === 'updateForm') {
        e.preventDefault();
        
        // تحديث الإيميل في الصفحة
        const newEmail = document.getElementById('editEmail').value;
        document.getElementById('displayEmail').innerText = newEmail;
        
        closeEditModal();
        alert('Done! ✅');
    }
});

// 3. وظائف صفحة المنتج (الصور والكمية)
function changeImg(src) {
    document.getElementById("mainImg").src = src;
}

function changeQty(val) {
    let qty = document.getElementById("qty");
    let newVal = parseInt(qty.value) + val;
    if (newVal >= 1) qty.value = newVal;
}
