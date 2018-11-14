import $ from 'jquery';

export function openPopup(value, callback = () => {}) {
	$('#popup-field').removeClass('closed');
	$('#popup-field').removeClass('animationOuter');
	$('#popup-field').addClass('animationEnter');

	$(value).removeClass('closed');
	$(value).removeClass('animationOuter');

	$(value).addClass('animationEnter');
	setTimeout(() => {
		callback();
	}, 1000);
}
export function closePopup(value, callback = () => {}) {
	$(value).removeClass('animationEnter');
	$(value).addClass('animationOuter');

	setTimeout(() => {
		$(value).addClass('closed');
		callback();
	}, 1000);
}
export function closeField() {
	setTimeout(() => {
		$('#popup-field').removeClass('animationEnter');
		$('#popup-field').addClass('animationOuter');
		setTimeout(() => {
			$('#popup-field').addClass('closed');
		}, 800);
	}, 1000);
}

export function chekField(fieldName, fieldCompare = undefined) {
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

export function errorField(fieldName, isTrue = true) {
	if (isTrue) {return $(fieldName).addClass('incorrect');}
	return $(fieldName).removeClass('incorrect');
}
