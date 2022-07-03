// Selectors
const gallery = document.querySelectorAll(".gallery .image");
const preview = document.querySelector(".preview");
const previewImg = preview.querySelector("img");
const cross = document.querySelector(".cross");
const nextBtn = document.querySelector(".right");
const prevBtn = document.querySelector(".left");
const currentImg = document.querySelector(".currentImg")
const totalImg = document.querySelector(".totalImg")
const shadow = document.querySelector(".shadow")
// Main Function
window.onload = () => {
  for (let i = 0; i < gallery.length; i++) {
    gallery[i].onclick = () => {
      preview.classList.add("show");
      shadow.classList.add("show");

      let indexNum = i;
      const previewFunc = () => {
        currentImg.textContent = indexNum + 1;
        totalImg.textContent = gallery.length;
        const imgUrl = gallery[indexNum].querySelector("img").src;
        // console.log(imgUrl)
        previewImg.src = imgUrl;
        nextBtn.style.display = "block"
        prevBtn.style.display = "block"
        if (indexNum >= gallery.length - 1) {
            nextBtn.style.display = "none"
        } 
        if (indexNum == 0) {
            prevBtn.style.display = "none"
        } 
      };
      previewFunc();
      cross.onclick = () => {
          preview.classList.remove("show");
          shadow.classList.remove("show");
      }
      prevBtn.onclick = () => {
          indexNum--;
          if (indexNum == 0) {
            previewFunc()  
            prevBtn.style.display = "none"
          } else{
            previewFunc()
          }
      }
      nextBtn.onclick = () => {
          indexNum++;
          if (indexNum >= gallery.length - 1) {
            previewFunc()
            nextBtn.style.display = "none"
          } else {
            previewFunc()
          }
      }
    };
    // cross.addEventListener("click", () => preview.classList.remove("show"))
  }
};
