import React, { Component } from "react";
import ReactDOM from "react-dom";
import { closePopup, closeField } from "../js/modules/popup_ops";
import $ from "jquery";
import { isUndefined, isNullOrUndefined } from "util";

function buttonFunction(btnID, func = (callback = () => {}) => {}) {
  $(`#${btnID}`).prop("disabled", true);
  let callback = () => {
    $(`#${btnID}`).prop("disabled", false);
  };
  func(callback);
}

function Button(e, i) {
  return (
    <button
      key={i}
      id={e.id}
      onClick={() => {
        if (isUndefined(e.blocker) || e.blocker)
          buttonFunction(e.id, e.callback);
      }}
    >
      {e.content}
    </button>
  );
}
export class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      fields: props.fields,
      textes: props.textes,
      buttons: props.buttons,
      header: props.header
    };

    this.closeThisPopup = this.closeThisPopup.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      fields: newProps.fields,
      textes: newProps.textes,
      buttons: newProps.buttons,
      header: newProps.header
    });
  }

  closeThisPopup() {
    closePopup(`#${this.props.id}`);
    closeField();
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.state.isOpened ? "popup" : "popup closed"}
      >
        <div className="header">
          <button id="bBack" onClick={this.closeThisPopup}>
            <img src="/pics/arrow_left.png" />
          </button>
          <h3>{this.state.header}</h3>
        </div>

        <div
          className={
            isNullOrUndefined(this.state.screens) ? "hidden" : "screens"
          }
        />

        <div className="fields">
          {this.state.fields != undefined
            ? this.state.fields.map((e, i) => {
                if (e.type == "separator")
                  return <div key={i} className="separator" />;
                if (e.type == "textarea")
                  return (
                    <div key={i} className="field">
                      <p>{e.text}</p>
                      <textarea
                        id={e.id}
                        min={e.add != undefined ? e.add.min : ""}
                        max={e.add != undefined ? e.add.max : ""}
                        onChange={e.onChange}
                      />
                    </div>
                  );
                return (
                  <div key={i} className={"field"}>
                    <p>{e.text}</p>
                    <input
                      // defaultValue={e.add != undefined ? e.add.value : ""}
                      onChange={e.onChange}
                      type={e.type == undefined ? "text" : e.type}
                      id={e.id}
                      name={e.id}
                    />
                  </div>
                );
              })
            : ""}
        </div>

        <div className="textes">
          {this.state.textes != undefined
            ? this.state.textes.map((e, i) => {
                return (
                  <p
                    key={i}
                    id={e.id}
                    className={`text${e.type == undefined ? "" : " " + e.type}`}
                  >
                    {e.text}
                  </p>
                );
              })
            : ""}
        </div>

        <div className="buttons">
          {this.state.buttons != undefined
            ? this.state.buttons.map((e, i) => {
                if (e.length != undefined)
                  return (
                    <div
                      className={
                        isUndefined(e.type) ? `block` : `block ${e.type}`
                      }
                      key={i}
                    >
                      {e.map((e_e, e_i) => {
                        return Button(e_e, e_i);
                      })}
                    </div>
                  );
                return Button(e, i);
              })
            : ""}
        </div>
      </div>
    );
  }
}

export class Popups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let v_popups = this.props.popups.map((e, i) => {
      return (
        <Popup
          key={i}
          header={e.header}
          id={e.id}
          fields={e.fields}
          buttons={e.buttons}
          textes={e.textes}
        />
      );
    });
    return (
      <>
        {v_popups}
        <Popup
          id="loading"
          textes={[{ text: <img src="/pics/loading.gif" /> }]}
        />
      </>
    );
  }
}

let globalPopups = undefined;
export function renderPopups(
  popupsProps = [
    {
      id: "test",
      fields: undefined,
      buttons: undefined,
      textes: [{ text: "it's test popup" }]
    }
  ]
) {
  if (globalPopups == undefined) globalPopups = popupsProps;

  popupsProps.forEach(p => {
    let indx = -1;
    globalPopups.forEach((g, i) => {
      if (g.id == p.id) return (indx = i);
    });
    if (indx != -1) Object.assign(globalPopups[indx], p);
    else globalPopups.push(p);
  });

  ReactDOM.render(<Popups popups={globalPopups} />, $("#popup-field").get(0));
}

export function addImg(target, imgSrc) {
  let targetDOM = globalPopups.filter(i => {
    if (i.id == target) return i;
  })[0];
  targetDOM.textes.push({ text: <img src={imgSrc} /> });
  ReactDOM.render(<Popups popups={globalPopups} />, $("#popup-field").get(0));
}
