document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".menu-header").forEach(header => {
  header.addEventListener("click", function() {
    const section = this.parentElement;
    document.querySelectorAll(".menu-section").forEach(sec => {
      if (sec !== section) sec.classList.remove("active");
    });
    section.classList.toggle("active");
  });
});
