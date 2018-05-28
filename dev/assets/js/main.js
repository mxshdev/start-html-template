/**
 * Section: jQuery
 */

$(function() {
	
	var $gridBreakpoints = {
		xs: 0,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200
	},
	$body = $('body'),
	$html = $('html');
/**
 * Disable drag images
 */

$('img').on('dragstart', function(e) {
	e.preventDefault();
});
	initTabsUIModule();

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
initFormUiModule();

function initFormUiModule() {
	
	$body.on('click', '.ui.form-field label, .ui.form-field .label', function() {
		$(this).next().focus();
	});
	
	$body.on('click', 'label', function() {
		$(this).next().focus();
	});
	
}
	
	
	
});
