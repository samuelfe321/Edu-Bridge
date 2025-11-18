(() => {
  'use strict';
  const synth = window.speechSynthesis;
  let ttsEnabled = false;
  let fontSize = 16;

  const darkBtn = document.getElementById('dark-mode-toggle');
  const ttsBtn = document.getElementById('tts-toggle');
  const incBtn = document.getElementById('font-increase');
  const decBtn = document.getElementById('font-decrease');
  const resetBtn = document.getElementById('font-reset');

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

  // Font Size
  incBtn?.addEventListener('click', () => {
    fontSize = Math.min(fontSize + 2, 28);
    document.documentElement.style.fontSize = fontSize + 'px';
    announce(`Font size increased`);
  });

  decBtn?.addEventListener('click', () => {
    fontSize = Math.max(fontSize - 2, 12);
    document.documentElement.style.fontSize = fontSize + 'px';
    announce(`Font size decreased`);
  });

  resetBtn?.addEventListener('click', () => {
    fontSize = 16;
    document.documentElement.style.fontSize = '16px';
    announce(`Font size reset`);
  });

  function announce(msg) {
    const div = document.createElement('div');
    div.setAttribute('aria-live', 'polite');
    div.className = 'visually-hidden';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1000);
  }

  // Load Settings
  if (localStorage.getItem('darkMode') === 'true') darkBtn?.click();
  if (localStorage.getItem('tts') === 'true') ttsBtn?.click();
  const savedSize = localStorage.getItem('fontSize');
  if (savedSize) {
    fontSize = parseInt(savedSize);
    document.documentElement.style.fontSize = fontSize + 'px';
  }
})();
