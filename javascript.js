console.log("JS file loaded!");
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