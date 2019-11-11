function initModalComponent() {
  $gBody.on('click', '[data-action="open-modal"]', function () {
    var self = this;
    $.magnificPopup.open({
      items: {
        src: $(self).attr('href') || $(self).attr('data-href')
      },
      type: 'inline',
      preloader: false,
      removalDelay: 300,
      showCloseBtn: false,
      closeOnBgClick: false,
      mainClass: 'mfp-general-animation'
    });
  });

  $gBody.on('click', '[data-action="close-modal"]', function () {
    $.magnificPopup.close();
  });
}

initModalComponent();
