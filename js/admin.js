// js/admin.js
(() => {
  "use strict";

  // Check login
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin || admin.role !== "admin") {
    alert("Access denied. Redirecting to login...");
    window.location.href = "admin-login.html";
    return;
  }

  document.getElementById(
    "admin-name"
  ).textContent = `${admin.name} (${admin.role})`;

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("admin");
    window.location.href = "index.html";
  });

  // Tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Load Users
  function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const tbody = document.getElementById("user-list");
    tbody.innerHTML = "";
    users.forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><span class="badge" style="background:${
          u.role === "admin" ? "#dc3545" : "#28a745"
        };color:white;padding:2px 8px;border-radius:4px;">${u.role}</span></td>
        <td>${new Date(u.joined).toLocaleDateString()}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Video Upload
  const dropArea = document.getElementById("drop-area");
  const videoInput = document.getElementById("video-input");
  const preview = document.getElementById("preview");
  const form = document.getElementById("caption-form");
  const status = document.getElementById("upload-status");

  let selectedFile = null;

  ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => {
    dropArea.addEventListener(event, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  ["dragenter", "dragover"].forEach((event) => {
    dropArea.addEventListener(event, () => dropArea.classList.add("dragover"));
  });

  ["dragleave", "drop"].forEach((event) => {
    dropArea.addEventListener(event, () =>
      dropArea.classList.remove("dragover")
    );
  });

  dropArea.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) handleFile(file);
  });

  dropArea.addEventListener("click", () => videoInput.click());
  videoInput.addEventListener("change", () => {
    if (videoInput.files[0]) handleFile(videoInput.files[0]);
  });

  function handleFile(file) {
    selectedFile = file;
    const url = URL.createObjectURL(file);
    preview.innerHTML = `<video controls src="${url}"></video>`;
    form.style.display = "block";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const videos = JSON.parse(localStorage.getItem("videos") || "[]");
      const newVideo = {
        id: Date.now(),
        title: document.getElementById("title").value,
        caption: document.getElementById("caption").value,
        src: reader.result,
        uploaded: new Date().toISOString(),
        uploadedBy: admin.name,
      };
      videos.push(newVideo);
      localStorage.setItem("videos", JSON.stringify(videos));
      status.textContent = "Video uploaded successfully!";
      form.reset();
      preview.innerHTML = "";
      form.style.display = "none";
      loadVideos();
    };
    reader.readAsDataURL(selectedFile);
  });

  // Load Videos
  function loadVideos() {
    const videos = JSON.parse(localStorage.getItem("videos") || "[]");
    const container = document.getElementById("video-list");
    container.innerHTML = "";
    if (videos.length === 0) {
      container.innerHTML = "<p>No videos uploaded yet.</p>";
      return;
    }
    videos.forEach((v) => {
      const div = document.createElement("div");
      div.className = "video-item";
      div.innerHTML = `
        <video controls src="${v.src}" style="width:200px;"></video>
        <div style="flex:1;">
          <h3>${v.title}</h3>
          <p><strong>Caption:</strong> ${v.caption}</p>
          <p><small>Uploaded by ${v.uploadedBy} on ${new Date(
        v.uploaded
      ).toLocaleDateString()}</small></p>
        </div>
        <div class="video-actions">
          <button onclick="deleteVideo(${
            v.id
          })"><i class="fas fa-trash"></i></button>
        </div>
      `;
      container.appendChild(div);
    });
  }

  window.deleteVideo = (id) => {
    if (!confirm("Delete this video?")) return;
    let videos = JSON.parse(localStorage.getItem("videos") || "[]");
    videos = videos.filter((v) => v.id !== id);
    localStorage.setItem("videos", JSON.stringify(videos));
    loadVideos();
  };

  // Init
  loadUsers();
  loadVideos();
})();
