// Current year
const currentYearEl = document.getElementById("currentYear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// Fade-in sections on scroll
const sections = document.querySelectorAll(".section, .hero");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
);
sections.forEach((el) => observer.observe(el));

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

// When landing on index.html#connect (e.g. from "Contact me"), scroll to Let's connect
if (window.location.hash === "#connect") {
  const connectSection = document.getElementById("connect");
  if (connectSection) {
    connectSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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


