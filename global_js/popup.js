function openPopup(value) {
	$('#popup-field').removeClass('closed');
	$('#popup-field').removeClass('animationOuter');
	$('#popup-field').addClass('animationEnter');

	$(value).removeClass('closed');
	$(value).removeClass('animationOuter');

	if ($(value).hasClass('closed')) $(value).addClass('animationEnter');
}
function closePopup(value) {
	$(value).removeClass('animationEnter');
	$(value).addClass('animationOuter');

	if ($(value).hasClass('animationEnter'))
		setTimeout(() => {
			$(value).addClass('closed');
		}, 1000);
}
function closeField() {
	if ($('#popup-field').hasClass('animationEnter'))
		setTimeout(() => {
			$('#popup-field').removeClass('animationEnter');
			$('#popup-field').addClass('animationOuter');
			setTimeout(() => {
				$('#popup-field').addClass('closed');
			}, 1000);
		}, 1000);
}

function chekField(fieldName, fieldCompare = undefined) {
	function setIncorrect() {
		$(fieldName).addClass('incorrect');
		$(fieldCompare).addClass('incorrect');
	}
	function setCorrect() {
		$(fieldName).removeClass('incorrect');
		$(fieldCompare).removeClass('incorrect');
	}
	if (fieldCompare) {
		if ($(fieldName).val() != '') {
			if ($(fieldName).val() == $(fieldCompare).val()) {
				setCorrect();
				return true;
			}
		}
		setIncorrect();
		return false;
	} else {
		if ($(fieldName).val().length == 0) {
			setIncorrect();
			return false;
		} else {
			setCorrect();
			return true;
		}
	}
}
