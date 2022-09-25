const addButton = document.getElementById('addBook')

const searchSubmit = document.getElementById('searchBook')

addButton.onsubmit = (e) => {
  e.preventDefault()
  addBook()
}

searchSubmit.onsubmit = (e) => {
  e.preventDefault()
  searchBook()
}

searchSubmit.onkeyup = (e) => {
  e.preventDefault()
  searchBook()
}