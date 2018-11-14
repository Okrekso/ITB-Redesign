import Cookies from 'js-cookie';
import * as strings from './constants';
import $ from 'jquery';

export default function getAccessLevel(callback){
    let level;
    $.ajax({
        type: "GET",
        async:false,
        url: strings.server+"/accessLevel",
        data: {secureCode:Cookies.get('secureCode')},
        success: function (accessLevel) {
            level = accessLevel;
        }
    });
    return parseInt(level);
}