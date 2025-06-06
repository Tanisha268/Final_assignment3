document.addEventListener('DOMContentLoaded', () => {
  // Select the "Add to Cart" button
  const addToCartBtn = document.querySelector('.pink_rectangle');
  // Select the container where cart notifications will be displayed
  const cartNotification = document.getElementById('cart-notification');

  // If no productInfo is defined globally, exit early (nothing to add)
  if (!window.productInfo) return;

  // Function to get the current cart from localStorage and filter invalid items
  function getCart() {
    const raw = JSON.parse(localStorage.getItem('cart')) || [];
    // Filter to only keep items with valid name, price (number), image, and quantity
    return raw.filter(item => item.name && typeof item.price === 'number' && item.image && item.quantity);
  }

  // Function to save the updated cart back to localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Add a product to the cart or increase quantity if it already exists
  function addToCart(product) {
    // Validate product has required fields before adding
    if (!product.name || typeof product.price !== 'number' || !product.image) {
      console.warn('Invalid productInfo. Skipping add to cart:', product);
      return;
    }

    // Retrieve current cart
    const cart = getCart();
    // Check if product already exists in cart
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      // If found, increase quantity by 1
      existing.quantity++;
    } else {
      // Otherwise, add new product with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
    // Save updated cart
    saveCart(cart);
  }

  // Render the cart notification popup with items and totals
  function renderCartNotification() {
    const cart = getCart();

    // If cart notification container is missing, do nothing
    if (!cartNotification) return;

    // Create HTML for each item in the cart
    const itemsHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <p class="item-name">${item.name}</p>
          <p>Qty: ${item.quantity}</p>
        </div>
        <div class="item-price">
          <p class="price">Price: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    `).join('');

    // Calculate total quantity and total price of all cart items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Populate the cart notification with all info and a close button
    cartNotification.innerHTML = `
      <button id="close-cart-notification" class="close-button">×</button>
      <h2>YAY</h2>
      <p>Item Added to Cart</p>
      ${itemsHTML}
      <hr />
      <div class="totals-row">
        <p>Total Items: ${totalItems}</p>
        <p>Total Price: $${totalPrice.toFixed(2)}</p>
      </div>
      <a href="cart_page.html" class="view-cart-button">View Cart</a>
    `;

    // Show the notification by removing 'hidden' class
    cartNotification.classList.remove('hidden');

    // Add click listener to close button to hide notification again
    document.getElementById('close-cart-notification').addEventListener('click', () => {
      cartNotification.classList.add('hidden');
    });
  }

  // If Add to Cart button exists, add click handler
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart(window.productInfo);   // Add the product to the cart
      renderCartNotification();        // Show the notification popup
    });
  }
});