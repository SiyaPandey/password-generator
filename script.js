const passwordField = document.getElementById("password");
const lengthInput = document.getElementById("length");
const includeLower = document.getElementById("includeLower");
const includeUpper = document.getElementById("includeUpper");
const includeNumber = document.getElementById("includeNumber");
const includeSymbol = document.getElementById("includeSymbol");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");

const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberSet = "0123456789";
const symbolSet = "!@#$%^&*()_+[]{}<>?";

function generatePassword() {
  const length = parseInt(lengthInput.value);
  let chars = "";

  if (includeLower.checked) chars += lowerSet;
  if (includeUpper.checked) chars += upperSet;
  if (includeNumber.checked) chars += numberSet;
  if (includeSymbol.checked) chars += symbolSet;

  if (chars.length === 0) {
    alert("Please select at least one option!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    password += chars[randIndex];
  }

  passwordField.value = password;
  evaluateStrength(password);
}

function evaluateStrength(pwd) {
  let strength = 0;

  if (/[a-z]/.test(pwd)) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/\d/.test(pwd)) strength++;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

  if (pwd.length >= 14 && strength >= 3) {
    strengthText.textContent = "Strength: 🔥 Strong";
    strengthText.style.color = "green";
  } else if (pwd.length >= 10 && strength >= 2) {
    strengthText.textContent = "Strength: ⚡ Medium";
    strengthText.style.color = "orange";
  } else {
    strengthText.textContent = "Strength: ⚠️ Weak";
    strengthText.style.color = "red";
  }
}

document.getElementById("generateBtn").addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  if (passwordField.value === "") return;
  navigator.clipboard.writeText(passwordField.value);
  copyBtn.textContent = "✅";
  setTimeout(() => {
    copyBtn.textContent = "📋";
  }, 1000);
});

  