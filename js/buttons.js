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
      'Los vuelos internacionales, aquellos que salen o llegan a Argentina, crecieron un 8,2% respecto de 2016.'
    document.getElementById('footer-number').innerHTML = '89.845'
    document
      .getElementById('footer-number')
      .classList.add('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.remove('number-color-locales')
    document.getElementById('footer-rutas').innerHTML =
      'vuelos regulares internacionales en 2017'

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
      'Los vuelos de cabotaje, aquellos que se realizan dentro del país, crecieron un 9,9% respecto de 2016.'
    document.getElementById('footer-number').innerHTML = '235.145'
    document
      .getElementById('footer-number')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.add('number-color-locales')
    document.getElementById('footer-rutas').innerHTML =
      'vuelos regulares de cabotaje en 2017'

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
    document.getElementById('footer-text').innerHTML =
      'En 2017 se realizaron 9,4% más de vuelos que en 2016.'
    document.getElementById('footer-number').innerHTML = '324.990'
    document.getElementById('footer-rutas').innerHTML =
      'vuelos regulares totales en 2017'
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
