import { chekIsLoggedIn } from "./main";
import { renderPopups } from "../../react/popup";
import * as strings from "./constants";
import renderHeader from "../../react/header";

import "jquery";
import Cookies from "js-cookie";

function renderDefault() {
  renderPopups([
    {
      id: "registration",
      header: "registration form",
      fields: [
        { text: "name", id: "name" },
        { text: "group", id: "group" },
        { type: "separator" },
        { text: "email", id: "email", type: "email" },
        { text: "password", id: "password", type: "password" },
        { text: "accept password", id: "password-accept", type: "password" }
      ],
      buttons: [
        {
          id: "bRegistrate",
          content: "registrate",
          callback: callback => {
            createRequest(callback);
          }
        }
      ]
    },
    {
      id: "login",
      header: "Login to your account",
      fields: [
        { text: "email", id: "email-login" },
        { text: "password", id: "password-login", type: "password" }
      ],
      buttons: [
        {
          id: "bForget",
          content: "i forgot my password",
          callback: callback => {
            popup.closePopup("#login", () => {
              popup.openPopup("#forgot");
            });
            callback();
          }
        },
        {
          id: "bLogin-login",
          content: "login to your account",
          callback: callback => {
            login(callback);
          }
        }
      ]
    },
    {
      id: "forgot",
      header: "Change password",
      fields: [{ text: "email", id: "email-forgot" }],
      buttons: [
        {
          id: "bSendForget",
          content: "send me change password link",
          callback: callback => {
            forget(callback);
          }
        }
      ]
    }
  ]);
}

export function createRequest(callback = () => {}) {
  let regFields = "#popup-field #registration .fields";

  let data = {
    name: $(`${regFields} #name`).val(),
    email: $(`${regFields} #email`).val(),
    pass: $(`${regFields} #password`).val(),
    stud_group: $(`${regFields} #group`).val()
  };
  if (chekAllRegFields()) {
    $.ajax({
      type: "POST",
      url: strings.server + "/newRequest",
      data: data,
      success: function(response) {
        console.log("response:", response);
        if (response.indexOf("Duplicate") != -1) {
          return renderPopups([
            {
              id: "registration",
              textes: [{ text: "you've already send request!", type: "error" }]
            }
          ]);
        }
        renderPopups([
          {
            id: "registration",
            textes: [{ text: "request sent" }],
            buttons: undefined,
            fields: undefined
          }
        ]);
        popup.closePopup("#registration");
        popup.closeField();
      }
    });
  }
  return callback();
}

export function login(callback = () => {}) {
  let email = $("#login .fields #email-login").val();
  let pass = $("#login .fields #password-login").val();
  if (chekAllLoginFields())
    $.ajax({
      type: "GET",
      url: strings.server + "/login",
      data: { email: email, pass: pass },
      success: function(secureCodeData) {
        if (secureCodeData.length > 0) {
          let code = secureCodeData[0].Secure_code;
          Cookies.set("secureCode", code);
          if (Cookies.get("secureCode") != undefined) {
            popup.closePopup("#login");
            popup.closeField();
            $("#bLogin").prop("disabled", true);
            $("#bBecome").prop("disabled", true);
            renderHeader();
            callback();
          }
        } else {
          popup.errorField($("#login .fields #password-login"));
          callback();
        }
      }
    });
}

export function forget(callback = () => {}) {
  let email = $("#forgot .fields #email-forgot").val();
  $.ajax({
    type: "GET",
    url: strings.server + "/forgetPass",
    data: { email: email },
    success: function(response) {
      if (response == strings.s_userNotFound) {
        popup.errorField("#forgot .fields #email-forgot");
        return renderPopups([
          {
            id: "forgot",
            header: "user not found",
            textes: [{ text: "user not found", type: "error" }]
          }
        ]);
      }
      if (response == strings.s_notTime) {
        popup.errorField("#forgot .fields #email-forgot");
        return renderPopups([
          {
            id: "forgot",
            header: "Too many requests",
            textes: [{ text: "too many requests", type: "error" }]
          }
        ]);
      }
      renderDefault();
      popup.errorField("#forgot .fields #email-forgot", false);

      popup.closePopup("#forgot");
      popup.closeField();

      return callback();
    }
  });
}

export function loadAll() {
  if (!chekIsLoggedIn()) {
    renderDefault();
    $("#bLogin").prop("disabled", false);
    $("#bBecome").prop("disabled", false);
  }
}
