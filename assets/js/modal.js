let modal = document.getElementById('myModal')

let btn = document.getElementById('addBookBtn')

let span = document.getElementsByClassName('close')[0]

console.log(modal)
console.log(btn)
console.log(span)

btn.onclick = () => {
  modal.style.display = 'block'
  console.log('open')
}

span.onclick = () => {
  modal.style.display = 'none'
  console.log('close')
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
