(function () {
  var ua = navigator.userAgent || "";
  if (/WhatsApp|Instagram|FBAN|FBAV|Line\/|Telegram/i.test(ua)) {
    document.documentElement.classList.add("in-app-browser");
  }
})();

var ENTRY_CAPTCHA_KEY = "altynOrdaEntryCaptchaPassed";
var entryCaptchaAnswer = null;

function generateEntryCaptcha() {
  var a = Math.floor(Math.random() * 6) + 2;
  var b = Math.floor(Math.random() * 6) + 1;
  entryCaptchaAnswer = a + b;
  var questionEl = document.getElementById("entry-captcha-question");
  if (questionEl) {
    questionEl.textContent = "Сколько будет " + a + " + " + b + "?";
  }
}

function setEntryCaptchaError(message) {
  var errorEl = document.getElementById("entry-captcha-error");
  if (!errorEl) return;
  errorEl.textContent = message || "";
  errorEl.hidden = !message;
}

function showEntryCaptcha() {
  var overlay = document.getElementById("entry-captcha");
  if (!overlay) return;
  overlay.style.display = "flex";
  document.documentElement.classList.add("captcha-locked");
}

function hideEntryCaptcha() {
  var overlay = document.getElementById("entry-captcha");
  if (!overlay) return;
  overlay.style.display = "none";
  document.documentElement.classList.remove("captcha-locked");
}

function initEntryCaptcha() {
  var passed = false;
  try {
    passed = localStorage.getItem(ENTRY_CAPTCHA_KEY) === "1";
  } catch (e) {}

  if (passed) {
    hideEntryCaptcha();
  } else {
    showEntryCaptcha();
    generateEntryCaptcha();
    var submitBtn = document.getElementById("entry-captcha-submit");
    var answerInput = document.getElementById("entry-captcha-answer");
    if (submitBtn) {
      submitBtn.addEventListener("click", function () {
        if (!answerInput) return;
        var value = (answerInput.value || "").trim();
        if (value === String(entryCaptchaAnswer)) {
          setEntryCaptchaError("");
          try {
            localStorage.setItem(ENTRY_CAPTCHA_KEY, "1");
          } catch (e) {}
          hideEntryCaptcha();
        } else {
          setEntryCaptchaError("Неверный ответ. Попробуйте ещё раз.");
          answerInput.value = "";
          generateEntryCaptcha();
          if (answerInput) answerInput.focus();
        }
      });
    }
    if (answerInput) {
      answerInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          if (submitBtn) submitBtn.click();
        }
      });
    }
  }
}

var WA_SVG = '<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
var siteConfig = null;

function setWaLinks(cfg) {
  var href = buildWhatsAppLink(cfg.whatsapp, defaultWaMessage());
  document.querySelectorAll("[data-wa-link]").forEach(function (el) { el.href = href; });
  var fab = document.querySelector(".fab-whatsapp");
  if (fab) fab.href = href;
}

function applySite(cfg) {
  siteConfig = cfg;
  document.title = cfg.brand.name + "— Автобусы";
  setText("#logo-title", cfg.brand.name);
  setText("#logo-sub", cfg.brand.sub);
  setText("#hero-badge", cfg.hero.badge);
  setText("#hero-title-before", cfg.hero.titleBefore + " ");
  setText("#hero-title-highlight", cfg.hero.titleHighlight);
  setText("#hero-title-after", " " + cfg.hero.titleAfter);
  setText("#hero-desc", cfg.hero.desc);
  var routeText = getTripRoute(cfg.nextTrip);
  setText("#next-route", routeText);
  setText("#contact-title", cfg.contact.title);
  setText("#contact-text", cfg.contact.text);
  setText("#footer-text", cfg.footer);
  var grid = document.getElementById("routes-grid");
  if (grid) {
    grid.innerHTML = cfg.routes.map(function (r) {
      return '<article class="route-card"><h3>' + escapeHtml(r.title) + '</h3><p>' + escapeHtml(r.info) + '</p><span class="route-card__price">' + escapeHtml(r.price) + '</span></article>';
    }).join("");
  }
  setWaLinks(cfg);
  renderTrips("all");
  renderReviews();
  updateReviewStats();
  initReviewForm();
}

var REVIEWS_STORAGE_KEY = "altynOrdaReviews";
var BROWSER_ID_KEY = "altynOrdaBrowserId";

function getBrowserId() {
  var id = localStorage.getItem(BROWSER_ID_KEY);
  if (!id) {
    id = "browser_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(BROWSER_ID_KEY, id);
  }
  return id;
}

