const internacional = document.getElementById('internacional')
const local = document.getElementById('local')
const all = document.getElementById('all')

internacional.addEventListener('click', d => {
  internacional.classList.add('button-active')
  local.classList.remove('button-active')
  all.classList.remove('button-active')
})

local.addEventListener('click', d => {
  local.classList.add('button-active')
  internacional.classList.remove('button-active')
  all.classList.remove('button-active')
})

all.addEventListener('click', d => {
  all.classList.add('button-active')
  internacional.classList.remove('button-active')
  local.classList.remove('button-active')
})
