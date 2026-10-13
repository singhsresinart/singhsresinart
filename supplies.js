
const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const categoryFilters = document.getElementById("categoryFilters");
const productCount = document.getElementById("productCount");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutButton = document.getElementById("checkoutButton");

let selectedCategory = "All";
const cart = {};

let products = [];
let categories = ["All"];

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

// Load active products and stock from Supabase
async function loadProductsFromSupabase() {
  productGrid.textContent = "Loading products...";

  const { data, error } = await supabaseClient
    .from("sra_products")
    .select("id, sku, name, category, size, price, stock_quantity, image_path")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Unable to load products:", error.message);
    productGrid.textContent =
      "Unable to load products. Please refresh the page.";
    return;
  }

  products = data.map(item => ({
    id: item.sku,
    dbId: item.id,
    name: item.name,
    category: item.category,
    size: item.size,
    price: Number(item.price),
    stock: Number(item.stock_quantity),
    image: item.image_path
  }));

  categories = [
    "All",
    ...new Set(products.map(product => product.category))
  ];

  renderCategories();
  renderProducts();
  renderCart();
}

function renderCategories() {
  categoryFilters.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "category-button" +
      (category === selectedCategory ? " active" : "");
    button.textContent = category;
    button.setAttribute(
      "aria-pressed",
      String(category === selectedCategory)
    );

    button.addEventListener("click", () => {
      selectedCategory = category;
      renderCategories();
      renderProducts();
    });

    categoryFilters.appendChild(button);
  });
}

function renderProducts() {
  const searchTerm = productSearch.value.trim().toLowerCase();

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchableText =
      `${product.name} ${product.size} ${product.category}`.toLowerCase();

    return matchesCategory && searchableText.includes(searchTerm);
  });

  productCount.textContent =
    `${filteredProducts.length} product` +
    (filteredProducts.length === 1 ? "" : "s");

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent =
      "No products found. Try another search or category.";
    productGrid.appendChild(emptyMessage);
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = `${product.name} — ${product.size}`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.remove();

      if (!imageWrap.querySelector(".image-placeholder")) {
        const placeholder = document.createElement("p");
        placeholder.className = "image-placeholder";
        placeholder.textContent = "Product image unavailable";
        imageWrap.appendChild(placeholder);
      }
    });

    const stockBadge = document.createElement("span");
    stockBadge.className =
      "stock-badge" + (product.stock <= 0 ? " out-of-stock" : "");
    stockBadge.textContent =
      product.stock <= 0
        ? "Out of Stock"
        : `${product.stock} in stock`;

    imageWrap.append(image, stockBadge);

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.size;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "add-to-cart";
    addButton.dataset.productId = product.id;

    updateProductButton(addButton, product);

    addButton.addEventListener("click", () => addToCart(product.id));

    bottom.append(price, addButton);
    info.append(category, name, description, bottom);
    card.append(imageWrap, info);
    productGrid.appendChild(card);
  });
}

function updateProductButton(button, product) {
  const quantity = cart[product.id] || 0;
  const outOfStock = product.stock <= 0;
  const atLimit = quantity >= product.stock;

  button.textContent = outOfStock
    ? "Out of Stock"
    : quantity > 0
      ? `Added · ${quantity}`
      : "Add to Cart";

  button.disabled = outOfStock || atLimit;

  button.title = atLimit && !outOfStock
    ? "Maximum available quantity added"
    : "";
}

function updateAllProductButtons() {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    const product = products.find(
      item => item.id === button.dataset.productId
    );

    if (product) updateProductButton(button, product);
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product || product.stock <= 0) return;

  const currentQuantity = cart[productId] || 0;

  if (currentQuantity >= product.stock) {
    alert("You cannot add more than the available stock.");
    return;
  }

  cart[productId] = currentQuantity + 1;
  renderCart();
}

