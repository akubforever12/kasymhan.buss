import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const L = {
  main: "\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u0440\u0435\u0439\u0441",
  book: "\u0417\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c",
  at: "\u0432 ",
  buses: "\u2014 \u0410\u0432\u0442\u043e\u0431\u0443\u0441\u044b",
};

const js = `(function () {
  var ua = navigator.userAgent || "";
  if (/WhatsApp|Instagram|FBAN|FBAV|Line\\/|Telegram/i.test(ua)) {
    document.documentElement.classList.add("in-app-browser");
  }
})();

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
  document.title = cfg.brand.name + "${L.buses}";
  setText("#logo-title", cfg.brand.name);
  setText("#logo-sub", cfg.brand.sub);
  setText("#hero-badge", cfg.hero.badge);
  setText("#hero-title-before", cfg.hero.titleBefore + " ");
  setText("#hero-title-highlight", cfg.hero.titleHighlight);
  setText("#hero-title-after", " " + cfg.hero.titleAfter);
  setText("#hero-desc", cfg.hero.desc);
  setText("#next-from", cfg.nextTrip.from);
  setText("#next-to", cfg.nextTrip.to);
  setText("#next-date", cfg.nextTrip.date);
  setText("#next-time", cfg.nextTrip.time);
  setText("#next-seats", cfg.nextTrip.seats);
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
}

function setText(sel, text) {
  var el = document.querySelector(sel);
  if (el) el.textContent = text;
}

function escapeHtml(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function renderTrips(filter) {
  if (!siteConfig) return;
  var timeline = document.getElementById("timeline");
  if (!timeline) return;
  timeline.innerHTML = siteConfig.trips.filter(function (t) {
    return filter === "all" || t.destination === filter;
  }).map(function (trip) {
    var waLink = buildWhatsAppLink(siteConfig.whatsapp, tripWaMessage(trip.from, trip.to, trip.date, trip.time));
    var featuredClass = trip.featured ? " trip--featured" : "";
    var dotClass = trip.featured ? " trip__dot--featured" : "";
    var badge = trip.featured ? '<span class="trip__badge">${L.main}</span>' : "";
    return '<article class="trip' + featuredClass + '"><div class="trip__dot' + dotClass + '"></div><div class="trip__card"><p class="trip__route">' +
      escapeHtml(trip.from) + ' <span>\\u2192</span> ' + escapeHtml(trip.to) +
      '</p><div class="trip__datetime"><span class="trip__date">' + escapeHtml(trip.date) +
      '</span><span class="trip__time">${L.at}' + escapeHtml(trip.time) + '</span></div>' + badge +
      '</div><a class="btn btn--whatsapp trip__book" href="' + waLink + '" target="_blank" rel="noopener noreferrer">${L.book}</a></article>';
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

loadConfig().then(function (cfg) { applySite(cfg); });
`;

writeFileSync(join(dir, "site.js"), "\uFEFF" + js, "utf8");
console.log("site.js OK");
