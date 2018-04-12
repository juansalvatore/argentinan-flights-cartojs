// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  doubleClickZoom: false,
}).setView([-34.603722, -58.381592], 3)

// Add base layer
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
  }
).addTo(map)

// Initialize Carto

// Initialze source data
var source = new carto.source.SQL(
  "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
)

// Create style for the data
var style = new carto.style.CartoCSS(`
    #layer {
      line-width: 1.5;
      line-color: ramp([clasificacion_vuelo], (#003260, #1283c6), ("Cabotaje", "Internacional"), "=");
      line-opacity: 0.18;
    }
  `)

// Add style to the data
var layer = new carto.layer.Layer(source, style)

/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the dropdown by class. If you are using a different class, change this.
// const _internacional = document.getElementById('internacional')
// const local = document.getElementById('local')
// const all = document.getElementById('all')
// Step 2: Add an event listener to the dropdown. We will run some code whenever the dropdown changes.

internacional.addEventListener('click', d => {
  source.setQuery(
    "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a WHERE clasificacion_vuelo = 'Internacional' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
  )
})

local.addEventListener('click', d => {
  source.setQuery(
    "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a WHERE clasificacion_vuelo = 'Cabotaje' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
  )
})

all.addEventListener('click', d => {
  source.setQuery(
    "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
  )
})

// layerPicker.addEventListener('change', function(e) {
//   // The value of the dropdown is in e.target.value when it changes
//   console.log(e)
//   var lifeStage = e.target.value

//   // Step 3: Decide on the SQL query to use and set it on the datasource
//   if (lifeStage === 'all') {
//     // If the value is "all" then we show all of the features, unfiltered
//     source.setQuery(
//       "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
//     )
//   } else if (lifeStage === 'Cabotaje') {
//     // If the value is "all" then we show all of the features, unfiltered
//     source.setQuery(
//       "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a WHERE clasificacion_vuelo = 'Cabotaje' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
//     )
//   } else if (lifeStage === 'Internacional') {
//     // If the value is "all" then we show all of the features, unfiltered
//     source.setQuery(
//       "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a WHERE clasificacion_vuelo = 'Internacional' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
//     )
//   } else {
//     // Else the value must be set to a life stage. Use it in an SQL query that will filter to that life stage.
//     source.setQuery(
//       "SELECT * FROM hms_efh_2009tiger_shark WHERE life_stage = '" +
//         lifeStage +
//         "'"
//     )
//   }

//   // Sometimes it helps to log messages, here we log the lifestage. You can see this if you open developer tools and look at the console.
//   console.log('Dropdown changed to "' + lifeStage + '"')
// })

// Add the data to the map as a layer
client.addLayer(layer)
client.getLeafletLayer().addTo(map)

map.setZoom(3)
