// Custom cursor (desktop only)
let cursorDot = document.getElementById("cursor-dot");
let cursorRing = document.getElementById("cursor-ring");
if (!cursorDot) {
  cursorDot = document.createElement("div");
  cursorDot.id = "cursor-dot";
  cursorDot.className = "cursor-dot";
  cursorDot.setAttribute("aria-hidden", "true");
  document.body.prepend(cursorDot);
}
if (!cursorRing) {
  cursorRing = document.createElement("div");
  cursorRing.id = "cursor-ring";
  cursorRing.className = "cursor-ring";
  cursorRing.setAttribute("aria-hidden", "true");
  document.body.prepend(cursorRing);
}

const hoverTargets = "a, button, .project-card, .contact-item, .btn";

if (cursorDot && cursorRing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.body.classList.add("custom-cursor");
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const isHover = (el) => el && (el.matches(hoverTargets) || el.closest(hoverTargets));

  document.addEventListener("mouseover", (e) => {
    if (isHover(e.target)) cursorRing.classList.add("hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (!isHover(e.relatedTarget)) cursorRing.classList.remove("hover");
  });

  function animate() {
    dotX += (mouseX - dotX) * 0.95;
    dotY += (mouseY - dotY) * 0.95;
    ringX += (mouseX - ringX) * 0.85;
    ringY += (mouseY - ringY) * 0.85;
    const ringScale = cursorRing.classList.contains("hover") ? 1 : 0.5;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(${ringScale})`;
    requestAnimationFrame(animate);
  }
  animate();
}

// Current year
const currentYearEl = document.getElementById("currentYear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Fade-in sections on scroll
const sections = document.querySelectorAll(".section, .hero");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
);
sections.forEach((el) => sectionObserver.observe(el));

// Fade-up project cards with stagger (when they enter viewport)
const projectCards = document.querySelectorAll(".project-card");
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
projectCards.forEach((card) => cardObserver.observe(card));

// Copy email button
const copyEmailBtn = document.getElementById("copyEmailBtn");
const contactEmailDisplay = document.getElementById("contactEmailDisplay");
if (copyEmailBtn && contactEmailDisplay) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.getAttribute("data-email") || "";
    if (!email || email === "you@example.com") {
      contactEmailDisplay.textContent = "Set data-email on the button";
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      contactEmailDisplay.textContent = "Copied!";
      setTimeout(() => {
        contactEmailDisplay.textContent = "Click to copy";
      }, 2000);
    } catch {
      contactEmailDisplay.textContent = "Copy failed";
    }
  });
}

// Project cards: clicking the card (not a link) goes to details/case study page
document.querySelectorAll(".project-card").forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const detailsLink = card.querySelector('a[href*="case-study"]');
    const url = detailsLink ? detailsLink.getAttribute("href") : "case-study.html";
    if (url) window.location.href = url;
  });
});

// Smooth scroll for nav links and anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// When landing on contact.html#connect, scroll connect section to top of viewport
if (window.location.hash === "#connect") {
  const scrollConnectToTop = () => {
    const el = document.getElementById("connect");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, left: 0, behavior: "instant" });
    }
  };
  scrollConnectToTop();
  requestAnimationFrame(scrollConnectToTop);
  window.addEventListener("load", scrollConnectToTop);
}

// "Let's connect" form -> open mail client
const connectForm = document.getElementById("connectForm");
if (connectForm) {
  connectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fromEmail = document.getElementById("fromEmail").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fromEmail || !subject || !message) return;

    const to = "you@example.com"; // Replace with your real email (form mailto recipient)
    const bodyLines = [`From: ${fromEmail}`, "", message];
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    connectForm.reset();
  });
}


