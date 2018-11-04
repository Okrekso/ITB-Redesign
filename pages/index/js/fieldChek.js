function chekAllRegFields() {
	let chekName = chekField('#registration .fields #name');
	let chekPass = chekField('#registration .fields #password', '#registration .fields #password-accept');
	let chekEmail = chekField('#registration .fields #email');
	let chekGroup = chekField('#registration .fields #group');

	if (chekName + chekPass + chekEmail + chekGroup == 4) {
		return true;
	}
	return false;
}

function chekAllLoginFields() {
	let chekEmail = chekField('#login .fields #email-login');
	let chekPass = chekField('#login .fields #password-login');

	if (chekEmail + chekPass == 2) {
		return true;
	}
	return false;
}

