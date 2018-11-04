class Event extends React.Component {
	constructor(props) {
		super(props);
		this.state = { active: props.selected == props.id ? 1 : 0 };
		this.handleClick = this.handleClick.bind(this);
		this.className = this.className.bind(this);
	}
	handleClick(e) {
		this.props.upd(this.props.id);
		renderVisitions(this.props.id);
		function fillEvent(Header, Content, Xp = 0, Date_when = null, Bg = '#000000') {
			if (Xp == null) Xp = 0;
			let date;
			if (Date_when != null) {
				date = new Date(Date_when);
			}
			$('#event #info').removeClass('anim');
			setTimeout(() => {
				$('#event').addClass('enabled');
				$('#event #info').addClass('anim');

				$('#event #info h2').html(Header);
				$('#event #info h3').html(`(${Xp} xp)`);
				$('#event #info p').html(Content);
				$('#event #info #date').html(Date_when == null ? 'soon' : `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`);
			}, 10);
		}

		fillEvent(this.props.Header, this.props.Content, this.props.Xp, this.props.Date_when);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selected == this.props.id) {
			this.setState({ active: 1 });
		} else {
			this.setState({ active: 0 });
		}
	}

	className() {
		let className = 'event';
		if (this.props.selected == this.props.id) className += ' active';
		if (chekEventFresh(this.props.Date_when) == 1) className += ' new';
		if (chekEventFresh(this.props.Date_when) == 2) className += ' inAction';
		return className;
	}
	render() {
		let maxHeaderLen = 20;
		return (
			<button onClick={this.handleClick} onBlur={this.LostFocus} className={this.className()}>
				<p>
					{this.props.Header.length > maxHeaderLen ? (
						`${this.props.Header.substring(0, maxHeaderLen)}...`
					) : (
						this.props.Header
					)}
				</p>
			</button>
		);
	}
}

// parent

class Events extends React.Component {
	constructor(props) {
		super(props);
		this.state = { events: this.props.eventsArray, selected: undefined };
		this.upd = this.upd.bind(this);
	}
	upd(id) {
		this.setState({ selected: id });
	}
	render() {
		let v_arr = this.state.events.map((e) => {
			return (
				<Event
					key={e}
					Header={e.Header}
					Content={e.Content}
					Xp={e.Xp}
					Date_when={e.Date_when}
					id={e.ID}
					upd={this.upd}
					selected={this.state.selected}
				/>
			);
		});

		return <div id="items">{v_arr}</div>;
	}
}

// other
function chekEventFresh(eventDate) {
	let dateWhen = new Date(eventDate);
	let dateDiff = Date.now() - dateWhen;
	if (eventDate == null) {
		return 1;
	}
	if (dateDiff < 0) {
		return 1;
	} else if (dateDiff > 0 && dateDiff < 60 * 60) {
		return 2;
	} else return 0;
}

function renderEvents(eventsArray) {
	ReactDOM.render(<Events eventsArray={eventsArray} />, document.getElementById('event_list'));
}
