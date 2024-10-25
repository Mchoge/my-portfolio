'use strict';



/**
 * navbar toggle
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

/**
 * toggle the navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}





/**
 * back to top & header
 */

const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// JavaScript for animating linear progress bars
document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = "0"; // Initially set to 0 for animation effect
    setTimeout(() => {
      bar.style.width = width; // Animate to the correct width
    }, 100); // Delay for animation
  });

  // JavaScript for animating circular progress bars
  const circularSkills = document.querySelectorAll(".circle-skill");

  circularSkills.forEach(skill => {
    const circle = skill.querySelector("svg circle:nth-child(2)");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    const percent = skill.getAttribute("data-percent");
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = circumference; // Start at 0 progress
    setTimeout(() => {
      circle.style.strokeDashoffset = offset; // Animate to the correct value
    }, 100); // Delay for animation
  });
});



// Form validation
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".contact-form form");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form from submitting automatically

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Validate email format (simple regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // If everything is correct, allow form submission
    form.submit();
  });
});


// Scroll animation for sections
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

// Highlight active section in navbar on scroll
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.href.includes(current)) {
      link.classList.add("active");
    }
  });
});

const form = document.querySelector(".contact-form form");
const confirmation = document.getElementById("form-confirmation");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Send the form data to Formspree
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      confirmation.classList.add("show");
      form.reset(); // Clear the form fields
      setTimeout(() => {
        confirmation.classList.remove("show");
      }, 3000);
    } else {
      alert("Oops! There was a problem submitting your form");
    }
  })
  .catch(error => alert("Error: " + error.message));
});
