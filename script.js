const i18nJson = `
{
  "de": {
    "nav.about": "Über mich",
    "nav.skills": "Skills",
    "nav.services": "Services",
    "nav.projects": "Projekte",
    "nav.experience": "Erfahrung",
    "nav.contact": "Kontakt",
    "hero.eyebrow": "Portfolio",
    "hero.text": "Senior QA Engineer mit 10+ Jahren Erfahrung in QA, Games Industry und Release Management.",
    "hero.cta": "Projekte ansehen",
    "about.title": "Über mich",
    "about.text": "Ich unterstütze Teams dabei, Qualität frühzeitig in Produkte zu integrieren – mit Fokus auf Exploratory Testing, API Testing und strukturierte Qualitätssicherung.",
    "skills.title": "Skills",
    "services.title": "Services",
    "services.s1.title": "QA Leadership",
    "services.s1.text": "Aufbau von QA-Prozessen, Teststrategie und Team-Guidance.",
    "services.s2.title": "Test Management",
    "services.s2.text": "Planung, Priorisierung und Absicherung von Releases.",
    "services.s3.title": "Quality Consulting",
    "services.s3.text": "Audit bestehender Prozesse und Einführung nachhaltiger Qualitätsmetriken.",
    "projects.title": "Projekte",
    "projects.p1.title": "Release Quality Dashboard",
    "projects.p1.text": "Transparente Qualitätsmetriken für produktionsreife Releases.",
    "projects.p2.title": "API Test Automation",
    "projects.p2.text": "Automatisierte API-Regression mit stabilem CI-Feedback.",
    "projects.p3.title": "Exploratory Testing Framework",
    "projects.p3.text": "Leitfaden und Sessions für effizientes, risikobasiertes Testen.",
    "experience.title": "Erfahrung",
    "experience.e1": "Verantwortlich für End-to-End Qualitätssicherung in der Games Industry.",
    "experience.e2": "Leitung von QA-Initiativen, Coaching und Prozessverbesserung.",
    "experience.e3": "Release Management, Testplanung und Stakeholder-Kommunikation.",
    "contact.title": "Kontakt",
    "contact.text": "Lass uns über Qualität, Testing und stabile Releases sprechen.",
    "contact.cta": "Kontakt aufnehmen"
  },
  "en": {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "hero.eyebrow": "Portfolio",
    "hero.text": "Senior QA Engineer with 10+ years of experience in QA, games industry and release management.",
    "hero.cta": "View projects",
    "about.title": "About",
    "about.text": "I help teams build quality into products early, with a focus on exploratory testing, API testing and sustainable quality assurance.",
    "skills.title": "Skills",
    "services.title": "Services",
    "services.s1.title": "QA Leadership",
    "services.s1.text": "Building QA processes, test strategy and team guidance.",
    "services.s2.title": "Test Management",
    "services.s2.text": "Planning, prioritization and release quality coverage.",
    "services.s3.title": "Quality Consulting",
    "services.s3.text": "Auditing existing workflows and introducing practical quality metrics.",
    "projects.title": "Projects",
    "projects.p1.title": "Release Quality Dashboard",
    "projects.p1.text": "Transparent quality metrics for production-ready releases.",
    "projects.p2.title": "API Test Automation",
    "projects.p2.text": "Automated API regression with reliable CI feedback.",
    "projects.p3.title": "Exploratory Testing Framework",
    "projects.p3.text": "Playbook and sessions for efficient risk-based testing.",
    "experience.title": "Experience",
    "experience.e1": "Responsible for end-to-end quality assurance in the games industry.",
    "experience.e2": "Led QA initiatives, coaching and process improvements.",
    "experience.e3": "Release management, test planning and stakeholder communication.",
    "contact.title": "Contact",
    "contact.text": "Let's talk about quality, testing and stable releases.",
    "contact.cta": "Get in touch"
  }
}
`;

const translations = JSON.parse(i18nJson);
const DEFAULT_LANG = 'de';

let nameEl;
let roleEl;
let themeToggle;
let langToggle;
let navToggle;
let navMenu;

const rolesByLang = {
  de: ['Senior QA Engineer', 'QA Leitung', 'Testmanager'],
  en: ['Senior QA Engineer', 'QA Lead', 'Test Manager']
};

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentLang = localStorage.getItem('lang') || DEFAULT_LANG;
let currentRoles = rolesByLang[currentLang];
let typewriterTimeoutId;

function typeRole() {
  const role = currentRoles[roleIndex];
  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }
  const next = role.slice(0, charIndex);
  roleEl.textContent = next;

  if (!isDeleting && charIndex === role.length) {
    isDeleting = true;
    typewriterTimeoutId = setTimeout(typeRole, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % currentRoles.length;
  }

  typewriterTimeoutId = setTimeout(typeRole, isDeleting ? 55 : 95);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function t(key) {
  return translations[currentLang]?.[key] || key;
}

function applyLanguage() {
  currentRoles = rolesByLang[currentLang] || rolesByLang[DEFAULT_LANG];
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  localStorage.setItem('lang', currentLang);
  langToggle.textContent = currentLang === 'de' ? 'EN' : 'DE';
  langToggle.setAttribute(
    'aria-label',
    currentLang === 'de' ? 'Zu Englisch wechseln' : 'Switch to German'
  );
}

function resetTypewriter() {
  clearTimeout(typewriterTimeoutId);
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  if (roleEl) {
    roleEl.textContent = '';
  }
}

function startTypewriter() {
  resetTypewriter();
  typeRole();
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
}

function setupMouseReactiveBg() {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  nameEl = document.getElementById('heroName');
  roleEl = document.getElementById('roleTypewriter');
  themeToggle = document.getElementById('themeToggle');
  langToggle = document.getElementById('langToggle');
  navToggle = document.querySelector('.nav-toggle');
  navMenu = document.getElementById('nav-menu');

  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  langToggle?.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    applyLanguage();
    startTypewriter();
  });

  const preferredTheme = localStorage.getItem('theme') || 'light';
  applyTheme(preferredTheme);
  applyLanguage();
  setupReveal();
  setupMouseReactiveBg();
  setTimeout(() => nameEl?.classList.add('ready'), 120);
  startTypewriter();
});
