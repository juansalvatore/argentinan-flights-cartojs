const down = document.getElementById('scroll-down')
const up = document.getElementById('scroll-up')
let page = 0

disableScroll()
down.addEventListener('click', d => {
  if (page === 0) {
    document.getElementById('content').style.top = '-100vh'
    page++
  } else if (page === 1) {
    document.getElementById('content').style.top = '-200vh'
    page++
    enableScroll()
  }
})

up.addEventListener('click', d => {
  if (page === 1) {
    document.getElementById('content').style.top = '0'
    page--
  } else if (page === 2) {
    document.getElementById('content').style.top = '-100vh'
    disableScroll()
    page--
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
