const addButton = document.getElementById('buttonInput')

addButton.onclick = () => {
  const title = document.getElementById('bookTitle').value
  const author = document.getElementById('bookAuthor').value
  const year = document.getElementById('bookYear').value
  const isCompleted = document.getElementById('isCompleted').checked

  console.log(title)
  console.log(author)
  console.log(year)
  console.log(isCompleted)
}
