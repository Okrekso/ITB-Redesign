import { renderPopups } from "../../react/popup";
import { closeField, closePopup, openPopup } from "./popup_ops";
import renderEvents from "../../react/events";
import $ from "jquery";
import * as strings from "./constants";
import Cookies from "js-cookie";
import { convertToDate } from "./main";

export function loadAll() {
  let timeStr = convertToDate(new Date());
  getEvents(events => renderEvents(events));
  renderPopups([
    {
      id: "NoAccess",
      header: "error",
      textes: [{ text: "you have no access to this action!" }]
    },
    {
      id: "editEvent",
      header: "Edit your event",
      fields: [
        { id: "ev-header", text: "Header:", onChange: eventChanged },
        {
          id: "ev-content",
          text: "Description:",
          type: "textarea",
          add: { min: timeStr },
          onChange: eventChanged
        },
        {
          id: "ev-when",
          text: "When:",
          type: "datetime-local",
          add: { value: timeStr },
          onChange: eventChanged
        },
        { id: "ev-xp", text: "Xp count/user:", onChange: eventChanged }
      ],
      buttons: [
        {
          id: "bSave",
          content: "save changes",
          callback: closeCallback => {
            saveChanges();
            closeCallback();
          }
        },
        {
          id: "bRemove",
          content: "delete this event",
          callback: closeCallback => {
            removeEvent();
            closeCallback();
          }
        }
      ]
    }
  ]);

  $("#bEdit").click(() => {
    renderPopups([{ id: "editEvent", textes: [] }]);
    openPopup("#editEvent");
  });
  $("#bRemove").click(() => {});
}

function eventChanged() {
  $("#bSave").attr("disabled", false);
}

function saveChanges() {
  let secureCode = Cookies.get("secureCode");
  let date = new Date($("#ev-when").val());
  $.ajax({
    type: "POST",
    url: strings.server + "/editEvent",
    data: {
      Header: $("#ev-header").val(),
      Content: $("#ev-content").val(),
      Date_when: convertToDate(date, false),
      Xp: $("#ev-xp").val(),
      secureCode: secureCode,
      Id: $("#editEvent .header").attr("eventid")
    },
    success: function(response) {
      if (response == strings.s_noAccess)
        return renderPopups([
          {
            id: "editEvent",
            textes: [{ text: "you haven't access for this event" }]
          }
        ]);
      if (response == "success") {
        closePopup("#editEvent", () => {
          closeField();
        });
        getEvents(events => {
          renderEvents(events);
        });
      }
    }
  });
}

function removeEvent() {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "POST",
    url: strings.server + "/removeEvent",
    data: {
      Id: $("#editEvent .header").attr("eventid"),
      secureCode: secureCode
    },
    success: function(response) {
      if (response == strings.s_noAccess)
        return renderPopups([
          {
            id: "editEvent",
            textes: [{ text: "you haven't access for this event" }]
          }
        ]);
      if (response == "success") {
        closePopup("#editEvent", () => {
          closeField();
        });
        getEvents(events => {
          renderEvents(events);
        });
        $("#visits").removeClass("opened");
        $("#visits").addClass("hidden");
      }
    }
  });
}

export function getEvents(callback = events => {}) {
  $.ajax({
    type: "GET",
    url: strings.server + "/all_events",
    success: function(response) {
      callback(response);
    }
  });
}

export function getMyEvents(callback = myevents => {}) {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "GET",
    url: strings.server+"/creator_events",
    data: {secureCode:secureCode},
    dataType: "dataType",
    success: function (response) {
      
    }
  });
}

export function getUsers(callback = users => {}) {
  $.ajax({
    type: "GET",
    url: strings.server + "/all_users",
    success: function(response) {
      callback(response);
    }
  });
}

export function getVisitions(event_id, callback = visits => {}) {
  $.ajax({
    type: "GET",
    url: strings.server + "/getVisitsOnEvent",
    data: { eventID: event_id },
    success: function(response) {
      callback(response);
    }
  });
}

export function getFullVisitions(event_id, callback = (visits, users) => {}) {
  getVisitions(event_id, visits => {
    getUsers(users => {
      callback(visits, users);
    });
  });
}

export function setVisited(
  isVisited,
  beanID,
  eventID,
  callback = isAdded => {}
) {
  let secureCode = Cookies.get("secureCode");
  $.ajax({
    type: "POST",
    url: strings.server + (isVisited ? "/addVisit" : "/removeVisit"),
    data: { beanID: beanID, eventID: eventID, secureCode: secureCode },
    success: function(response) {
      callback(response);
    }
  });
}
