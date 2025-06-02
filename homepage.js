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
  }); 



  
  const menswearMenuItem = document.querySelector('[data-submenu="menswear"]');
const mobileDropdown = document.getElementById('mobile-dropdown');
const mobileMenuRight = document.getElementById('mobile-menu-right');
const menuToggleBtn = document.querySelector('.menu-toggle');

const menswearSubmenuItems = ['Special', 'Tops', 'Bottoms', 'Shop by Brand'];

menuToggleBtn.addEventListener('click', () => {
  mobileDropdown.classList.toggle('hidden');
  if (mobileDropdown.classList.contains('hidden')) {
    mobileMenuRight.classList.add('hidden');
    mobileMenuRight.innerHTML = '';
  }
});

menswearMenuItem.addEventListener('click', () => {
  // Show right panel
  mobileMenuRight.classList.remove('hidden');
  mobileMenuRight.innerHTML = '';

  // Create header with back button and arrow
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.marginBottom = '12px';

  const backBtn = document.createElement('div');
  backBtn.textContent = '← Back';
  backBtn.style.cursor = 'pointer';
  backBtn.style.marginRight = '10px';
  backBtn.style.fontWeight = 'normal';
  backBtn.style.fontSize = '16px';
  backBtn.addEventListener('click', () => {
    mobileMenuRight.classList.add('hidden');
    mobileMenuRight.innerHTML = '';
  });

  const arrow = document.createElement('div');
  arrow.style.width = '0';
  arrow.style.height = '0';
  arrow.style.borderLeft = '8px solid transparent';
  arrow.style.borderRight = '8px solid transparent';
  arrow.style.borderBottom = '8px solid white';
  arrow.style.marginRight = '8px';

  const title = document.createElement('span');
  title.textContent = 'Menswear';
  title.style.fontFamily = '"Jacques Francois", serif';
  title.style.fontSize = '18px';
  title.style.fontWeight = 'bold';
  title.style.color = 'white';

  header.appendChild(backBtn);
  header.appendChild(arrow);
  header.appendChild(title);
  mobileMenuRight.appendChild(header);

  // Add submenu items
  menswearSubmenuItems.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    div.className = 'menu-item';
    mobileMenuRight.appendChild(div);
  });
});