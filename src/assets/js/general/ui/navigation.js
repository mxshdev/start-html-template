initNavigationUiModule();

$(window).resize(function() {
	initNavigationUiModule();
});

function initNavigationUiModule() {
	
	var $menuItemHasChildren = $('.ui.navigation .menu-item-has-children');
	
	$menuItemHasChildren.find('> a').off();
	$menuItemHasChildren.off();
	
	if ($(window).width() < $gridBreakpoints['md']) {
		$menuItemHasChildren.find('> a').click(function(e) {
			e.preventDefault();
			$(this).parent().toggleClass('is-opened');
		});
	}
	else {
		$menuItemHasChildren.mouseover(function() {
			$(this).addClass('is-opened');
		});
		$menuItemHasChildren.mouseleave(function() {
			$(this).removeClass('is-opened');
		});
	}
	
}