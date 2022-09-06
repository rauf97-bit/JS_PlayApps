// Selectors
const main = document.querySelector(".main"),
  musicImg = main.querySelector(".music-img img"),
  musicTitle = main.querySelector(".music-text .title"),
  musicAuthor = main.querySelector(".music-text .author"),
  musicList = main.querySelector(".music-list"),
  currentAudio = main.querySelector("audio"),
  controls = main.querySelector(".controls"),
  repeatBtn = controls.querySelector(".fa-repeat"),
  prev = controls.querySelector(".fa-step-backward"),
  next = controls.querySelector(".fa-step-forward"),
  list = controls.querySelector(".fa-list"),
  playPause = controls.querySelector(".play-btn"),
  pause = controls.querySelector(".fa-pause-circle"),
  cross = document.querySelector(".fa-times"),
  progressArea = main.querySelector(".music-progress"),
  progressBar = main.querySelector(".progress-bar"),
  currentTime = main.querySelector(".current"),
  fullTime = main.querySelector(".end"),
  musicPopup = main.querySelector(".music-content");

let musicIndex = 1;
// Show music popup List
list.addEventListener("click", () => {
  musicList.classList.add("show");
});
cross.addEventListener("click", () => {
  musicList.classList.remove("show");
});

// Load the current song on webpage
const showCurrentSong = (indexNum) => {
  musicTitle.innerText = songs[indexNum - 1].track;
  musicAuthor.innerText = songs[indexNum - 1].artiste;
  musicImg.src = songs[indexNum - 1].img;
  currentAudio.src = songs[indexNum - 1].src;
  // console.log(currentAudio.src)
};
showCurrentSong(musicIndex);

// Play and Pause song function
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

// Play Next & Previous song Function
function nextSong() {
  musicIndex++;
  musicIndex > songs.length ? (musicIndex = 1) : (musicIndex = musicIndex);
}
function prevSong() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = songs.length) : (musicIndex = musicIndex);
}
next.addEventListener("click", () => {
  nextSong();
  showCurrentSong(musicIndex);
  playSong();
});
prev.addEventListener("click", () => {
  prevSong();
  showCurrentSong(musicIndex);
  playSong();
});

// Function to update length of progress bar simultaneously with second timing of current playing song
currentAudio.addEventListener("timeupdate", (e) => {
  // Converts the equivalent of the current time to end time to width of progress bar
  let instantTime = e.target.currentTime,
    duration = e.target.duration;
  const newWidth = (instantTime / duration) * 100;
  progressBar.style.width = `${newWidth}%`;

  // Determine the total duration of current song once data is loaded
  currentAudio.addEventListener("loadeddata", () => {
    let fullDuration = currentAudio.duration;
    let timeToMin = Math.floor(fullDuration / 60);
    let timeToSec = Math.floor(fullDuration % 60);
    if (timeToSec < 10) {
      timeToSec = `0${timeToSec}`;
    }
    fullTime.innerText = `${timeToMin}:${timeToSec}`;
  });
  // Determine the current duration of song once data is loaded
  let currentDuration = currentAudio.currentTime;
  let timeMin = Math.floor(currentDuration / 60);
  let timeSec = Math.floor(currentDuration % 60);
  if (timeSec < 10) {
    timeSec = `0${timeSec}`;
  }
  currentTime.innerText = `${timeMin}:${timeSec}`;
});

// Function to add click-drag-audio functionality to progress bar
progressArea.addEventListener("click", (e) => {
  let progressBarWidth = progressArea.clientWidth;
  let progressOffsetX = e.offsetX;
  let songDuration = currentAudio.duration;
  currentAudio.currentTime =
    (progressOffsetX / progressBarWidth) * songDuration;
});

// Repeat, Loop & Shuffle button Function
repeatBtn.addEventListener("click", () => {
  let repeatText = repeatBtn.classList[1];
  switch (repeatText) {
    case "fa-repeat":
      repeatBtn.classList.remove("fa-repeat");
      repeatBtn.classList.add("fa-circle");
      break;
    case "fa-circle":
      repeatBtn.classList.remove("fa-circle");
      repeatBtn.classList.add("fa-random");
      break;
    case "fa-random":
      repeatBtn.classList.remove("fa-random");
      repeatBtn.classList.add("fa-repeat");
      break;
  }
});

// Repeat, Loop & Shuffle button image changer function
currentAudio.addEventListener("ended", () => {
  let repeatText = repeatBtn.classList[1];
  switch (repeatText) {
    case "fa-repeat":
      nextSong();
      showCurrentSong(musicIndex);
      playSong();
      break;
    case "fa-circle":
      currentAudio.currentTime = 0;
      playSong();
      break;
    case "fa-random":
      let randomIndex = Math.floor(Math.random() * songs.length + 1);
      // if (!musicIndex == randomIndex) {
      //   musicIndex = randomIndex
      //   showCurrentSong(musicIndex)
      // } else {
      //   randomIndex = Math.floor((Math.random() * songs.length) +1)
      // }
      // showCurrentSong(musicIndex)
      do {
        randomIndex = Math.floor(Math.random() * songs.length + 1);
      } while (musicIndex == randomIndex);
      musicIndex = randomIndex;
      showCurrentSong(musicIndex);
      playSong();
      break;
  }
});
// for (let i = 0; i < songs.length; i++) {
//   const musicDiv =
//   `
//   <div class="row">
//     <div class="song">
//         <p class="song-title">${songs[i].track}</p>
//         <p>${songs[i].artiste}</p>
//     </div>
//     <audio src="${songs[i].src}" ></audio>
//     <div class="duration"><span>${currentAudio.duration}</span></div>
//   </div>
//   `

//   musicPopup.insertAdjacentHTML("beforeend", musicDiv)
// }

// Function to get full list of songs to display on musicList popup
songs.map((songs, i) => {
  const musicDiv = `
  <div class="row">
    <div class="song">
        <p class="song-title">${songs.track}</p>
        <p>${songs.artiste}</p>
    </div>
    <audio src="${songs.src}" id="music-${i}"></audio>
    <div class="duration-${i}"></div>
  </div>
  `;
  // Function to get full duration of songs to display on musicList popup
  currentAudio.addEventListener("loadeddata", () => {
    const listDuration = main.querySelector(`.duration-${i}`);
    const currentSong = main.querySelector(`#music-${i}`);
    let fullDuration = currentSong.duration;
    let timeToMin = Math.floor(fullDuration / 60);
    let timeToSec = Math.floor(fullDuration % 60);
    if (timeToSec < 10) {
      timeToSec = `0${timeToSec}`;
    }

    listDuration.innerText = `${timeToMin}:${timeToSec}`;
  });
  musicPopup.insertAdjacentHTML("beforeend", musicDiv);
});
