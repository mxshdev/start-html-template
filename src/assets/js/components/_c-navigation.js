function initNavigationComponentModule() {
  var $menuItemHasChildren = $('.c-navigation .menu-item-has-children');
  $menuItemHasChildren.find('> a').off();
  $menuItemHasChildren.off();
  if ($(window).width() < $gGridBreakpoints['md']) {
    $menuItemHasChildren.find('> a').click(function (e) {
      e.preventDefault();
      $(this).parent().toggleClass('is-opened');
    });
  } else {
    $menuItemHasChildren.mouseover(function () {
      $(this).addClass('is-opened');
    });
    $menuItemHasChildren.mouseleave(function () {
      $(this).removeClass('is-opened');
    });
  }
}

initNavigationComponentModule();

$(window).resize(function () {
  initNavigationComponentModule();
});