function changeQuantity(productId, change) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const nextQuantity = (cart[productId] || 0) + change;

  if (nextQuantity <= 0) {
    delete cart[productId];
  } else if (nextQuantity <= product.stock) {
    cart[productId] = nextQuantity;
  } else {
    alert("You cannot exceed the available stock.");
    return;
  }

  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  const entries = Object.entries(cart).filter(([productId, quantity]) => {
    const product = products.find(item => item.id === productId);
    return product && quantity > 0;
  });

  let totalQuantity = 0;
  let subtotal = 0;

  if (entries.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent =
      "Your cart is empty. Add products to get started.";
    cartItems.appendChild(emptyMessage);
  }

  entries.forEach(([productId, quantity]) => {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    totalQuantity += quantity;
    subtotal += product.price * quantity;

    const item = document.createElement("div");
    item.className = "cart-item";

    const details = document.createElement("div");

    const name = document.createElement("p");
    name.className = "cart-item-name";
    name.textContent = product.name;

    const description = document.createElement("div");
    description.className = "cart-item-details";
    description.textContent =
      `${product.size} · ${formatPrice(product.price)} each`;

    details.append(name, description);

    const linePrice = document.createElement("strong");
    linePrice.className = "cart-item-price";
    linePrice.textContent = formatPrice(product.price * quantity);
    linePrice.setAttribute("aria-label", "Item total");

    const actions = document.createElement("div");
    actions.className = "cart-item-actions";

    const quantityControls = document.createElement("div");
    quantityControls.className = "cart-quantity";

    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.textContent = "−";
    decrease.setAttribute(
      "aria-label",
      `Decrease ${product.name} quantity`
    );
    decrease.addEventListener(
      "click",
      () => changeQuantity(productId, -1)
    );

    const quantityText = document.createElement("span");
    quantityText.textContent = quantity;
    quantityText.setAttribute("aria-label", "Quantity");

    const increase = document.createElement("button");
    increase.type = "button";
    increase.textContent = "+";
    increase.disabled = quantity >= product.stock;
    increase.setAttribute(
      "aria-label",
      `Increase ${product.name} quantity`
    );
    increase.addEventListener(
      "click",
      () => changeQuantity(productId, 1)
    );

    quantityControls.append(decrease, quantityText, increase);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "cart-remove";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => removeFromCart(productId));

    actions.append(quantityControls, remove);
    item.append(details, linePrice, actions);
    cartItems.appendChild(item);
  });

  cartCount.textContent = totalQuantity;
  cartSubtotal.textContent = formatPrice(subtotal);
  checkoutButton.disabled = entries.length === 0;

  updateAllProductButtons();
}

// Submit the order request to the Supabase Edge Function
checkoutButton.addEventListener("click", async () => {
  const entries = Object.entries(cart).filter(
    ([, quantity]) => quantity > 0
  );

  if (entries.length === 0) return;

  const customerName = window.prompt("Please enter your full name:");
  if (!customerName || !customerName.trim()) return;

  const customerMobile = window.prompt("Please enter your mobile number:");
  if (!customerMobile || !customerMobile.trim()) return;

  const cleanMobile = customerMobile.replace(/[\s()+-]/g, "");

  if (!/^\d{10,15}$/.test(cleanMobile)) {
    alert(
      "Please enter a valid mobile number, including country code if needed."
    );
    return;
  }

  const items = entries.map(([productId, quantity]) => {
    const product = products.find(item => item.id === productId);

    return product
      ? { sku: product.id, quantity }
      : null;
  }).filter(Boolean);

  if (
    items.length !== entries.length ||
    items.some(item => !item.sku)
  ) {
    alert(
      "We couldn't verify one or more products. Please refresh the page and try again."
    );
    return;
  }

  const originalLabel = checkoutButton.textContent;
  checkoutButton.disabled = true;
  checkoutButton.textContent = "Submitting order...";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/submit-supplies-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_PUBLISHABLE_KEY
        },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_mobile: cleanMobile,
          customer_email: "",
          items
        })
      }
    );

    const result = await response.json().catch(() => ({}));

    if (
      !response.ok ||
      result.success !== true ||
      !result.order_number
    ) {
      throw new Error(
        result.error ||
        "The order could not be submitted. Please try again."
      );
    }

    const orderNumber = result.order_number;

    for (const [productId] of entries) {
      delete cart[productId];
    }

    renderCart();

    alert(
      `Order request submitted successfully!\n\n` +
      `Order number: ${orderNumber}\n` +
      `Status: Pending review\n\n` +
      `We will review availability and contact you to confirm the order.`
    );
  } catch (error) {
    console.error("Order submission failed:", error);

    alert(
      error.message ||
      "Unable to submit your order. Please try again."
    );
  } finally {
    checkoutButton.textContent = originalLabel;
    renderCart();
  }
});

productSearch.addEventListener("input", renderProducts);

loadProductsFromSupabase();
