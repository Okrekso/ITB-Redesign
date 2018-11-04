const db = require("../database");
const events = require("../database_operations/events");
const users = require("../database_operations/users");
// requiers
function addVisit(beanID, eventID, callback = (error) => {}) {
    events.getEventById(eventID, (res) => {
        if (res["Creator"] == beanID) {
            db.query(`INSERT INTO VISITIONS(Bean_id,Event_id) VALUES(${beanID},${eventID})`,
                (res, err) => {
                    callback(err);
                });
        } else {
            callback("access forbidden!");
        }
    });
}

function removeVisit(beanID, eventID, callback = (error) => {}) {
    events.getEventById(eventID, (res) => {
        if (res["Creator"] == beanID) {
            db.query(`DELETE FROM VISITIONS WHERE Bean_id=${beanID} AND Event_id=${eventID}`,
                (res, err) => {
                    callback(err);
                });
        } else {
            callback("access forbidden!");
        }
    });
}

function selectVisitsOnEvent(eventID, callback = (result, error) => {}) {
    db.query(`SELECT * FROM VISITIONS WHERE Event_id=${eventID}`, (res, err) => {
        callback(res, err);
    });
}

module.exports.addVisit = addVisit;
module.exports.removeVisit = removeVisit;
module.exports.selectVisitsOnEvent = selectVisitsOnEvent;