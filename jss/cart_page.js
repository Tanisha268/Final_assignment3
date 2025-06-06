document.addEventListener('DOMContentLoaded', () => {
  // Cache references to key DOM elements involved in the cart display and summary
  const cartItemsSection = document.querySelector('.cart_items_section');
  const summaryItems = document.querySelector('.order_summary .summary_row .value'); // Not currently used in code
  const subtotalValue = document.querySelectorAll('.summary_row .value')[1]; // Not currently used in code
  const totalValue = document.querySelector('.cart_total_text'); // Not currently used in code

  // Retrieve the current cart from localStorage, or return empty array if none found
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Save the current cart array to localStorage as a JSON string
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Update the order summary totals (quantity, subtotal, discount, and total)
  function updateTotals(cart) {
    // Find the elements in the order summary section using data attributes
    const quantityEl = document.querySelector('[data-type="quantity"]');
    const subtotalEl = document.querySelector('[data-type="subtotal"]');
    const discountEl = document.querySelector('[data-type="discount"]');
    const totalEl = document.querySelector('[data-type="total"]');

    // Calculate total quantity of all items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate subtotal by summing price * quantity for each cart item
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Apply discount of $20 if total items is 2 or more, otherwise no discount
    const discount = totalItems >= 2 ? 20 : 0;

    // Calculate total after discount
    const total = subtotal - discount;

    // Update the text content of each summary element accordingly
    quantityEl.textContent = totalItems;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    discountEl.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00';
    totalEl.innerHTML = `<span class="underline">Total:</span> $${total.toFixed(2)}`;
  }

  // Render the cart items list in the cart section of the page
  function renderCart() {
    const cart = getCart();

    // Start by rendering the headings row for the cart table
    cartItemsSection.innerHTML = `
      <div class="cart_row headings">
        <div class="product_heading">Product</div>
        <div class="price_heading">Price</div>
        <div class="quantity_heading">Quantity</div>
        <div class="total_heading">Total</div>
      </div>
    `;

    // For each item in the cart, create and append a row with item details
    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.classList.add('cart_row');

      // Inner HTML includes product image, name, price, quantity controls, and total price
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

    // Attach event listeners to quantity increase/decrease and remove buttons
    attachButtonHandlers();

    // Update the totals summary based on current cart state
    updateTotals(cart);
  }

  // Attach click event handlers to all increase, decrease, and remove buttons
  function attachButtonHandlers() {
    // Increase quantity button
    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index; // Get item index from data attribute
        const cart = getCart();
        cart[index].quantity++;                // Increment quantity
        saveCart(cart);                        // Save updated cart to localStorage
        renderCart();                         // Re-render cart to update UI
      });
    });

    // Decrease quantity button
    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        const cart = getCart();

        // Decrement quantity if greater than 1, else remove item from cart
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        saveCart(cart);
        renderCart();
      });
    });

    // Remove item button
    document.querySelectorAll('.remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.dataset.index;
        const cart = getCart();
        cart.splice(index, 1);  // Remove item at index from cart array
        saveCart(cart);
        renderCart();
      });
    });
  }

  // Initial render of the cart on page load
  renderCart();
});