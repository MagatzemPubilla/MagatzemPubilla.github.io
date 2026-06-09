document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("topBtn");
  const content = document.querySelector(".principal");

  content.addEventListener("scroll", () => {
    if (content.scrollTop > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.onclick = () => {
    content.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
});