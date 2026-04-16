/*Home*/
const popup=document.getElementById("popup");
if(popup){
    let message=alert('Welcome to BOM store🛒🛍️\nHope you enjoy shopping with us🥰');
    console.log(message)
}

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
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
}

if (priceFilter) {
    priceFilter.addEventListener('change', filterProducts);
}

if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
}


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

/*Women*/

//Filter 
document.addEventListener("DOMContentLoaded", () => {
    console.log("i");
  const filterBtn = document.getElementById('filterBtn');
  const sidebar = document.getElementById('filterSidebar');
  const closeBtn = document.getElementById('closeBtn');
  const searchinput = document.getElementById('searchinput');
  const applyBtn = document.getElementById('applyBtn');

  // Open
  filterBtn.addEventListener('click', () => {
    console.log("Filter button clicked"); // debug
    sidebar.style.width = '300px';
  });

  // Close
  closeBtn.addEventListener('click', () => {
    sidebar.style.width = '0';
  });

  // Filter products function
  function applyFilter() {
    const maxPrice = parseInt(document.getElementById("mychoice").value) || Infinity;

    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(cb => cb.value);

    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);

    const products = document.querySelectorAll(".product-card");
    const searchValue = searchinput.value.toLowerCase();

    products.forEach(product => {
      const price = parseInt(product.getAttribute("data-price")) || 0;
      const color = product.getAttribute("data-color") || '';
      const category = product.getAttribute("data-category") || '';
      const productName = product.querySelector('.product-name').innerText.toLowerCase();
      const matchPrice = price <= maxPrice;
      const matchColor = selectedColors.length === 0 || selectedColors.includes(color);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      const searchMatch = productName.includes(searchValue);

      product.style.display = (matchPrice && matchColor && matchCategory && searchMatch) ? "block" : "none";
    });
  }

  // Apply filter on checkbox change
  const checkboxes = document.querySelectorAll('.sidebar input[type="checkbox"]');
  checkboxes.forEach(cb => cb.addEventListener('change', applyFilter));

  // Apply filter when clicking Apply button
  applyBtn.addEventListener('click', applyFilter);

  // Apply filter on page load
  applyFilter();

  // Apply filter on search input
  searchinput.addEventListener('input', applyFilter);
});


/*Contact*/

function toggleChat() {
  let box = document.getElementById("chatBox");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
  let input = document.getElementById("input");
  let messages = document.getElementById("messages");

  if (input.value.trim() === "") return;

  // User message
  let userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = input.value;
  messages.appendChild(userMsg);

  // Fake bot reply
  let botMsg = document.createElement("div");
  botMsg.className = "message bot";

  if (input.value.toLowerCase().includes("price")) {
    botMsg.innerText = "Our prices start from EGP900.";
  } else if (input.value.toLowerCase().includes("shirt size")) {
    botMsg.innerText = "We have sizes from S to XL for adults and from 6 to 16 for kids.";
  }  else if (input.value.toLowerCase().includes("shoe size")) {
    botMsg.innerText = "We have sizes from 36 to 44.";
  } else if (input.value.toLowerCase().includes("size")){
    botMsg.innerText = "We have sizes from 36 to 44 for shoes, sizes from S to XL for adults and from 6 to 16 for kids.";
  }else {
    botMsg.innerText = "Thanks! We'll get back to you soon.";
  }

  setTimeout(() => {
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 500);

  input.value = "";
}

// cart

//arrows
const slider = document.getElementById("slider");

document.querySelector(".arrow.left").onclick = () => {
  slider.scrollBy({
    left: -300,
    behavior: "smooth"
  });
};

document.querySelector(".arrow.right").onclick = () => {
  slider.scrollBy({
    left: 300,
    behavior: "smooth"
  });
};


// sum of orders
let prices = document.querySelectorAll(".price");
let total = 0;

prices.forEach(price => {
  total += Number(price.textContent);
});

document.getElementById("total").textContent = "EGP " + total;
document.getElementById("subtotal").textContent = "EGP " + total;


  //alert
function confirmOrder() {
  alert("Order confirmed");
}
