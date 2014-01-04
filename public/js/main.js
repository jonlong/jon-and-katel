/*global $, mapboxMap, L, google */

var JK = function() {

  // Map Items

  var places = [
    {
      id: 'omni',
      name: 'Omni Charlottesville',
      position: [38.031439, -78.4849821]
    },
    {
      id: 'hamptoninn',
      name: 'Hampton Inn',
      position: [38.0626743, -78.4886727]
    },
    {
      id: 'hamptonsuites',
      name: 'Hampton Inn & Suites',
      position: [38.0322372, -78.4943703]
    }
  ];

  // Breakpoints

  var breakpoints = {
    small: 500,
    medium: 768,
    large: 1400
  };

  // DOM Elements

  var hero = $('#hero');
  var crest = $('#crest');
  var mapContainer = $('#map');
  var accommodations = $('#accommodations');
  var hotels = $('#hotels');
  var body = $('body');
  var nav = $('#nav');

  // Element plugins

  $.fn.setMinHeight = function(height) {
    this.css('min-height', height);
  };

  // Events

  nav.find('a').on('click', function(e) {
    var hash = this.hash;

    $('html, body').animate({
       scrollTop: $(this.hash).offset().top
     }, 300, function(){
       window.location.hash = hash;
     });

    e.preventDefault();
  });

  // Private functions

  var setHeroHeight = function() {
    var height = window.innerHeight;
    hero.setMinHeight(height);
  };

  var setMapHeight = function() {
    var height = hotels.height();
    mapContainer.setMinHeight(height);
  };

  var fitText = function() {
    hotels.find('h3').fitText(1.6);
  };

  var loadMap = function() {
    $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBRZBM7HqxhnRVjKBFX_wkXTgFWTrsHdUc&sensor=false&callback=JK.drawMap');
  };

  var initNav = function() {
    var height = window.innerHeight - (86 * 2);

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
      var width = window.innerWidth;

      if (width >= breakpoints.medium) {
        initNav();
        loadMap();
        setMapHeight();
      }

      JK.drawLayout();
      $(window).resize(function() {
        JK.drawLayout();
      });
    },

    drawLayout : function() {
      setHeroHeight();
      fitText();
    },

    drawMap : function() {

      var markers = [];
      var mapOptions = {
        center: new google.maps.LatLng(38.029305898704656, -78.47667809750419),
        zoom: 13,
        scrollwheel: false
      };

      setMapHeight();

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var infoWindow = new google.maps.InfoWindow();

      for (i = 0; i < places.length; i++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(places[i].position[0], places[i].position[1]),
          map: map
        });
        markers.push(marker);
      }

      hotels.find('.hotel').on('click', function() {
        var id = $(this).attr('id');
        var index = $(this).index();

        infoWindow.setContent(places[index].name);
        infoWindow.open(map, markers[index]);
      });
    }
  };
}();

JK.init();