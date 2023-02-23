const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const timeDuration = document.getElementById("timeDuration");

const music = document.querySelector("audio");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "song1",
    displayName: "Stars Collide",
    artist: "Faberge",
  },
  {
    name: "song2",
    displayName: "Little Things Matter",
    artist: "Colin Fraser",
  },
  {
    name: "song3",
    displayName: "Wall of Fame",
    artist: "JAM Studio",
  },
  {
    name: "song4",
    displayName: "Different",
    artist: "FEsther Garcia Gonzalez",
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.setAttribute("name", "pause");
  playBtn.setAttribute("titulo", "pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.setAttribute("name", "play");
  playBtn.setAttribute("titulo", "play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      duration.textContent = `${durationMinutes} : ${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds) {
      currentTime.textContent = `${currentMinutes} : ${currentSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("click", setProgressBar);
