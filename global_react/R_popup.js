class Popup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpened: false
		};

		this.closeThisPopup = this.closeThisPopup.bind(this);
	}

	closeThisPopup() {
		closePopup(`#${this.id}`);
		closeField();
	}

	render() {
		console.log(this.props);
		return (
			<div id={this.props.id} className={this.state.isOpened ? 'popup' : 'popup closed'}>
				<div className="header">
					<button id="bBack" onClick={this.closeThisPopup}>
						<img src="/pics/arrow_left.png" />
					</button>
					<h3>{this.props.header}</h3>
				</div>

				<div className="fields">
					{this.props.fields != undefined ? (
						this.props.fields.map((e) => {
							return (
								<div className="field">
									<p>{e.text}</p>
									<input type={e.type} id={e.id} />
								</div>
							);
						})
					) : (
						''
					)}
				</div>

				<div className="textes">
					{this.props.textes != undefined ? (
						this.props.textes.map((e) => {
							return <p className="text">{e.text}</p>;
						})
					) : (
						''
					)}
				</div>

				<div className="buttons">
					{this.props.buttons != undefined ? (
						this.props.buttons.map((e) => {
							return (
								<button id={e.id} onClick={e.callback}>
									{e.content}
								</button>
							);
						})
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}

class Popups extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let v_popups = this.props.popups.map((e) => {
			return <Popup id={e.id} fields={e.fields} buttons={e.buttons} textes={e.textes} />;
		});
		return (
			<div>
				{v_popups}
				<Popup id="loading" textes={[ { text: <img src="/pics/loading.gif" /> } ]} />
			</div>
		);
	}
}

function renderPopups(
	popupsProps = [
		{
			id: test,
			fields: undefined,
			buttons: undefined,
			textes: [ { text: "it's test popup" } ]
		}
	]
) {
	ReactDOM.render(<Popups popups={popupsProps} />, $('#popup-field').get(0));
}
