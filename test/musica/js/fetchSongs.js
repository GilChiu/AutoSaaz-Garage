import { applyScrollIfOverflowing } from './detectOverflow.js';


document.addEventListener('DOMContentLoaded', () => {
    fetch('https://devbox.musica.co.uk/datafunctions/getData.php?action=session')
        .then(response => response.text())
        .then(xmlText => {
            console.log('Raw XML:', xmlText);
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'application/xml');
            const songs = xml.querySelectorAll('songs > song');
            const songListEl = document.getElementById('song-list');

            if (!songListEl) {
                console.error('song-list element not found!');
                return;
            }

            songListEl.innerHTML = ''; // Clear previous content

            if (songs.length === 0) {
                songListEl.innerHTML = '<li>No songs found.</li>';
                return;
            }

            songs.forEach(song => {
                const title = song.querySelector('title')?.textContent || 'Empty';
                const artist = song.querySelector('artist')?.textContent || 'Empty';
                const votes = song.querySelector('votes')?.textContent || 'Empty';
                const shoutout = song.querySelector('shoutout')?.textContent || 'Empty';
                const user = song.querySelector('user')?.textContent || 'Empty';
                const imgSrc = song.querySelector('image')?.textContent || 'assets/image-placeholder.png';

                // Create song row (mobile-first, semantic, accessible)
                const li = document.createElement('li');
                li.className = 'song-row';
                li.innerHTML = `
                    <img src="${imgSrc}" alt="${title} cover" class="song-image" style="width:3vw;height:3vw;object-fit:cover;border:2px solid #fff;border-radius:4px;"/>
                    <div class="song-info">
                        <span class="song-title" aria-label="Song title">${title}</span>
                        <span class="song-artist" aria-label="Artist">${artist}</span>
                        <span class="song-votes" aria-label="Votes">${votes} Votes</span>
                    </div>
                `;
                songListEl.appendChild(li);
            });

            applyScrollIfOverflowing();
        })
        .catch((error) => {
            console.error('Fetch or parse error:', error);
        });
});