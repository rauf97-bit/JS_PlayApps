const main = document.querySelector(".main"),
  musicImg = main.querySelector(".music-img img"),
  musicTitle = main.querySelector(".music-text .title"),
  musicAuthor = main.querySelector(".music-text .author"),
  musicList = main.querySelector(".music-list"),
  currentAudio = main.querySelector("audio"),
  controls = main.querySelector(".controls"),
  repeat = controls.querySelector(".fa-repeat"),
  prev = controls.querySelector(".fa-step-backward"),
  next = controls.querySelector(".fa-step-forward"),
  list = controls.querySelector(".fa-list"),
  playPause = controls.querySelector(".play-btn"),
  pause = controls.querySelector(".fa-pause-circle"),
  cross = document.querySelector(".fa-times"),
  progressArea = main.querySelector(".music-progress"),
  progressBar = main.querySelector(".progress-bar"),
  currentTime = main.querySelector(".current"),
  fullTime = main.querySelector(".end");

let indexNum = 1;

list.addEventListener("click", () => {
  musicList.classList.add("show");
});
cross.addEventListener("click", () => {
  musicList.classList.remove("show");
});
const showCurrentSong = () => {
  musicTitle.innerText = songs[indexNum - 1].track;
  musicAuthor.innerText = songs[indexNum - 1].artiste;
  musicImg.src = songs[indexNum - 1].img;
  currentAudio.src = songs[indexNum - 1].src;
  // console.log(currentAudio.src)
};
showCurrentSong();

function playSong() {
  main.classList.add("paused");
  playPause.classList = "fa fa-pause-circle play-btn";
  currentAudio.play();
}
function pauseSong() {
  main.classList.remove("paused");
  playPause.classList = "fa fa-play-circle play-btn";
  currentAudio.pause();
}

playPause.addEventListener("click", () => {
  const isMusicPlaying = main.classList.contains("paused");
  isMusicPlaying ? pauseSong() : playSong();
});
function nextSong() {
  indexNum++;
  indexNum > songs.length ? (indexNum = 1) : (indexNum = indexNum);
}
function prevSong() {
  indexNum--;
  indexNum < 1 ? (indexNum = songs.length) : (indexNum = indexNum);
}

next.addEventListener("click", () => {
  nextSong();
  showCurrentSong();
  playSong();
});
prev.addEventListener("click", () => {
  prevSong();
  console.log(indexNum);
  showCurrentSong();
  playSong();
});

currentAudio.addEventListener("timeupdate", (e) => {
  let instantTime = e.target.currentTime,
    duration = e.target.duration;
  const newWidth = (instantTime / duration) * 100;
  progressBar.style.width = `${newWidth}%`;

  currentAudio.addEventListener("loadeddata", () => {
    // console.log(currentAudio.currentTime, currentAudio.duration)

    let fullDuration = currentAudio.duration;
    let timeToMin = Math.floor(fullDuration / 60);
    let timeToSec = Math.floor(fullDuration % 60);
    if (timeToSec < 10) {
      timeToSec = `0${timeToSec}`;
    }
    fullTime.innerText = `${timeToMin}:${timeToSec}`;
  });
  let currentDuration = currentAudio.currentTime;
  let timeMin = Math.floor(currentDuration / 60);
  let timeSec = Math.floor(currentDuration % 60);
  if (timeSec < 10) {
    timeSec = `0${timeSec}`;
  }
  currentTime.innerText = `${timeMin}:${timeSec}`;
});

progressArea.addEventListener('click', (e) => {
  let progressBarWidth = progressArea.clientWidth;
  let progressOffsetX = e.offsetX;
  let songDuration = currentAudio.duration
  currentAudio.currentTime = (progressOffsetX / progressBarWidth) * songDuration;
  // console.log(progressOffsetX)
})