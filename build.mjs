import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const bom = "\uFEFF";

const AO = "\u0410\u043b\u0442\u044b\u043d \u041e\u0440\u0434\u0430";
const SH = "\u0428\u044b\u043c\u043a\u0435\u043d\u0442";
const AL = "\u0410\u043b\u043c\u0430\u0442\u044b";
const TR = "\u0422\u0430\u0440\u0430\u0437";
const WA_MSG =
  "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0425\u043e\u0447\u0443 \u0437\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0431\u0438\u043b\u0435\u0442.";
const waDefault = encodeURIComponent(WA_MSG);

const svgWa = `<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const wa = `https://wa.me/77023555998?text=${waDefault}`;

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${AO} \u2014 \u0410\u0432\u0442\u043e\u0431\u0443\u0441\u044b</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="bg-glow bg-glow--1"></div>
  <div class="bg-glow bg-glow--2"></div>
  <div class="grid-overlay"></div>

  <header class="header">
    <a href="#" class="logo">
      <span class="logo__icon" aria-hidden="true">\uD83D\uDE8C</span>
      <span class="logo__text">
        <span class="logo__title">${AO}</span>
        <span class="logo__sub">\u041c\u0435\u0436\u0434\u0443\u0433\u043e\u0440\u043e\u0434\u043d\u0438\u0435 \u0440\u0435\u0439\u0441\u044b</span>
      </span>
    </a>
    <nav class="nav">
      <a href="#schedule">\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435</a>
      <a href="#routes">\u041c\u0430\u0440\u0448\u0440\u0443\u0442\u044b</a>
      <a href="#contact">\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b</a>
    </nav>
    <a class="btn btn--whatsapp btn--header" href="${wa}" target="_blank" rel="noopener noreferrer">${svgWa} \u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 WhatsApp</a>
    <button class="burger" type="button" aria-label="\u041c\u0435\u043d\u044e" aria-expanded="false"><span></span><span></span><span></span></button>
  </header>

  <main>
    <section class="hero">
      <div class="hero__content">
        <p class="hero__badge">\u041a\u043e\u043c\u0444\u043e\u0440\u0442\u043d\u044b\u0435 \u0430\u0432\u0442\u043e\u0431\u0443\u0441\u044b \u00b7 \u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d</p>
        <h1 class="hero__title">\u0420\u0435\u0439\u0441\u044b \u0438\u0437 <span class="gradient-text">${AO}</span> \u0432 ${SH} \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430</h1>
        <p class="hero__desc">\u0410\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u043e\u0435 \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435, \u0443\u0434\u043e\u0431\u043d\u043e\u0435 \u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0438 \u0431\u044b\u0441\u0442\u0440\u044b\u0439 \u043e\u0442\u0432\u0435\u0442 \u0432 WhatsApp.</p>
        <div class="hero__actions">
          <a href="#schedule" class="btn btn--primary">\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435</a>
          <a class="btn btn--whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">${svgWa} \u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043d\u0430\u043c \u0432 WhatsApp</a>
        </div>
      </div>
      <div class="hero__card">
        <div class="next-trip">
          <span class="next-trip__label">\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0439 \u0440\u0435\u0439\u0441</span>
          <div class="next-trip__route"><span>${AO}</span><span class="next-trip__arrow">\u2192</span><span>${SH}</span></div>
          <div class="next-trip__meta"><span class="next-trip__date">01.06.26</span><span class="next-trip__time">20:00</span></div>
          <span class="next-trip__seats">12 \u043c\u0435\u0441\u0442 \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u043e</span>
        </div>
      </div>
    </section>

    <section id="schedule" class="schedule">
      <div class="section-head">
        <h2 class="section-title">\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0440\u0435\u0439\u0441\u043e\u0432</h2>
        <p class="section-desc">\u0413\u0440\u0430\u0444\u0438\u043a \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0439</p>
      </div>
      <div class="filters">
        <button class="filter is-active" type="button" data-filter="all">\u0412\u0441\u0435</button>
        <button class="filter" type="button" data-filter="shymkent">${SH}</button>
        <button class="filter" type="button" data-filter="almaty">${AL}</button>
        <button class="filter" type="button" data-filter="taraz">${TR}</button>
      </div>
      <div class="timeline" id="timeline"></div>
    </section>

    <section id="routes" class="routes">
      <div class="section-head"><h2 class="section-title">\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0435 \u043c\u0430\u0440\u0448\u0440\u0443\u0442\u044b</h2></div>
      <div class="routes-grid">
        <article class="route-card"><h3>${AO} \u2192 ${SH}</h3><p>~4 \u0447 \u00b7 \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u043e</p><span class="route-card__price">\u043e\u0442 4 500 \u20b8</span></article>
        <article class="route-card"><h3>${AO} \u2192 ${AL}</h3><p>~6 \u0447 \u00b7 3 \u0440\u0430\u0437\u0430 \u0432 \u043d\u0435\u0434\u0435\u043b\u044e</p><span class="route-card__price">\u043e\u0442 6 200 \u20b8</span></article>
        <article class="route-card"><h3>${AO} \u2192 ${TR}</h3><p>~2.5 \u0447 \u00b7 \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u043e</p><span class="route-card__price">\u043e\u0442 3 100 \u20b8</span></article>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="contact__box">
        <h2>\u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043c\u0435\u0441\u0442\u043e?</h2>
        <p>\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c \u0432 WhatsApp \u2014 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043c\u0430\u0440\u0448\u0440\u0443\u0442, \u0434\u0430\u0442\u0443 \u0438 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043e\u0432.</p>
        <a class="btn btn--whatsapp btn--large" href="${wa}" target="_blank" rel="noopener noreferrer">${svgWa} \u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043d\u0430\u043c \u0432 WhatsApp</a>
        <p class="contact__hint">\u0417\u0430\u043c\u0435\u043d\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 <code>77023555998</code> \u0432 app.js \u043d\u0430 \u0441\u0432\u043e\u0439</p>
      </div>
    </section>

    <section id="reviews" class="reviews">
      <div class="section-head">
        <h2 class="section-title">\u041e\u0442\u0437\u044b\u0432\u044b \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u0432</h2>
        <p class="section-desc">\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u0441\u0432\u043e\u0438\u043c \u043e\u043f\u044b\u0442\u043e\u043c \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044f</p>
      </div>
      
      <div class="review-form-container">
        <form id="review-form" class="review-form">
          <div class="form-group">
            <label for="review-name">\u0412\u0430\u0448\u0435 \u0438\u043c\u044f:</label>
            <input type="text" id="review-name" name="name" maxlength="50" required placeholder="\u0418\u0432\u0430\u043d">
          </div>
          <div class="form-group">
            <label for="review-rating">\u041e\u0446\u0435\u043d\u043a\u0430:</label>
            <div class="rating-input" id="rating-input">
              <span class="star" data-rating="1">\u2605</span>
              <span class="star" data-rating="2">\u2605</span>
              <span class="star" data-rating="3">\u2605</span>
              <span class="star" data-rating="4">\u2605</span>
              <span class="star" data-rating="5">\u2605</span>
            </div>
            <input type="hidden" id="review-rating" name="rating" value="5" required>
          </div>
          <div class="form-group">
            <label for="review-text">\u041e\u0442\u0437\u044b\u0432 (\u043c\u0430\u043a\u0441 300 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432):</label>
            <textarea id="review-text" name="text" maxlength="300" required placeholder="\u0420\u0430\u0441\u0441\u043a\u0430\u0436\u0438\u0442\u0435 \u043e \u0432\u0430\u0448\u0435\u043c \u043f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0438...\"></textarea>
          </div>
          <button type="submit" class="btn btn--submit">\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043e\u0442\u0437\u044b\u0432</button>
          <div id="form-message" class="form-message"></div>
        </form>
      </div>
      
      <div class="review-stats">
        <h3>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043e\u0446\u0435\u043d\u043e\u043a</h3>
        <div class="stats-grid">
          <div class="stat-item"><span class="stat-rating">5 \u2605</span><span class="stat-count" data-rating="5">0</span></div>
          <div class="stat-item"><span class="stat-rating">4 \u2605</span><span class="stat-count" data-rating="4">0</span></div>
          <div class="stat-item"><span class="stat-rating">3 \u2605</span><span class="stat-count" data-rating="3">0</span></div>
          <div class="stat-item"><span class="stat-rating">2 \u2605</span><span class="stat-count" data-rating="2">0</span></div>
          <div class="stat-item"><span class="stat-rating">1 \u2605</span><span class="stat-count" data-rating="1">0</span></div>
        </div>
      </div>
      
      <div class="reviews-grid" id="reviews-grid"></div>
    </section>
  </main>

  <footer class=\"footer\"><p>\u00a9 2026 ${AO} \u2014 \u043c\u0435\u0436\u0434\u0443\u0433\u043e\u0440\u043e\u0434\u043d\u0438\u0435 \u0430\u0432\u0442\u043e\u0431\u0443\u0441\u044b</p></footer>\n\n  <a class=\"fab-whatsapp\" href=\"${wa}\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 WhatsApp\" title=\"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 WhatsApp\">\n
    ${svgWa.replace('class="btn__icon"', '')}
    <span class="fab-whatsapp__pulse"></span>
  </a>
  <script src="app.js"></script>
