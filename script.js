function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const body = document.body;
const moonIcon = "🌙";
const sunIcon = "☀️";

function applyTheme(theme) {
  if (theme === "light") {
    body.classList.add("light-mode");
    if (themeToggle) themeToggle.textContent = moonIcon;
    if (themeToggleMobile) themeToggleMobile.textContent = moonIcon;
  } else {
    body.classList.remove("light-mode");
    if (themeToggle) themeToggle.textContent = sunIcon;
    if (themeToggleMobile) themeToggleMobile.textContent = sunIcon;
  }
}

function toggleTheme() {
  const newTheme = body.classList.contains("light-mode") ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}

// Check for saved theme in localStorage and apply it
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }
});

// Scroll Animations
const sections = document.querySelectorAll("section");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Staggered animation for project cards
const projectCards = document.querySelectorAll(
  "#projects .details-container.color-container"
);

const cardObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 150}ms`;
        entry.target.classList.remove("hidden");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

projectCards.forEach((card) => {
  card.classList.add("hidden");
  cardObserver.observe(card);
});
