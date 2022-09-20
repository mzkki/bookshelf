const modal = document.getElementById('myModal')

const btn = document.getElementById('addBookBtn')

const span = document.getElementsByClassName('close')[0]

btn.onclick = () => {
  modal.classList.add('show')
}

span.onclick = () => {
  modal.classList.remove('show')
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
