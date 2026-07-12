(() => {
  "use strict";

  const data = window.SITE_DATA || {};
  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Footer year
  qa("#current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Theme switcher
  const themeButtons = qa(".theme-toggle");
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  };

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(next);
    });
  });

  // Mobile menu
  const navToggle = q(".nav-toggle");
  const nav = q(".main-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    qa("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  // Professional profile links
  const socialLabels = {
    github: "GitHub",
    linkedin: "LinkedIn",
    googleScholar: "Google Scholar",
    orcid: "ORCID",
    researchGate: "ResearchGate",
    youtube: "YouTube"
  };

  const heroSocial = q("#hero-social-links");
  if (heroSocial && data.profile) {
    Object.entries(socialLabels).forEach(([key, label]) => {
      const url = data.profile[key];
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = label;
      heroSocial.appendChild(a);
    });
  }

  // Research cards
  const researchGrid = q("#research-grid");
  if (researchGrid && Array.isArray(data.researchThemes)) {
    researchGrid.innerHTML = data.researchThemes.map((item) => `
      <article class="info-card reveal">
        <div class="card-icon" aria-hidden="true">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="mini-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </article>
    `).join("");
  }

  // Publications
  const publicationList = q("#publication-list");
  const renderPublications = (filter = "all") => {
    if (!publicationList || !Array.isArray(data.publications)) return;

    const items = data.publications.filter((item) => filter === "all" || item.type === filter);
    publicationList.innerHTML = items.map((item) => `
      <article class="publication-item reveal" data-type="${item.type}">
        <div class="publication-year">${item.year}</div>
        <div class="publication-body">
          <div class="publication-topline">
            <span class="status-badge ${statusClass(item.status)}">${item.status}</span>
            <span class="publication-type">${labelType(item.type)}</span>
          </div>
          <h3>${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>` : item.title}</h3>
          <p class="publication-authors">${item.authors}</p>
          <p class="publication-venue">${item.venue}</p>
          <p>${item.description}</p>
        </div>
      </article>
    `).join("");

    initReveal();
  };

  const statusClass = (status = "") => {
    const value = status.toLowerCase();
    if (value.includes("completed") || value.includes("published")) return "success";
    if (value.includes("preparation") || value.includes("review")) return "progress";
    return "neutral";
  };

  const labelType = (type) => ({
    thesis: "Thesis",
    manuscript: "Manuscript",
    conference: "Conference"
  }[type] || type);

  renderPublications();

  qa(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      qa(".filter-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderPublications(button.dataset.filter);
    });
  });

  // Projects
  const projectGrid = q("#project-grid");
  if (projectGrid && Array.isArray(data.projects)) {
    projectGrid.innerHTML = data.projects.map((item) => `
      <article class="project-card reveal">
        <div class="project-number">${item.number}</div>
        <h3>${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>` : item.title}</h3>
        <p>${item.description}</p>
        <div class="mini-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </article>
    `).join("");
  }

  // Timeline
  const timeline = q("#timeline");
  if (timeline && Array.isArray(data.timeline)) {
    timeline.innerHTML = data.timeline.map((item) => `
      <article class="timeline-item reveal">
        <div class="timeline-marker" aria-hidden="true"></div>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-content">
          <h3>${item.title}</h3>
          <p class="timeline-place">${item.place}</p>
          <p>${item.description}</p>
        </div>
      </article>
    `).join("");
  }

  // Notes
  const noteGrid = q("#note-grid");
  if (noteGrid && Array.isArray(data.notes)) {
    noteGrid.innerHTML = data.notes.map((item) => `
      <article class="note-card reveal">
        <p class="note-meta">${item.category} · ${item.date}</p>
        <h3>${item.link ? `<a href="${item.link}">${item.title}</a>` : item.title}</h3>
        <p>${item.excerpt}</p>
        ${item.link ? `<a class="text-link" href="${item.link}">Read note <span aria-hidden="true">→</span></a>` : `<span class="status-badge neutral">Coming soon</span>`}
      </article>
    `).join("");
  }

  // Contact actions
  const contactActions = q("#contact-actions");
  if (contactActions && data.profile) {
    const actions = [];
    if (data.profile.email) {
      actions.push(`<a class="button primary" href="mailto:${data.profile.email}">Email me</a>`);
    }
    if (data.profile.linkedin) {
      actions.push(`<a class="button secondary" href="${data.profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`);
    }
    if (data.profile.github) {
      actions.push(`<a class="button secondary" href="${data.profile.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`);
    }
    contactActions.innerHTML = actions.length
      ? actions.join("")
      : `<p class="setup-note">Add your email and profile links in <code>assets/js/site-data.js</code>.</p>`;
  }

  // CV contact details
  const cvContact = q("#cv-contact");
  if (cvContact && data.profile) {
    const items = [];
    if (data.profile.email) items.push(`<a href="mailto:${data.profile.email}">${data.profile.email}</a>`);
    if (data.profile.website) items.push(`<a href="${data.profile.website}">${data.profile.website.replace(/^https?:\/\//, "")}</a>`);
    if (data.profile.linkedin) items.push(`<a href="${data.profile.linkedin}">LinkedIn</a>`);
    if (data.profile.github) items.push(`<a href="${data.profile.github}">GitHub</a>`);
    if (data.profile.location) items.push(`<span>${data.profile.location}</span>`);
    cvContact.innerHTML = items.join("<span aria-hidden='true'>•</span>");
  }

  // Smooth scrolling for same-page anchors
  qa('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = q(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Back to top
  const backToTop = q(".back-to-top");
  if (backToTop) {
    const updateButton = () => backToTop.classList.toggle("visible", window.scrollY > 700);
    window.addEventListener("scroll", updateButton, { passive: true });
    updateButton();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Reveal animation
  function initReveal() {
    const elements = qa(".reveal:not(.reveal-ready)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible", "reveal-ready"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
  }

  initReveal();
})();
