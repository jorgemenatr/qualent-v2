(function () {
  "use strict";

  /* ---------------- Configuración ---------------- */
  // Número de WhatsApp en formato internacional, solo dígitos (ej. 5299XXXXXXXX).
  var WHATSAPP_NUMBER = "12314420980";
  // El [REF:…] le indica a Qualent qué vacante abrir; no quitarlo.
  var WHATSAPP_TEXT = "Hola, vi su anuncio para Supervisor de Almacén - Dondé y me interesa saber más. [REF:almac-n-dond]";
  // Mostrar la sección "Prueba" solo cuando haya un caso o cifra real.
  var SHOW_PROOF = false;

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---------------- CTA de WhatsApp ---------------- */
  var waHref = "https://wa.me/" + encodeURIComponent(WHATSAPP_NUMBER.replace(/[^\d]/g, "") || "") +
    "?text=" + encodeURIComponent(WHATSAPP_TEXT);
  document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = waHref; });

  /* ---------------- Sección de prueba ---------------- */
  var proof = document.querySelector("[data-proof]");
  if (proof && SHOW_PROOF) proof.hidden = false;

  /* ---------------- Entrada de secciones ---------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (hasIO && !reduceMotion) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); rio.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { rio.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------- Barra CTA fija (móvil) ---------------- */
  var sticky = document.querySelector("[data-sticky]");
  var heroCta = document.querySelector("[data-hero-cta]");
  var closeSec = document.querySelector("[data-close]");
  if (sticky && heroCta && hasIO) {
    var heroGone = false, closeIn = false;
    var stickyLink = sticky.querySelector("a");
    var update = function () {
      var show = heroGone && !closeIn;
      sticky.classList.toggle("is-on", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
      stickyLink.tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(function (entries) {
      // Solo aparece cuando el botón del hero ya quedó arriba del viewport.
      heroGone = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      update();
    }).observe(heroCta);
    if (closeSec) {
      new IntersectionObserver(function (entries) {
        closeIn = entries[0].isIntersecting;
        update();
      }, { threshold: 0.25 }).observe(closeSec);
    }
  }

  /* ---------------- Chat demo: se escribe al entrar en pantalla ---------------- */
  var chat = document.querySelector("[data-chat]");
  if (!chat || reduceMotion || !hasIO) return;
  var msgs = Array.prototype.slice.call(chat.querySelectorAll(".msg"));
  if (msgs.length < 2) return;

  msgs.forEach(function (m) { m.hidden = true; });
  chat.setAttribute("aria-busy", "true");

  function scrollDown() { chat.scrollTop = chat.scrollHeight; }

  function play() {
    var t = 300;
    msgs.forEach(function (m, i) {
      var len = m.textContent.length;
      if (m.classList.contains("in")) {
        // Qualent "escribe" antes de cada mensaje, proporcional a la longitud.
        var typingFor = Math.min(1600, 500 + len * 12);
        setTimeout(function () {
          var dots = document.createElement("li");
          dots.className = "msg in typing";
          dots.setAttribute("aria-hidden", "true");
          dots.innerHTML = "<i></i><i></i><i></i>";
          chat.appendChild(dots);
          scrollDown();
          setTimeout(function () {
            dots.remove();
            m.hidden = false;
            scrollDown();
          }, typingFor);
        }, t);
        t += typingFor + 500 + Math.min(1400, len * 18);
      } else {
        setTimeout(function () { m.hidden = false; scrollDown(); }, t);
        t += 900 + Math.min(1000, len * 14);
      }
      if (i === msgs.length - 1) setTimeout(function () { chat.removeAttribute("aria-busy"); }, t);
    });
  }

  var cio = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { cio.disconnect(); play(); }
  }, { threshold: 0.35 });
  cio.observe(chat);
})();
