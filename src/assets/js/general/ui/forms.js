initFormUiModule();

function initFormUiModule() {
	
	$body.on('click', '.ui.form-field label, .ui.form-field .label', function() {
		$(this).next().focus();
	});
	
	$body.on('click', 'label', function() {
		$(this).next().focus();
	});
	
}