import $ from "jquery";
import * as strings from "../modules/constants";
import Cookies from "js-cookie";
import { renderPopups, addImg } from "../../react/popup";
import * as popupOps from "../modules/popup_ops";
import {
  buyCard,
  addDrop,
  checkDropAvailability,
  createEvent,
  logOut,
  getRequests, chekRequests,
  chekChange,
  changePassword
} from "../modules/ajax_account";
import { convertToDate } from "../modules/main";
import { isUndefined, isNullOrUndefined } from "util";
import { isNull } from "util";

$(document).ready(() => {
  if (chekChange()) {
    console.log("change pass!");
    renderPopups([
      {
        id: "passChange",
        header: "Password changing",
        fields: [
          { id: "fPass", text: "your new pass", type: "password" },
          {
            id: "fPass-repeat",
            text: "repeat your new password",
            type: "password"
          }
        ],
        buttons: [
          {
            id: "bChange",
            content: "change password",
            callback: exitCallback => {
              changePassword();
              exitCallback();
            }
          }
        ]
      }
    ]);
    return popupOps.openPopup("#passChange");
  }
  if (isNullOrUndefined(Cookies.get("secureCode"))) {
    console.log("not logged in!");
    renderPopups([
      {
        id: "notLoggedIn",
        header: "You're not logged in",
        textes: [{ text: "you haven't log in. Do it on the main page" }]
      }
    ]);
    $("#bRelog").addClass("hidden");
    return popupOps.openPopup("#notLoggedIn");
  }

  chekRequests();
  $(".card").click(() => {
    openCard();
  });
  definePopups();
  importUser();
});

function countPercentage(lvl) {
  function chek(min, max) {
    if (lvl >= min && lvl < max) {
      return ((lvl - min) * 100) / (max - min);
    } else return null;
  }
  if (chek(0, 40) != null)
    return {
      interval: { min: 0, max: 40 },
      proc: chek(0, 40),
      clr: "green",
      type: "Green"
    };
  if (chek(40, 80) != null)
    return {
      interval: { min: 40, max: 80 },
      proc: chek(40, 80),
      clr: "orange",
      type: "Orange"
    };
  if (chek(80, 120) != null)
    return {
      interval: { min: 80, max: 120 },
      proc: chek(80, 120),
      clr: "gold",
      type: "Golden"
    };
  if (chek(120, 200) != null)
    return {
      interval: { min: 120, max: 200 },
      proc: chek(120, 200),
      clr: "rgb(58, 46, 218)",
      type: "Diamond"
    };
  if (chek(200, 500) != null)
    return {
      interval: { min: 200, max: 500 },
      proc: chek(200, 500),
      clr: "purple",
      type: "Legendary"
    };
  if (chek(500, 1000) != null)
    return {
      interval: { min: 500, max: 1000 },
      proc: chek(500, 1000),
      clr: "purple",
      type: "Legendary"
    };
  if (chek(1000, 9999) != null)
    return {
      interval: { min: 1000, max: 9999 },
      proc: chek(1000, 9999),
      clr: "purple",
      type: "Legendary"
    };
}

