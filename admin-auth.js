(function () {
  var SESSION_KEY = "altynOrdaAdminSession";
  var LOGIN = "kasymhan123";
  var PASSWORD = "zpmqalvt1A#";

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

  var captchaAnswer = null;
  var pageLoadedAt = Date.now();

  function generateCaptcha() {
    var a = Math.floor(Math.random() * 5) + 3;
    var b = Math.floor(Math.random() * 5) + 2;
    captchaAnswer = a + b;
    var questionEl = document.getElementById("captcha-question");
    if (questionEl) {
      questionEl.textContent = "Сколько будет " + a + " + " + b + "?";
    }
  }

  function checkBotProtection() {
    var honeypotEl = document.getElementById("login-honeypot");
    if (honeypotEl && honeypotEl.value.trim() !== "") {
      setError("Проверка на бота не пройдена.");
      return false;
    }

    var captchaEl = document.getElementById("login-captcha");
    if (captchaEl) {
      if ((captchaEl.value || "").trim() !== String(captchaAnswer)) {
        setError("Неверный ответ анти-боту.");
        generateCaptcha();
        return false;
      }
    }

    if (Date.now() - pageLoadedAt < 1200) {
      setError("Пожалуйста, подождите секунду и попробуйте снова.");
      return false;
    }

    return true;
  }

  function tryLogin(user, pass) {
    if (!checkBotProtection()) {
      return false;
    }
    var u = (user || "").trim();
    var p = pass || "";
    if (u === LOGIN && p === PASSWORD) {
      setError("");
      setAuthed(true);
      if (window.initAdminApp) window.initAdminApp();
      return true;
    }
    setError("Неверный логин или пароль");
    generateCaptcha();
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
    generateCaptcha();
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
