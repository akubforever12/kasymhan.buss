import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const S = {
  saved: "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e!",
  savedF5: "\u0421\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043e! \u041e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0433\u043b\u0430\u0432\u043d\u0443\u044e (F5)",
  dl: "\u0424\u0430\u0439\u043b site-data.json \u0441\u043a\u0430\u0447\u0430\u043d \u2014 \u043f\u043e\u043b\u043e\u0436\u0438\u0442\u0435 \u0432 \u043f\u0430\u043f\u043a\u0443 site",
  resetQ: "\u0412\u0435\u0440\u043d\u0443\u0442\u044c \u0432\u0441\u0451 \u043a\u0430\u043a \u0432 \u043d\u0430\u0447\u0430\u043b\u0435?",
  resetOk: "\u0421\u0431\u0440\u043e\u0448\u0435\u043d\u043e",
  trip: "\u0420\u0435\u0439\u0441",
  del: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
  from: "\u041e\u0442\u043a\u0443\u0434\u0430",
  to: "\u041a\u0443\u0434\u0430",
  date: "\u0414\u0430\u0442\u0430",
  time: "\u0412\u0440\u0435\u043c\u044f",
  filt: "\u0424\u0438\u043b\u044c\u0442\u0440",
  main: "\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u0440\u0435\u0439\u0441",
  route: "\u041c\u0430\u0440\u0448\u0440\u0443\u0442",
  name: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",
  info: "\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",
  price: "\u0426\u0435\u043d\u0430",
  AO: "\u0410\u043b\u0442\u044b\u043d \u041e\u0440\u0434\u0430",
  SH: "\u0428\u044b\u043c\u043a\u0435\u043d\u0442",
};

