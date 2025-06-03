/*
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

  /* PART 2 

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav_links');
  
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }
  
    const menswearBtn = document.getElementById("menswear-btn");
    const menswearBox = document.getElementById("menswear-box");
  
    if (menswearBtn && menswearBox) {
      menswearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
       
        // Toggle submenu visibility
      menswearBox.classList.toggle("open");

      // Toggle class on the <li> for styling
      menswearBtn.parentElement.classList.toggle("submenu-open");

      // Toggle class on the nav_links (for hiding other items if desired)
      navLinks.classList.toggle("submenu-active");
      });
    }

    const topsBtn = document.getElementById("tops-btn");
    const backBtn = document.getElementById("back-to-menswear");
    
    topsBtn.addEventListener("click", () => {
      menswearBox.classList.add("tops-only");
      backBtn.style.display = "block";
    });
    
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      menswearBox.classList.remove("tops-only");
      backBtn.style.display = "none";
    });


  });
  
*/
  document.addEventListener('DOMContentLoaded', () => {
    const isMobile = () => window.innerWidth <= 600;
    const isDesktop = () => window.innerWidth > 600;
  
    
    // Toggle menu on hamburger click
    const toggleBtnD = document.querySelector('.menu-toggle');
    const navLinksD = document.querySelector('.nav_links');
  
    if (toggleBtnD && navLinksD) {
      toggleBtnD.addEventListener('click', () => {
        if (!isDesktop()) return;
        navLinksD.classList.toggle('active');
      });
    }

    // Menswear button toggle (if exists)
    const menswearBtnD = document.getElementById("menswear-btn");
    const menswearBoxD = document.getElementById("menswear-box");
    if (menswearBtnD && menswearBoxD) {
      menswearBtnD.addEventListener("click", (e) => {
        if (!isDesktop()) return;
        e.stopPropagation();
        menswearBoxD.style.display =
          menswearBoxD.style.display === "block" ? "none" : "block";
      });
    }


    
    
    const navLinks = document.querySelector('.nav_links');
    const menuToggle = document.querySelector('.menu-toggle');
    const menswearBtn = document.getElementById('menswear-btn');
    const menswearBox = document.getElementById('menswear-box');
    const backToMain = document.getElementById('back-to-main');
  
    const topsBtn = document.getElementById('tops-btn');
    const topsList = document.querySelector('.tops-list');
    const backToMenswear = document.getElementById('back-to-menswear');
  
    
    
    const mainNavItems = [...navLinks.children].filter(li => !li.querySelector('#menswear-box'));
    const menswearSections = [...menswearBox.children].filter(el =>
      !el.classList.contains('tops-list') &&
      el.id !== 'tops-btn'
    );
  
    menuToggle.addEventListener('click', () => {
      if (!isMobile()) return;
      navLinks.classList.toggle('active');
    });
  
    menswearBtn.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      mainNavItems.forEach(item => item.style.display = 'none');
      menswearBox.style.display = 'block';
      menswearSections.forEach(el => el.style.display = '');
      topsBtn.style.display = 'flex';
      topsList.style.display = 'none';
      backToMain.style.display = 'inline-block';
      backToMenswear.style.display = 'none';
    });
  
    topsBtn.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      menswearSections.forEach(el => el.style.display = 'none');
      topsBtn.style.display = 'flex';
      topsList.style.display = 'block';
      backToMenswear.style.display = 'inline-block';
      backToMain.style.display = 'none';
    });
  
    backToMenswear.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      menswearSections.forEach(el => el.style.display = '');
      topsList.style.display = 'none';
      topsBtn.style.display = 'flex';
      backToMenswear.style.display = 'none';
      backToMain.style.display = 'inline-block';
    });
  
    backToMain.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
      mainNavItems.forEach(item => item.style.display = '');
      menswearBox.style.display = 'none';
      backToMain.style.display = 'none';
    });
  
    // Optional: Close submenu when resizing to desktop
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
    