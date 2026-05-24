/* William Huang — Portfolio
   Small, dependency-free, fast.
   ------------------------------------------------------------ */

(function () {
  "use strict";

  /* Footer year */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  if (toggle && primaryNav) {
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
    };
    const open = () => {
      toggle.setAttribute("aria-expanded", "true");
      primaryNav.classList.add("is-open");
    };
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) close();
      else open();
    });
    primaryNav.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) close();
    });
  }

  /* Back-to-top button */
  const btt = document.createElement("button");
  btt.type = "button";
  btt.className = "back-to-top";
  btt.setAttribute("aria-label", "Back to top");
  btt.innerHTML =
    '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 12V2"/><path d="M2.5 6.5L7 2l4.5 4.5"/>' +
    "</svg>";
  document.body.appendChild(btt);

  const SHOW_AFTER = 480;
  let ticking = false;
  let shown = false;
  const tick = () => {
    const next = window.scrollY > SHOW_AFTER;
    if (next !== shown) {
      shown = next;
      btt.classList.toggle("is-shown", shown);
    }
    ticking = false;
  };
  tick();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(tick);
        ticking = true;
      }
    },
    { passive: true }
  );

  btt.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (history.replaceState) {
      const cleanUrl = window.location.pathname + window.location.search;
      history.replaceState(null, "", cleanUrl);
    }
  });
})();
