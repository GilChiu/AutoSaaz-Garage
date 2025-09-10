
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

const url = `https://devbox.musica.co.uk/datafunctions/getData.php?mode=getPlaylist&user=31|126-710-102|MzEtMTI2LTcxMC0xMDI=`;

fetch(url)
  .then((res) => res.text())
  .then((xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const performerName = xmlDoc.querySelector("performer_name")?.textContent;
    const credits = xmlDoc.querySelector("credits")?.textContent;
    const htmlContent = xmlDoc.querySelector("htmldata")?.textContent;

    console.log("Performer:", performerName);
    console.log("Credits:", credits);
    console.log("HTML Message:", htmlContent);
  })
  .catch(console.error);