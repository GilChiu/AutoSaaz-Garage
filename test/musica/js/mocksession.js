const mockSession = {
  user: {
    username: "Test User 1",
    credits: 5,
  },
  songs: [
    {
      position: 1,
      song_artist_name: "The Royal Scots Dragoon Guards",
      song_title: "Amazing Grace",
      votecount: 2,
      userRequested: 0,
      userVoted: 1,
      shoutout: "shouty shoutout",
    },
    {
      position: 2,
      song_artist_name: "The New Radicals",
      song_title: "You Get What You Give",
      votecount: 2,
      userRequested: 0,
      userVoted: 0,
      shoutout: "",
    },
    {
        position: 3,
        song_artist_name: "Snoop Dogg & Charlie Wilson & Justin Timberla",
        song_title: "Signs",
        votecount: 2,
        userRequested: 0,
        userVoted: 0,
        shoutout: "",
    },
    {
        position: 4,
        song_artist_name: "Smokey Robinson",
        song_title: "Being With You",
        votecount: 2,
        userRequested: 0,
        userVoted: 0,
        shoutout: "",
    },
    {
        position: 5,
        song_artist_name: "Merril Bainbridge",
        song_title: "Mouth",
        votecount: 1,
        userRequested: 0,
        userVoted: 1,
        shoutout: "test shout",
    },
    {
        position: 6,
        song_artist_name: "Julie Covington",
        song_title: "Don't Cry For Me Argentina",
        votecount: 1,
        userRequested: 0,
        userVoted: 0,
        shoutout: "",
    },
    {
        position: 7,
        song_artist_name: "Glenn Miller",
        song_title: "Moonlight Serenade",
        votecount: 1,
        userRequested: 0,
        userVoted: 0,
        shoutout: "",
    },
    {
        position: 8,
        song_artist_name: "Dionne Farris",
        song_title: "I Know",
        votecount: 1,
        userRequested: 0,
        userVoted: 0,
        shoutout: "",
    },
    {
        position: 9,
        song_artist_name: "Michael Jackson",
        song_title: "You Are Not Alone",
        votecount: 1,
        userRequested: 1,
        userVoted: 0,
        shoutout: "",
    },
    {
        position: 10,
        song_artist_name: "Soul II Soul",
        song_title: "Get a Life",
        votecount: 1,
        userRequested: 0,
        userVoted: 1,
        shoutout: "",
    }
  ],
  timeRemaining: "4:39",
};

// Inject credits and time remaining
document.addEventListener("DOMContentLoaded", () => {
  const creditsCount = document.getElementById("creditsCount");
  const timeRemaining = document.getElementById("timeRemaining");
  if (creditsCount) creditsCount.textContent = mockSession.user.credits;
  if (timeRemaining) timeRemaining.textContent = mockSession.timeRemaining;

  // Render playlist
  const playlist = document.getElementById("playlist");
  if (playlist) {
    playlist.innerHTML = "";
    mockSession.songs.forEach(song => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${song.song_title}</strong> by ${song.song_artist_name}
          <span>Votes: ${song.votecount}</span>
          ${song.shoutout ? `<div class="shoutout">${song.shoutout}</div>` : ""}
        </div>
      `;
      playlist.appendChild(li);
    });
  }
});
