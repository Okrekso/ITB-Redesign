// import * as liqpay from "./external/liqpay";
import { closePopup, closeField, errorField, chekField } from "./popup_ops";
import { renderPopups } from "../../react/popup";

import * as strings from "./constants";
import $ from "jquery";
import Cookies from "js-cookie";
import { goTo } from "./main";

export function buyCard() {
  console.log("currently unavailable!");
}
export function checkDropAvailability(
  callback = available => {
    available = false;
  }
) {
  $.ajax({
    type: "GET",
    url: strings.server + "/chekDropAvailability",
    success: function(response) {
      callback(response);
    }
  });
}
export function addDrop() {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "POST",
    url: strings.server + "/addDrop",
    data: { secureCode: secureCode },
    success: function(response) {
      if (response == strings.s_notTime) {
        renderPopups([
          {
            id: "dropPopup",
            textes: [
              {
                id: "tooMany",
                text: "you've made too many drops! Wait at least 70 days."
              }
            ]
          }
        ]);
      } else {
        $("#bDrop").addClass("hidden");
        closePopup("#dropPopup");
        closeField();
      }
    }
  });
}
export function logOut() {
  Cookies.remove("secureCode");
  goTo("/");
}
export function createEvent(dateHolder, callback = err => {}) {
  let secureCode = Cookies.get("secureCode");
  let now = new Date();

  let sum = chekField("#ev-header") + chekField("#ev-content");

  if (sum < 2) return;

  let value = new Date($(`#${dateHolder}`).val());
  if (value < now || value == "Invalid Date")
    return errorField(`#${dateHolder}`);
  errorField(`#${dateHolder}`, false);

  if ($(`#ev-xp`).val() < 1) return errorField("#ev-xp");
  errorField("#ev-xp", false);

  $.ajax({
    type: "POST",
    url: strings.server + "/newEvent",
    data: {
      Header: $("#ev-header").val(),
      Content: $("#ev-content").val(),
      Date_when: $("#ev-when").val(),
      Xp: $("#ev-xp").val(),
      secureCode: secureCode
    },
    success: function(response) {
      if (response == strings.s_noAccess) {
        renderPopups([
          {
            id: "eventCreator",
            textes: [{ text: "you have no access for this!" }]
          }
        ]);
        return callback(strings.s_noAccess);
      }
      closePopup("#eventCreator");
      closeField();
      callback();
    }
  });
}
export function getRequests() {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "GET",
    url: strings.server + "/getRequests",
    data: { secureCode: secureCode },
    success: function(requests) {
      fillAccept(0, requests);
    }
  });
}
export function chekRequests() {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "GET",
    url: strings.server + "/getRequests",
    data: { secureCode: secureCode },
    success: function(requests) {
      if (requests.length > 0) $("#acceptation").addClass("new-items");
      else $("#acceptation").removeClass("new-items");
    }
  });
}
export function fillAccept(selectedID = 0, requests) {
  $("#bPrev").attr("disabled", true);
  $("#bNext").attr("disabled", true);
  if (selectedID > 0) $("#bPrev").attr("disabled", false);
  if (selectedID < requests.length - 1) $("#bNext").attr("disabled", false);

  if (requests == undefined || requests.length <= 0)
    return renderPopups([
      {
        id: "userAcceptation",
        Header: "no user found",
        textes: [{ text: "no requests" }],
        buttons: undefined
      }
    ]);
  renderPopups([
    {
      id: "userAcceptation",
      Header: "Accept users to the club",
      textes: [
        { id: "tName", text: "name" },
        { id: "tGroup", text: "group" },
        { id: "tEmail", text: "email" }
      ],
      buttons: [
        { id: "bAccept", content: "accept this user", blocker: false },
        { id: "bDecline", content: "decline this user", blocker: false },
        [
          { id: "bPrev", content: "<", blocker: false },
          { id: "bNext", content: ">", blocker: false }
        ]
      ]
    }
  ]);

  $("#tName").text(requests[selectedID].Name);
  $("#tGroup").text(requests[selectedID].Stud_group);
  $("#tEmail").text(requests[selectedID].Email);

  $("#bNext").off("click");
  $("#bPrev").off("click");
  $("#bAccept").off("click");
  $("#bDecline").off("click");

  $("#bNext").click(() => {
    fillAccept(
      selectedID < requests.length ? selectedID + 1 : requests.length - 1,
      requests
    );
  });
  $("#bPrev").click(() => {
    fillAccept(selectedID > 0 ? selectedID - 1 : 0, requests);
  });
  $("#bAccept").click(() => {
    accept(requests[selectedID].ID);
  });
  $("#bDecline").click(() => {
    decline(requests[selectedID].ID);
  });
}

export function accept(ID) {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "POST",
    url: strings.server + "/acceptRequest",
    data: { secureCode: secureCode, request_ID: ID },
    success: function(response) {
      getRequests();
      chekRequests();
    }
  });
}

export function decline(ID) {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "POST",
    url: strings.server + "/declineRequest",
    data: { secureCode: secureCode, request_ID: ID },
    success: function(response) {
      getRequests();
      chekRequests();
    }
  });
}

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

export function chekChange() {
  let newSecure = findGetParameter("change");
  console.log(newSecure);
  if (newSecure == undefined) return false;
  return true;
}

export function changePassword() {
  if (!chekChange()) return;
  if (!chekField("#fPass", "#fPass-repeat")) return;

  let newSecure = findGetParameter("change");
  $.ajax({
    type: "POST",
    url: strings.server + "/changePassBySecure",
    data: { addSecureCode: newSecure, newPass: $("#fPass").val() },
    success: function(response) {
      console.log(response);
      if (response == "pass changed") goTo("/");
    }
  });
}
