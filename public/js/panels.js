define(['jquery', 'transit'], function($) {
  var panelsSelector = '.side-panel';
  var closeBtn = $('<a href="#" class="close">Close</a>');
  var panels;

  var init = function () {
    panels = $(panelsSelector);

    panels.each(function() {
      var self = $(this);
      var id = self.attr('id');

      closeBtn.clone().prependTo(self);
      hide(id);
    });

    panels.on('click', '.close', function(e) {
      var id = $(this).parent('.side-panel').attr('id');

      hide(id);
      e.preventDefault();
    });
  };

  var show = function(id, callback) {
    var panel = panels.filter('#'+id);

    if (panels.hasClass('active')) {
      hide();
    }

    panel
      .addClass('active')
      .transition({
        right: 0,
        opacity: 1
      }, 500, callback);
  };

  var hide = function(id, callback) {
    console.log('id', id);
    var activePanel = panels.filter('.active');
    var panel = (activePanel.length > 0) ? activePanel : panels.filter('#'+id);
    console.log('panel', panel);
    var width = panel.outerWidth();
    console.log('width', width);

    panel
      .removeClass('active')
      .css({
        right: -width
      });
      // .transition({
      //   right: -width,
      //   opacity: 0
      // }, 500, callback);
  };

  init();

  return {
    showPanel: show,
    hidePanel: hide,
    init: init
  };
});