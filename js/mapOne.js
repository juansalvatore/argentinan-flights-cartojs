// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var mapOne = L.map('mapOne', {
  doubleClickZoom: false,
  dragging: false,
  scrollWheelZoom: false,
}).setView([-34.603722, -59.381592], 3)

// Add base layer
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
  }
).addTo(mapOne)

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

client.addLayer(layer)
client.getLeafletLayer().addTo(mapOne)

mapOne.setZoom(5)
