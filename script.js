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
    "services.more": "Mehr erfahren →",
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
    "services.more": "Learn more →",
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

let translations;
try {
  translations = JSON.parse(i18nJson);
} catch {
  console.error('i18n JSON konnte nicht geparst werden. Fallback auf leeres Objekt.');
  translations = { de: {}, en: {} };
}
const DEFAULT_LANG = 'de';
const SUPPORTED_LANGS = ['de', 'en'];

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
const storedLang = localStorage.getItem('lang');
let currentLang = SUPPORTED_LANGS.includes(storedLang) ? storedLang : DEFAULT_LANG;
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
  setupServicePanels();
  setupTerminal();
  setTimeout(() => nameEl?.classList.add('ready'), 120);
  startTypewriter();
});

/* ── Service slide-in panels ─────────────────────── */

const servicePanelData = {
  de: {
    s1: {
      icon: '🏆',
      title: 'QA Leadership',
      body: `
        <p>Als QA Lead begleite ich Teams vom ersten Planungsmeeting bis zum Release-Freeze – mit klarer Strategie, messbaren Zielen und einer Fehlerkultur, die Qualität als gemeinsame Verantwortung versteht.</p>
        <ul>
          <li>Aufbau und Skalierung von QA-Teams</li>
          <li>Definition von Teststrategien und DoD-Kriterien</li>
          <li>Coaching und Mentoring von Junior Testern</li>
          <li>Einführung risikobasierter Testansätze</li>
          <li>KPI-gestützte Qualitätsberichterstattung</li>
        </ul>
      `
    },
    s2: {
      icon: '📊',
      title: 'Test Management',
      body: `
        <p>Strukturiertes Test Management sorgt dafür, dass Releases termingerecht und qualitätsgesichert ausgeliefert werden – ohne Überraschungen im letzten Moment.</p>
        <ul>
          <li>Test- und Releaseplanung nach Agile und Waterfall</li>
          <li>Priorisierung von Testfällen nach Risiko und Impact</li>
          <li>Integration in CI/CD-Pipelines</li>
          <li>Stakeholder-Reporting und Eskalationsmanagement</li>
          <li>Defect Lifecycle Management via Jira</li>
        </ul>
      `
    },
    s3: {
      icon: '🔬',
      title: 'Quality Consulting',
      body: `
        <p>Ich analysiere bestehende Prozesse und zeige pragmatische Verbesserungen auf – ohne großen Overhead, mit nachhaltigem Effekt auf Produkt- und Teamqualität.</p>
        <ul>
          <li>Prozess-Audit und Gap-Analyse</li>
          <li>Einführung von Qualitätsmetriken und Dashboards</li>
          <li>Test-Automatisierungsberatung</li>
          <li>Exploratory-Testing-Frameworks</li>
          <li>Wissenssicherung und Dokumentation</li>
        </ul>
      `
    }
  },
  en: {
    s1: {
      icon: '🏆',
      title: 'QA Leadership',
      body: `
        <p>As a QA Lead I guide teams from initial planning through release freeze — with clear strategy, measurable goals and a quality culture that treats testing as a shared responsibility.</p>
        <ul>
          <li>Building and scaling QA teams</li>
          <li>Defining test strategies and Definition of Done criteria</li>
          <li>Coaching and mentoring junior testers</li>
          <li>Introducing risk-based testing approaches</li>
          <li>KPI-driven quality reporting</li>
        </ul>
      `
    },
    s2: {
      icon: '📊',
      title: 'Test Management',
      body: `
        <p>Structured test management ensures releases ship on time with quality baked in — no last-minute surprises.</p>
        <ul>
          <li>Test and release planning (Agile and Waterfall)</li>
          <li>Prioritization of test cases by risk and impact</li>
          <li>Integration into CI/CD pipelines</li>
          <li>Stakeholder reporting and escalation management</li>
          <li>Defect lifecycle management via Jira</li>
        </ul>
      `
    },
    s3: {
      icon: '🔬',
      title: 'Quality Consulting',
      body: `
        <p>I analyse existing processes and identify pragmatic improvements — low overhead, lasting impact on product and team quality.</p>
        <ul>
          <li>Process audit and gap analysis</li>
          <li>Introducing quality metrics and dashboards</li>
          <li>Test automation advisory</li>
          <li>Exploratory testing frameworks</li>
          <li>Knowledge management and documentation</li>
        </ul>
      `
    }
  }
};

function setupServicePanels() {
  const overlay = document.getElementById('panelOverlay');
  const panel = document.getElementById('servicePanel');
  const panelClose = document.getElementById('panelClose');
  const panelIcon = document.getElementById('panelIcon');
  const panelTitle = document.getElementById('panelTitle');
  const panelBody = document.getElementById('panelBody');

  function openPanel(serviceKey) {
    const data = servicePanelData[currentLang]?.[serviceKey] || servicePanelData.de[serviceKey];
    if (!data) {
      console.error(`Unbekannter Service-Schlüssel: "${serviceKey}"`);
      return;
    }
    panelIcon.textContent = data.icon;
    panelTitle.textContent = data.title;
    panelBody.innerHTML = data.body;
    overlay.classList.add('open');
    panel.classList.add('open');
    panel.removeAttribute('aria-hidden');
    panelClose.focus();
  }

  function closePanel() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.service-trigger').forEach((card) => {
    card.addEventListener('click', () => openPanel(card.dataset.service));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPanel(card.dataset.service);
      }
    });
  });

  overlay.addEventListener('click', closePanel);
  panelClose.addEventListener('click', closePanel);
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });
}

