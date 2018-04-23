// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

/* 
  TODO: 
  Create acurate positioning and zoom when clicking the filter buttons 
  in different screen sizes.
*/

var w = window.innerWidth

let lon = 4.603722
let lat = -65.381592

if (w < 600) {
  lon = -8
}
if (w < 425) {
  lon = -2
}
var map = L.map('map', {
  doubleClickZoom: false,
  attributionControl: false,
  zoomSnap: 0.25,
  fadeAnimation: true,
  zoomAnimation: true,
}).setView([lon, lat], 3, {
  pan: {
    animate: true,
    duration: 1.5,
  },
  zoom: {
    animate: true,
    duration: 1.5,
  },
})

// Add base layer
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png'
).addTo(map)

// Initialize Carto

// Initialze source data
var source = new carto.source.SQL(
  "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
)

var sourceTwo = new carto.source.SQL(
  'SELECT * FROM modernizacion.puntos2017_2_export'
)

// Create style for the data
var style = new carto.style.CartoCSS(`
    #layer {
      line-width: 1.5;
      line-color: ramp([clasificacion_vuelo], (#7189f1, #1941b0), ("Cabotaje", "Internacional"), "=");
      line-opacity: 0.12;
    }
  `)

var styleTwo = new carto.style.CartoCSS(`
    #layer {
      marker-width: 3;
      marker-fill: ramp([clasificacion_vuelo], (#7189f1, #1941b0), ("Cabotaje", "Internacional"), "=");
      marker-fill-opacity: 1;
      marker-allow-overlap: true;
      marker-line-width: 0;
      marker-line-color: #FFFFFF;
      marker-line-opacity: 1;
    }
  `)

var styleTwo_2 = new carto.style.CartoCSS(`
  #layer {
    marker-width: ramp([nro_despegues], range(1, 7), quantiles(5));
    marker-fill: ramp([clasificacion_vuelo], (#7189f1, #1941b0), ("Cabotaje", "Internacional"), "=");
    marker-fill-opacity: 1;
    marker-allow-overlap: true;
    marker-line-width: 0;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
  }
`)
// Add style to the data
var layer = new carto.layer.Layer(source, style)
var layerTwo = new carto.layer.Layer(sourceTwo, styleTwo)

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
  map.panTo(new L.LatLng(4.603722, -65.381592))
  setTimeout(function() {
    map.setZoom(3)
  }, 1000)
})

local.addEventListener('click', d => {
  source.setQuery(
    "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a WHERE clasificacion_vuelo = 'Cabotaje' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
  )

  map.panTo(new L.LatLng(-38.603722, -65.381592))
  setTimeout(function() {
    map.setZoom(5)
  }, 1000)
  // map.setView([-24.603722, -65.381592]).setZoom(5)
  // L.control.scale().addTo(map)
})

all.addEventListener('click', d => {
  source.setQuery(
    "WITH lines as( SELECT a.clasificacion_vuelo, a.cuenta_de_origen_oaci, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.rutas2017 a ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines"
  )

  map.panTo(new L.LatLng(4.603722, -65.381592))
  setTimeout(function() {
    map.setZoom(3)
  }, 1000)
})

// Add the data to the map as a layer
client.addLayer(layer)
client.addLayer(layerTwo)
client.getLeafletLayer().addTo(map)

zoom = 3
if (w < 600) {
  zoom = 3
}

if (w < 425) {
  zoom = 2
}

map.setZoom(zoom)
