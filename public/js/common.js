requirejs.config({
  baseUrl: '/assets/js',
  paths: {
    'jquery': '/bower_components/jquery/jquery',
    'mapbox': 'vendor/mapbox',
    'transit': '/bower_components/jquery.transit/jquery.transit',
    'text': '/bower_components/requirejs-text/text',
    'lodash': '/bower_components/lodash/lodash',
    'ical': '/bower_components/ical.js/ical',
    'pjax': '/bower_components/jquery-pjax/jquery.pjax'
  },
  shim: {
    'mapbox': {
      exports: 'L'
    },
    'pjax': {
      deps: ['jquery'],
      exports: 'jQuery.fn.pjax'
    },
    'transit': {
      deps: ['jquery'],
      exports: 'jQuery.fn.transit'
    }
  }
});