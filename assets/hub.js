// assets/hub.js
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }

function initCoopDropdown() {
  const btn = $("#coopBtn");
  const menu = $("#coopMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => menu.classList.toggle("hidden"));

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) menu.classList.add("hidden");
  });

  $all("[data-coop]", menu).forEach((item) => {
    item.addEventListener("click", () => {
      const label = item.getAttribute("data-coop-label") || item.textContent.trim();
      const target = $("#coopLabel");
      if (target) target.textContent = label;
      menu.classList.add("hidden");
      try { localStorage.setItem("hub_coop", label); } catch {}
    });
  });

  try {
    const saved = localStorage.getItem("hub_coop");
    if (saved && $("#coopLabel")) $("#coopLabel").textContent = saved;
  } catch {}
}

function initMobileSidebar() {
  const openBtn = $("#openSidebar");
  const closeBtn = $("#closeSidebar");
  const overlay = $("#sidebarOverlay");
  const sidebar = $("#sidebar");
  if (!openBtn || !closeBtn || !overlay || !sidebar) return;

  function open() {
    overlay.classList.remove("hidden");
    sidebar.classList.remove("-translate-x-full");
  }
  function close() {
    overlay.classList.add("hidden");
    sidebar.classList.add("-translate-x-full");
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  // ESC fecha
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setActiveMenu() {
  const path = location.pathname.split("/").pop() || "index.html";
  $all("[data-nav]").forEach((a) => {
    const href = a.getAttribute("href");
    const active = href === path;
    a.classList.toggle("bg-brand-green", active);
    a.classList.toggle("text-white", active);
    a.classList.toggle("font-semibold", active);
  });
}

function initHubShell() {
  initCoopDropdown();
  initMobileSidebar();
  setActiveMenu();
}

document.addEventListener("DOMContentLoaded", initHubShell);
