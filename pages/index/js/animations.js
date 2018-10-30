function openPopup(value) {
  $("#popup-field").removeClass("closed");
  $("#popup-field").removeClass("animationOuter");
  $("#popup-field").addClass("animationEnter");

  $(value).removeClass("closed");
  $(value).removeClass("animationOuter");
  $(value).addClass("animationEnter");
}
function closePopup(value) {
  $(value).removeClass("animationEnter");
  $(value).addClass("animationOuter");
  setTimeout(() => {
    $(value).addClass("closed");
  }, 1000);
}
function closeField() {
  setTimeout(() => {
    $("#popup-field").removeClass("animationEnter");
    $("#popup-field").addClass("animationOuter");
    setTimeout(() => {
      $("#popup-field").addClass("closed");
    }, 1000);
  }, 1000);
}
function openRegistration() {
  openPopup("#registration");
}
function closeRegistration() {
  closePopup("#registration");
  closeField();
}
function openLogin() {
  openPopup("#login");
}
function closeLogin() {
  closePopup("#login");
  closeField();
}
function openForgot() {
  closePopup("#login");
  setTimeout(() => {
    openPopup("#forgot");
  }, 1000);
}
function closeForgot() {
  closePopup("#forgot");
  closeField();
}
