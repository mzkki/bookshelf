const books = []
const RENDER_EVENT = 'render_event'

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
    nullBooks.innerText = 'Go ! complete your readlist'
    completedBooks.append(nullBooks)
  }
})

const addBook = () => {
  const title = document.getElementById('bookTitle')
  const author = document.getElementById('bookAuthor')
  const year = document.getElementById('bookYear')
  const isComplete = document.getElementById('isCompleted')
  const modal = document.getElementById('myModal')

  const validationTitle = document.getElementById('validationTitle')
  validationTitle.innerHTML = ''
  const validationAuthor = document.getElementById('validationAuthor')
  validationAuthor.innerHTML = ''
  const validationYear = document.getElementById('validationYear')
  validationYear.innerHTML = ''

  const validator = document.createElement('p')
  validator.classList.add('text-danger', 'm-2', 'fs-6')

  if (title.value == '' || author.value == '' || year.value == '') {
    if (title.value == '') {
      validator.innerHTML =
        '<i class="fa-solid fa-circle-info"></i> Field Title is required !'
      validationTitle.append(validator)
    } else if (author.value == '') {
      validator.innerHTML =
        '<i class="fa-solid fa-circle-info"></i> Field Author is required !'
      validationAuthor.append(validator)
    } else if (year.value == '') {
      validator.innerHTML =
        '<i class="fa-solid fa-circle-info"></i> Field Year is required !'
      validationYear.append(validator)
    }
  } else {
    const idBook = generateId()
    const objBook = generateObj(idBook, title.value, author.value, year.value, isComplete.checked)
    books.push(objBook)

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
    modal.classList.remove('show')
    title.value = ''
    author.value = ''
    year.value = ''
    isComplete.checked = false
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
  container.classList.add('p-3', 'shadow-sm', 'rounded', 'my-3', 'item-book')

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('col-3', 'align-self-center', 'text-end')

  if (objBook.isComplete) {
    const undo = document.createElement('i')
    undo.classList.add('fa-solid', 'fa-circle-left', 'm-2', 'text-muted')

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
    check.classList.add('fa-solid', 'fa-circle-check', 'm-2', 'text-success')
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
    saveData()
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
    saveData()
  }

  const undoBook = (bookId) => {
    const bookTarget = findBook(bookId)

    if (bookTarget == null) return

    bookTarget.isComplete = false
    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
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

const searchBook = () => {
  const upperCaseBook = searchSubmit.value.toUpperCase()
  const bookItem = document.querySelectorAll('.list-books > .item-book')

  for (let i = 0; i < bookItem.length; i++) {
    value = bookItem[i].textContent || bookItem[i].innerText
    if (value.toUpperCase().indexOf(upperCaseBook) > -1) {
      bookItem[i].style.display = ''
    } else {
      bookItem[i].style.display = 'none'
    }
  }
}