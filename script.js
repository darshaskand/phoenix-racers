/* =====================================================
   PHOENIX RACERS - Formula 1 in Schools
   script.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  const closeMenu = () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (mobile)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- Navbar scroll effect + active link ---------- */
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollTopBtn = document.getElementById("scroll-top");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    scrollTopBtn.classList.toggle("show", window.scrollY > 400);

    // Highlight active nav link
    let current = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Countdown Timer ---------- */
  const targetDate = new Date("2026-10-31T09:00:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const timerEl = document.getElementById("countdown");
  const doneEl = document.getElementById("countdown-done");

  const pad = (n) => String(n).padStart(2, "0");

  const updateCountdown = () => {
    const diff = targetDate - Date.now();

    if (diff <= 0) {
      timerEl.hidden = true;
      doneEl.hidden = false;
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  };

  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  /* ---------- Animated stat counters ---------- */
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  };

  /* ---------- Scroll reveal + counter trigger ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Trigger counters when the stats section appears
          entry.target
            .querySelectorAll(".stat-number[data-count]")
            .forEach((el) => {
              if (!el.dataset.done) {
                animateCount(el);
                el.dataset.done = "true";
              }
            });
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Car Design Carousel ---------- */
  const track = document.getElementById("carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dotsContainer = document.getElementById("carousel-dots");
  let currentIndex = 0;
  let autoTimer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAuto();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAuto();
  });

  const startAuto = () => {
    autoTimer = setInterval(nextSlide, 3000);
  };
  const resetAuto = () => {
    clearInterval(autoTimer);
    startAuto();
  };
  startAuto();

  // Pause auto-scroll on hover
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoTimer));
  carousel.addEventListener("mouseleave", startAuto);

  /* ---------- Lightbox (enlarge on click) ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll(".slide-img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxContent.textContent = img.textContent;
      lightboxContent.style.background = img.style.background;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  };
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Contact Form (validation + Formspree) ---------- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const formSuccess = document.getElementById("form-success");
    const formError = document.getElementById("form-error");
    const submitBtn = document.getElementById("submit-btn");
    const sendAnother = document.getElementById("send-another");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validators = {
      name: (v) => (v.trim() ? "" : "Please enter your full name."),
      email: (v) =>
        !v.trim()
          ? "Please enter your email address."
          : emailRegex.test(v.trim())
          ? ""
          : "Please enter a valid email address.",
      organization: (v) =>
        v.trim() ? "" : "Please enter your school or organization.",
      subject: (v) => (v.trim() ? "" : "Please enter a subject."),
      message: (v) => (v.trim() ? "" : "Please enter a message."),
    };

    const setFieldError = (field, message) => {
      const group = field.closest(".form-group");
      const errorEl = document.getElementById(`${field.id}-error`);
      group.classList.toggle("invalid", Boolean(message));
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (errorEl) errorEl.textContent = message;
    };

    const validateField = (field) => {
      const validate = validators[field.name];
      if (!validate) return true;
      const message = validate(field.value);
      setFieldError(field, message);
      return !message;
    };

    // Live validation once a field has been interacted with
    Object.keys(validators).forEach((name) => {
      const field = contactForm.elements[name];
      if (!field) return;
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("invalid")) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      formError.hidden = true;

      // Validate all fields
      let firstInvalid = null;
      let allValid = true;
      Object.keys(validators).forEach((name) => {
        const field = contactForm.elements[name];
        if (!validateField(field)) {
          allValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!allValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.classList.add("loading");

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          contactForm.hidden = true;
          formSuccess.hidden = false;
          formSuccess.setAttribute("tabindex", "-1");
          formSuccess.focus();
          contactForm.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        formError.hidden = false;
      } finally {
        submitBtn.classList.remove("loading");
      }
    });

    if (sendAnother) {
      sendAnother.addEventListener("click", () => {
        formSuccess.hidden = true;
        contactForm.hidden = false;
        contactForm.elements.name.focus();
      });
    }
  }

  /* ---------- Background speed particles ---------- */
  const particlesContainer = document.getElementById("particles");
  const PARTICLE_COUNT = 18;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.top = `${Math.random() * 100}%`;
    p.style.width = `${40 + Math.random() * 120}px`;
    p.style.animationDuration = `${3 + Math.random() * 5}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    p.style.opacity = `${0.2 + Math.random() * 0.4}`;
    particlesContainer.appendChild(p);
  }
});
