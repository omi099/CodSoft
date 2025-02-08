const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navLinksLi = document.querySelectorAll(".nav-links li");
const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");

// Hamburger Event Handling

burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");

  navLinksLi.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  burger.classList.toggle("toggle");
});

// Smmooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Contact Submission

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const honeypot = document.getElementById("honeypot").value;

    if (!name) {
      displayError("name", "Name is required.");
      isValid = false;
    }

    if (!email) {
      displayError("email", "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      displayError("email", "Invalid email format.");
      isValid = false;
    }

    if (!message) {
      displayError("message", "Message is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setTimeout(() => {
      displayFormResponse("success", "Thank you! Your message has been sent.");
      contactForm.reset();
    }, 500);
  });

  function displayError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => (element.textContent = ""));
  }

  function displayFormResponse(type, message) {
    formResponse.textContent = message;
    formResponse.className = `form-response ${type}`;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
