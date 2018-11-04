const db = require("../database");
// requiers
function getAccessLevel(secureCode, callback = (accessLevel) => {}) {
    db.query(`SELECT Xp FROM Users WHERE Secure_code=${secureCode}`, (res, err) => {
        if (res == undefined) {
            callback(0);
            return;
        }
        if (res["Xp"] < 40) {
            callback(0);
            return;
        }
        if (res["Xp"] >= 40 && res["Xp"] < 80) {
            callback(1);
            return;
        }
        if (res["Xp"] >= 80) {
            callback(2);
            return;
        }
    });
}

function protectFunction(secureCode, func = () => {}, minProtectionLevel = 0, callback = (access_result) => {}) {
    getAccessLevel(secureCode, (accessLevel) => {
        if (accessLevel >= minProtectionLevel) {
            func();
            callback(1);
            return;
        } else {
            callback(0);
            return;
        }
    });
}

module.exports.getAccessLevel = getAccessLevel;
module.exports.protectFunction = protectFunction;