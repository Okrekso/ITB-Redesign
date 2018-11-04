const db = require('../database');
// requiers
function findUserBySecure(secureCode, callback = (result) => {}) {
	db.query("SELECT Id,Name,Email,Xp FROM `USERS` WHERE Secure_code='" + secureCode + "'", (result) => {
		callback(result);
	});
}

function findUserById(Id, callback = (result) => {}) {
	db.query('SELECT Name,Email,Xp FROM `USERS` WHERE ID=' + Id, (result) => {
		callback(result);
	});
}

function login(email, pass, callback = (secureCode, err) => {}) {
	db.query(`SELECT Secure_code FROM USERS WHERE Email='${email}' AND Pass='${pass}' LIMIT 1`, (res, err) => {
		callback(res, err);
	});
}

function getUsers(callback = (result) => {}) {
	db.query('SELECT ID,Name,Email,Xp FROM `USERS`', (result) => {
		callback(result);
	});
}

function createNewUser(
	values = {
		Name,
		Email,
		Pass
	},
	callback = (err) => {}
) {
	function generateSecureCode() {
		function randomize(min, max) {
			max += 1;
			i = Math.floor(Math.random() * max) + min;
			return i;
		}
		let code = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 20; i++) {
			char = possible.charAt(randomize(0, possible.length));
			code += char;
		}
		return code;
	}
	date = new Date();
	date = date.toLocaleString();
	db.query(
		`INSERT INTO USERS(Secure_code, Name, Email, Pass, Register_date) VALUES ('${generateSecureCode()}','${values.Name}','${values.Email}','${values.Pass}','${date}')`,
		(result, err) => {
			console.log('success created new user:' + values.Name);
			callback(err);
		}
	);
}

module.exports.getUsers = getUsers;
module.exports.findUserBySecure = findUserBySecure;
module.exports.findUserById = findUserById;
module.exports.createNewUser = createNewUser;
module.exports.login = login;
