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
      'Un 11% más de vuelos que en el período anterior.'
    document.getElementById('footer-number').innerHTML = '89.845'
    document
      .getElementById('footer-number')
      .classList.add('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.remove('number-color-locales')
    document.getElementById('footer-rutas').innerHTML =
      'Vuelos internacionales entre ago-17 y ago-18.'

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
      'Un 6% más de vuelos que en el período anterior.'
    document.getElementById('footer-number').innerHTML = '235.145'
    document
      .getElementById('footer-number')
      .classList.remove('number-color-internacionales')
    document
      .getElementById('footer-number')
      .classList.add('number-color-locales')
    document.getElementById('footer-rutas').innerHTML =
      'Vuelos de cabotaje entre ago-17 y ago-18.'

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
      'Un 8% más de vuelos que en el período anterior.'
    document.getElementById('footer-number').innerHTML = '324.990'
    document.getElementById('footer-rutas').innerHTML =
      'Vuelos totales entre ago-17 y ago-18.'
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
