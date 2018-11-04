const db = require('../database');
const users = require('../database_operations/users');
// requiers

function createRequest(
	values = {
		Name,
		Email,
		Pass,
		Stud_group
	},
	callback = (err) => {}
) {
	db.query(
		`INSERT INTO Requests(Name,Email,Pass,Stud_group)VALUES('${values.Name}','${values.Email}','${values.Pass}','${values.Stud_group}')`,
		(res, err) => {
			callback(err);
		}
	);
}

function deleteRequest(ID, callback = (err) => {}) {
	db.query(`REMOVE FROM Requests WHERE ID=${ID}`, (res, err) => {
		callback(err);
	});
}

function acceptUser(RequestID) {
	db.query(`SELECT * FROM Requests WHERE ID=${RequestID}`, (res, err) => {
		users.createNewUser({ Name: res.Name, Email: res.Email, Pass: res.Pass }, (err) => {
			if (!err) console.log('successfuly create new user:', res);
		});
	});
}

module.exports.acceptUser = acceptUser;
module.exports.createRequest = createRequest;
