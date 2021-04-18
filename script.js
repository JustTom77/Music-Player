const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// ==> MUSIC <==
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electrical Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
// ==> CHECK IF PLAYING <==
let isPlaying = false;

// ==> PLAY <==
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
// ==> PAUSE <==
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// ==> PLAY OR PAUSE EVENT LISTENER <==
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// ==> UPDATE DOM <==
function loadSong(songs) {
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  image.src = `img/${songs.name}.jpg`;
}

// ==> CURRENT SONG <==
let currentSongIndex = 0;
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}

// ==> ON LOAD <==
loadSong(songs[currentSongIndex]);

// ==> UPDATE PROGRESS BAR AND TIME <==
function updateProgessbar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // ==> UPATE  PROGRESS BAR WIDTH <==
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // ==> CALCULATE DISPLAY FOR DURATION <==
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // ==> DELAY SWITCHING DURATION ELEMENT TO AVOID NaN <==
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // ==> CALCULATE DISPLAY FOR DISPLAY CURRENTTIME <==
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// ==> SET PROGRESSBAR <==
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// ==> EVENT LISTENERS <==
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgessbar);
progressContainer.addEventListener("click", setProgressBar);
