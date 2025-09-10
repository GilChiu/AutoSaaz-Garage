// js/navFooterRedirect.js

document.addEventListener('DOMContentLoaded', function() {
  const playlistBtn = document.getElementById('playlistBtn');
  if (playlistBtn) {
    playlistBtn.addEventListener('click', function() {
      window.location.href = 'home.html';
    });
  }
});
