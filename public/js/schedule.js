define(['jquery', 'ical'], function($, ical){

  var init = function() {
    console.log('ical', ical);
  };

  init();

  return {
    init: init
  };
});