class Visit extends React.Component {
	constructor(props) {
		super(props);
		this.state = { active: this.props.visited == true ? 1 : 0 };
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		setVisited(this.state.active == 0 ? true : false, this.props.id, this.props.eventID, (isAdded) => {
			if (isAdded == s_noAccess) {
				openPopup("#NoAccess");
			} else {
				if (this.state.active == 0) this.setState({ active: 1 });
				else this.setState({ active: 0 });
			}
		});
	}
	componentWillReceiveProps(nextProps) {
		// console.log('item will change:', nextProps.visited, this.props.name);
		this.setState({ active: nextProps.visited == true ? 1 : 0 });
	}
	render() {
		return (
			<button onClick={this.handleClick} className={this.state.active == 1 ? 'visit active' : 'visit'}>
				<p>{this.props.name}</p>
			</button>
		);
	}
}

// parent

class Visits extends React.Component {
	constructor(props) {
		super(props);
		this.state = { visits: this.props.visits, selected: undefined };
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ visits: nextProps.visits });
	}
	render() {
		let visits = this.state.visits;
		let v_arr = this.props.users.map((e) => {
			let visited = false;
			for (let i = 0; i < visits.length; i++) {
				const v_id = visits[i].Bean_id;
				if (v_id == e.ID) visited = true;
			}

			return <Visit key={e} visited={visited} name={e.Name} id={e.ID} eventID={this.props.eventID} />;
		});

		return <div id="items">{v_arr}</div>;
	}
}

function renderVisitions(eventID) {
	getFullVisitions(eventID, (visits, users) => {
		ReactDOM.render(<Visits users={users} visits={visits} eventID={eventID} />, $('#visits #items').get(0));
	});
}
