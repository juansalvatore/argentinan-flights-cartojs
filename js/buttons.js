$(document).ready(function() {
  const internacional = document.getElementById('internacional')
  const local = document.getElementById('local')
  const all = document.getElementById('all')
  // const ezeiza = document.getElementById('ezeiza')
  // const cordoba = document.getElementById('cordoba')
  // const mendoza = document.getElementById('mendoza')

  internacional.addEventListener('click', d => {
    internacional.classList.add('button-active')
    local.classList.remove('button-active')
    all.classList.remove('button-active')
    document.getElementById('footer-text').innerHTML =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    document.getElementById('footer-number').innerHTML = '80.000'
    document
      .getElementById('footer-number')
      .classList.add('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.remove('number-color-locales')
    document.getElementById('footer-rutas').innerHTML = 'Rutas internacionales'
  })

  local.addEventListener('click', d => {
    local.classList.add('button-active')
    internacional.classList.remove('button-active')
    all.classList.remove('button-active')
    document.getElementById('footer-text').innerHTML =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
    document.getElementById('footer-number').innerHTML = '29.000'
    document
      .getElementById('footer-number')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.add('number-color-locales')
    document.getElementById('footer-rutas').innerHTML = 'Rutas de cabotaje'
  })

  all.addEventListener('click', d => {
    all.classList.add('button-active')
    internacional.classList.remove('button-active')
    local.classList.remove('button-active')
    document.getElementById('footer-text').innerHTML =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    document.getElementById('footer-number').innerHTML = '109.000'
    document.getElementById('footer-rutas').innerHTML = 'Todas las rutas'
    document
      .getElementById('footer-number')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.remove('number-color-locales')
  })

  // ezeiza.addEventListener('click', d => {
  //   ezeiza.classList.add('button-active')
  //   cordoba.classList.remove('button-active')
  //   mendoza.classList.remove('button-active')
  //   document.getElementById('iframe').innerHTML =
  //     '<iframe scrolling="no" width="100%" height="100%" frameborder="0" src="https://datosgobar.carto.com/u/modernizacion/builder/421bb584-7839-402d-9fad-ac5f3fafe42a/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>'
  // })

  // cordoba.addEventListener('click', d => {
  //   ezeiza.classList.remove('button-active')
  //   cordoba.classList.add('button-active')
  //   mendoza.classList.remove('button-active')
  //   document.getElementById('iframe').innerHTML =
  //     '<iframe width="100%" height="100%" frameborder="0" src="https://datosgobar.carto.com/u/modernizacion/builder/3e3629a8-8bcd-4547-8155-e1451df469a5/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>'
  // })

  // mendoza.addEventListener('click', d => {
  //   ezeiza.classList.remove('button-active')
  //   cordoba.classList.remove('button-active')
  //   mendoza.classList.add('button-active')
  //   document.getElementById('iframe').innerHTML =
  //     '<iframe width="100%" height="100%" frameborder="0" src="https://datosgobar.carto.com/u/modernizacion/builder/38dfff99-a460-4679-a193-85e6e6707def/embed" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>'
  // })
})