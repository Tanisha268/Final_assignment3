document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.querySelector('.pink_rectangle');
    const cartNotification = document.getElementById('cart-notification');
  
    // Each product page defines this variable with its product info
    // For example, in product_page_one.html:
    // <script>const productInfo = { name: 'Diesel Brand Jacket', price: 95.00, image: 'product_one.jpg' };</script>
    // In product_page_two.html:
    // <script>const productInfo = { name: 'Navy Green Spray Jacket', price: 39.00, image: 'product_two_img1.jpg' };</script>
  
    if (!window.productInfo) {
      console.error('productInfo object not defined on this page.');
      return;
    }
  
    function getCart() {
      return JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    function saveCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function addToCart(product) {
      const cart = getCart();
      const existing = cart.find(item => item.name === product.name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      saveCart(cart);
    }
  
    function renderCartNotification() {
      const cart = getCart();
      if (!cartNotification) return;
  
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
  
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
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
  
      cartNotification.classList.remove('hidden');
  
      document.getElementById('close-cart-notification').addEventListener('click', () => {
        cartNotification.classList.add('hidden');
      });
    }
  
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        addToCart(window.productInfo);
        renderCartNotification();
      });
    }
  });