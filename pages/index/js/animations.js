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
