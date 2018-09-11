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
      // .addIndicators({
      //   name: 'fade in',
      // })
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
      document.getElementById('number1').style.color = 'red'
    })
  })

  $('.wait-fade-arrow').each(function() {
    // buld a scene
    var ourScene = new ScrollMagic.Scene({
      triggerElement: this,
      //duration: '90%',
      reverse: true,
      triggerHook: 0.8,
    })
      .setClassToggle('#arrow-text', 'remove-arrows') // add class to #img-1
      .addIndicators({
        name: 'wait-fade-arrow',
      })
      .addTo(controller)
  })
  $('.wait-fade-arrow').each(function() {
    // buld a scene
    var ourScene = new ScrollMagic.Scene({
      triggerElement: this,
      //duration: '90%',
      reverse: true,
      triggerHook: 0.8,
    })
      .setClassToggle('.arrow-up', 'remove-arrows') // add class to #img-1

      // .addIndicators({
      //   name: 'fade in',
      // })
      .addTo(controller)
  })
})
