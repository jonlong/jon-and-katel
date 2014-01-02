define(['jquery','require', 'pjax'], function($, require){
	var page = $('#page');
	var navigation = $('#main-navigation');
	var container = $('#page-wrapper');
	var section;
	
	// When the page first loads
	section = page.attr('class');

	// assumes there is a js file with the same name as `section`
	require([section]);

	if ($.support.pjax) {
		navigation.find('a').on('click', function(e) {
			section = $(this).attr('data-section');
			$.pjax.click(e, '#page-wrapper', {fragment: '#page'});
		});
	}

	// When pjax is done, load the appropriate JS
	$(document).on('pjax:end', function() {
		console.log('END!', section);

		// assumes there is a js file with the same name as `section`
		if (require.defined(section)) {
			require(section).init();
		} else {
			require([section]);
		}
	});

});
