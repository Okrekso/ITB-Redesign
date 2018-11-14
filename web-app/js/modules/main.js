import renderHeader from "../../react/header";
import $ from "jquery";
import Cookies from "js-cookie";

export function goTo(link) {
  window.location = link;
}

export function Load() {
  renderHeader();
}

export function convertToDate(date=new Date(),js = true) {
  let dt =
    date.getFullYear() +
    "-" +
    ((date.getMonth()+1) < 10 ? `0${(date.getMonth()+1)}` : (date.getMonth()+1)) +
    "-" +
    (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
  let time = date.toLocaleTimeString();
  let comp;
  if (js) comp = dt + "T" + time;
  else comp = dt + " " + time;
  
  comp = comp.replace(/\./gi, "-");
  return comp;
}

export function chekIsLoggedIn() {
  if (Cookies.get("secureCode") != undefined && Cookies("secureCode") != null) {
    return true;
  }
  return false;
}
