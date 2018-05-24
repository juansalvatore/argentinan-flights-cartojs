let lon = 4.603722
let lat = -65.381592

var map = new L.Map('map', {
  center: [lon, lat],
  zoom: 3,
})

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Ministerio de Modernización',
}).addTo(map)

var layerSource = {
  user_name: 'modernizacion',
  type: 'cartodb',
  sublayers: [
    {
      sql: 'SELECT * FROM modernizacion.volar_aeropuertos_geocode',
      cartocss: `#layer {
                        marker-width: 6;
                        marker-fill: #4d8dee;
                        marker-fill-opacity: 0.9;
                        marker-allow-overlap: true;
                        marker-line-width: 1;
                        marker-line-color: #FFFFFF;
                        marker-line-opacity: 1;
                        }`,
      interactivity: ['cartodb_id', 'pais', 'name', 'partidas', 'arribos'],
    },
    {
      sql:
        "WITH lines as( SELECT a.clasificacion_vuelo, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.volar_rutas2017_regulares a WHERE clasificacion_vuelo = 'Internacional' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines",
      cartocss: `
                    #layer {
                        line-width: 1.5;
                        line-color: ramp([clasificacion_vuelo], (#7189f1, #1941b0), ("Cabotaje", "Internacional"), "=");
                        line-opacity: 0.12;
                    }`,
    },
    {
      sql:
        "WITH lines as( SELECT a.clasificacion_vuelo, a.origen_oaci, a.destino_oaci, a.cartodb_id, a.origen_oaci || '-' || a.destino_oaci as route, ST_Segmentize( ST_Makeline( cdb_latlng(a.origen_lat,a.origen_lon), cdb_latlng(a.destino_lat,a.destino_lon))::geography, 100000 )::geometry as the_geom FROM modernizacion.volar_rutas2017_regulares a WHERE clasificacion_vuelo = 'Cabotaje' ) SELECT *, case when ST_XMax(the_geom) - ST_XMin(the_geom) <= 180 then ST_Transform(the_geom,3857) when ST_XMax(the_geom) - ST_XMin(the_geom) > 180 then ST_Transform(ST_Difference(ST_Shift_Longitude(the_geom), ST_Buffer(ST_GeomFromText('LINESTRING(180 90, 180 -90)',4326), 0.00001)),3857) end as the_geom_webmercator FROM lines",
      cartocss: `#layer {
                        line-width: 1.5;
                        line-color: ramp([clasificacion_vuelo], (#7189f1, #1941b0), ("Cabotaje", "Internacional"), "=");
                        line-opacity: 0.12;
                        }`,
    },
  ],
  extra_params: {
    map_key: 'bd0f2377f89fab680d1b5db0df8bb3e4a7fac691',
  },
}

var sublayers = []

cartodb
  .createLayer(map, layerSource)
  .addTo(map)
  .done(function(layer) {
    let aeropuertos = layer.getSubLayer(0)
    let internacional = layer.getSubLayer(1)
    let cabotaje = layer.getSubLayer(2)
    aeropuertos.on('hover', () => {
      console.log('hover')
    })
    addCursorInteraction(aeropuertos)
    // Layers toggle
    $('#cabotaje').on('click', function(e, sublayers) {
      cabotaje.show()
      internacional.hide()
    })
    $('#internacional').on('click', function(e, sublayers) {
      cabotaje.hide()
      internacional.show()
    })
    $('#todos').on('click', function(e, sublayers) {
      cabotaje.show()
      internacional.show()
    })

    // Layer interactions
    aeropuertos.setInteraction(true)
    addCursorInteraction(aeropuertos)

    var tooltip = layer.leafletMap.viz.addOverlay({
      type: 'tooltip',
      layer: layer,
      template: `
                            <div class="cartodb-tooltip-content-wrapper">
                                <p><strong>Pais:</strong> {{pais}}</p>
                                <p><strong>Nombre:</strong> {{name}}</p>
                                <p><strong>Partidas:</strong> {{partidas}}</p>
                                <p><strong>Arribos:</strong> {{arribos}}</p>
                            </div>
                        `,
      width: 400,
      position: 'bottom|right',
      fields: [{ name: 'cartodb_id' }],
    })
    $('body').append(tooltip.render().el)
  })
  .error(function(err) {
    console.log('An error occurred: ' + err)
  })

function addCursorInteraction(layer) {
  var hovers = []
  layer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
    hovers[layer] = 1
    if (_.any(hovers)) {
      $('#map').css('cursor', 'pointer')
    }
  })
  layer.bind('featureOut', function(m, layer) {
    hovers[layer] = 0
    if (!_.any(hovers)) {
      $('#map').css('cursor', 'auto')
    }
  })
}
