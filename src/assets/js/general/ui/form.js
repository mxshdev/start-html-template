initFormUiModule();

function initFormUiModule() {
	
	$body.on('click', '.ui.form-field label, .ui.form-field .label', function() {
		$(this).next().focus();
	});
	
	$body.on('click', 'label', function() {
		$(this).next().focus();
	});
	
	$('form').on('submit', function(e) {
		e.preventDefault();
		var $form = $(this);
		$.ajax({
			type: 'POST',
			url: 'form.php',
			data: $form.serialize(),
			success: function(response) {
				$form[0].reset();
				alert('Thanks. Your message has been received. We will contact you shortly.');
			},
			error: function(response) {
				alert('An error occurred. Refresh the page and try again.');
			}
		});
	});
	
}