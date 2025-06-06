document.addEventListener('DOMContentLoaded', () => {
  // Utility functions to detect viewport size
  const isMobile = () => window.innerWidth <= 600;
  const isDesktop = () => window.innerWidth > 600;

  // ===== Desktop menu toggle: hamburger toggles nav visibility ONLY on desktop =====
  const toggleBtnD = document.querySelector('.menu-toggle');
  const navLinksD = document.querySelector('.nav_links');

  if (toggleBtnD && navLinksD) {
    toggleBtnD.addEventListener('click', () => {
      if (!isDesktop()) return;            // Only toggle on desktop
      navLinksD.classList.toggle('active');
    });
  }

  // ===== Desktop menswear submenu toggle: show/hide menswear submenu ONLY on desktop =====
  const menswearBtnD = document.getElementById("menswear-btn");
  const menswearBoxD = document.getElementById("menswear-box");

  if (menswearBtnD && menswearBoxD) {
    menswearBtnD.addEventListener("click", (e) => {
      if (!isDesktop()) return;            // Only act on desktop
      e.stopPropagation();
      menswearBoxD.style.display =
        menswearBoxD.style.display === "block" ? "none" : "block";
    });
  }


  // ===== Mobile menu elements =====
  const navLinks = document.querySelector('.nav_links');
  const menuToggle = document.querySelector('.menu-toggle');
  const menswearBtn = document.getElementById('menswear-btn');
  const menswearBox = document.getElementById('menswear-box');
  const backToMain = document.getElementById('back-to-main');

  const topsBtn = document.getElementById('tops-btn');
  const topsList = document.querySelector('.tops-list');
  const backToMenswear = document.getElementById('back-to-menswear');

  // Filter main nav items that are NOT the menswear submenu container itself
  const mainNavItems = [...navLinks.children].filter(li => !li.querySelector('#menswear-box'));
  // Filter menswear submenu children excluding tops list and tops button
  const menswearSections = [...menswearBox.children].filter(el =>
    !el.classList.contains('tops-list') &&
    el.id !== 'tops-btn'
  );

  // ===== Mobile hamburger toggles main nav menu visibility =====
  menuToggle.addEventListener('click', () => {
    if (!isMobile()) return;             // Only toggle on mobile
    navLinks.classList.toggle('active');
  });

  // ===== Mobile Menswear button click =====
  menswearBtn.addEventListener('click', (e) => {
    if (!isMobile()) return;             // Only act on mobile
    e.stopPropagation();

    // Hide all main nav items except menswear submenu container
    mainNavItems.forEach(item => item.style.display = 'none');
    // Show menswear submenu container
    menswearBox.style.display = 'block';
    // Show all menswear sections except tops list
    menswearSections.forEach(el => el.style.display = '');
    // Show tops button (to navigate deeper)
    topsBtn.style.display = 'flex';
    // Hide tops list initially
    topsList.style.display = 'none';
    // Show back button to main menu
    backToMain.style.display = 'inline-block';
    // Hide back to menswear button since we are at menswear level
    backToMenswear.style.display = 'none';
  });

  // ===== Mobile Tops button click (within Menswear) =====
  topsBtn.addEventListener('click', (e) => {
    if (!isMobile()) return;
    e.stopPropagation();

    // Hide all menswear sections except tops list
    menswearSections.forEach(el => el.style.display = 'none');
    // Keep tops button visible
    topsBtn.style.display = 'flex';
    // Show tops list
    topsList.style.display = 'block';
    // Show back button to menswear submenu
    backToMenswear.style.display = 'inline-block';
    // Hide back to main menu button
    backToMain.style.display = 'none';
  });

  // ===== Back button from Tops to Menswear =====
  backToMenswear.addEventListener('click', (e) => {
    if (!isMobile()) return;
    e.stopPropagation();

    // Show menswear sections again
    menswearSections.forEach(el => el.style.display = '');
    // Hide tops list
    topsList.style.display = 'none';
    // Keep tops button visible
    topsBtn.style.display = 'flex';
    // Hide back to menswear button
    backToMenswear.style.display = 'none';
    // Show back to main menu button
    backToMain.style.display = 'inline-block';
  });

  // ===== Back button from Menswear submenu back to main nav =====
  backToMain.addEventListener('click', (e) => {
    if (!isMobile()) return;
    e.stopPropagation();

    // Show all main nav items again
    mainNavItems.forEach(item => item.style.display = '');
    // Hide menswear submenu container
    menswearBox.style.display = 'none';
    // Hide back to main button
    backToMain.style.display = 'none';
  });

  // ===== On window resize, reset menu states if switching to desktop =====
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      navLinks.classList.remove('active');
      menswearBox.style.display = '';
      mainNavItems.forEach(item => item.style.display = '');
      topsList.style.display = '';
      backToMain.style.display = 'none';
      backToMenswear.style.display = 'none';
    }
  });
});