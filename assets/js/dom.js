const books = []
const RENDER_EVENT = 'render_event'

const addBtn = document.getElementById('buttonInput')
addBtn.addEventListener('click', () => {
  addBook()
})

document.addEventListener(RENDER_EVENT, () => {
  const unCompletedBooks = document.getElementById('books')
  unCompletedBooks.innerHTML = ''

  const completedBooks = document.getElementById('completedBooks')
  completedBooks.innerHTML = ''
  for (const book of books) {
    const elementBook = makeBook(book)
    if (!book.isComplete) {
      unCompletedBooks.append(elementBook)
    } else {
      completedBooks.append(elementBook)
    }
  }

  const nullBooks = document.createElement('p')
  nullBooks.classList.add('p-3', 'shadow-sm', 'my-3')

  if (unCompletedBooks.innerHTML == '') {
    nullBooks.innerText = 'Add some book to readlist'
    unCompletedBooks.append(nullBooks)
  } else {
    nullBooks.innerText = 'Great, no books are in readlist'
    completedBooks.append(nullBooks)
  }
})

const addBook = () => {
  const title = document.getElementById('bookTitle').value
  const author = document.getElementById('bookAuthor').value
  const year = document.getElementById('bookYear').value
  const isComplete = document.getElementById('isCompleted').checked

  const validationTitle = document.getElementById('validationTitle')
  validationTitle.innerHTML = ''
  const validationAuthor = document.getElementById('validationAuthor')
  validationAuthor.innerHTML = ''
  const validationYear = document.getElementById('validationYear')
  validationYear.innerHTML = ''

  const validator = document.createElement('p')
  validator.classList.add('text-danger', 'm-2', 'fs-6')

  if (title == '' || author == '' || year == '') {
    if (title == '') {
      validator.innerHTML =
        '<i class="fa-solid fa-circle-info"></i> Field Title is required !'
      validationTitle.append(validator)
    } else if (author == '') {
      validator.innerHTML =
        '<i class="fa-solid fa-circle-info"></i> Field Author is required !'
      validationAuthor.append(validator)
    } else if (year == '') {
      validator.innerHTML =
        '<i class="fa-solid fa-circle-info"></i> Field Year is required !'
      validationYear.append(validator)
    }
  } else {
    const idBook = generateId()
    const objBook = generateObj(idBook, title, author, year, isComplete)
    books.push(objBook)

    document.dispatchEvent(new Event(RENDER_EVENT))
  }
}

const makeBook = (objBook) => {
  const bookTitle = document.createElement('h5')
  bookTitle.innerText = objBook.title

  const authorYear = document.createElement('p')
  authorYear.classList.add('text-muted', 'fs-6')
  authorYear.innerText = objBook.author
  authorYear.innerText += '-'
  authorYear.innerText += objBook.year

  const colContainer = document.createElement('div')
  colContainer.classList.add('col-9')
  colContainer.append(bookTitle, authorYear)

  const rowContainer = document.createElement('div')
  rowContainer.classList.add('row')

  const container = document.createElement('div')
  container.classList.add('p-3', 'shadow-sm', 'rounded', 'my-3')

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('col-3', 'align-self-center', 'text-end')

  if (objBook.isComplete) {
    const undo = document.createElement('i')
    undo.classList.add('fa-solid', 'fa-rotate-left', 'm-2', 'text-warning')

    undo.onclick = () => {
      undoBook(objBook.id)
    }

    const trash = document.createElement('i')
    trash.classList.add('fa-solid', 'fa-circle-minus', 'm-2', 'text-danger')

    trash.onclick = () => {
      confirm(
        'are you sure want to delete the book ?'
          ? deleteBook(objBook.id)
          : false,
      )
    }

    buttonContainer.append(undo, trash)
  } else {
    const check = document.createElement('i')
    check.classList.add('fa-solid', 'fa-check', 'm-2', 'text-success')

    check.onclick = () => {
      moveToComplete(objBook.id)
    }
    const trash = document.createElement('i')
    trash.classList.add('fa-solid', 'fa-circle-minus', 'm-2', 'text-danger')

    trash.onclick = () => {
      confirm(
        'are you sure want to delete the book ?'
          ? deleteBook(objBook.id)
          : false,
      )
    }

    buttonContainer.append(check, trash)
  }

  const moveToComplete = (bookId) => {
    const bookTarget = findBook(bookId)

    if (bookTarget == null) return

    bookTarget.isComplete = true
    document.dispatchEvent(new Event(RENDER_EVENT))
  }

  const findBook = (bookId) => {
    for (const book of books) {
      if (book.id === bookId) {
        return book
      }
    }
    return null
  }

  const deleteBook = (bookId) => {
    const bookTarget = findBookIndex(bookId)

    if (bookTarget == -1) return

    books.splice(bookTarget, 1)
    document.dispatchEvent(new Event(RENDER_EVENT))
  }

  const undoBook = (bookId) => {
    const bookTarget = findBook(bookId)

    if (bookTarget == null) return

    bookTarget.isComplete = true
    document.dispatchEvent(new Event(RENDER_EVENT))
  }

  const findBookIndex = (bookId) => {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index
      }
    }
    return -1
  }

  rowContainer.append(colContainer, buttonContainer)
  container.append(rowContainer)
  container.setAttribute('id', `book-${objBook.id}`)

  return container
}
