(() => {
  'use strict';
  const synth = window.speechSynthesis;
  let ttsEnabled = false;
  const darkBtn = document.getElementById('dark-mode-toggle');
  const ttsBtn = document.getElementById('tts-toggle');
  // Dark Mode
  darkBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    darkBtn.setAttribute('aria-pressed', isDark);
    speak(isDark ? 'Dark mode enabled' : 'Dark mode disabled');
    localStorage.setItem('darkMode', isDark);
  });
  // TTS
  ttsBtn?.addEventListener('click', () => {
    ttsEnabled = !ttsEnabled;
    ttsBtn.setAttribute('aria-pressed', ttsEnabled);
    speak(ttsEnabled ? 'Text-to-speech enabled' : 'Text-to-speech disabled');
    localStorage.setItem('tts', ttsEnabled);
  });
  document.addEventListener('click', e => {
    if (!ttsEnabled) return;
    const el = e.target.closest('.tts-content') || e.target;
    if (el && el.textContent.trim()) speak(el.textContent);
  });
  function speak(text) {
    synth.cancel();
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    synth.speak(utter);
  }
  // Load Settings
  if (localStorage.getItem('darkMode') === 'true') darkBtn?.click();
  if (localStorage.getItem('tts') === 'true') ttsBtn?.click();
})();
