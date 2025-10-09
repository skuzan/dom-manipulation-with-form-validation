// ? 1- Tüm form elementlerini seçin, Butonları seçin
//---------------------------------------------------

// const userName = document.getElementById(`username`);
// const email = document.getElementById(`email`);
// const password = document.getElementById(`password`);
// const validateButton = document.getElementById(`validateBtn`);
// const resetButton = document.getElementById(`resetBtn`);

const byId = (id) => document.getElementById(id);
const userName = byId("username");
const email = byId("email");
const password = byId("password");
const validateButton = byId("validateBtn");
const resetButton = byId("resetBtn");
const warningTitle = byId("warningTitle");
const warningMessage = byId("warningMessage");
const isPasswordStrong = byId("isPasswordStrong");

validateButton.addEventListener(`click`, function () {
  // Username Kontrolü
  if (userName.value.trim().length >= 3) {
    inputState(userName, "succes");
    console.log(`Kullanıcı adı geçerli`);
  } else if (userName.value.trim() === "") {
    inputState(userName, "warning");
    console.log(`Kullanıcı adı boş olamaz`);
  } else {
    inputState(userName, "error");
    console.log("Kullanıcı adı en az 3 karakter olmalı");
  }

  // Email Kontrolü
  if (isValidEmail(email.value)) {
    console.log("Eposta geçerli...");
    inputState(email, "succes");
  } else if (email.value.trim() === "") {
    inputState(email, "warning");
    console.log(`Eposta adresi boş olamaz.`);
  } else {
    inputState(email, "error");
    console.log(`E-posta adresi yanlış. Örnek: test@gmail.com"`);
  }

  // Password Kontrolü
  if (password.value.trim().length >= 6) {
    inputState(password, "succes");
    console.log(`Şifre geçerli`);
  } else if (password.value.trim() === "") {
    inputState(password, "warning");
    console.log(`Şifre boş olamaz`);
  } else {
    inputState(password, "error");
    console.log("Şifre en az 6 karakter olmalı");
  }
});

// Formu Temizle

resetButton.addEventListener(`click`, function () {
  userName.value = "";
  userName.className = "";
  email.value = "";
  email.className = "";
  password.value = "";
  password.className = "";
  isPasswordStrong.textContent = "";
});

// Runtime username Kontrolü

userName.addEventListener(`input`, function () {
  userName.className = "";
  if (userName.value.trim().length >= 3) {
    inputState(userName, "success");
  } else {
    warningTitle.innerHTML = "⚠️ Lütfen Bilgilerinizi Kontrol Edin";
    warningTitle.style.cssText = `font-size : 14px`;
    warningMessage.innerHTML = `Bazı alanlar eksik veya hatalı. Lütfen kırmızıyla işaretli kısımları düzeltin. Kullanıcı adı en az 3 karakter olmalıdır.`;
    warningMessage.style.cssText = `font-size : 12px`;
    inputState(userName, "error");
  }

  if (userName.value.trim().length === 0 || userName.value.trim().length >= 3) {
    warningTestReset();
    return;
  }
});

// Runtime Eposta Kontrolü

email.addEventListener(`input`, function () {
  email.classList.remove("input-success", "input-error");
  if (isValidEmail(email.value)) {
    inputState(email, "success");
  } else {
    warningTitle.innerHTML = "⚠️ Lütfen Bilgilerinizi Kontrol Edin";
    warningTitle.style.cssText = `font-size : 14px`;
    warningMessage.innerHTML = `Bazı alanlar eksik veya hatalı. Lütfen kırmızıyla işaretli kısımları düzeltin. Örnek : test@gmail.com`;
    warningMessage.style.cssText = `font-size : 12px`;
    email.classList.add("input-error");
  }

  if (email.value.length === 0 || isValidEmail(email.value)) {
    warningTestReset();
    return;
  }
});

// Runtime password Kontrolü

password.addEventListener(`input`, function () {
  const commonPasswords = [
    "123",
    "1234",
    "123456",
    "password",
    "123456789",
    "qwerty",
    "111111",
    "abc",
  ];
  password.classList.remove("input-success", "input-error");
  let score = 0;
  if (password.value.length >= 6) score++;
  if (/[A-Z]/.test(password.value)) score++;

  if (/[a-z]/.test(password.value)) score++;

  if (/[0-9]/.test(password.value)) score++;

  if (/[!@#$%^&*(),.?":{}|<>_\-+=~]/.test(password.value)) score++;

  if (commonPasswords.includes(password.value.toLowerCase()))
    alert(`Yaygın şifreler kullanmayınız...`);

  switch (score) {
    case 0:
    case 1:
      isPasswordStrong.innerText = `🔴 Şifre zayıf`;
      inputState(password, "error");
      warnungPassword();
      break;
    case 2:
      isPasswordStrong.innerHTML = `🔴 Şifre zayıf`;
      inputState(password, "error");
      warnungPassword();
      break;
    case 3:
      isPasswordStrong.innerHTML = `🟠 Şifre orta`;
      inputState(password, "warning");
      warnungPassword();
      break;
    case 4:
      isPasswordStrong.innerHTML = `🟠 Şifre orta`;
      inputState(password, "warning");
      warnungPassword();

      break;
    case 5:
      isPasswordStrong.innerHTML = `🟢 Şifre güçlü`;
      inputState(password, "succes");
      warningTestReset();

      break;
    default:
      isPasswordStrong.innerHTML = `🟢 Şifre güçlü`;
      inputState(password, "succes");
      warningTestReset();
      break;
  }

  if (password.value.length === 0) {
    warningTestReset();
    isPasswordStrong.textContent = "";
    return;
  }
});

//Şifre uyarısı

function warnungPassword() {
  warningTitle.innerHTML = "⚠️ Lütfen Bilgilerinizi Kontrol Edin";
  warningTitle.style.cssText = `font-size : 14px`;
  warningMessage.innerHTML = `Bazı alanlar eksik veya hatalı. Lütfen kırmızıyla işaretli kısımları düzeltin. <br> - Şifre en az 1 büyük harf içermelidir.<br> - Şifre en az 1 sayı içermelidir.<br> - Şifre en az 1 küçük harf içermelidir.<br> - Şifre en az 1 özel karakter içermelidir. (!,.-) <br> - Yaygın şifreler kullanmayınız. (123, 123456, password, abc, 111111, qwerty)`;
  warningMessage.style.cssText = `font-size : 12px`;
}

// Uyarı resetleme

function warningTestReset() {
  warningTitle.textContent = "";
  warningMessage.textContent = "";
}

//Email-Regex kontrolü

function isValidEmail(value) {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(value.trim());
}

//

function inputState(element, state) {
  element.classList.remove("input-success", "input-error", "input-warning");
  switch (state) {
    case "success":
      element.classList.add("input-success");
      break;
    case "error":
      element.classList.add("input-error");
      break;
    case "warning":
      element.classList.add("input-warning");
      break;

    default:
      break;
  }
}
