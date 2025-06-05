document.addEventListener('DOMContentLoaded', () => {
    const cartItemsSection = document.querySelector('.cart_items_section');
    const summaryItems = document.querySelector('.order_summary .summary_row .value');
    const subtotalValue = document.querySelectorAll('.summary_row .value')[1];
    const totalValue = document.querySelector('.cart_total_text');
  
    function getCart() {
      return JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    function saveCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function updateTotals(cart) {
      const quantityEl = document.querySelector('[data-type="quantity"]');
      const subtotalEl = document.querySelector('[data-type="subtotal"]');
      const discountEl = document.querySelector('[data-type="discount"]');
      const totalEl = document.querySelector('[data-type="total"]');
    
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
      const discount = totalItems >= 2 ? 20 : 0;
      const total = subtotal - discount;
    
      quantityEl.textContent = totalItems;
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      discountEl.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00';
      totalEl.innerHTML = `<span class="underline">Total:</span> $${total.toFixed(2)}`;
    }
  
    function renderCart() {
      const cart = getCart();
      cartItemsSection.innerHTML = `
        <div class="cart_row headings">
          <div class="product_heading">Product</div>
          <div class="price_heading">Price</div>
          <div class="quantity_heading">Quantity</div>
          <div class="total_heading">Total</div>
        </div>
      `;
  
      cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.classList.add('cart_row');
        row.innerHTML = `
          <div class="product">
            <div class="product-left">
              <img src="${item.image}" class="jacket_cart" alt="${item.name}">
              <p class="remove" data-index="${index}">Remove</p>
            </div>
            <div class="product-right">
              <h2>${item.name}</h2>
            </div>
          </div>
          <div class="price">$${item.price.toFixed(2)}</div>
          <div class="quantity">
            <div class="quantity-button">
              <button class="decrease" data-index="${index}">−</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
            </div>
          </div>
          <div class="total">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItemsSection.appendChild(row);
      });
  
      attachButtonHandlers();
      updateTotals(cart);
    }
  
    function attachButtonHandlers() {
      document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', e => {
          const index = e.target.dataset.index;
          const cart = getCart();
          cart[index].quantity++;
          saveCart(cart);
          renderCart();
        });
      });
  
      document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', e => {
          const index = e.target.dataset.index;
          const cart = getCart();
          if (cart[index].quantity > 1) {
            cart[index].quantity--;
          } else {
            cart.splice(index, 1);
          }
          saveCart(cart);
          renderCart();
        });
      });
  
      document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', e => {
          const index = e.target.dataset.index;
          const cart = getCart();
          cart.splice(index, 1);
          saveCart(cart);
          renderCart();
        });
      });
    }
  
    renderCart();
  });

  
  