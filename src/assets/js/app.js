$(function() {
	
	/* ======================================== >>>>> */
	/* = UI Modules = */
	/* ======================================== >>>>> */
	
	/* ––––– Navigation ––––– */
	
	function initNavigationUIModule() {
		var $menuItemHasChildren = $('.ui.navigation .menu-item-has-children');
		
		$menuItemHasChildren.off();
		
		if ($(window).width() < 992) {
			$menuItemHasChildren.click(function() {
				$(this).toggleClass('opened');
			});
		}
		else {
			$menuItemHasChildren.hover(function() {
				$(this).toggleClass('opened');
			});
		}
	}
	
	initNavigationUIModule();
	
	$(window).resize(function() {
		initNavigationUIModule();
	});
	
	/* ––––– Tabs ––––– */
	
	function initTabsUIModule() {
		var $navigationTab = $('.navigation-tabs .navigation-tab');
		
		$navigationTab.click(function() {
			$(this).parent().children('.active').removeClass('active');
			$(this).addClass('active');
			var $tabsContent = $('.content-tabs[data-tabs-content="' + $(this).parent().data('tabs-content') + '"]');
			$tabsContent.children('.active').removeClass('active');
			$tabsContent.children('.content-tab').eq($(this).index()).addClass('active');
		});
	}
	
	initTabsUIModule();
	
});