const js = `var currentConfig = null;

function showToast(msg) {
  var toast = document.getElementById("toast");
  toast.textContent = msg || "${S.saved}";
  toast.classList.add("is-show");
  setTimeout(function () { toast.classList.remove("is-show"); }, 2500);
}

function readForm() {
  var cfg = currentConfig ? JSON.parse(JSON.stringify(currentConfig)) : cloneDefaults();
  cfg.whatsapp = document.getElementById("whatsapp").value.trim();
  cfg.brand.name = document.getElementById("brand-name").value.trim();
  cfg.brand.sub = document.getElementById("brand-sub").value.trim();
  cfg.hero.badge = document.getElementById("hero-badge").value.trim();
  cfg.hero.titleBefore = document.getElementById("hero-before").value.trim();
  cfg.hero.titleHighlight = document.getElementById("hero-highlight").value.trim();
  cfg.hero.titleAfter = document.getElementById("hero-after").value.trim();
  cfg.hero.desc = document.getElementById("hero-desc").value.trim();
  cfg.nextTrip.from = document.getElementById("next-from").value.trim();
  cfg.nextTrip.to = document.getElementById("next-to").value.trim();
  cfg.nextTrip.date = document.getElementById("next-date").value.trim();
  cfg.nextTrip.time = document.getElementById("next-time").value.trim();
  cfg.nextTrip.seats = document.getElementById("next-seats").value.trim();
  cfg.contact.title = document.getElementById("contact-title").value.trim();
  cfg.contact.text = document.getElementById("contact-text").value.trim();
  cfg.footer = document.getElementById("footer-text").value.trim();
  cfg.trips = [];
  document.querySelectorAll(".trip-edit").forEach(function (box) {
    cfg.trips.push({
      from: box.querySelector('[data-f="from"]').value.trim(),
      to: box.querySelector('[data-f="to"]').value.trim(),
      date: box.querySelector('[data-f="date"]').value.trim(),
      time: box.querySelector('[data-f="time"]').value.trim(),
      destination: box.querySelector('[data-f="destination"]').value,
      featured: box.querySelector('[data-f="featured"]').checked
    });
  });
  cfg.routes = [];
  document.querySelectorAll(".route-edit").forEach(function (box) {
    cfg.routes.push({
      title: box.querySelector('[data-f="title"]').value.trim(),
      info: box.querySelector('[data-f="info"]').value.trim(),
      price: box.querySelector('[data-f="price"]').value.trim()
    });
  });
  return cfg;
}

function fillForm(cfg) {
  currentConfig = cfg;
  document.getElementById("whatsapp").value = cfg.whatsapp;
  document.getElementById("brand-name").value = cfg.brand.name;
  document.getElementById("brand-sub").value = cfg.brand.sub;
  document.getElementById("hero-badge").value = cfg.hero.badge;
  document.getElementById("hero-before").value = cfg.hero.titleBefore;
  document.getElementById("hero-highlight").value = cfg.hero.titleHighlight;
  document.getElementById("hero-after").value = cfg.hero.titleAfter;
  document.getElementById("hero-desc").value = cfg.hero.desc;
  document.getElementById("next-from").value = cfg.nextTrip.from;
  document.getElementById("next-to").value = cfg.nextTrip.to;
  document.getElementById("next-date").value = cfg.nextTrip.date;
  document.getElementById("next-time").value = cfg.nextTrip.time;
  document.getElementById("next-seats").value = cfg.nextTrip.seats;
  document.getElementById("contact-title").value = cfg.contact.title;
  document.getElementById("contact-text").value = cfg.contact.text;
  document.getElementById("footer-text").value = cfg.footer;
  renderTripsEditor(cfg.trips);
  renderRoutesEditor(cfg.routes);
}

function renderTripsEditor(trips) {
  var list = document.getElementById("trips-list");
  list.innerHTML = "";
  trips.forEach(function (trip, i) { list.appendChild(createTripBox(trip, i + 1)); });
}

function createTripBox(trip, num) {
  var div = document.createElement("div");
  div.className = "trip-edit";
  div.innerHTML =
    '<div class="trip-edit__head"><span>${S.trip} ' + num + '</span><button type="button" class="btn btn--danger btn-del-trip">${S.del}</button></div>' +
    '<div class="admin-row"><div class="admin-field"><label>${S.from}</label><input data-f="from" value="' + escAttr(trip.from) + '"></div>' +
    '<div class="admin-field"><label>${S.to}</label><input data-f="to" value="' + escAttr(trip.to) + '"></div></div>' +
    '<div class="admin-row"><div class="admin-field"><label>${S.date}</label><input data-f="date" value="' + escAttr(trip.date) + '"></div>' +
    '<div class="admin-field"><label>${S.time}</label><input data-f="time" value="' + escAttr(trip.time) + '"></div></div>' +
    '<div class="admin-row"><div class="admin-field"><label>${S.filt}</label><select data-f="destination">' +
    '<option value="shymkent"' + (trip.destination === "shymkent" ? " selected" : "") + ">${S.SH}</option>" +
    '<option value="almaty"' + (trip.destination === "almaty" ? " selected" : "") + ">\u0410\u043b\u043c\u0430\u0442\u044b</option>" +
    '<option value="taraz"' + (trip.destination === "taraz" ? " selected" : "") + ">\u0422\u0430\u0440\u0430\u0437</option></select></div>" +
    '<div class="admin-field"><label><input type="checkbox" data-f="featured"' + (trip.featured ? " checked" : "") + "> ${S.main}</label></div></div>";
  div.querySelector(".btn-del-trip").addEventListener("click", function () { div.remove(); renumberTrips(); });
  return div;
}

function renumberTrips() {
  document.querySelectorAll(".trip-edit").forEach(function (box, i) {
    box.querySelector(".trip-edit__head span").textContent = "${S.trip} " + (i + 1);
  });
}

function renderRoutesEditor(routes) {
  var list = document.getElementById("routes-list");
  list.innerHTML = "";
  routes.forEach(function (r, i) {
    var div = document.createElement("div");
    div.className = "route-edit";
    div.style.cssText = "border:1px solid rgba(255,200,80,0.15);border-radius:12px;padding:1rem;margin-bottom:0.75rem;background:rgba(0,0,0,0.15)";
    div.innerHTML = "<h2 style=\\"font-size:0.95rem;margin-bottom:0.75rem\\">${S.route} " + (i + 1) + "</h2>" +
      '<div class="admin-field"><label>${S.name}</label><input data-f="title" value="' + escAttr(r.title) + '"></div>' +
      '<div class="admin-field"><label>${S.info}</label><input data-f="info" value="' + escAttr(r.info) + '"></div>' +
      '<div class="admin-field"><label>${S.price}</label><input data-f="price" value="' + escAttr(r.price) + '"></div>';
    list.appendChild(div);
  });
}

function escAttr(s) {
  return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
}

function downloadJson(cfg) {
  var blob = new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "site-data.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

document.getElementById("btn-save").addEventListener("click", function () {
  var cfg = readForm();
  saveConfig(cfg);
  currentConfig = cfg;
  showToast("${S.savedF5}");
});

document.getElementById("btn-download").addEventListener("click", function () {
  var cfg = readForm();
  saveConfig(cfg);
  downloadJson(cfg);
  showToast("${S.dl}");
});

document.getElementById("btn-reset").addEventListener("click", function () {
  if (!confirm("${S.resetQ}")) return;
  localStorage.removeItem(STORAGE_KEY);
  fillForm(cloneDefaults());
  showToast("${S.resetOk}");
});

document.getElementById("btn-add-trip").addEventListener("click", function () {
  var list = document.getElementById("trips-list");
  list.appendChild(createTripBox({ from: "${S.AO}", to: "${S.SH}", date: "01.06.26", time: "12:00", destination: "shymkent", featured: false }, list.children.length + 1));
});

loadConfig().then(fillForm);
`;

writeFileSync(join(dir, "admin.js"), "\uFEFF" + js, "utf8");
console.log("admin.js OK");
