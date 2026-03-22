import * as bootstrap from "bootstrap";
import "./scss/bootstrap.scss";
import "./scss/style.scss";
import img1 from "../src/images/login-img-1.jpg";
import img2 from "../src/images/login-img-2.jpg";
import img3 from "../src/images/login-img-3.jpg";
// Font Awesome
import "@fortawesome/fontawesome-free/js/all.min.js";

document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((item) => new bootstrap.Tooltip(item));

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent =
    "جميع الحقوق محفوظة لمدرسة علمني " +
    new Date().getFullYear();
}

const images = [img1, img2, img3];

document.addEventListener("DOMContentLoaded", () => {
  const bg1 = document.querySelector(".bg1");
  const bg2 = document.querySelector(".bg2");

  if (!bg1 || !bg2) return; 

  let current = 0;
  let showingFirst = true;

  bg1.style.backgroundImage = `url(${images[current]})`;

  setInterval(() => {
    current = (current + 1) % images.length;

    if (showingFirst) {
      bg2.style.backgroundImage = `url(${images[current]})`;
      bg2.style.opacity = 1;
      bg1.style.opacity = 0;
    } else {
      bg1.style.backgroundImage = `url(${images[current]})`;
      bg1.style.opacity = 1;
      bg2.style.opacity = 0;
    }

    showingFirst = !showingFirst;
  }, 3000);
});

