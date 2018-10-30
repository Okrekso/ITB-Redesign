class Event extends React.Component {
  handleClick(e) {
    this.props.upd(this.props.id);
    function fillEvent(Header, Content, Bg = "#000000") {
      $("#event #info").removeClass("anim");
      setTimeout(() => {
        $("#event").addClass("enabled");
        $("#event #info").addClass("anim");

        $("#event #info h2").text(Header);
        $("#event #info p").text(Content);
      }, 10);
    }
    
    fillEvent(this.props.name, this.props.name);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selected==this.props.id){
      this.setState({active:1});
    }
    else{
      this.setState({active:0});
    }
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        onBlur={this.LostFocus}
        className={this.props.selected == this.props.id ? "event active" : "event"}
      >
        <p>{this.state.active}</p>
      </button>
    );
  }
  constructor(props) {
    super(props);
    this.state = { active: props.selected == props.id ? 1 : 0 };
    this.handleClick = this.handleClick.bind(this);
  }
}

// parent

class Events extends React.Component {
  upd(id) {
    this.setState({ selected: id });
  }

  render() {
    let ev_arr = [];
    let v_arr;
    for (let i = 0; i < 10; i++) {
      ev_arr.push(i);
    }
    v_arr = ev_arr.map(e => {
      return (
        <Event
          key={e}
          name={e}
          id={e}
          upd={this.upd}
          selected={this.state.selected}
        />
      );
    });
    this.state.events = v_arr;

    return <div id="items">{v_arr}</div>;
  }
  constructor(props) {
    super(props);
    this.state = { events: undefined, selected: undefined };
    this.upd = this.upd.bind(this);
  }
}

ReactDOM.render(<Events />, document.getElementById("event_list"));