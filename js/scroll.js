const down = document.getElementById('scroll-down')
const up = document.getElementById('scroll-up')
let page = 0

disableScroll()
document.getElementById('arrow-up').classList.add('hidden-button')

down.addEventListener('click', d => {
  if (page === 0) {
    document.getElementById('content').style.top = '-100vh'
    document.getElementById('arrow-up').classList.remove('hidden-button')
    page++
    console.log(page)
  } else if (page === 1) {
    document.getElementById('content').style.top = '-200vh'
    document.getElementById('iframe').innerHTML =
      '<iframe scrolling="no" width="100%" height="100%" frameborder="0" src="https://datosgobar.carto.com/u/modernizacion/builder/421bb584-7839-402d-9fad-ac5f3fafe42a/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>'
    document.getElementById('scroll-buttons-container').classList.add('up')
    page++
    console.log(page)
  } else if (page === 2) {
    document.getElementById('content').style.top = '-300vh'
    document.getElementById('scroll-buttons-container').classList.remove('up')
    enableScroll()
    page++
    console.log(page)
  }
})

up.addEventListener('click', d => {
  if (page === 1) {
    document.getElementById('content').style.top = '0'
    document.getElementById('arrow-up').classList.add('hidden-button')
    page--
    console.log(page)
  } else if (page === 2) {
    document.getElementById('content').style.top = '-100vh'
    disableScroll()
    document.getElementById('scroll-buttons-container').classList.remove('up')
    page--
    console.log(page)
  } else if (page === 3) {
    document.getElementById('content').style.top = '-200vh'
    disableScroll()
    document.getElementById('scroll-buttons-container').classList.add('up')
    page--
    console.log(page)
  }
})

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

function preventDefault(e) {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

function disableScroll() {
  if (window.addEventListener)
    // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false)
  window.onwheel = preventDefault // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  window.ontouchmove = preventDefault // mobile
  document.onkeydown = preventDefaultForScrollKeys
}

function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}
