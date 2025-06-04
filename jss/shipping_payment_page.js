document.addEventListener('DOMContentLoaded', () => {
    // Toggle shipping option
    function toggleOption(clickedOption) {
      const isSelected = clickedOption.classList.contains('selected');
      const pickupDetails = document.querySelector('.pickup_details');
      const paymentSection = document.querySelector('.payment_section');
  
      // Unselect all
      document.querySelectorAll('.shipping_option').forEach(option => {
        option.classList.remove('selected');
      });
  
      if (!isSelected) {
        clickedOption.classList.add('selected');
  
        if (clickedOption.textContent.trim() === "Pick up in Store") {
          pickupDetails.style.display = "block";
          paymentSection.style.display = "block";
        } else {
          pickupDetails.style.display = "none";
          paymentSection.style.display = "block"; // still show for Shipping
        }
      } else {
        pickupDetails.style.display = "none";
        paymentSection.style.display = "none";
      }
    }
  
    // Payment input check
    const paymentButton = document.getElementById('paymentButton');
    const inputs = document.querySelectorAll('.payment_input');
  
    function checkInputs() {
      const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
      if (allFilled) {
        paymentButton.disabled = false;
        paymentButton.style.opacity = '1';
        paymentButton.style.cursor = 'pointer';
      } else {
        paymentButton.disabled = true;
        paymentButton.style.opacity = '0.5';
        paymentButton.style.cursor = 'not-allowed';
      }
    }
  
    inputs.forEach(input => input.addEventListener('input', checkInputs));
    checkInputs();
  
    // Dynamic order summary
    const productsContainer = document.getElementById('products_container');
    const totalItemsElem = document.getElementById('total_items');
    const subtotalValueElem = document.getElementById('subtotal_value');
    const totalValueElem = document.getElementById('total_value');
  
    function getCart() {
      return JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    function renderOrderSummary() {
      const cart = getCart();
  
      if (!productsContainer) return;
  
      if (cart.length === 0) {
        productsContainer.innerHTML = `<p>Your cart is empty.</p>`;
        totalItemsElem.textContent = 0;
        subtotalValueElem.textContent = '$0.00';
        totalValueElem.textContent = '$0.00';
        return;
      }
  
      const productsHTML = cart.map(item => `
        <div class="product_row">
          <img src="../img/${item.image}" alt="${item.name}">
          <div class="product_details">
            <div class="product_name">${item.name}</div>
            <div class="product_price">$${item.price.toFixed(2)} x ${item.quantity}</div>
          </div>
        </div>
      `).join('');
  
      productsContainer.innerHTML = productsHTML;
  
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      totalItemsElem.textContent = totalItems;
      subtotalValueElem.textContent = `$${subtotal.toFixed(2)}`;
      totalValueElem.textContent = `$${subtotal.toFixed(2)}`;
    }
  
    renderOrderSummary();
  
    // Expose toggleOption to global scope for inline onclick
    window.toggleOption = toggleOption;
  });



    
  document.addEventListener('DOMContentLoaded', () => {
    const paymentButton = document.getElementById('paymentButton');
    const inputs = document.querySelectorAll('.payment_input');
  
    function checkInputs() {
      const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
      if (allFilled) {
        paymentButton.disabled = false;
        paymentButton.style.opacity = '1';
        paymentButton.style.cursor = 'pointer';
      } else {
        paymentButton.disabled = true;
        paymentButton.style.opacity = '0.5';
        paymentButton.style.cursor = 'not-allowed';
      }
    }
  
    inputs.forEach(input => {
      input.addEventListener('input', checkInputs);
    });
  
    checkInputs();
  
    paymentButton.addEventListener('click', () => {
      if (!paymentButton.disabled) {
        window.location.href = 'confirmation_page.html';
      }
    });
  });

  function selectStore(){

  }