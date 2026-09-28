(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- i18n ---------------- */
  var EN = {
    "skip": "Skip to content",
    "nav.features": "Features",
    "nav.how": "How it works",
    "nav.pricing": "Pricing",
    "nav.login": "Log in",
    "cta.demo": "Request a demo",
    "cta.how": "See how it works",
    "hero.pill": "Your recruiter on WhatsApp, always online",
    "hero.title": 'Hire better.<br><span class="marker">Faster.</span>',
    "hero.lead": "Our AI assistant chats with every candidate on WhatsApp, screens them and books the interview. You just get to meet the best ones.",
    "hero.perk1": "Less busywork",
    "hero.perk2": "More candidates",
    "hero.perk3": "Better hires",
    "chat.name": "AI Assistant",
    "chat.online": "Online",
    "chat.placeholder": "Type a message…",
    "sticker.docs": "ID verified",
    "sticker.interview": "Interview booked<br><small>Tue · 10:30</small>",
    "scribble.hero": "All without lifting a finger!",
    "mq.1": "Instant replies",
    "mq.2": "Qualified candidates",
    "mq.3": "Verified documents",
    "mq.4": "Interviews booked",
    "mq.5": "Fewer no-shows",
    "stats.1": "more interviews booked",
    "stats.2": "less time on repetitive tasks",
    "stats.3": "fewer candidates who don't show up",
    "compare.title": 'Sound <span class="marker">familiar</span>?',
    "compare.beforeTitle": "What's holding you back",
    "compare.b1": "Slow replies",
    "compare.b1d": "By the time you answer, the candidate already took another offer.",
    "compare.b2": "Overwhelmed recruiters",
    "compare.b2d": "Hundreds of messages, the same questions, all day long.",
    "compare.b3": "High drop-off",
    "compare.b3d": "Candidates go cold and leave halfway through.",
    "compare.afterTitle": "With Qualent, it just flows",
    "compare.a1": "Instant replies",
    "compare.a1d": "Every candidate hears back in seconds, at any hour.",
    "compare.a2": "Qualified candidates",
    "compare.a2d": "Only people who match what you need reach your inbox.",
    "compare.a3": "Interviews booked",
    "compare.a3d": "Straight into your calendar, no back-and-forth.",
    "how.title": 'That <span class="marker">easy</span>',
    "how.sub": "Four steps, zero spreadsheets. You find out once there's an interview on your calendar.",
    "how.s1": "The candidate messages you",
    "how.s1d": "on WhatsApp, like they would a friend.",
    "how.s2": "AI screens and scores them",
    "how.s2d": "in seconds, using your own criteria.",
    "how.s3": "It verifies their documents",
    "how.s3d": "automatically, no manual data entry.",
    "how.s4": "It books the interview",
    "how.s4d": "and sends reminders so they actually show up.",
    "feat.title": 'Everything you need to hire at volume <span class="marker">without losing your mind</span>',
    "feat.1": "AI assistant on WhatsApp",
    "feat.1d": "Natural conversations in Spanish. It answers each candidate's questions with real job data: pay, shifts and benefits.",
    "feat.1q": "How much does it pay and what's the shift?",
    "feat.1a": "It's a morning shift, Monday to Friday, with statutory benefits. Would you like to book your interview?",
    "feat.2": "Document verification",
    "feat.2d": "Our AI reads INE, CURP and proof of address, then fills in the candidate's profile for you.",
    "feat.2chip": "Address <b>✓</b>",
    "feat.3": "Smart scheduling",
    "feat.3d": "Connects to Google and Outlook, suggests open slots and handles rescheduling when needed.",
    "feat.4": "Automatic reminders",
    "feat.4d": "One WhatsApp message 24 hours before and another 2 hours before. No-shows drop by up to 50%.",
    "feat.4p1": "Your interview is tomorrow!",
    "feat.4p2": "See you at 10:30!",
    "feat.5": "Analytics dashboard",
    "feat.5d": "Conversion funnels, source attribution, time-to-hire and each recruiter's productivity.",
    "feat.6": "You're always in control",
    "feat.6d": "One click pauses the AI so you can message the candidate yourself. When you're done, the AI picks up right where you left off.",
    "cta.title": "Hire more,<br>without growing your team",
    "cta.sub": "We'll show you how Qualent cuts your time-to-hire and helps you scale recruiting with the team you already have. We'll cover pricing in the demo.",
    "cta.wa": "https://wa.me/529997466670?text=Hi%2C%20I%27d%20like%20to%20request%20a%20Qualent%20demo%20%F0%9F%91%8B",
    "cta.demoWa": "Request a demo on WhatsApp",
    "cta.or": "Rather write to us?",
    "footer.tag": "AI recruiting for high-volume hiring.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.about": "About us",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy policy",
    "footer.rights": "All rights reserved."
  };

  var CHAT = {
    es: [
      ["bot", "¡Hola, Ana! 👋 Vi que te interesa la vacante de Operador. ¿Te gustaría postularte?"],
      ["me", "¡Sí, claro!"],
      ["bot", "¡Perfecto! Te hago unas preguntas rápidas. Solo toma 1 minuto ⏱️"],
      ["bot", "¿Tienes disponibilidad para el turno matutino?"],
      ["me", "Sí, de lunes a viernes"],
      ["bot", "¡Listo! Tu entrevista quedó el martes a las 10:30 📅 Te aviso un día antes."]
    ],
    en: [
      ["bot", "Hi Ana! 👋 I saw you're interested in the Operator role. Would you like to apply?"],
      ["me", "Yes, sure!"],
      ["bot", "Great! I'll ask a few quick questions. It only takes a minute ⏱️"],
      ["bot", "Are you available for the morning shift?"],
      ["me", "Yes, Monday to Friday"],
      ["bot", "Done! Your interview is set for Tuesday at 10:30 📅 I'll remind you the day before."]
    ]
  };

  var ES = {};
  var lang = "es";

  function snapshotSpanish() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      ES[el.dataset.i18n] = el.textContent.trim().replace(/\s+/g, " ");
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      ES[el.dataset.i18nHtml] = el.innerHTML.trim();
    });
    document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
      ES[el.dataset.i18nHref] = el.getAttribute("href");
    });
  }

  function applyLang(next) {
    lang = next;
    var dict = next === "en" ? EN : ES;
    root.lang = next;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = dict[el.dataset.i18nHtml];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
      var v = dict[el.dataset.i18nHref];
      if (v != null) el.setAttribute("href", v);
    });
    document.querySelectorAll("[data-lang-label]").forEach(function (el) { el.textContent = next === "en" ? "ES" : "EN"; });
    document.querySelectorAll("[data-lang-label-long]").forEach(function (el) { el.textContent = next === "en" ? "Español" : "English"; });
    updateToggleLabel();
    restartChat();
    try { localStorage.setItem("qualent-lang", next); } catch (e) { /* storage unavailable */ }
  }

  /* ---------------- Header ---------------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  }
  menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  document.querySelectorAll("[data-lang-toggle]").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(lang === "es" ? "en" : "es"); });
  });

  /* ---------------- Reveal on scroll ---------------- */
  var revealTargets = document.querySelectorAll(".reveal, .steps, .card");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(siblings, 5) * 70 + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------- Counters ---------------- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var end = parseInt(el.dataset.count, 10);
    if (reduceMotion) { el.textContent = end; return; }
    var start = null, dur = 1400;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    el.textContent = "0";
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------------- Human-control toggle ---------------- */
  var aiToggle = document.querySelector("[data-ai-toggle]");
  function updateToggleLabel() {
    if (!aiToggle) return;
    var on = aiToggle.getAttribute("aria-pressed") === "true";
    var label = aiToggle.querySelector(".toggle-label");
    var key = (on ? "on" : "off") + (lang === "en" ? "En" : "");
    label.textContent = label.dataset[key];
  }
  if (aiToggle) {
    aiToggle.addEventListener("click", function () {
      aiToggle.setAttribute("aria-pressed", String(aiToggle.getAttribute("aria-pressed") !== "true"));
      updateToggleLabel();
    });
  }

  /* ---------------- Chat animation ---------------- */
  var chatEl = document.querySelector("[data-chat]");
  var chatTimers = [];
  var chatVisible = true;

  function later(fn, ms) { chatTimers.push(setTimeout(fn, ms)); }
  function clearChat() { chatTimers.forEach(clearTimeout); chatTimers = []; }

  function bubble(who, text) {
    var d = document.createElement("div");
    d.className = "msg " + who;
    d.textContent = text;
    var t = document.createElement("time");
    var now = new Date();
    t.textContent = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
    d.appendChild(t);
    return d;
  }
  function typing() {
    var d = document.createElement("div");
    d.className = "msg bot typing";
    d.innerHTML = "<i></i><i></i><i></i>";
    return d;
  }
  function trim() {
    while (chatEl.scrollHeight > chatEl.clientHeight + 4 && chatEl.children.length > 1) {
      chatEl.removeChild(chatEl.firstElementChild);
    }
  }

  function playChat() {
    clearChat();
    chatEl.classList.remove("fade-out");
    chatEl.innerHTML = "";
    var script = CHAT[lang];

    if (reduceMotion) {
      script.forEach(function (m) { chatEl.appendChild(bubble(m[0], m[1])); });
      trim();
      return;
    }

    var t = 400;
    script.forEach(function (m) {
      var who = m[0], text = m[1];
      if (who === "bot") {
        var dots;
        later(function () { dots = typing(); chatEl.appendChild(dots); trim(); }, t);
        t += 900 + Math.min(text.length * 12, 900);
        later(function () { if (dots) dots.remove(); chatEl.appendChild(bubble(who, text)); trim(); }, t);
      } else {
        t += 500;
        later(function () { chatEl.appendChild(bubble(who, text)); trim(); }, t);
      }
      t += 900;
    });
    later(function () { chatEl.classList.add("fade-out"); }, t + 3200);
    later(function () { if (chatVisible) playChat(); }, t + 3800);
  }
  function restartChat() { if (chatEl) playChat(); }

  if (chatEl && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var wasVisible = chatVisible;
        chatVisible = e.isIntersecting;
        if (chatVisible && !wasVisible) playChat();
      });
    }).observe(chatEl);
  }

  /* ---------------- Init ---------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  snapshotSpanish();
  var saved = null;
  try { saved = localStorage.getItem("qualent-lang"); } catch (e) { /* storage unavailable */ }
  if (saved === "en") applyLang("en"); else restartChat();
})();