/* ── Terminal Easter Egg ─────────────────────────── */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const terminalStrings = {
  de: {
    welcome: '🚀 Willkommen im Matthias-Kahlert-Terminal!',
    helpHint: "Tippe <span class=\"t-accent\">help</span> für verfügbare Befehle.",
    unknown: (cmd) => `Unbekannter Befehl: ${escapeHtml(cmd)}. Tippe 'help'.`,
    help: `<span class="t-accent">Verfügbare Befehle:</span>
  help        Diese Hilfe anzeigen
  whoami      Über Matthias Kahlert
  skills      Technische Fähigkeiten
  experience  Berufserfahrung
  contact     Kontaktdaten
  clear       Terminal leeren
  exit        Terminal schließen`,
    whoami: `<span class="t-accent">Matthias Kahlert</span>
  Senior QA Engineer / QA Lead / Test Manager
  10+ Jahre Erfahrung · Games Industry · Release Management
  Fokus: Exploratory Testing, API Testing, Qualitätssicherung`,
    skills: `<span class="t-accent">[ Skills ]</span>
  JavaScript  ████████░░  80%
  SQL         ███████░░░  70%
  Python      █████░░░░░  50%
  Selenium    ████████░░  80%
  Jira        █████████░  90%
  CI/CD       ███████░░░  70%`,
    experience: `<span class="t-accent">[ Erfahrung ]</span>
  ● Senior QA Engineer  — Games Industry
  ● QA Lead             — Teameinstieg & Prozessgestaltung
  ● Test Manager        — Release Management & Stakeholder`,
    contact: `<span class="t-accent">[ Kontakt ]</span>
  LinkedIn: linkedin.com/in/matthias-kahlert/
  Tipp: Drücke Escape oder tippe 'exit' zum Schließen.`
  },
  en: {
    welcome: '🚀 Welcome to the Matthias Kahlert Terminal!',
    helpHint: "Type <span class=\"t-accent\">help</span> for available commands.",
    unknown: (cmd) => `Unknown command: ${escapeHtml(cmd)}. Type 'help'.`,
    help: `<span class="t-accent">Available commands:</span>
  help        Show this help
  whoami      About Matthias Kahlert
  skills      Technical skills
  experience  Work experience
  contact     Contact details
  clear       Clear terminal
  exit        Close terminal`,
    whoami: `<span class="t-accent">Matthias Kahlert</span>
  Senior QA Engineer / QA Lead / Test Manager
  10+ years experience · Games Industry · Release Management
  Focus: Exploratory Testing, API Testing, Quality Assurance`,
    skills: `<span class="t-accent">[ Skills ]</span>
  JavaScript  ████████░░  80%
  SQL         ███████░░░  70%
  Python      █████░░░░░  50%
  Selenium    ████████░░  80%
  Jira        █████████░  90%
  CI/CD       ███████░░░  70%`,
    experience: `<span class="t-accent">[ Experience ]</span>
  ● Senior QA Engineer  — Games Industry
  ● QA Lead             — Team building & process design
  ● Test Manager        — Release Management & Stakeholders`,
    contact: `<span class="t-accent">[ Contact ]</span>
  LinkedIn: linkedin.com/in/matthias-kahlert/
  Tip: Press Escape or type 'exit' to close.`
  }
};

function getTerminalStr() {
  return terminalStrings[currentLang] || terminalStrings.de;
}

function setupTerminal() {
  const overlay = document.getElementById('terminalOverlay');
  const terminal = document.getElementById('terminal');
  const terminalClose = document.getElementById('terminalClose');
  const outputEl = document.getElementById('terminalOutput');
  const inputEl = document.getElementById('terminalInput');

  const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiIndex = 0;

  function printLine(html) {
    const line = document.createElement('div');
    line.innerHTML = html;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function openTerminal() {
    const s = getTerminalStr();
    overlay.classList.add('open');
    terminal.classList.add('open');
    terminal.removeAttribute('aria-hidden');
    outputEl.innerHTML = '';
    printLine(`<span class="t-accent">${escapeHtml(s.welcome)}</span>`);
    printLine(s.helpHint);
    inputEl.focus();
  }

  function closeTerminal() {
    overlay.classList.remove('open');
    terminal.classList.remove('open');
    terminal.setAttribute('aria-hidden', 'true');
    konamiIndex = 0;
  }

  function handleCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) {
      return;
    }
    const s = getTerminalStr();
    printLine(`<span class="t-accent">$</span> ${escapeHtml(raw.trim())}`);
    if (cmd === 'clear') {
      outputEl.innerHTML = '';
      return;
    }
    if (cmd === 'exit') {
      closeTerminal();
      return;
    }
    if (Object.prototype.hasOwnProperty.call(s, cmd) && typeof s[cmd] === 'string') {
      printLine(s[cmd]);
    } else {
      printLine(`<span class="t-err">${s.unknown(raw.trim())}</span>`);
    }
  }

  inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      handleCommand(val);
    }
  });

  document.addEventListener('keydown', (event) => {
    const expected = KONAMI[konamiIndex];
    if (event.key === expected) {
      konamiIndex += 1;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        openTerminal();
      }
    } else {
      konamiIndex = event.key === KONAMI[0] ? 1 : 0;
    }
  });

  terminal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeTerminal();
    }
  });

  overlay.addEventListener('click', closeTerminal);
  terminalClose.addEventListener('click', closeTerminal);
}
