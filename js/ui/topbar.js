export function initTopbar() {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const root = document.documentElement;

  if (!toggleBtn || !icon) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.classList.add("dark");
    icon.classList.remove("bx-sun");
    icon.classList.add("bx-moon");
  }

  // Toggle event
  toggleBtn.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (isDark) {
      icon.classList.remove("bx-sun");
      icon.classList.add("bx-moon");
    } else {
      icon.classList.remove("bx-moon");
      icon.classList.add("bx-sun");
    }
  });
}

// Notification functionality
export function initNotifications() {
  const toggleBtn = document.getElementById("notificationToggle");
  const box = document.getElementById("notificationBox");

  if (!toggleBtn || !box) return;

  toggleBtn.addEventListener("click", () => {
    box.classList.toggle("hidden");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!box.contains(e.target) && !toggleBtn.contains(e.target)) {
      box.classList.add("hidden");
    }
  });
}

// profile functionality
export function initProfile() {
  const toggle = document.getElementById("profileToggle");
  const box = document.getElementById("profileBox");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!toggle || !box) return;

  // Toggle dropdown
  toggle.addEventListener("click", () => {
    box.classList.toggle("hidden");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!box.contains(e.target) && !toggle.contains(e.target)) {
      box.classList.add("hidden");
    }
  });

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("authUser"); // clear session
      window.location.href = "/login.html"; // redirect to login page
    });
  }
}
