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
  cross = document.querySelector(".fa-times");

let indexNum = 1;

list.addEventListener('click', () => {
  musicList.classList.add("show")
})
cross.addEventListener('click', ()=> {
  musicList.classList.remove("show")
})
const showCurrentSong = () => {  
  musicTitle.innerText = songs[indexNum - 1].track;
  musicAuthor.innerText = songs[indexNum - 1].artiste; 
  musicImg.src = songs[indexNum - 1].img;
  currentAudio.src = songs[indexNum - 1].src;
  console.log(currentAudio.src)
}
showCurrentSong()

function playSong() {
  main.classList.add("paused")
  playPause.classList = "fa fa-pause-circle play-btn"
  currentAudio.play()
}
function pauseSong() {
  main.classList.remove("paused")
  playPause.classList = "fa fa-play-circle play-btn"
  currentAudio.pause()
}

playPause.addEventListener('click', ()=>{
  const isMusicPlaying = main.classList.contains("paused")
  isMusicPlaying ? pauseSong() : playSong();
})

next.addEventListener('click', () => {
  if (indexNum <= 5) {
    indexNum++
  } else {
    indexNum = 1
  }
  showCurrentSong()
})
prev.addEventListener('click', () => {
  if (indexNum >= 1) {
    indexNum--
  } else if(indexNum === 0) {
    indexNum = 6
  }
  console.log(indexNum)
  showCurrentSong()
})