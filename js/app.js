import React, { Component } from "react";

export class App extends Component {
  state = {
    calEvent: null,
  };

  onUpload = readerEvent => {
    const { title, parse } = this.props;
    console.time(title + " parsing");

    const calEvent = parse(readerEvent.target.result);

    const setCalEvent = calEvent => {
      console.timeEnd(title + " parsing");
      this.setState({ calEvent });
    };

    if (calEvent instanceof Promise) {
      calEvent.then(setCalEvent);
    } else {
      setCalEvent(calEvent);
    }
  }

  onFileChange = e => {
    const reader = new FileReader();

    reader.onload = this.onUpload;
    reader.readAsText(e.target.files[0], "utf8");
  };

  render() {
    const { calEvent } = this.state;

    return (
      <>
        <h1>{this.props.title}</h1>

        <div id="app">
          <input type="file" onChange={this.onFileChange} />
          <p>{calEvent}</p>
        </div>
      </>
    );
  }
}
