window.onload = function () {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.08) {
          entry.target.classList.add("visible");
        }
        else  {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: [0.05, 0.1, 0.2, 0.5, 1] }
  );

  elements.forEach((el) => observer.observe(el));
};



// Sticky Navigation
let nav = document.querySelector("nav");
let navLogo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  navLogo.style.color = "#4070f4";
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    nav.style.backdropFilter = "blur(10px)";
    nav.style.webkitBackdropFilter = "blur(10px)";
    nav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  } else {
    nav.classList.remove("sticky");
    nav.style.backgroundColor = "transparent";
    nav.style.backdropFilter = "none";
    nav.style.webkitBackdropFilter = "none";
    nav.style.boxShadow = "none";
  }
});

// Mobile Menu Toggle
const navLinks = document.querySelector(".nav-links");
const navbarToggler = document.getElementById("navbar-toggler");

navbarToggler.addEventListener("click", () => {
  // Toggle menu button animation
  navbarToggler.classList.toggle("collapsed");

  // Toggle navigation menu
  navLinks.classList.toggle("active");

  // Prevent scrolling when menu is open
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "auto";

  // Add animation delay to each nav item
  const navItems = document.querySelectorAll(".nav-links li");
  navItems.forEach((item, index) => {
    if (navLinks.classList.contains("active")) {
      item.style.animationDelay = `${index * 0.1}s`;
    } else {
      item.style.animationDelay = "0s";
    }
  });
});

// Close menu when clicking nav links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navbarToggler.classList.add("collapsed");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Contact Form Validation
document.querySelector(".contact-form form").addEventListener("submit", function (e) {
  const captchaCheckbox = document.getElementById("human-check");
  if (!captchaCheckbox.checked) {
    e.preventDefault();
    alert("Please confirm you are human by checking the captcha box.");
  }
});

// Set initial nav-link color before scroll
document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.style.color = "#4070f4";
});

// Dynamically update the year in the footer
document.addEventListener("DOMContentLoaded", () => {
    const stampElement = document.getElementById("stamp");
    if (stampElement) {
        stampElement.textContent = new Date().getFullYear();
    }
});
