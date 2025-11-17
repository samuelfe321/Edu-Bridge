// === Theme & TTS ===
const themeBtn = document.getElementById("themeBtn");
const ttsBtn = document.getElementById("ttsBtn");
const body = document.body;
function updateThemeButton() {
  const isDark = body.getAttribute("data-theme") === "dark";
  const icon = themeBtn?.querySelector('i');
  if (icon) {
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }
  if (themeBtn) {
    themeBtn.setAttribute("aria-label", isDark ? "Light Mode" : "Dark Mode");
    themeBtn.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
  }
}
// Load saved theme
const saved = localStorage.getItem("theme");
if (saved === "dark") {
  body.setAttribute("data-theme", "dark");
  themeBtn?.setAttribute("aria-pressed", "true");
}
updateThemeButton();
// Toggle Theme
themeBtn?.addEventListener("click", () => {
  const isDark = body.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "standard" : "dark";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeBtn.setAttribute("aria-pressed", !isDark);
  updateThemeButton();
});
// TTS
ttsBtn?.addEventListener("click", () => {
  const isOn = body.getAttribute("data-tts") === "on";
  body.setAttribute("data-tts", isOn ? "off" : "on");
  ttsBtn.setAttribute("aria-pressed", !isOn);
  if (!isOn) speak("Text-to-speech enabled.");
  else speechSynthesis.cancel();
});
function speak(text) {
  if (body.getAttribute("data-tts") !== "on") return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9; utter.pitch = 1;
  speechSynthesis.speak(utter);
}
// Auto-read on focus
document.querySelectorAll("input, button").forEach(el => {
  el.addEventListener("focus", () => {
    const label = el.closest(".field")?.querySelector("label")?.textContent ||
                  el.textContent || el.getAttribute("aria-label") || "";
    if (label) speak(label);
  });
});
// Password eye toggle
document.querySelectorAll(".toggle-password").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    const isPwd = input.type === "password";
    input.type = isPwd ? "text" : "password";
    btn.innerHTML = isPwd ? '<i class="fa fa-eye-slash"></i>' : '<i class="fa fa-eye"></i>';
  });
});
