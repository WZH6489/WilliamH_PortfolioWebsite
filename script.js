/* William Huang — Portfolio
   Dependency-free interactions: reveals, header, nav, transitions.
   ------------------------------------------------------------------ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  var yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.documentElement.style.overflow = "";
    };
    var openNav = function () {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.documentElement.style.overflow = "hidden";
    };
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeNav();
      else openNav();
    });
    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* Header: hairline once scrolled, hide on scroll down / show on up */
  var head = document.querySelector(".site-head");
  if (head) {
    var lastY = window.scrollY;
    var onScroll = function () {
      var y = window.scrollY;
      head.classList.toggle("is-scrolled", y > 12);
      if (!reduceMotion) {
        var navOpen = nav && nav.classList.contains("is-open");
        if (y > lastY && y > 220 && !navOpen) head.classList.add("is-hidden");
        else head.classList.remove("is-hidden");
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* Page fade transition on internal navigation */
  if (!reduceMotion) {
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      var href = a.getAttribute("href");
      if (
        !href ||
        href.charAt(0) === "#" ||
        a.target === "_blank" ||
        a.hasAttribute("download") ||
        href.indexOf("mailto:") === 0 ||
        href.indexOf("tel:") === 0 ||
        /^https?:\/\//.test(href) ||
        /\.pdf($|\?)/.test(href) ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }
      e.preventDefault();
      document.body.classList.add("is-leaving");
      window.setTimeout(function () {
        window.location.href = href;
      }, 200);
    });

    /* Restore state when the page is served from bfcache */
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.body.classList.remove("is-leaving");
    });
  }

  /* Back-to-top button */
  var btt = document.createElement("button");
  btt.type = "button";
  btt.className = "back-to-top";
  btt.setAttribute("aria-label", "Back to top");
  btt.innerHTML =
    '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 12V2"/><path d="M2.5 6.5L7 2l4.5 4.5"/>' +
    "</svg>";
  document.body.appendChild(btt);

  var SHOW_AFTER = 480;
  var ticking = false;
  var shown = false;
  var tick = function () {
    var next = window.scrollY > SHOW_AFTER;
    if (next !== shown) {
      shown = next;
      btt.classList.toggle("is-shown", shown);
    }
    ticking = false;
  };
  tick();
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(tick);
        ticking = true;
      }
    },
    { passive: true }
  );

  btt.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (history.replaceState) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
})();
