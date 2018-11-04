const db = require("../database");
const users = require("../database_operations/users");
// requiers
function createEvent(values = {
    Header,
    Content,
    Picture_href,
    Date_when,
    Color,
    Xp,
    Creator
}, secureCode, callback = (res) => {}) {
    users.findUserBySecure(secureCode, (user) => {
        db.query(`INSERT INTO EVENTS(Header,Content,Picture_href,Date_when,Color,Xp,Creator)VALUES(${values.Header},${values.Content},${values.Picture_href},${values.Date_when},${values.Color},${values.Xp},${user["ID"]})`, (result, err) => {
            if (err) {
                callback(err);
                return;
            } else {
                callback(`${values.Header} created!`)
            }
        })
    });
}

function getEvents(callback = (result) => {}) {
    db.query("SELECT * FROM EVENTS ORDER BY ID DESC", (events) => {
        callback(events);
    })
}

function getEventById(Id, callback = (result) => {}) {
    db.query("SELECT * FROM EVENTS WHERE ID=" + Id, (event) => {
        callback(event);
    })
}

module.exports.getEvents = getEvents;
module.exports.getEventById = getEventById;
module.exports.createEvent = createEvent;