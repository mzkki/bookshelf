const addButton = document.getElementById('addBook')

addButton.onsubmit = (event) => {
  event.preventDefault()
  addBook()
}