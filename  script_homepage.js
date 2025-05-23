  /*------------------ THIS SECTION IS FOR ADDING THE WHITE SEARCH RESULTS -----------------------*/
onsole.log("JS file loaded!");
  window.onload = function() {
    const menswearBtn = document.getElementById("menswear-btn");
    const menswearBox = document.getElementById("menswear-box");
  
    menswearBtn.addEventListener("click", function () {
      // Toggle the display
      if (menswearBox.style.display === "block") {
        menswearBox.style.display = "none";
      } else {
        menswearBox.style.display = "block";
      }
    });
  };


  /*------------------ THIS SECTION IS FOR BEING ABLE TO CLICK MENSWEAR -----------------------*/  
  window.onload = function () {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav_links');
  
    toggleBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  };

  window.onload = function () {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav_links');
    const menswearBtn = document.getElementById("menswear-btn");
    const menswearBox = document.getElementById("menswear-box");
  
    toggleBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  
    menswearBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent closing dropdown on body click
      menswearBox.style.display = 
        menswearBox.style.display === "block" ? "none" : "block";
    });
  }