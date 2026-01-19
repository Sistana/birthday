const audio = document.getElementById("audio");

const listItems = document.querySelectorAll(".list-item");

const playBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const coverImg = document.getElementById("playerCover");
const titleEl = document.getElementById("playerTitle");

const progressBar = document.querySelector(".progress-bar");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");

const openPlaylistBtn = document.getElementById("openPlaylist");
const audioList = document.querySelector(".audio-list");


let currentIndex = 0;
let isPlaying = false;

function loadAudio(index) {
  const item = listItems[index];

  audio.src = item.dataset.audio;
  titleEl.textContent = item.dataset.title;
  coverImg.src = item.dataset.cover;

  listItems.forEach(li => li.classList.remove("active"));
  item.classList.add("active");

  currentIndex = index;
}

function playAudio() {
  audio.play();
  isPlaying = true;
  playBtn.src = "aset birthday/btn-pause.png";
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.src = "aset birthday/btn-play.png";
}

function resetProgress() {
  audio.currentTime = 0;
  progress.style.width = "0%";
  currentTimeEl.textContent = "00:00";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseAudio() : playAudio();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex === 0) return;
  loadAudio(currentIndex - 1);
  playAudio();
});

nextBtn.addEventListener("click", () => {
  if (currentIndex === listItems.length - 1) {
    pauseAudio(); 
    return;
  }
  loadAudio(currentIndex + 1);
  playAudio();
});

listItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    loadAudio(index);
    playAudio();

    audioList.classList.remove("open");
  });
});

listItems.forEach((item) => {
  const tempAudio = new Audio();
  tempAudio.src = item.dataset.audio;

  tempAudio.addEventListener("loadedmetadata", () => {
    const durationEl = item.querySelector(".duration");
    durationEl.textContent = formatTime(tempAudio.duration);
  });
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

audio.addEventListener("ended", () => {
  if (currentIndex < listItems.length - 1) {
    loadAudio(currentIndex + 1);
    playAudio();
  } else {
    loadAudio(0);    
    pauseAudio();    
    resetProgress();
  }
});

openPlaylistBtn.addEventListener("click", () => {
  audioList.classList.toggle("open");
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

loadAudio(0);