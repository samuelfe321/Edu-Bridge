function oauthLogin(provider) {
  speak(`Signing up with ${provider}`);
  setTimeout(() => alert(`Account created with ${provider}!`), 800);
}

const pwd = document.getElementById("regPassword");
const confirm = document.getElementById("confirmPassword");
const mismatch = document.getElementById("passwordMismatch");

confirm?.addEventListener("input", () => {
  if (!confirm.value) {
    mismatch.textContent = "";
    confirm.setCustomValidity("");
    return;
  }
  if (pwd.value !== confirm.value) {
    mismatch.textContent = "Passwords do not match";
    confirm.setCustomValidity("Mismatch");
  } else {
    mismatch.textContent = "";
    confirm.setCustomValidity("");
  }
});

document.getElementById("firstName")?.focus();