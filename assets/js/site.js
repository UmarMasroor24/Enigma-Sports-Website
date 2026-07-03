/* ENIGMA SPORTS — site interactions */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Preloader ---------- */
  function ready() {
    setTimeout(function () {
      document.body.classList.add("is-loaded");
    }, reducedMotion ? 0 : 700);
  }
  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready);
  // Fallback in case load stalls (e.g. slow font CDN)
  setTimeout(function () { document.body.classList.add("is-loaded"); }, 2500);

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reducedMotion) {
    var dot = document.getElementById("cursor-dot");
    var ring = document.getElementById("cursor-ring");
    var mx = 0, my = 0, rx = 0, ry = 0;
    var started = false;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        rx = mx; ry = my;
        document.body.classList.add("cursor-on");
        loop();
      }
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });

    function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }

    document.querySelectorAll("[data-hover]").forEach(function (el) {
      el.addEventListener("mouseenter", function () { document.body.classList.add("cursor-hover"); });
      el.addEventListener("mouseleave", function () { document.body.classList.remove("cursor-hover"); });
    });
  }

  /* ---------- Nav: scrolled state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("nav-burger");
  burger.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  document.querySelectorAll(".menu-overlay a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scroll reveals (staggered per batch) ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    var delay = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty("--d", delay + "s");
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
      delay += 0.08;
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Stat counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reducedMotion) { el.textContent = target; return; }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach(function (el) {
    countObserver.observe(el);
  });

  /* ---------- Active nav link ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.getAttribute("id");
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---------- Product row flair follows cursor ---------- */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll(".product-row").forEach(function (row) {
      var flair = row.querySelector(".product-flair");
      if (!flair) return;
      row.addEventListener("mousemove", function (e) {
        var r = row.getBoundingClientRect();
        flair.style.left = (e.clientX - r.left) + "px";
        flair.style.top = (e.clientY - r.top) + "px";
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // close others
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-a").style.maxHeight = "0px";
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Recompute open FAQ panel height on resize (fixed px max-height would clip on reflow)
  var faqResizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(faqResizeTimer);
    faqResizeTimer = setTimeout(function () {
      var open = document.querySelector(".faq-item.open .faq-a");
      if (open) open.style.maxHeight = open.scrollHeight + "px";
    }, 150);
  }, { passive: true });

  /* ---------- Contact form (UI-only) ---------- */
  var form = document.getElementById("enquiry-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.textContent = "The enquiry form isn't wired up yet — please reach us via WhatsApp or email and we'll respond within 24 hours.";
    });
  }
})();
