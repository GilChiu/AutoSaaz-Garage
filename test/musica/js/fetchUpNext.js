import { applyScrollIfOverflowing } from './detectOverflow.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://devbox.musica.co.uk/datafunctions/getData.php?action=session')
    .then(response => response.text())
    .then(xmlText => {
      console.log('Raw XML:', xmlText);
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'application/xml');
      const upNext = xml.querySelector('UpNextSong');
      const upNextTitleEl = document.getElementById('up-next-title');
      if (upNextTitleEl) {
        upNextTitleEl.textContent = upNext.querySelector('title')?.textContent || 'Empty';
      } else {
        console.error('up-next-title element not found!');
      }      

      if (upNext) {
        document.getElementById('up-next-title').textContent =
          upNext.querySelector('title')?.textContent || 'Empty';
        document.getElementById('up-next-artist').textContent =
          upNext.querySelector('artist')?.textContent || 'Empty';
        document.getElementById('up-next-votes').textContent =
          (upNext.querySelector('votes')?.textContent || 'Empty') + ' Votes';
        document.getElementById('up-next-user').textContent =
          upNext.querySelector('user')?.textContent || 'Empty';
        const imgSrc = upNext.querySelector('image')?.textContent || 'assets/image-placeholder.png';
        document.getElementById('up-next-image').src = imgSrc;

        applyScrollIfOverflowing();
      } else {
        document.getElementById('up-next-title').textContent = 'No next song.';
      }
    })
    .catch((error) => {
      console.error('Fetch or parse error:', error);
    });
});