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

validateButton.addEventListener(`click`, function () {
  // Username Kontrolü
  if (userName.value.trim().length >= 3) {
    userName.classList.add("input-success");
    console.log(`Kullanıcı adı geçerli`);
  } else if (userName.value.trim() === "") {
    userName.classList.add("input-warning");
    console.log(`Kullanıcı adı boş olamaz`);
  } else {
    userName.classList.add("input-error");
    console.log("Kullanıcı adı en az 3 karakter olmalı");
  }

  // Email Kontrolü
  if (email.value.includes("@") && email.value.includes(".")) {
    console.log("Eposta geçerli...");
    email.classList.add("input-success");
  } else if (email.value.trim() === "") {
    email.classList.add("input-warning");
    console.log(`Eposta adresi boş olamaz.`);
  } else {
    email.classList.add("input-error");
    console.log(`E-posta adresi yanlış. Örnek: test@gmail.com"`);
  }

  // Password Kontrolü
  if (password.value.trim().length >= 6) {
    password.classList.add("input-success");
    console.log(`Şifre geçerli`);
  } else if (password.value.trim() === "") {
    password.classList.add("input-warning");
    console.log(`Şifre boş olamaz`);
  } else {
    password.classList.add("input-error");
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
});
