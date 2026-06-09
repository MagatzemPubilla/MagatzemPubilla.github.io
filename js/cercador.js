// ----------------------------
// CONFIG
// ----------------------------
const containers = document.querySelectorAll(".principal, .sidebar");

// ----------------------------
// VARIABLES
// ----------------------------
let resultados = [];
let scrollTimeout = null;

// ----------------------------
// NORMALITZAR TEXT
// ----------------------------
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ----------------------------
// NETEJAR MARCATGES
// ----------------------------
function limpiarResaltados() {
  document.querySelectorAll(".resaltado").forEach(span => {
    span.replaceWith(document.createTextNode(span.textContent));
  });
}

// ----------------------------
// OBRIR MENÚ
// ----------------------------
function abrirMenu(el) {
  let parent = el.parentElement;

  while (parent) {
    if (parent.classList && parent.classList.contains("menu-section")) {
      parent.classList.add("active");
    }
    parent = parent.parentElement;
  }
}

// ----------------------------
// BUSCAR
// ----------------------------
function buscar() {
  const input = normalizarTexto(
    document.getElementById("searchInput").value.trim()
  );

  // parar scroll anterior
  if (scrollTimeout) clearTimeout(scrollTimeout);

  limpiarResaltados();

  // tancar menús
  document.querySelectorAll(".menu-section").forEach(sec => {
    sec.classList.remove("active");
  });

  resultados = [];

  if (!input) return;

  containers.forEach(container => {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let nodes = [];

    // Guardem nodes primer
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    // Processem després
    nodes.forEach(node => {
      let texto = node.nodeValue;
      let textoNorm = normalizarTexto(texto);

      if (!textoNorm.includes(input)) return;

      const fragment = document.createDocumentFragment();
      let i = 0;

      while (true) {
        const index = textoNorm.indexOf(input, i);

        if (index === -1) {
          fragment.appendChild(
            document.createTextNode(texto.slice(i))
          );
          break;
        }

        // text abans
        fragment.appendChild(
          document.createTextNode(texto.slice(i, index))
        );

        // match
        const mark = document.createElement("span");
        mark.className = "resaltado";
        mark.textContent = texto.slice(index, index + input.length);
        fragment.appendChild(mark);

        resultados.push(mark);

        i = index + input.length;
      }

      // 🔥 Substituïm node
      const parent = node.parentNode;
      parent.replaceChild(fragment, node);

      // 🔥 ARA sí: ja estan al DOM → obrim menú
      parent.querySelectorAll(".resaltado").forEach(mark => {
        abrirMenu(mark);
      });
    });
  });

  // ----------------------------
  // SCROLL TOUR
  // ----------------------------
  if (resultados.length > 0) {
    let i = 0;

    function scrollStep() {
      if (i >= resultados.length) return;

      resultados[i].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      i++;
      scrollTimeout = setTimeout(scrollStep, 250);
    }

    scrollStep();
  }
}

// ----------------------------
// EVENTS
// ----------------------------
document.getElementById("searchBtn")?.addEventListener("click", buscar);

document.getElementById("searchInput")?.addEventListener("keypress", e => {
  if (e.key === "Enter") buscar();
});

document.getElementById("clearSearch")?.addEventListener("click", () => {
  document.getElementById("searchInput").value = "";

  limpiarResaltados();
  resultados = [];

  if (scrollTimeout) clearTimeout(scrollTimeout);

  document.querySelectorAll(".menu-section").forEach(sec => {
    sec.classList.remove("active");
  });
});
