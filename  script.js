document.addEventListener('DOMContentLoaded', () => {
  // Toggle menu on hamburger click
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav_links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Menswear button toggle (if exists)
  const menswearBtn = document.getElementById("menswear-btn");
  const menswearBox = document.getElementById("menswear-box");
  if (menswearBtn && menswearBox) {
    menswearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menswearBox.style.display =
        menswearBox.style.display === "block" ? "none" : "block";
    });
  }

  // Filtering items toggle red class
  const filterItems = document.querySelectorAll('.filtering li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  // Cart notification toggle
  const addToCartBtn = document.querySelector('.pink_rectangle');
  const closeBtn = document.getElementById('close-cart-notification');
  const cartNotification = document.getElementById('cart-notification');

  if (addToCartBtn && cartNotification) {
    addToCartBtn.addEventListener('click', () => {
      cartNotification.classList.remove('hidden');
    });
  }

  if (closeBtn && cartNotification) {
    closeBtn.addEventListener('click', () => {
      cartNotification.classList.add('hidden');
    });
  }
});