</body>
</html>`;

const BOOK_PREFIX =
  "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u0425\u043e\u0447\u0443 \u0437\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0431\u0438\u043b\u0435\u0442: ";
const MAIN_TRIP = "\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u0440\u0435\u0439\u0441";
const BTN_BOOK = "\u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c";
const AT = "\u0432 ";

const appJs = `const WHATSAPP_NUMBER = "77023555998";

const trips = [ 
  { from: "${AO}", to: "${SH}", date: "01.06.26", time: "20:00", destination: "shymkent", featured: true },
  { from: "${AO}", to: "${SH}", date: "02.06.26", time: "08:30", destination: "shymkent" },
  { from: "${AO}", to: "${SH}", date: "03.06.26", time: "14:00", destination: "shymkent" },
  { from: "${AO}", to: "${SH}", date: "05.06.26", time: "20:00", destination: "shymkent" },
  { from: "${AO}", to: "${AL}", date: "01.06.26", time: "06:00", destination: "almaty" },
  { from: "${AO}", to: "${AL}", date: "04.06.26", time: "07:30", destination: "almaty" },
  { from: "${AO}", to: "${TR}", date: "02.06.26", time: "11:00", destination: "taraz" },
  { from: "${AO}", to: "${TR}", date: "06.06.26", time: "16:45", destination: "taraz" },
];

