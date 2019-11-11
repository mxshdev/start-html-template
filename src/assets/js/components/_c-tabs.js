function initTabsComponentModule() {
  var navigationTab = '[data-c-tab]';
  $gBody.on('click', navigationTab, function () {
    $(this).parent().children('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    var $tabsContent = $('.c-tabs .c-tabs__body [data-c-tab="' + $(this).attr('data-c-tab') + '"]');
    $tabsContent.closest('.c-tabs__body').children('.is-active').removeClass('is-active');
    $tabsContent.addClass('is-active');
  });
}

initTabsComponentModule();
