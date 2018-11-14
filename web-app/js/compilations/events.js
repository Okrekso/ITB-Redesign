import * as main from '../modules/main';
window.main = main;

import * as ajax from '../modules/ajax_events';
window.ajax = ajax;

import * as popup from '../modules/popup_ops';
window.popup = popup;


window.onload=()=>{
	ajax.loadAll();
	main.Load();
}

import * as constants from '../modules/constants';
window.constants = constants;
