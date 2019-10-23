const defaultTime = 60;
const defaultRestTime = 10;

const Time = React.createContext({
  seconds: defaultTime,
  onStart: () => {},
  onStop: () => {},
  onReset: () => {},
  isCountingDown: false,
  isResting: false
});

const TimeView = () => (
  <Time.Consumer>
    {({ seconds }) => (
      <div className="time">
        {seconds < 10 ? "0" : ""}
        {seconds}
        <small>seconds</small>
      </div>
    )}
  </Time.Consumer>
);

const CommandView = () => (
  <Time.Consumer>
    {({ isResting, isCountingDown }) => (
      <div className="command">
        {isCountingDown ? (isResting ? "rest" : "work") : "ready?"}
      </div>
    )}
  </Time.Consumer>
);

const StartButton = () => (
  <Time.Consumer>
    {({ onStart, isCountingDown }) => (
      <button
        onClick={isCountingDown ? () => {} : onStart}
        disabled={isCountingDown}
      >
        start
      </button>
    )}
  </Time.Consumer>
);

const StopButton = () => (
  <Time.Consumer>
    {({ onStop, isCountingDown }) => (
      <button
        onClick={!isCountingDown ? () => {} : onStop}
        disabled={!isCountingDown}
      >
        stop
      </button>
    )}
  </Time.Consumer>
);

const ResetButton = () => (
  <Time.Consumer>
    {({ onReset, isCountingDown }) =>
      isCountingDown && <button onClick={onReset}>reset</button>
    }
  </Time.Consumer>
);

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isResting: false,
      seconds: props.seconds || defaultTime,
      restSeconds: props.restSeconds || defaultRestTime,
      timer: null
    };
    this.state = this.initialState;
  }

  countDown = () => {
    this.setState(
      ({ seconds, isResting }) => ({ seconds: seconds - 1 }),
      () =>
        this.state.seconds < 0 &&
        this.handleStop(
          this.state.isResting ? this.handleStart : this.handleRest
        )
    );
  };

  handleRest = cb => {
    const callback = typeof cb === "function" ? cb : () => {};
    this.setState(
      {
        seconds: this.props.restSeconds || defaultRestTime,
        isResting: true,
        timer: setInterval(this.countDown, 1000)
      },
      callback
    );
  };

  handleStart = cb => {
    const callback = typeof cb === "function" ? cb : () => {};
    if (!this.state.timer && this.state.seconds > 0) {
      this.setState({ timer: setInterval(this.countDown, 1000) }, callback);
    }
  };

  handleStop = cb => {
    const callback = typeof cb === "function" ? cb : () => {};
    clearInterval(this.state.timer);
    this.setState(this.initialState, callback);
  };

  handleReset = () => {
    const callback = typeof cb === "function" ? cb : () => {};
    this.handleStop(this.handleStart);
  };

  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <Time.Provider
          value={{
            seconds: this.state.seconds,
            onStart: this.handleStart,
            onStop: this.handleStop,
            onReset: this.handleReset,
            isCountingDown: this.state.timer,
            isResting: this.state.isResting
          }}
        >
          {children}
        </Time.Provider>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Countdown>
        <CommandView />
        <TimeView />
        <div className="button-container">
          <StartButton />
          <StopButton />
        </div>
        <div className="button-container">
          <ResetButton />
        </div>
      </Countdown>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
