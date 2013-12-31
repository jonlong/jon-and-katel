/*global $, mapboxMap, L */

var JK = function() {

  // DOM Elements

  var hero = $('#hero');
  var crest = $('#crest');
  var mapContainer = $('#map');
  var accommodations = $('#accommodations');
  var hotels = $('#hotels');
  var body = $('body');
  var nav = $('#nav');

  // Element plugins

  $.fn.centerElement = function(offsetX, offsetY) {
    if (!offsetX) {
      offsetX = 0;
    }
    if (!offsetY) {
      offsetY = 0;
    }
    this.css({
      position:'absolute',
      left: ($(window).width() - this.outerWidth())/2 + offsetX,
      top: ($(window).height() - this.outerHeight())/2 + offsetY
    });
  };

  $.fn.setMinHeight = function(height) {
    this.css('min-height', height);
  };

  // Events

  nav.find('a').on('click', function(e) {
   var hash = this.hash;

   e.preventDefault();

   $('html, body').animate({
       scrollTop: $(this.hash).offset().top
     }, 300, function(){
       window.location.hash = hash;
     });

});

  // Private functions

  var setHeroHeight = function() {
    var height = $(window).height();
    hero.setMinHeight(height);
  }

  var setMapHeight = function() {
    var height = hotels.height();
    mapContainer.setMinHeight(height);
  };

  var fitText = function() {
    hotels.find('h3').fitText(1.6);
  };

  var loadMap = function() {
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBRZBM7HqxhnRVjKBFX_wkXTgFWTrsHdUc&sensor=false&callback=JK.drawMap');
  }

  var initNav = function() {
    var height = $(window).height() - (nav.height() * 2);

    body.scrollspy({
      target: '.navbar'
    });

    nav
      .css('top', height)
      .affix({
        offset: {
          top: height
        }
      });
  };

  return {

    // Public methods

    init : function() {
      JK.drawLayout();
      loadMap();
      $(window).resize(function() {
        JK.drawLayout();
      });
    },

    drawLayout : function() {
      setHeroHeight();
      setMapHeight();
      initNav();
      fitText();
      crest.centerElement(0, -nav.height());
    },

    drawMap : function() {

      // Map Locations
      var hamptonInn = new google.maps.LatLng(38.0626743,-78.4886727);
      var omni = new google.maps.LatLng(38.031439,-78.4849821);
      var hamptonSuites = new google.maps.LatLng(38.0322372, -78.4943703);

      setMapHeight();
      var mapOptions = {
        center: new google.maps.LatLng(38.029305898704656, -78.47667809750419),
        zoom: 13,
        scrollwheel: false
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      // var markerLayer = L.mapbox.markerLayer()
      //   .loadURL('/js/geojson.json')
      //   .addTo(mapboxMap);

      //   console.log(markerLayer)
      //   console.log(L.mapbox.markers)
      //   console.log(markerLayer.getLayers())

      // markerLayer.on('ready', function() {
      //   mapboxMap.fitBounds(markerLayer.getBounds());
      // });

      // hotels.find('.hotel').on('click', function(e) {
      //   var name = $(this).find('h3').text();



      //   var position = $(this).attr('data-position');
      //   var loc = position.split(',');

      //   mapboxMap.setView(loc, 14);
      // });

    }

  };

}();

JK.init();