// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var mapThree = L.map('mapThree', {
  doubleClickZoom: false,
  attributionControl: false,
  doubleClickZoom: false,
  attributionControl: false,
  zoomSnap: 0.25,
  fadeAnimation: true,
  zoomAnimation: true,
}).setView([-34.603722, -59.381592], 3)

// Add base layer
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
  }
).addTo(mapThree)

// Initialize Carto
var client = new carto.Client({
  apiKey: 'bd0f2377f89fab680d1b5db0df8bb3e4a7fac691',
  username: 'modernizacion',
})

// Initialze source data
var source = new carto.source.SQL(
  'SELECT * FROM modernizacion.saez_07_vuelos_ida_puntos_torque_2'
)

// Create style for the data
var style = new carto.style.CartoCSS(`
          Map {
              -torque-frame-count: 673;
              -torque-animation-duration: 60;
              -torque-time-attribute: "rowid";
              -torque-aggregation-function: "count(1)";
              -torque-resolution: 1;
              -torque-data-aggregation: linear;
          }
          #layer {
              marker-width: 1;
              marker-fill: #4dd9ee;
              marker-fill-opacity: 0.9;
              marker-line-width: 0;
              marker-line-color: #FFFFFF;
              marker-line-opacity: 1;
              comp-op: lighter;
          }
          #layer[frame-offset=1] {
              marker-width: 3;
              marker-fill-opacity: 0.45;
          }
        `)

var CARTOCSS = [
  ' Map {',
  '-torque-frame-count: 673;',
  '-torque-animation-duration: 60;',
  '-torque-time-attribute: "rowid";',
  '-torque-aggregation-function: "count(1)";',
  '-torque-resolution: 1;',
  '-torque-data-aggregation: linear;',
  '}',
  '#layer {',
  'marker-width: 1;',
  'marker-fill: #4dd9ee;',
  'marker-fill-opacity: 0.9;',
  'marker-line-width: 0;',
  'marker-line-color: #FFFFFF;',
  'marker-line-opacity: 1;',
  'comp-op: lighter;',
  '}',
  '#layer[frame-offset=1] {',
  'marker-width: 3;',
  'marker-fill-opacity: 0.45;',
  '}',
].join('\n')

// var torqueLayer = new L.TorqueLayer({
//   user: 'modernizacion',
//   table: 'modernizacion.saez_07_vuelos_ida_puntos_torque_2',
//   cartocss: CARTOCSS,
// })

cartodb
  .createLayer(mapThree, {
    type: 'torque',
    order: 1,
    options: {
      query: '',
      table_name: 'modernizacion.saez_07_vuelos_ida_puntos_torque_2',
      user_name: 'modernizacion',
      tile_style: CARTOCSS,
    },
  })
  .done(function(layer) {
    console.log(layer)
    mapThree.addLayer(layer)
  })

// torqueLayer.addTo(mapThree)
// torqueLayer.play()
// // Add style to the data
// var layer = new carto.layer.Layer(source, style)
// // var layerTwo = new carto.layer.Layer(sourceTwo, styleTwo)
// client.addLayer(layer)
// client.getLeafletLayer().addTo(mapThree)

mapThree.setZoom(3)
