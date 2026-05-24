/* William Huang — Portfolio
   Small, dependency-free, fast.
   ------------------------------------------------------------ */

(function () {
  "use strict";

  const reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------
     Footer year
  ------------------------------------------------------------ */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     Reveal on scroll
  ------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length) {
    if (!reduced && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
      );
      revealTargets.forEach((el) => io.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    }
  }

  /* ------------------------------------------------------------
     Mobile nav toggle
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     Smooth scroll for in-page anchors
  ------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", href);
    });
  });

  /* ------------------------------------------------------------
     Contact form → mailto
  ------------------------------------------------------------ */
  const connectForm = document.getElementById("connectForm");
  if (connectForm) {
    connectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fromEmail = (document.getElementById("fromEmail") || {}).value || "";
      const subject = (document.getElementById("subject") || {}).value || "";
      const message = (document.getElementById("message") || {}).value || "";
      if (!fromEmail.trim() || !subject.trim() || !message.trim()) return;

      const to = "wihuang5190@outlook.com";
      const body = `From: ${fromEmail}\n\n${message}`;
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      connectForm.reset();
    });
  }

  /* ------------------------------------------------------------
     Back-to-top button — passive scroll, rAF-throttled
  ------------------------------------------------------------ */
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduced ? "auto" : "smooth",
    });
    if (history.replaceState) {
      const cleanUrl = window.location.pathname + window.location.search;
      history.replaceState(null, "", cleanUrl);
    }
  });
})();
