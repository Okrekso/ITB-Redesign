let isLogged = false;
function goTo(link) {
	window.location = link;
}
function Load() {
	w3IncludeHTML();
	isLogged = chekIsLoggedIn();
}
function chekIsLoggedIn() {
	if ($.cookie('secureCode') != undefined && $.cookie('secureCode') != null) {
		return true;
	}
	return false;
}
