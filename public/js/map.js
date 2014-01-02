define(['mapbox','jquery','panels', '!text!geojson.json', 'lodash'], function(mapbox, $, panels, geoJson, _) {
  geoJson = JSON.parse(geoJson);
  var map;
  var defaults = {
    routeOptions: {
      color: '#68b0d4'
    }
  };

  var resetMarkerState = function() {
    map.markerLayer.eachLayer(function(marker) {
      marker.feature.properties['state'] = 'inactive';
    });
  };

  var drawRoute = function(points, options) {
    options = options || defaults.routeOptions;
    return L.polyline(points, options).addTo(map);
  };

  var drawMultipleRoutes = function(id, type, callback) {
    var venue = _.find(geoJson.features, {'properties': {'id': id}});
    var routes = type ? _.filter(venue._routes, {'type': type}) : venue._routes;

    for (var i = routes.length - 1; i >= 0; i--) {
      drawRoute(routes[i].points);
    }

    if (callback) {
      callback();
    }
  };

  var init = function() {
    map = L.mapbox.map('map', 'jonlong.map-wxgjdzs5');
  
    // Hide the sliding panels
    panels.init();

    // Add features to the map
    map.markerLayer.setGeoJSON(geoJson);

    // Initialize the marker state defaults
    resetMarkerState();

    // var omni = _.find(geoJson.features, {'properties': {'id': 'omni'}});

    // var omniToHampton = drawRoute(omni._routes['hampton-inn'], {id: 'omni-route', color: '#68b0d4'});

    // Set the map view based on the window height
    if ($(window).height() > 755) {
      map.setView([38.04, -78.477], 14);
    } else {
      map.setView([38.038, -78.477], 13);
    }

    // Click handler for markers
    map.markerLayer.on('click',function(e) {
      var self = this;
      var marker = e.layer;
      var properties = marker.feature.properties;
      var id = properties.id;
      var state = properties.state;

      resetMarkerState();

      if (state === 'active') {
        panels.hidePanel(id);
      } else {
        drawMultipleRoutes(id);
        panels.showPanel(id, function() {
          e.layer.feature.properties['state'] = 'active';
        });
      }

    });
  };

  init();

  return {
    drawRoute: drawRoute,
    init: init
  };
});