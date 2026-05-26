import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const LOGIN = "kasymhan123";
const PASS = "zpmqalvt1A#";

const js = `(function () {
  var SESSION_KEY = "altynOrdaAdminSession";
  var LOGIN = "${LOGIN}";
  var PASSWORD = "${PASS.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}";

  function setAuthed(on) {
    try {
      if (on) {
        sessionStorage.setItem(SESSION_KEY, "1");
        localStorage.setItem(SESSION_KEY, "1");
      } else {
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {}
    document.body.classList.toggle("admin-authed", !!on);
  }

  function isAuthed() {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return true;
      if (localStorage.getItem(SESSION_KEY) === "1") return true;
    } catch (e) {}
    return false;
  }

  function setError(msg) {
    var errorEl = document.getElementById("login-error");
    if (!errorEl) return;
    errorEl.textContent = msg || "";
    errorEl.hidden = !msg;
  }

  function tryLogin(user, pass) {
    var u = (user || "").trim();
    var p = pass || "";
    if (u === LOGIN && p === PASSWORD) {
      setError("");
      setAuthed(true);
      if (window.initAdminApp) window.initAdminApp();
      return true;
    }
    setError("\\u041d\\u0435\\u0432\\u0435\\u0440\\u043d\\u044b\\u0439 \\u043b\\u043e\\u0433\\u0438\\u043d \\u0438\\u043b\\u0438 \\u043f\\u0430\\u0440\\u043e\\u043b\\u044c");
    return false;
  }

  window.adminLogout = function () {
    setAuthed(false);
    location.reload();
  };

  function onSubmit(e) {
    if (e) e.preventDefault();
    var userEl = document.getElementById("login-user");
    var passEl = document.getElementById("login-pass");
    if (!userEl || !passEl) return;
    tryLogin(userEl.value, passEl.value);
  }

  function init() {
    var formEl = document.getElementById("login-form");
    var btnEl = document.getElementById("login-submit");
    if (formEl) formEl.addEventListener("submit", onSubmit);
    if (btnEl) btnEl.addEventListener("click", onSubmit);

    if (isAuthed()) {
      setAuthed(true);
      if (window.initAdminApp) window.initAdminApp();
    } else {
      setAuthed(false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;

writeFileSync(join(dir, "admin-auth.js"), "\uFEFF" + js, "utf8");
console.log("admin-auth.js OK");
