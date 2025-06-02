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
}