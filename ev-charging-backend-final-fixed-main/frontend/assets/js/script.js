'use strict';

/**
 * #PRELOADING
 */
const loadElement = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  loadElement.classList.add("loaded");
  handleScroll(); // run scroll effects once on load
});

/**
 * #MOBILE NAVBAR TOGGLE
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
};

navToggler.addEventListener("click", toggleNavbar);

/**
 * #SCROLL HANDLING (Header + Back To Top + Reveal)
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-go-top-btn]");
const revealElements = document.querySelectorAll("[data-reveal]");

const handleScroll = () => {
  // Sticky header & back-to-top
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }

  // Reveal elements
  for (let i = 0; i < revealElements.length; i++) {
    const el = revealElements[i];
    if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
      el.classList.add("revealed");
    } else {
      el.classList.remove("revealed");
    }
  }
};

// Debounced scroll listener
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 10);
});

/**
 * #FEEDBACK FORM SUBMISSION
 */
const feedbackForm = document.getElementById('feedback-form');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('feedback-email').value;
    const message = document.getElementById('feedback-message').value;

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
      });

      const result = await response.json();
      alert(result.message || (result.success ? 'Feedback submitted!' : 'Failed to submit feedback.'));

      if (result.success) {
        feedbackForm.reset();
      }
    } catch (err) {
      alert('An error occurred. Feedback not submitted.');
      console.error(err);
    }
  });
}
