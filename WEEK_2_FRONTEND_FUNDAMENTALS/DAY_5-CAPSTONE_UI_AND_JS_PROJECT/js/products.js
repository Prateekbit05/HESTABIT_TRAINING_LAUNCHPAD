const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const loader = document.getElementById("loader");
const cartCount = document.getElementById("cartCount");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

let products = [];
let filteredProducts = [];

const USD_TO_INR = 83;

// ================= CART =================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
}

setCart(getCart());

// ================= FETCH =================
async function fetchProducts() {
  loader.style.display = "block";
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  products = data.products;
  filteredProducts = [...products];

  populateCategoryFilter();
  renderProducts(filteredProducts);
  loader.style.display = "none";
}

// ================= CATEGORY =================
function populateCategoryFilter() {
  const cats = [...new Set(products.map(p => p.category))];
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categoryFilter.appendChild(opt);
  });
}

// ================= RENDER =================
function renderProducts(list) {
  productGrid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.tabIndex = 0;

    const price = p.price * USD_TO_INR;
    const mrp = price + price * 0.3;
    const discount = Math.round(((mrp - price) / mrp) * 100);

    const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));

    card.innerHTML = `
      <div class="actions">
        <button class="add-cart" data-id="${p.id}" aria-label="Add to cart">🛒</button>
      </div>

      <img src="${p.thumbnail}" alt="${p.title}">
      <h3>${p.title}</h3>

      <p>
        <s>₹${mrp.toLocaleString("en-IN")}</s>
        <strong> ₹${price.toLocaleString("en-IN")}</strong>
      </p>

      <span style="color:green">${discount}% OFF</span>
      <div class="rating">${stars}</div>
    `;

    card.onclick = () => openModal(p);
    productGrid.appendChild(card);
  });

  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const cart = getCart();
      cart.push(btn.dataset.id);
      setCart(cart);
    };
  });
}

// ================= FILTER / SORT =================
searchInput.oninput = filterProducts;
categoryFilter.onchange = filterProducts;
sortSelect.onchange = sortProducts;

function filterProducts() {
  const s = searchInput.value.toLowerCase();
  const c = categoryFilter.value;

  filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(s) &&
    (c === "all" || p.category === c)
  );

  sortProducts();
}

function sortProducts() {
  if (sortSelect.value === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "rating-desc") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }
  renderProducts(filteredProducts);
}

// ================= MODAL =================
function openModal(p) {
  modal.style.display = "block";
  modalBody.innerHTML = `
    <h2>${p.title}</h2>
    <img src="${p.thumbnail}" width="100%">
    <p>${p.description}</p>

    <h4>Payment Options</h4>
    <label><input type="radio"> Cash on Delivery</label><br>
    <label><input type="radio"> Online (UPI / Card)</label>

    <h4>EMI Options</h4>
    <ul>
      <li>₹499 × 6 months</li>
      <li>₹299 × 12 months</li>
    </ul>
  `;
}

document.getElementById("closeModal").onclick = () => modal.style.display = "none";

document.addEventListener("keydown", e => {
  if (e.key === "Escape") modal.style.display = "none";
});

// ================= DARK MODE =================
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// INIT
fetchProducts();
