// Selectors
const addBtn = document.querySelector(".add-btn"),
  shadow = document.querySelector(".shadow"),
  popup = document.querySelector(".note-popup"),
  cross = document.querySelector(".cross"),
  // dots = document.querySelectorAll('.dots'),
  noteSettings = document.querySelector(".note-settings"),
  title = document.querySelector("#title"),
  desc = document.querySelector("#desc"),
  submitBtn = document.querySelector(".submit-btn"),
  noteContent = document.querySelector(".content"),
  noteTitle = document.querySelector(".note-title");
let isUpdated = false, updatedId;

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


// EventListeners

addBtn.addEventListener("click", () => {
  noteTitle.focus()
  shadow.classList.add("show");
  popup.classList.add("show");
});
cross.addEventListener("click", () => {
  // console.log(shadow.classList)
  shadow.classList.remove("show");
  popup.classList.remove("show");
  noteTitle.textContent = "Add a Note"
  submitBtn.value = "Add Note"
  title.value = "";
  desc.value = "";
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const dateNow = new Date(),
    month = dateNow.getMonth(),
    day = dateNow.getDate(),
    year = dateNow.getFullYear();
  let heading = title.value,
    content = desc.value;
  if (heading || content) {
    let noteInfo = {
      title: heading,
      description: content,
      date: `${months[month]} ${day}, ${year}`,
    };
		// let note = []
    if (!isUpdated) {
      notes.push(noteInfo);
    } else {
      isUpdated = false
      notes[updatedId] = noteInfo
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    // console.log(note);
  }
  cross.click()
  showNote();

	
});
// Functions

function showNote() {
	// console.log('helo')
  document.querySelectorAll('.note').forEach(note => note.remove())
	notes.forEach((elem, index) => {

		let newTag = `
				<div class="note">
						<div class="note-content">
								<h3 class="note-title">${elem.title}</h3>
								<p class="note-desc">${elem.description}</p>
								<div class="btm-content">
                  <div class="date">${elem.date}</div>
                  <i onclick="showEdit(this)" class="dots">...</i>
                </div>
						</div>
						<div class="note-settings">
								<div class="icons">
									<i  onclick="updateNote(${index}, '${elem.title}', '${elem.description}')">Edit</i>
									<i onclick="deleteNote(${index})">Delete</i>
						    </div>
						</div>
				</div>
						`;
						noteContent.insertAdjacentHTML("beforeend", newTag);
	});
}
showNote();

function showEdit(elem)  {
  elem.parentElement.parentElement.parentElement.children[1].classList.add('show')
  // console.log(e.tagName)
  document.addEventListener('click', (e) => {
    if (e.target.tagName != 'I' ) {
      elem.parentElement.parentElement.parentElement.children[1].classList.remove('show')
    }
  })
}

function deleteNote(noteId) {
  // Delete current note
  let confirmDel = confirm("Are you sure you want to delete note?")
  if (confirmDel) {
    notes.splice(noteId, 1);
  }
  // Set LocalStorage to current notes
  localStorage.setItem("notes", JSON.stringify(notes));
  showNote()
}

function updateNote(noteId, currentTitle, currentDesc) {
  updatedId = noteId
  isUpdated = true
  addBtn.click()
  noteTitle.textContent = "Update a Note"
  submitBtn.value = "Update Note"
  title.value = currentTitle;
  desc.value = currentDesc;
}