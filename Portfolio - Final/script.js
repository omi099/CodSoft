document.addEventListener("DOMContentLoaded", () => {
  // Data for Projects Section
  const projectsData = [
    {
      title: "E-commerce Website",
      description:
        "A full-featured e-commerce platform with user authentication, product browsing, shopping cart, and secure checkout.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB"],
      imageUrl: "./assets/images/ecomm.jpg",
      liveUrl: "https://your-e-commerce-site.com",
      githubUrl: "https://github.com/omi099/ecommerce-website",
    },
    {
      title: "Social Media Dashboard",
      description:
        "A social media dashboard that allows users to connect their social media accounts and view analytics, schedule posts, and track engagement.",
      technologies: ["Angular", "Python", "Django", "PostgreSQL"],
      imageUrl: "./assets/images/social-media.png",
      liveUrl: "https://your-social-dashboard.com",
      githubUrl: "https://github.com/omi099/social-media-dashboard",
    },
    {
      title: "Portfolio Website",
      description:
        "My personal portfolio website, showcasing my skills, projects, and experience.",
      technologies: ["HTML", "CSS", "JavaScript"],
      imageUrl: "./assets/images/portfolio-project.png",
      liveUrl: "https://omi.com",
      githubUrl: "https://github.com/omi099/portfolio",
    },
    {
      title: "Real-time Chat Application",
      description:
        "A real-time chat application that allows users to communicate with each other in real-time using WebSockets.",
      technologies: ["React", "Node.js", "Express.js", "Socket.IO"],
      imageUrl: "./assets/images/chat-app.png",
      liveUrl: "https://your-chat-app.com",
      githubUrl: "https://github.com/omi099/real-time-chat-app",
    },
    {
      title: "Weather App",
      description:
        "A weather application that displays the current weather conditions and forecast for a user-specified location.",
      technologies: ["JavaScript", "HTML", "CSS", "OpenWeatherMap API"],
      imageUrl: "./assets/images/weather-app.png",
      liveUrl: "https://your-weather-app.com",
      githubUrl: "https://github.com/omi099/weather-app",
    },
    {
      title: "Blog CMS",
      description:
        "A content management system (CMS) for a blog, allowing users to create, edit, and publish blog posts.",
      technologies: ["Vue.js", "Java", "Spring Boot", "MySQL"],
      imageUrl: "./assets/images/blog-cms.png",
      liveUrl: "https://your-blog-cms.com",
      githubUrl: "https://github.com/omi099/blog-cms",
    },
  ];

  //Themes

  // const themeToggle = document.getElementById("theme-toggle");
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  applyTheme(currentTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.querySelector(".sun-icon").style.display = "inline-block";
      themeToggle.querySelector(".moon-icon").style.display = "none";
    } else {
      document.body.classList.remove("dark-theme");
      themeToggle.querySelector(".sun-icon").style.display = "none";
      themeToggle.querySelector(".moon-icon").style.display = "inline-block";
    }
  }

  //Hamburger

  const hamburgerMenu = document.getElementById("hamburger-menu");
  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("open");
    const isExpanded = hamburgerMenu.getAttribute("aria-expanded") === "true";
    hamburgerMenu.setAttribute("aria-expanded", !isExpanded);

    const navlinks = document.querySelector(".nav-links");
    navlinks.classList.toggle("active");
    const nav = document.querySelector("nav");
    nav.classList.toggle("mobile-nav");
  });

  // Smooth Scrolling for the navigation links
  const navLinksContainer = document.querySelector(".nav-links");

  navLinksContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      const targetId = event.target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
      const currentActiveLink = document.querySelector(".nav-links .active");
      if (currentActiveLink) {
        currentActiveLink.classList.remove("active");
      }
      event.target.classList.add("active");
    }
  });

  //Highlight the current section
  const sections = document.querySelectorAll("section");
  const allNavLinks = document.querySelectorAll(".nav-links li");

  const observerOptions = {
    root: null,
    rootMargin: "-100px 0px -200px 0px",
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (entry.isIntersecting) {
        document
          .querySelector(".nav-links a.active")
          .classList.remove("active");
        navLink.classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const projectContainer = document.getElementById("projects-container");

  projectsData.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
    <img src="${project.imageUrl}" alt="${project.title}" class="project-image">
    <div class="project-info">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <ul class="project-technologies">
        ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
      </ul>
      <div class="project-links">
        <a href="${
          project.liveUrl
        }" target="_blank" rel="noopener noreferrer">Live Demo</a>
        <a href="${
          project.githubUrl
        }" target="_blank" rel="noopener noreferrer">Github</a>
      </div>
    </div>
    `;
    projectContainer.appendChild(projectCard);
  });

  // Form Validations

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.trim() === "" || email.trim === "" || message.trim === "") {
      alert("Please fill in all fields.");
      return;
    }

    // const emailRegex = /^[^\s@]+@[^\s@]+\/[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }

    if (message.trim().length < 10) {
      alert("Please enter a message that is at least 10 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    fetch("/server.js", {
      method: "GET",
      // body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Message sent successfully!");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "There was an error sending your message. Please try again later."
        );
      });
  });
});