function getAllReviews() {
  var stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveReview(name, rating, text) {
  var reviews = getAllReviews();
  var browserId = getBrowserId();
  var hasReview = reviews.some(function(r) { return r.browserId === browserId; });
  if (hasReview) return { error: "Вы уже оставили отзыв. Спасибо!" };
  
  reviews.push({
    name: name,
    rating: rating,
    text: text,
    browserId: browserId,
    date: new Date().toISOString()
  });
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  return { success: true };
}

function renderReviews() {
  var reviews = getAllReviews();
  var grid = document.getElementById("reviews-grid");
  if (!grid) return;
  
  grid.innerHTML = reviews.map(function (review) {
    var stars = '<div class="review__stars">' + Array(review.rating + 1).join('<span class="review__star">★</span>') + '</div>';
    return '<div class="review-card">' +
      stars +
      '<p class="review__text">' + escapeHtml(review.text) + '</p>' +
      '<p class="review__author">— ' + escapeHtml(review.name) + '</p>' +
      '</div>';
  }).join("");
}

function updateReviewStats() {
  var reviews = getAllReviews();
  var stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(function(r) {
    stats[r.rating] = (stats[r.rating] || 0) + 1;
  });
  
  [1, 2, 3, 4, 5].forEach(function(rating) {
    var el = document.querySelector('[data-rating="' + rating + '"].stat-count');
    if (el) el.textContent = stats[rating];
  });
}

function initReviewForm() {
  var form = document.getElementById("review-form");
  if (!form) return;
  
  var browserId = getBrowserId();
  var reviews = getAllReviews();
  var hasReview = reviews.some(function(r) { return r.browserId === browserId; });
  
  if (hasReview) {
    form.style.display = "none";
    var msg = document.getElementById("form-message");
    if (msg) msg.innerHTML = '<p class="success-msg">Спасибо за ваш отзыв!</p>';
  }
  
  var ratingStars = document.querySelectorAll(".rating-input .star");
  var ratingInput = document.getElementById("review-rating");
  
  ratingStars.forEach(function(star) {
    star.addEventListener("click", function() {
      var rating = this.dataset.rating;
      ratingInput.value = rating;
      ratingStars.forEach(function(s, i) {
        s.classList.toggle("active", i < rating);
      });
    });
  });
  
  ratingStars.forEach(function(star) {
    star.classList.toggle("active", star.dataset.rating <= ratingInput.value);
  });
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("review-name").value.trim();
    var rating = parseInt(ratingInput.value) || 5;
    var text = document.getElementById("review-text").value.trim();
    
    if (!name || !text) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    
    var result = saveReview(name, rating, text);
    var msgEl = document.getElementById("form-message");
    
    if (result.error) {
      msgEl.innerHTML = '<p class="error-msg">' + result.error + '</p>';
      setTimeout(function() {
        msgEl.innerHTML = "";
      }, 3000);
    } else {
      msgEl.innerHTML = '<p class="success-msg">Отзыв добавлен! Спасибо!</p>';
      form.reset();
      form.style.display = "none";
      renderReviews();
      updateReviewStats();
      setTimeout(function() {
        msgEl.innerHTML = "";
      }, 3000);
    }
  });
}

function setText(sel, text) {
  var el = document.querySelector(sel);
  if (el) el.textContent = text;
}

function escapeHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function getTripRoute(trip) {
  if (!trip) return "";
  if (trip.route) return trip.route;
  if (trip.from && trip.to) return trip.from + " \u2192 " + trip.to;
  return trip.from || trip.to || "";
}

function renderTrips(filter) {
  if (!siteConfig) return;
  var timeline = document.getElementById("timeline");
  if (!timeline) return;
  timeline.innerHTML = siteConfig.trips.filter(function (t) {
    return filter === "all" || t.destination === filter;
  }).map(function (trip) {
    var routeLabel = getTripRoute(trip);
    var waLink = buildWhatsAppLink(siteConfig.whatsapp, tripWaMessage(trip));
    var featuredClass = trip.featured ? " trip--featured" : "";
    var dotClass = trip.featured ? " trip__dot--featured" : "";
    var badge = trip.featured ? '<span class="trip__badge">Популярно</span>' : "";
    return '<article class="trip' + featuredClass + '"><div class="trip__dot' + dotClass + '"></div><div class="trip__card"><p class="trip__route trip__route--solo">' +
      escapeHtml(routeLabel) + '</p>' + badge +
      '</div><a class="btn btn--whatsapp trip__book" href="' + waLink + '" target="_blank" rel="noopener noreferrer">Забронировать</a></article>';
  }).join("");
}

document.querySelectorAll(".filter").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
    renderTrips(btn.dataset.filter);
  });
});

var burger = document.querySelector(".burger");
var header = document.querySelector(".header");
if (burger && header) {
  burger.addEventListener("click", function () {
    var open = header.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
}

initEntryCaptcha();
loadConfig().then(function (cfg) { applySite(normalizeConfig(cfg)); });
