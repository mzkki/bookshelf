const generateId = () => {
  return +new Date()
}

const generateObj = (id, title, author, year, isComplete) => {
  return { id, title, author, year, isComplete }
}