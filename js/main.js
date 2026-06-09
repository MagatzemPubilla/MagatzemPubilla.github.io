document.querySelectorAll(".menu-header").forEach(header => {
  header.addEventListener("click", () => {
    const parent = header.parentElement;
    const isActive = parent.classList.contains("active");

    // Tancar tots
    document.querySelectorAll(".menu-section").forEach(section => {
      section.classList.remove("active");
    });

    // Si no estava actiu, obrir-lo
    if (!isActive) {
      parent.classList.add("active");
    }
  });
});  
  
 
  // Link actiu en vermell
  const links = document.querySelectorAll(".submenu a");
  const currentPage = window.location.pathname.split("/").pop();
  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active-link");
      link.closest(".menu-section").classList.add("active");
    }
  });

  // Cercador funcional per tota la pàgina
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!query) return;

    const allElements = document.querySelectorAll("body *");
    let found = false;

    for (let el of allElements) {
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;

      if (el.textContent.toLowerCase().includes(query)) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
        break;
      }
    }

    if (!found) alert("No s'ha trobat cap resultat.");
  });

  // Botó netejar
  document.getElementById("clearSearch").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
  });


  