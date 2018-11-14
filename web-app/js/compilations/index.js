import * as main from "../modules/main";
window.main = main;

import * as ajax from "../modules/ajax_index";
window.ajax = ajax;

import * as popup from "../modules/popup_ops";
window.popup = popup;

window.onload = () => {
  ajax.loadAll();
  main.Load();
};

function chekAllRegFields() {
  let chekName = popup.chekField("#registration .fields #name");
  let chekPass = popup.chekField(
    "#registration .fields #password",
    "#registration .fields #password-accept"
  );
  let chekEmail = popup.chekField("#registration .fields #email");
  let chekGroup = popup.chekField("#registration .fields #group");

  if (chekName + chekPass + chekEmail + chekGroup == 4) {
    return true;
  }
  return false;
}

function chekAllLoginFields() {
  let chekEmail = popup.chekField("#login .fields #email-login");
  let chekPass = popup.chekField("#login .fields #password-login");
  if (chekEmail + chekPass == 2) {
    return true;
  }
  return false;
}

window.chekAllLoginFields = chekAllLoginFields;
window.chekAllRegFields = chekAllRegFields;

// import {$,jQuery,extend} from "jquery";
// window.$=$;
// window.jQuery=jQuery;
// window.extend=extend;
// import * as parallax from "../modules/external/parallax";

import * as constants from "../modules/constants";
window.constants = constants;
