var STORAGE_KEY = "altynOrdaSiteConfig";
var SITE_DEFAULTS = {
  "whatsapp": "77023555998",
  "brand": {
    "name": "Алтын Орда",
    "sub": "Междугородние рейсы"
  },
  "hero": {
    "badge": "Комфортные автобусы · Казахстан",
    "titleBefore": "Маршрут",
    "titleHighlight": "Алматы → Шымкент → Сарыагаш → Капланбек → Ташкент",
    "titleAfter": "",
    "desc": "Автобус по направлениям. Бронирование в WhatsApp."
  },
  "nextTrip": {
    "route": "Алматы → Шымкент → Сарыагаш → Капланбек → Ташкент",
    "from": "Алматы",
    "to": "Ташкент"
  },
  "trips": [
    {
      "route": "Алматы → Шымкент → Сарыагаш → Капланбек → Ташкент",
      "from": "Алматы",
      "to": "Ташкент",
      "destination": "all",
      "featured": true
    }
  ],
  "routes": [
    {
      "title": "Алматы → Шымкент → Сарыагаш → Капланбек → Ташкент",
      "info": "Ежедневно",
      "price": "уточняйте в WhatsApp"
    }
  ],
  "contact": {
    "title": "Забронировать место?",
    "text": "Напишите нам в WhatsApp — укажите маршрут и количество пассажиров."
  },
  "footer": "© 2026 Алтын Орда — междугородние автобусы"
};

function cloneDefaults() { return JSON.parse(JSON.stringify(SITE_DEFAULTS)); }
function normalizeConfig(cfg) {
  if (!cfg) return cloneDefaults();
  if (cfg.nextTrip) {
    cfg.nextTrip = {
      route: cfg.nextTrip.route || "",
      from: cfg.nextTrip.from || "",
      to: cfg.nextTrip.to || ""
    };
  }
  if (cfg.trips && cfg.trips.length) {
    var seen = {};
    var out = [];
    cfg.trips.forEach(function (t) {
      var key = t.route || ((t.from || "") + "|" + (t.to || ""));
      if (seen[key]) return;
      seen[key] = true;
      out.push({
        route: t.route || "",
        from: t.from || "",
        to: t.to || "",
        destination: t.destination || "all",
        featured: !!t.featured
      });
    });
    cfg.trips = out;
  }
  return cfg;
}
function saveConfig(cfg) { localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeConfig(cfg))); }
function loadConfig() {
  return fetch("site-data.json", { cache: "no-store" })
    .then(function (r) { if (r.ok) return r.json(); throw new Error("no file"); })
    .then(normalizeConfig)
    .catch(function () {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { try { return normalizeConfig(JSON.parse(raw)); } catch (e) {} }
      return cloneDefaults();
    });
}
function buildWhatsAppLink(number, message) {
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}
function defaultWaMessage() { return "Здравствуйте! Хочу забронировать билет."; }
function tripWaMessage(trip) {
  var route = trip && trip.route ? trip.route : (trip.from + " → " + trip.to);
  return "Здравствуйте! Хочу билет на маршрут: " + route + ".";
}
