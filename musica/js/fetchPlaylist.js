// js/fetchPlaylist.js
export async function fetchPlaylist() {
  const url = "https://devbox.musica.co.uk/datafunctions/getData.php?xml=1&mode=getPlaylist&user=31|126-710-102|MzEtMTI2LTcxMC0xMDI=";

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Check for redirect to login
    if (text.startsWith("<!DOCTYPE html>")) {
      console.error("Redirected to login page. Not authenticated?");
      return [];
    }

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const songNodes = xml.getElementsByTagName("song");

    const songs = Array.from(songNodes).map((song) => {
      const id = song.getElementsByTagName("song_id")[0]?.textContent || "";
      const title = song.getElementsByTagName("song_title")[0]?.textContent || "";
      const artist = song.getElementsByTagName("song_artist_name")[0]?.textContent || "";
      const image = song.getElementsByTagName("song_image")[0]?.textContent || "";

      return { id, title, artist, image };
    });

    return songs;
  } catch (error) {
    console.error("Error fetching/parsing playlist:", error);
    return [];
  }
}
