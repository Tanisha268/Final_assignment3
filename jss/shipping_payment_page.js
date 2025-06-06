// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

  // Function to toggle between shipping options (e.g., delivery vs pickup)
  function toggleOption(clickedOption) {
    const isSelected = clickedOption.classList.contains('selected');
    const pickupDetails = document.querySelector('.pickup_details');
    const paymentSection = document.querySelector('.payment_section');

    // Remove 'selected' class from all shipping options
    document.querySelectorAll('.shipping_option').forEach(option => {
      option.classList.remove('selected');
    });

    // If this option wasn't already selected, mark it and show relevant sections
    if (!isSelected) {
      clickedOption.classList.add('selected');

      if (clickedOption.textContent.trim() === "Pick up in Store") {
        // Show pickup details and payment section for in-store pickup
        pickupDetails.style.display = "block";
        paymentSection.style.display = "block";
      } else {
        // Hide pickup details, but still show payment for shipping
        pickupDetails.style.display = "none";
        paymentSection.style.display = "block";
      }
    } else {
      // If the user clicks again to unselect, hide both sections
      pickupDetails.style.display = "none";
      paymentSection.style.display = "none";
    }
  }

  // Reference to payment button and input fields
  const paymentButton = document.getElementById('paymentButton');
  const inputs = document.querySelectorAll('.payment_input');

  // Function to enable/disable the payment button based on input completion
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

  // Add event listeners to inputs to validate on user input
  inputs.forEach(input => input.addEventListener('input', checkInputs));
  checkInputs(); // Initial check when page loads

  // Elements used for displaying the cart summary
  const productsContainer = document.getElementById('products_container');
  const totalItemsElem = document.getElementById('total_items');
  const subtotalValueElem = document.getElementById('subtotal_value');
  const totalValueElem = document.getElementById('total_value');

  // Fetch cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Render the cart items and update order summary
  function renderOrderSummary() {
    const cart = getCart();

    if (!productsContainer) return;

    // Show message if cart is empty
    if (cart.length === 0) {
      productsContainer.innerHTML = `<p>Your cart is empty.</p>`;
      totalItemsElem.textContent = 0;
      subtotalValueElem.textContent = '$0.00';
      totalValueElem.textContent = '$0.00';
      return;
    }

    // Create HTML for each product row
    const productsHTML = cart.map(item => `
      <div class="product_row">
        <img src="${item.image}" alt="${item.name}">
        <div class="product_details">
          <div class="product_name">${item.name}</div>
          <div class="product_price">$${item.price.toFixed(2)} x ${item.quantity}</div>
        </div>
      </div>
    `).join('');

    // Inject HTML into container
    productsContainer.innerHTML = productsHTML;

    // Calculate totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update DOM elements with totals
    totalItemsElem.textContent = totalItems;
    subtotalValueElem.textContent = `$${subtotal.toFixed(2)}`;
    totalValueElem.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Run render on page load
  renderOrderSummary();

  // Make toggleOption accessible in inline HTML onclick (if used)
  window.toggleOption = toggleOption;
});


// Second DOMContentLoaded listener for checkout click
document.addEventListener('DOMContentLoaded', () => {
  const paymentButton = document.getElementById('paymentButton');
  const inputs = document.querySelectorAll('.payment_input');

  // Reuse input validation function
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

  // Attach input listeners again (note: duplication here, could be optimized)
  inputs.forEach(input => {
    input.addEventListener('input', checkInputs);
  });

  // Initial validation on load
  checkInputs();

  // On click of payment button, go to confirmation page
  paymentButton.addEventListener('click', () => {
    if (!paymentButton.disabled) {
      window.location.href = 'confirmation_page.html';
    }
  });
});

// Placeholder for store selection logic (not yet implemented)
function selectStore() {
  // TODO: Implement logic to select a store for pickup
}