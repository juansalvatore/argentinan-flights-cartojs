$(document).ready(function() {
  // Init ScrollMagic
  var controller = new ScrollMagic.Controller()
  // loop through each .project element
  $('.fade-waiting').each(function() {
    // buld a scene
    var ourScene = new ScrollMagic.Scene({
      triggerElement: this,
      //duration: '90%',
      //reverse: false,
      triggerHook: 0.9,
    })
      .setClassToggle(this, 'fade-in') // add class to #img-1
      .addIndicators({
        name: 'fade in',
      })
      .addTo(controller)
  })

  $('.count').each(function() {
    // buld a scene
    var ourScene = new ScrollMagic.Scene({
      triggerElement: this,
      //duration: '90%',
      //reverse: false,
      triggerHook: 0.9,
    })
    ourScene.on('count', () => {
      $('#number1').jQuerySimpleCounter({ end: 12, duration: 3000 })
      $('#number2').jQuerySimpleCounter({ end: 55, duration: 3000 })
      $('#number3').jQuerySimpleCounter({ end: 359, duration: 2000 })
      $('#number4').jQuerySimpleCounter({ end: 246, duration: 2500 })
    })
  })
})

$.fn.jQuerySimpleCounter = function(options) {
  var settings = $.extend(
    {
      start: 0,
      end: 100,
      easing: 'swing',
      duration: 400,
      complete: '',
    },
    options
  )

  var thisElement = $(this)

  $({ count: settings.start }).animate(
    { count: settings.end },
    {
      duration: settings.duration,
      easing: settings.easing,
      step: function() {
        var mathCount = Math.ceil(this.count)
        thisElement.text(mathCount)
      },
      complete: settings.complete,
    }
  )
}
