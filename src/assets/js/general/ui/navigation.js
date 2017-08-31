function initNavigationUIModule() {
	var $menuItemHasChildren = $('.ui.navigation .menu-item-has-children');
	
	$menuItemHasChildren.off();
	
	if ($(window).width() < 992) {
		$menuItemHasChildren.click(function() {
			$(this).toggleClass('is-opened');
		});
	}
	else {
		$menuItemHasChildren.mouseenter(function() {
			$(this).addClass('is-opened');
		});
		$menuItemHasChildren.mouseleave(function() {
			$(this).removeClass('is-opened');
		});
	}
}

initNavigationUIModule();

$(window).resize(function() {
	initNavigationUIModule();
});