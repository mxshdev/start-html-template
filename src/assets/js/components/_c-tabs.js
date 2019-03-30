initTabsComponentModule();

function initTabsComponentModule() {
	
	var navigationTab = '.c-tabs .c-tabs__header > .item';
	
	$gBody.on('click', navigationTab, function() {
		$(this).parent().children('.is-active').removeClass('is-active');
		$(this).addClass('is-active');
		var $tabsContent = $('.c-tabs .c-tabs__body[data-c-tabs="' + $(this).parent().attr('data-c-tabs') + '"]');
		$tabsContent.children('.is-active').removeClass('is-active');
		$tabsContent.children('.item').eq($(this).index()).addClass('is-active');
	});
	
}