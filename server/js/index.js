const express = require('express');
const db = require('./database');
const users = require('./database_operations/users');
const events = require('./database_operations/events');
const visits = require('./database_operations/visits');
const secure = require('./database_operations/secureCode');
const request = require('./database_operations/requests');
// requiers
const strings = {
	s_accessForbitten: 'access forbidden!',
	s_site: 'http://test.itbns'
};
// strings
var app = express();
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', strings.s_site);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (req, res) => {
	res.send(
		"<h1>IT B.E.A.N.S. Database Access Server</h1><p>here you can access data of it b.e.a.n.s., but better do it in our site: <a href='http://itbeans.online'>http://itbeans.online</a>"
	);
});
// users
app.get('/all_users', (req, res) => {
	users.getUsers((users) => {
		res.send(users);
	});
});

app.get('/user_byId', (req, res) => {
	let requestID = req.query.ID;
	users.findUserById(requestID, (user) => {
		res.send(user);
	});
});

app.get('/login', (req, res) => {
	let email = req.query.email;
	let pass = req.query.pass;
	users.login(email, pass, (secureCode, err) => {
		if (secureCode) res.send(secureCode);
		if (err) res.send(err);
	});
});

app.post('/newUser', (req, res) => {
	let name = req.query.name;
	let email = req.query.email;
	let pass = req.query.pass;

	let secureCode = req.query.secureCode;
	secure.protectFunction(
		secureCode,
		() => {
			users.createNewUser(
				{
					Name: name,
					Email: email,
					Pass: pass
				},
				(result) => {
					if (result == 'success') res.send('created!');
				}
			);
		},
		2,
		(access_result) => {
			if (access_result == 0) {
				res.send(strings.s_accessForbitten);
			}
		}
	);
});

// events
app.get('/all_Events', (req, res) => {
	events.getEvents((events) => {
		res.send(events);
	});
});

app.post('/newEvent', (req, res) => {
	let secureCode = req.query.secureCode;

	secure.protectFunction(
		secureCode,
		() => {
			let values = {
				Header: req.query.Header,
				Content: req.query.Content,
				Picture_href: req.query.Picture_href,
				Date_when: req.query.Date_when,
				Color: req.query.Color,
				Xp: req.query.Xp
			};
			events.createEvent(values, secureCode, (event_res) => {
				res.send('');
			});
		},
		2,
		(access_result) => {
			if (access_result == strings.s_accessForbitten) res.send(access_result);
		}
	);
});

// visits

app.post('/addVisit', (req, res) => {
	let beanID = req.query.beanID;
	let eventID = req.query.eventID;

	let secureCode = req.query.secureCode;
	secure.protectFunction(
		secureCode,
		() => {
			visits.addVisit(beanID, eventID, (err) => {
				if (!err) res.send(`added visit for ${beanID} on event ${eventID}`);
				else res.send(err);
			});
		},
		2,
		(access_result) => {
			if (access_result == 0) {
				res.send(strings.s_accessForbitten);
			}
		}
	);
});

app.post('/removeVisit', (req, res) => {
	let beanID = req.query.beanID;
	let eventID = req.query.eventID;

	let secureCode = req.query.secureCode;

	secure.protectFunction(
		secureCode,
		() => {
			visits.removeVisit(beanID, eventID, (err) => {
				if (!err) res.send(`removed visit for ${beanID} on event ${eventID}`);
				else res.send(err);
			});
		},
		2,
		(access_result) => {
			if (access_result == 0) {
				res.send(strings.s_accessForbitten);
			}
		}
	);
});

app.get('/getVisitsOnEvent', (req, res) => {
	let eventID = req.query.eventID;
	visits.selectVisitsOnEvent(eventID, (result, err) => {
		res.send(result);
	});
});

// requests

app.post('/newRequest', (req, res) => {
	let name = req.body.name;
	let email = req.body.email;
	let pass = req.body.pass;
	let studGroup = req.body.stud_group;

	request.createRequest({ Name: name, Email: email, Pass: pass, Stud_group: studGroup }, (err) => {
		if (err) {
			res.send('error' + err);
		} else res.send('success!');
	});
});

app.post('/acceptRequest', (req, res) => {
	let request_ID = req.query.request_ID;
	let secureCode = req.query.secureCode;

	secure.protectFunction(
		secureCode,
		() => {
			request.acceptUser(request_ID);
		},
		2,
		(access_result) => {
			if (access_result == 0) {
				res.send(strings.s_accessForbitten);
			}
		}
	);
});

app.listen(3000);
