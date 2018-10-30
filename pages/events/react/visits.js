class Visit extends React.Component {
  handleClick(e) {
    console.log("visited", this.props.id);
    if (this.state.active == 0) this.setState({ active: 1 });
    else this.setState({ active: 0 });
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className={this.state.active == 1 ? "visit active" : "visit"}
      >
        <p>{this.state.active}</p>
      </button>
    );
  }
  constructor(props) {
    super(props);
    this.state = { active: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
}

// parent

class Visits extends React.Component {
  render() {
    let ev_arr = [];
    let v_arr;
    for (let i = 0; i < 50; i++) {
      ev_arr.push(i);
    }
    v_arr = ev_arr.map(e => {
      return <Visit key={e} name={e} id={e} />;
    });
    this.state.visits = v_arr;

    return <div id="items">{v_arr}</div>;
  }
  constructor(props) {
    super(props);
    this.state = { visits: undefined, selected: undefined };
  }
}

ReactDOM.render(<Visits />, $("#visits #items").get(0));
