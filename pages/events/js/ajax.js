function loadAll() {
	getEvents(renderEvents);
	renderPopups([
		{
			id: 'NoAccess',
			fields: undefined,
			buttons: undefined,
			textes: [ { text: 'you have no access to this action!' } ]
		}
	]);
}

function getEvents(callback = (events) => {}) {
	$.ajax({
		type: 'GET',
		url: server + '/all_events',
		success: function(response) {
			callback(response);
		}
	});
}

function getUsers(callback = (users) => {}) {
	$.ajax({
		type: 'GET',
		url: server + '/all_users',
		success: function(response) {
			callback(response);
		}
	});
}

function getVisitions(event_id, callback = (visits) => {}) {
	$.ajax({
		type: 'GET',
		url: server + '/getVisitsOnEvent',
		data: { eventID: event_id },
		success: function(response) {
			callback(response);
		}
	});
}

function getFullVisitions(event_id, callback = (visits, users) => {}) {
	getVisitions(event_id, (visits) => {
		getUsers((users) => {
			callback(visits, users);
		});
	});
}

function setVisited(isVisited, beanID, eventID, callback = (isAdded) => {}) {
	$.ajax({
		type: 'POST',
		url: server + (isVisited ? '/addVisit' : '/removeVisit'),
		data: { beanID: beanID, eventID: eventID },
		success: function(response) {
			callback(response);
		}
	});
}
