/**
 * Disable drag images
 */

$('img').on('dragstart', function(e) {
	e.preventDefault();
});