function buildWhatsAppLink(from, to, date, time) {
  const text = encodeURIComponent(
    "${BOOK_PREFIX}" + from + " \u2192 " + to + ", " + date + " ${AT}" + time + "."
  );
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
}

function renderTrips(filter) {
  if (filter === undefined) filter = "all";
  var timeline = document.getElementById("timeline");
  if (!timeline) return;
  timeline.innerHTML = trips
    .filter(function (t) { return filter === "all" || t.destination === filter; })
    .map(function (trip) {
      var waLink = buildWhatsAppLink(trip.from, trip.to, trip.date, trip.time);
      var featuredClass = trip.featured ? " trip--featured" : "";
      var dotClass = trip.featured ? " trip__dot--featured" : "";
      var badge = trip.featured ? '<span class="trip__badge">${MAIN_TRIP}</span>' : "";
      return '<article class="trip' + featuredClass + '"><div class="trip__dot' + dotClass + '"></div><div class="trip__card"><p class="trip__route">' + trip.from + ' <span>\u2192</span> ' + trip.to + '</p><div class="trip__datetime"><span class="trip__date">' + trip.date + '</span><span class="trip__time">${AT}' + trip.time + '</span></div>' + badge + '</div><a class="btn btn--whatsapp trip__book" href="' + waLink + '" target="_blank" rel="noopener noreferrer">${BTN_BOOK}</a></article>';
    })
    .join("");
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

renderTrips();
`;

writeFileSync(join(dir, "index.html"), bom + html, "utf8");
writeFileSync(join(dir, "app.js"), bom + appJs, "utf8");
console.log("OK: index.html + app.js");
