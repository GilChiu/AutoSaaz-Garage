
// document.addEventListener('DOMContentLoaded', () => {
//   fetch('https://devbox.musica.co.uk/datafunctions/getData.php?action=session')
//     .then(response => response.text())
//     .then(xmlText => {
//       console.log('Raw XML:', xmlText);

//       const parser = new DOMParser();
//       const xml = parser.parseFromString(xmlText, 'application/xml');

//       const session = xml.querySelector('session');

//       if (session) {
//         const sessionId = session.getAttribute('id');
//         const status = session.getAttribute('status');
//         const user = session.getAttribute('user');

//         console.log(`✅ Session ID: ${sessionId}`);
//         console.log(`👤 User: ${user}`);
//         console.log(`📡 Status: ${status}`);

      

//       } else {
//         console.warn('No <session> tag found in XML.');
//       }
//     })
//     .catch(err => {
//       console.error('Error fetching session:', err);
//     });
// });

////////////////////////////////////////
// const url = `https://devbox.musica.co.uk/datafunctions/getData.php?mode=getPlaylist&user=31|126-710-102|MzEtMTI2LTcxMC0xMDI=`;

// fetch(url)
//   .then((res) => res.text())
//   .then((xmlText) => {
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlText, "text/xml");

//     const performerName = xmlDoc.querySelector("performer_name")?.textContent;
//     const credits = xmlDoc.querySelector("credits")?.textContent;
//     const htmlContent = xmlDoc.querySelector("htmldata")?.textContent;

//   })
//   .catch(console.error);

async function fetchSessionData() {
  try {
    const response = await fetch("https://devbox.musica.co.uk/datafunctions/getData.php?xml=1&mode=getSonglist&by=song&prefix=~&user=31|126-710-102|MzEtMTI2LTcxMC0xMDI="); // Replace with actual URL
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const songs = Array.from(xmlDoc.getElementsByTagName("song")).map((songNode) => ({
      title: songNode.getElementsByTagName("song_title")[0].textContent,
      artist: songNode.getElementsByTagName("song_artist_name")[0].textContent,
      image: songNode.getElementsByTagName("song_image")[0].textContent || "assets/image-placeholder.png",
      votes: 1
    }));

    if (!songs.length) return;

    const nowPlaying = songs[0];
    const upNext = songs[1];
    const restSongs = songs.slice(2);

    const nowPlayingEl = document.getElementById("nowPlaying");
    const upNextEl = document.getElementById("upNext");
    const moreSongsEl = document.getElementById("Songs");

    // NOW PLAYING
    nowPlayingEl.innerHTML = `
      <div class="now-playing-box">
        <div class="song-details">
          <div class="song-artwork-nowplayingUpNext" style="background-image: url('assets/${nowPlaying.image}')"></div>
          <div class="song-info">
            <div class="song-title-nowplaying">${nowPlaying.title}</div>
            <div class="song-artist">${nowPlaying.artist}</div>
          </div>
          <div class="plus-icon-box-nowplaying" aria-label="Vote">
            43
          </div>
        </div>
      </div>
    `;

    // UP NEXT
    upNextEl.innerHTML = `
      <div class="nowPlaying-title">Up Next</div>
      <div class="upnext-box">
        <div class="song-details">
          <div class="song-artwork-nowplayingUpNext" style="background-image: url('assets/${upNext.image}')"></div>
          <div class="song-info">
            <div class="song-title">${upNext.title}</div>
            <div class="song-artist">${upNext.artist}</div>
          </div>
          <div class="plus-icon-box-upnext" aria-label="Vote">
            20
          </div>
        </div>
      </div>
    `;

    // REST OF SONGS
    moreSongsEl.innerHTML = "";
    for (const song of restSongs) {
      const songItem = document.createElement("div");
      songItem.className = "song-item";
      songItem.innerHTML = `
        <div class="underline">
          <div class="song-details">
            <div class="song-artwork" style="background-image: url('assets/${song.image}')"></div>
            <div class="song-info">
              <div class="song-title">${song.title}</div>
              <div class="song-artist">${song.artist}</div>
              <div class="shoutOutIcon"></div>
            </div>
            <div class="plus-icon-box" aria-label="Vote">
              <svg class="vote-plus-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14M5 12h14" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span class="vote-count">${song.votes}</span>
            </div>
          </div>
        </div>
      `;
      moreSongsEl.appendChild(songItem);
    }

  } catch (error) {
    console.error("Error fetching session:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchSessionData);

