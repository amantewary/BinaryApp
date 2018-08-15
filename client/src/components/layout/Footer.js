import React, { Component } from "react";

class Footer extends React.Component {
  state = { showing: false };

  render() {
    const { showing } = this.state;

    return (
      <footer>
        {showing ? (
          <div className="bot-float">
            <iframe
              allow="microphone;"
              width="350"
              height="430"
              src="https://console.dialogflow.com/api-client/demo/embedded/6800a203-be13-435d-989e-ac4a38f2622c"
            />
          </div>
        ) : null}
        <div className="bg-white text-black mt-5 p-4 text-center">
          &nbsp;
          <button
            type="button"
            className="btn btn-warning float-right"
            onClick={() => this.setState({ showing: !showing })}
          >
            <i className="fas fa-robot" />
          </button>
        </div>
      </footer>
    );
  }
}

export default Footer;
