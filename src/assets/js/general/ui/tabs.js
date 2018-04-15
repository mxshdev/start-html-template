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