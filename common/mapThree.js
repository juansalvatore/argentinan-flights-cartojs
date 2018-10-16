function main() {
  //   var CARTOCSS = [
  //     'Map {',
  //     '  -torque-frame-count:1;',
  //     '  -torque-animation-duration:1;',
  //     '  -torque-time-attribute:"date";',
  //     '  -torque-aggregation-function: "avg(angle*40);avg(mag)";',
  //     '  -torque-resolution:4;',
  //     '  -torque-data-aggregation:linear;',
  //     '}',
  //     '#wind {',
  //     '  marker-width: 5;',
  //     '  marker-fill-opacity: 1.0;',
  //     '  marker-max-mag: 7; ',
  //     '  marker-type: vector;',
  //     '  marker-mag: "scale_log(value1, 0,61.76,0,7)";',
  //     '  marker-stroke : "scale_log(value1,0.1,61.76,#FFFFB2,#B10026)";',
  //     '  marker-angle : "scale_lin(value0,0,255,0,6.283185)";',
  //     '}',
  //   ]

  //   CARTOCSS = CARTOCSS.join('\n')
  // Add base layer
  var layer = L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
    }
  )

  // Instantiate new map object, place it in 'map' element
  var mapThree = new L.Map('mapThree', {
    center: [25, 25], // Western Egypt
    zoom: 2,
    scrollWheelZoom: false,
  })

  mapThree.addLayer(layer)

  // setup layer
  var layerSource = {
    type: 'torque',
    options: {
      user_name: 'modernizacion', // replace with your user name
      table_name: 'same_07_vuelos_ida_puntos_torque',
      cartocss: $('#cartocss').html(),
      sql: 'select * from same_07_vuelos_ida_puntos_torque',
      cartocss_version: '1.0.0',
      geom_column: 'the_geom_webmercator',
    },
  }

  // put torque layer on top of basemap
  cartodb
    .createLayer(mapThree, layerSource)
    .addTo(mapThree)
    .done(function(layer) {
      // do stuff
    })
    .error(function(err) {
      console.log('Error: ' + err)
    })
}

window.onload = main

// window.onload = function() {
//   // map.dragging.disable()
//   // map.touchZoom.disable()
//   // map.doubleClickZoom.disable()
//   // map.scrollWheelZoom.disable()
//   // map.keyboard.disable()

//   cartodb.createVis(
//     'mapThree',
//     'http://documentation.carto.com/u/modernizacion/api/v2/viz/421bb584-7839-402d-9fad-ac5f3fafe42a/viz.json',
//     {
//       zoom: 3,
//       center_lat: -14,
//       center_lon: -58,
//       layer_selector: false,
//       infowindow: false,
//       // cartodb_logo: false,
//       // zoomControl: false,
//       // search: false,
//       // scrollWheelZoom: false,
//     }
//   )
// }

// WITH simplify as (

//   WITH projectedLines as (

//     WITH lines as (
//         SELECT
//       	   a.fecha,
//       	   a.vuelos_ruta_dia,
//       		a.fecha_parseada,
//       a.origen_oaci_destino_oaci,
//            a.cartodb_id,
//       	 a.clasificacion_vuelo,
//            a.origen_oaci || '-' || a.destino_oaci as route,

//   (ST_Segmentize(
//                   ST_Makeline(
//                          cdb_latlng(a.origen_lat,a.origen_lon),
//                           cdb_latlng(a.destino_lat,a.destino_lon)
//                   )::geography,
//                   10000
//               )::geometry) as the_geom
//         FROM
//           modernizacion.same_07_vuelos_ida a

//   )

//   SELECT   cartodb_id, route, fecha,clasificacion_vuelo,vuelos_ruta_dia, fecha_parseada,origen_oaci_destino_oaci,

// 	(
//     ST_DumpPoints(
//       ST_Segmentize(the_geom, 1000)
//     )
//   ).geom as the_geom

//   FROM
//       lines

//   )

//   SELECT row_number() over (order by cartodb_id) as rowid, *, ST_Simplify(ST_RemoveRepeatedPoints(the_geom, 15000), 1005) as the_geom2 FROM projectedLines

// )

// SELECT
// 	fecha_parseada,rowid, cartodb_id,origen_oaci_destino_oaci as route,the_geom2,clasificacion_vuelo,vuelos_ruta_dia,
//     CASE
//     when ST_XMax(the_geom2) - ST_XMin(the_geom2) <= 180
// 	    then ST_Transform(the_geom2,3857)
// 	when ST_XMax(the_geom2) - ST_XMin(the_geom2) > 180
// 	    then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom2), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326),0.00001)),3857)
// 	end as the_geom_webmercator
//    FROM
//     simplify
