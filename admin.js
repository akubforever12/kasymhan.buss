var currentConfig = null;

function showToast(msg) {
  var toast = document.getElementById("toast");
  toast.textContent = msg || "Сохранено!";
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
  var routeLine = document.getElementById("next-route").value.trim();
  cfg.nextTrip = {
    route: routeLine,
    from: routeLine.split("\u2192")[0].trim() || routeLine,
    to: routeLine.split("\u2192").pop().trim() || routeLine,
  };
  cfg.contact.title = document.getElementById("contact-title").value.trim();
  cfg.contact.text = document.getElementById("contact-text").value.trim();
  cfg.footer = document.getElementById("footer-text").value.trim();
  cfg.trips = [];
  document.querySelectorAll(".trip-edit").forEach(function (box) {
    var r = box.querySelector('[data-f="route"]').value.trim();
    cfg.trips.push({
      route: r,
      from: r.split("\u2192")[0].trim() || r,
      to: r.split("\u2192").pop().trim() || r,
      destination: box.querySelector('[data-f="destination"]').value,
      featured: box.querySelector('[data-f="featured"]').checked,
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
  document.getElementById("next-route").value =
    cfg.nextTrip.route || (cfg.nextTrip.from + " \u2192 " + cfg.nextTrip.to);
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
    '<div class="trip-edit__head"><span>Рейс ' + num + '</span><button type="button" class="btn btn--danger btn-del-trip">Удалить</button></div>' +
    '<div class="admin-field"><label>Маршрут</label><input data-f="route" value="' +
    escAttr(trip.route || (trip.from + " \u2192 " + trip.to)) +
    '"></div>' +
    '<div class="admin-field"><label><input type="checkbox" data-f="featured"' +
    (trip.featured ? " checked" : "") +
    "> Популярное</label></div>";
  div.querySelector(".btn-del-trip").addEventListener("click", function () { div.remove(); renumberTrips(); });
  return div;
}

function renumberTrips() {
  document.querySelectorAll(".trip-edit").forEach(function (box, i) {
    box.querySelector(".trip-edit__head span").textContent = "Рейс " + (i + 1);
  });
}

function renderRoutesEditor(routes) {
  var list = document.getElementById("routes-list");
  list.innerHTML = "";
  routes.forEach(function (r, i) {
    var div = document.createElement("div");
    div.className = "route-edit";
    div.style.cssText = "border:1px solid rgba(255,200,80,0.15);border-radius:12px;padding:1rem;margin-bottom:0.75rem;background:rgba(0,0,0,0.15)";
    div.innerHTML = "<h2 style=\"font-size:0.95rem;margin-bottom:0.75rem\">Маршрут " + (i + 1) + "</h2>" +
      '<div class="admin-field"><label>Название</label><input data-f="title" value="' + escAttr(r.title) + '"></div>' +
      '<div class="admin-field"><label>Описание</label><input data-f="info" value="' + escAttr(r.info) + '"></div>' +
      '<div class="admin-field"><label>Цена</label><input data-f="price" value="' + escAttr(r.price) + '"></div>';
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

function bindAdminEvents() {
  if (window.__adminBound) return;
  window.__adminBound = true;

  var btnSave = document.getElementById("btn-save");
  var btnDownload = document.getElementById("btn-download");
  var btnReset = document.getElementById("btn-reset");
  var btnAddTrip = document.getElementById("btn-add-trip");

  if (btnSave) {
    btnSave.addEventListener("click", function () {
      var cfg = readForm();
      saveConfig(cfg);
      currentConfig = cfg;
      showToast("Сохранено! Обновите главную (F5)");
    });
  }

  if (btnDownload) {
    btnDownload.addEventListener("click", function () {
      var cfg = readForm();
      saveConfig(cfg);
      downloadJson(cfg);
      showToast("Файл site-data.json скачан — положите в папку site");
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", function () {
      if (!confirm("Вернуть всё как в начале?")) return;
      localStorage.removeItem(STORAGE_KEY);
      fillForm(cloneDefaults());
      showToast("Сброшено");
    });
  }

  if (btnAddTrip) {
    btnAddTrip.addEventListener("click", function () {
      var list = document.getElementById("trips-list");
      list.appendChild(
        createTripBox(
          {
            route: "\u0410\u043b\u043c\u0430\u0442\u044b \u2192 \u0428\u044b\u043c\u043a\u0435\u043d\u0442",
            from: "\u0410\u043b\u043c\u0430\u0442\u044b",
            to: "\u0428\u044b\u043c\u043a\u0435\u043d\u0442",
            destination: "all",
            featured: false,
          },
          list.children.length + 1
        )
      );
    });
  }
}

function initAdminApp() {
  if (window.__adminReady) return;
  window.__adminReady = true;
  bindAdminEvents();
  loadConfig().then(function (cfg) {
    fillForm(normalizeConfig(cfg));
  });
}

window.initAdminApp = initAdminApp;
