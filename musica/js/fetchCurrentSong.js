import { applyScrollIfOverflowing } from './detectOverflow.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://devbox.musica.co.uk/datafunctions/getData.php?action=session')
    .then(response => response.text())
    .then(xmlText => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'application/xml');
      const currentSong = xml.querySelector('currentSong');
       console.log('Session found');
      if (currentSong) {
        document.getElementById('now-playing-title').textContent =
          currentSong.querySelector('title')?.textContent || 'Nothing Playing';
        document.getElementById('now-playing-artist').textContent =
          currentSong.querySelector('artist')?.textContent || 'Unknown Artist';
        document.getElementById('now-playing-votes').textContent =
          (currentSong.querySelector('votes')?.textContent || '0') + ' Votes';
        document.getElementById('now-playing-shout-out').textContent =
          currentSong.querySelector('shoutout')?.textContent || 'No shoutout';
        document.getElementById('now-playing-user').textContent =
          currentSong.querySelector('user')?.textContent || '';
        const imgSrc = currentSong.querySelector('image')?.textContent || 'assets/image-placeholder.png';
        document.getElementById('now-playing-image').src = imgSrc;

        // ✅ Run after DOM update
        applyScrollIfOverflowing();
      } else {
        document.getElementById('now-playing-title').textContent = 'Waiting for session to start...';
        // Optionally clear the rest of the now-playing fields here
      }
    })
    .catch(() => {
      document.getElementById('now-playing-title').textContent = 'Error fetching data from DevBox.';
    });
});
