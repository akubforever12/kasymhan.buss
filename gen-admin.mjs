import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const T = {
  title: "\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0430\u0439\u0442",
  intro:
    "\u041c\u0435\u043d\u044f\u0439\u0442\u0435 \u0442\u0435\u043a\u0441\u0442\u044b \u0438 \u0440\u0435\u0439\u0441\u044b \u0437\u0434\u0435\u0441\u044c, \u043f\u043e\u0442\u043e\u043c \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u00ab\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c\u00bb. \u041e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 (F5).",
  open: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0441\u0430\u0439\u0442",
  save: "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",
  dl: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0434\u043b\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438",
  reset: "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u0441\u0451",
};

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${T.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="admin.css">
</head>
<body>
  <div class="bg-glow bg-glow--1"></div>
  <div class="bg-glow bg-glow--2"></div>
  <div class="grid-overlay"></div>
  <div class="admin-page">
    <div class="admin-head">
      <h1>${T.title}</h1>
      <p>${T.intro}</p>
    </div>
    <div class="admin-actions-top">
      <a href="index.html" class="btn btn--primary">${T.open}</a>
      <button type="button" class="btn btn--whatsapp" id="btn-save">${T.save}</button>
      <button type="button" class="btn btn--ghost" id="btn-download">${T.dl}</button>
      <button type="button" class="btn btn--ghost" id="btn-reset">${T.reset}</button>
    </div>
    <form id="admin-form">
      <section class="admin-card"><h2>WhatsApp</h2>
        <div class="admin-field"><label for="whatsapp">\u041d\u043e\u043c\u0435\u0440 (77023555998)</label><input type="text" id="whatsapp" required></div>
      </section>
      <section class="admin-card"><h2>\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435</h2>
        <div class="admin-field"><label for="brand-name">\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a</label><input type="text" id="brand-name" required></div>
        <div class="admin-field"><label for="brand-sub">\u041f\u043e\u0434\u043f\u0438\u0441\u044c</label><input type="text" id="brand-sub"></div>
      </section>
      <section class="admin-card"><h2>\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u044d\u043a\u0440\u0430\u043d</h2>
        <div class="admin-field"><label for="hero-badge">\u041f\u043b\u0430\u0448\u043a\u0430</label><input type="text" id="hero-badge"></div>
        <div class="admin-row">
          <div class="admin-field"><label for="hero-before">\u0414\u043e \u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u044f</label><input type="text" id="hero-before"></div>
          <div class="admin-field"><label for="hero-highlight">\u0412\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435</label><input type="text" id="hero-highlight"></div>
        </div>
        <div class="admin-field"><label for="hero-after">\u041f\u043e\u0441\u043b\u0435 \u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u044f</label><input type="text" id="hero-after"></div>
        <div class="admin-field"><label for="hero-desc">\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435</label><textarea id="hero-desc"></textarea></div>
      </section>
      <section class="admin-card"><h2>\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0439 \u0440\u0435\u0439\u0441</h2>
        <div class="admin-row">
          <div class="admin-field"><label for="next-from">\u041e\u0442\u043a\u0443\u0434\u0430</label><input type="text" id="next-from"></div>
          <div class="admin-field"><label for="next-to">\u041a\u0443\u0434\u0430</label><input type="text" id="next-to"></div>
        </div>
        <div class="admin-row">
          <div class="admin-field"><label for="next-date">\u0414\u0430\u0442\u0430</label><input type="text" id="next-date"></div>
          <div class="admin-field"><label for="next-time">\u0412\u0440\u0435\u043c\u044f</label><input type="text" id="next-time"></div>
        </div>
        <div class="admin-field"><label for="next-seats">\u041c\u0435\u0441\u0442\u0430</label><input type="text" id="next-seats"></div>
      </section>
      <section class="admin-card"><h2>\u0420\u0430\u0441\u043f\u0438\u0441\u0430\u043d\u0438\u0435</h2>
        <div id="trips-list"></div>
        <button type="button" class="btn btn--ghost" id="btn-add-trip">+ \u0420\u0435\u0439\u0441</button>
      </section>
      <section class="admin-card"><h2>\u0426\u0435\u043d\u044b</h2><div id="routes-list"></div></section>
      <section class="admin-card"><h2>\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b</h2>
        <div class="admin-field"><label for="contact-title">\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a</label><input type="text" id="contact-title"></div>
        <div class="admin-field"><label for="contact-text">\u0422\u0435\u043a\u0441\u0442</label><textarea id="contact-text"></textarea></div>
        <div class="admin-field"><label for="footer-text">\u041f\u043e\u0434\u0432\u0430\u043b</label><input type="text" id="footer-text"></div>
      </section>
    </form>
  </div>
  <div class="admin-toast" id="toast"></div>
  <script src="config.js"></script>
  <script src="admin.js"></script>
</body>
</html>`;

writeFileSync(join(dir, "admin.html"), "\uFEFF" + html, "utf8");
console.log("admin.html OK");
