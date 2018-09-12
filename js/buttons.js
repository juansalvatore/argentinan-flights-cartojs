$(document).ready(function() {
  const internacional = document.getElementById('internacional')
  const cabotaje = document.getElementById('cabotaje')
  const todos = document.getElementById('todos')
  // const ezeiza = document.getElementById('ezeiza')
  // const cordoba = document.getElementById('cordoba')
  // const mendoza = document.getElementById('mendoza')

  internacional.addEventListener('click', d => {
    internacional.classList.add('button-active')
    cabotaje.classList.remove('button-active')
    todos.classList.remove('button-active')
    document.getElementById('footer-text').innerHTML =
      'En lo que va del año crecieron un 12% respecto de igual período del año pasado.'
    document.getElementById('footer-number').innerHTML = '89.845'
    document
      .getElementById('footer-number')
      .classList.add('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.remove('number-color-locales')
    document.getElementById('footer-rutas').innerHTML =
      'Es la cantidad de vuelos internacionales.'

    document
      .getElementById('footer-rutas')
      .classList.add('number-color-internacionales')
    document
      .getElementById('footer-rutas')
      .classList.remove('number-color-locales')
  })

  cabotaje.addEventListener('click', d => {
    cabotaje.classList.add('button-active')
    internacional.classList.remove('button-active')
    todos.classList.remove('button-active')
    document.getElementById('footer-text').innerHTML =
      'En lo que va del año crecieron un 7% respecto de igual período del año pasado.'
    document.getElementById('footer-number').innerHTML = '235.145'
    document
      .getElementById('footer-number')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.add('number-color-locales')
    document.getElementById('footer-rutas').innerHTML =
      'Es la cantidad de vuelos de cabotaje'

    document
      .getElementById('footer-rutas')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-rutas')
      .classList.add('number-color-locales')
  })

  todos.addEventListener('click', d => {
    todos.classList.add('button-active')
    internacional.classList.remove('button-active')
    cabotaje.classList.remove('button-active')
    document.getElementById('footer-text').innerHTML = ''
    document.getElementById('footer-number').innerHTML = '324.990'
    document.getElementById('footer-rutas').innerHTML =
      'Es la cantidad de vuelos totales.'
    document
      .getElementById('footer-number')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.remove('number-color-locales')

    document
      .getElementById('footer-rutas')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-rutas')
      .classList.remove('number-color-locales')
  })
})
