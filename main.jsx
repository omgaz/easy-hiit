class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>EASY HIIT</h1>
        <div className="container">
          <Timer />
        </div>
      </React.Fragment>
    );
  }
}

class Motivation extends React.Component {
  constructor(props) {
    super(props);
    this.text = [
      "Go for it!",
      "Don't stop!",
      "Feel the burn!",
      "100%",
      "No pain, no gain",
      "Great job",
      "Keep it up",
      "Sweat through it"
    ];
  }

  render() {
    return (
      <div className="motivation">
        {this.text[Math.floor(Math.random() * this.text.length)]}
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 60,
      timer: null
    };
  }

  startTimer = () => {
    console.log(this.timer, this.state.seconds);
    if (!this.state.timer && this.state.seconds > 0) {
      this.setState({ timer: setInterval(this.countDown, 1000) });
    }
  };

  resetTimer = () => {
    this.clearTimer(this.startTimer);
  };

  clearTimer = cb => {
    clearInterval(this.state.timer);
    this.setState(
      { seconds: 60, timer: null },
      typeof cb === "function" ? cb : () => null
    );
  };

  countDown = () => {
    console.log(this.state.seconds);
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.clearTimer();
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="button-container">
          <button
            onClick={!this.state.timer ? this.startTimer : this.resetTimer}
          >
            {this.state.timer ? "Reset" : "Start"}
          </button>
          {this.state.timer ? (
            <button onClick={this.clearTimer}>Stop</button>
          ) : null}
        </div>
        {this.state.seconds < 10 ? (
          <div className="motivation final">Almost there!</div>
        ) : null}
        <Motivation />
        <div className="time">
          {this.state.seconds < 10 ? "0" : ""}
          {this.state.seconds}s
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