export function definePopups() {
  let timeStr = convertToDate(new Date());
  renderPopups([
    {
      id: "dropPopup",
      header: "drop confirm",
      textes: [{ text: "are you sure?\nAll users lost some Xp after that..." }],
      buttons: [
        {
          content: "yes",
          callback(closeCallback) {
            addDrop();
            closeCallback();
          }
        }
      ]
    },
    {
      id: "buyCard",
      header: "Buy our new club member's card",
      textes: [
        {
          text: "you can buy our new card which gives you new features:"
        },
        {
          type: "feature",
          text: "buy food in University for XP points"
        },
        {
          type: "feature",
          text: "30 GXP"
        }
      ],
      buttons: [
        {
          id: "bBuyCard",
          content: "buy subscription",
          callback: closeCallback => {
            buyCard();
            closeCallback();
          }
        }
      ]
    },
    {
      id: "eventCreator",
      header: "Event creator",
      fields: [
        { id: "ev-header", text: "Header:" },
        {
          id: "ev-content",
          text: "Description:",
          type: "textarea",
          add: { min: timeStr }
        },
        { id: "ev-when", text: "When:", type: "datetime-local" },
        { id: "ev-xp", text: "Xp count/user:" }
      ],
      buttons: [
        {
          id: "bPost",
          content: "post new event",
          callback: closeCallback => {
            createEvent("ev-when");
            closeCallback();
          }
        }
      ]
    },
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

  $("#drop").click(() => {
    popupOps.openPopup("#dropPopup");
  });
  $("#events").click(() => {
    popupOps.openPopup("#eventCreator");
  });
  $("#cardPromotion").click(() => {
    popupOps.openPopup("#buyCard");
  });
  $("#acceptation").click(() => {
    getRequests();
    popupOps.openPopup("#userAcceptation");
  });
  $("#bRelog").click(() => {
    logOut();
  });
  addImg("buyCard", "/pics/card.png");
  $("#ev-when").val(timeStr);
}

export function importUser() {
  $.ajax({
    type: "GET",
    url: strings.server + "/user_bySecure",
    data: { secureCode: Cookies.get("secureCode") },
    success: function(user) {
      $("#info-top").removeClass("hidden");
      let accTypes = {
        default: {
          head: "default account",
          about: "default it beans account. You can only collect your XP points"
        },
        premium: {
          head: "premium account",
          about:
            "premium it beans account. You can collect and buy for XP points some stuff in university`s shop! Also you have x1.5 for your XPs"
        },
        seller: {
          head: "seller account",
          about:
            "seller accout grant you ability to scan and add buys to user`s accounts"
        }
      };

      $(".xpCount").css("width", `${countPercentage(user.Xp).proc}%`);
      $(".xpCount").css("background", `${countPercentage(user.Xp).clr}`);
      $("#minXpText").text(`${countPercentage(user.Xp).interval.min}Xp`);
      $("#maxXpText").text(`${countPercentage(user.Xp).interval.max}Xp`);
      $("#xpText").text(`${user.Xp}Xp`);

      $("#userName").text(user.Name);
      let accType;
      if (user.Acc_type == "Default") {
        accType = accTypes.default;
      }
      if (user.Acc_type == "Premium") {
        $("#cardPromotion").addClass("hidden");
        accType = accTypes.premium;
      }
      if (user.Acc_type == "Seller") {
        accType = accTypes.seller;
      }
      $("#visits h2").text(`${isNull(user.Visits) ? 0 : user.Visits}`);
      $("#gifts h2").text(`${isNull(user.Gifts) ? 0 : user.Gifts}`);
      $("#visited h2").text(
        `${isNull(user.Visits_count) ? 0 : user.Visits_count}`
      );

      $("#accType").text(`(${accType.head})`);
      $("#beanType").text(`${countPercentage(user.Xp).type} Bean`);
      $("#beanType").css("color", `${countPercentage(user.Xp).clr}`);
      if (user.Access_lvl >= 2) {
        $("#events").removeClass("hidden");
      }
      if (user.Access_lvl >= 3) {
        $("#acceptation").removeClass("hidden");
      }
      if (user.Access_lvl >= 4) {
        checkDropAvailability(available => {
          if (available == true) $("#bDrop").removeClass("hidden");
        });
      }

      $("#accTypeInfo").text(`${accType.about}`);
      $(`#info-top`).addClass(user.Acc_type);
    }
  });
}

export function openCard() {
  $(".card").removeClass("small");
  $(".card").addClass("opened");

  $(".card").click(() => {
    closeCard();
  });
}
export function closeCard() {
  $(".card").addClass("small");
  $(".card").removeClass("opened");

  $(".card").click(() => {
    openCard();
  });
}
