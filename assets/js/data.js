const generateId = () => {
  return +new Date()
}

const generateObj = (id, title, author, year, isComplete) => {
  return { id, title, author, year, isComplete }
}

const EVENT_SAVED = 'SAVED_BOOK'
const STORAGE_KEY = 'BOOK_APPS'

const saveData = () => {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books)
    localStorage.setItem(STORAGE_KEY, parsed)
    document.dispatchEvent(new Event(EVENT_SAVED))
    console.log('berhasil memasukkan data ke web storage')
  }
}

const isStorageExist = () => {
  if (typeof (Storage) === undefined) {
    alert('Your Browser does not support the web storage')
    return false
  } else {
    return true
  }
}

const loadData = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY)
  let data = JSON.parse(serializedData)

  if (data !== null) {
    for (const book of data) {
      books.push(book)
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT))
}

if (isStorageExist()) {
  loadData()
}