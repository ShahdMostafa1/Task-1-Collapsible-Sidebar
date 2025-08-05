// DOM Elements
const toggleBtn = document.getElementById("toggleBtn");
const toggleIcon = document.getElementById("toggleIcon");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const logoPlaceholder = document.getElementById('logoPlaceholder');
const logoUpload = document.getElementById('logoUpload');
const editLogo = document.getElementById('editLogo');
const deleteLogo = document.getElementById('deleteLogo');

// Sidebar Toggle Functionality
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  toggleIcon.innerHTML = sidebar.classList.contains("collapsed") ? "&#9776;" : "&times;";
});

// Auto-close sidebar on mobile when clicking links
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.add('collapsed');
      toggleIcon.innerHTML = "&#9776;";
    }
  });
});

// Logo Management Functions
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    logoPlaceholder.innerHTML = `
      <div class="logo-image-container">
        <img src="${e.target.result}" alt="Company Logo">
      </div>
      <div class="logo-actions">
        <button class="logo-btn" id="editLogo" title="Change logo">🖊️</button>
        <button class="logo-btn" id="deleteLogo" title="Remove logo">🗑️</button>
      </div>
    `;
    logoPlaceholder.classList.add('has-logo');
    setupLogoEventListeners();
  };
  reader.readAsDataURL(file);
}

function resetLogo() {
  logoPlaceholder.innerHTML = `
    <div class="logo-image-container">
      <span class="logo-text">LOGO</span>
    </div>
    <div class="logo-actions">
      <button class="logo-btn" id="editLogo" title="Upload logo">🖊️</button>
      <button class="logo-btn" id="deleteLogo" title="Remove logo">🗑️</button>
    </div>
  `;
  logoPlaceholder.classList.remove('has-logo');
  logoUpload.value = '';
  setupLogoEventListeners();
}

function setupLogoEventListeners() {
  // Get fresh references after DOM updates
  const currentEditBtn = document.getElementById('editLogo');
  const currentDeleteBtn = document.getElementById('deleteLogo');
  
  if (currentEditBtn) {
    currentEditBtn.addEventListener('click', () => logoUpload.click());
  }
  
  if (currentDeleteBtn) {
    currentDeleteBtn.addEventListener('click', resetLogo);
  }
}

// Initial Event Listeners
editLogo.addEventListener('click', () => logoUpload.click());
deleteLogo.addEventListener('click', resetLogo);
logoUpload.addEventListener('change', handleLogoUpload);

// MutationObserver for logo state changes (optional)
const logoObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      const hasLogo = logoPlaceholder.querySelector('img') !== null;
      logoPlaceholder.classList.toggle('has-logo', hasLogo);
    }
  });
});

logoObserver.observe(logoPlaceholder, { 
  childList: true, 
  subtree: true 
});

// Initialize logo state
setupLogoEventListeners();