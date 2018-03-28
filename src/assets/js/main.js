/**
 * Section: jQuery
 */

$(function() {
	
	initNavigationUIModule();
	
	$(window).resize(function() {
		initNavigationUIModule();
	});
	
	initTabsUIModule();
	
});

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

function initTabsUIModule() {
	var $navigationTab = $('.navigation-tabs .navigation-tab');
	
	$navigationTab.click(function() {
		$(this).parent().children('.is-active').removeClass('is-active');
		$(this).addClass('is-active');
		var $tabsContent = $('.content-tabs[data-tabs-content="' + $(this).parent().data('tabs-content') + '"]');
		$tabsContent.children('.is-active').removeClass('is-active');
		$tabsContent.children('.content-tab').eq($(this).index()).addClass('is-active');
	});
}
