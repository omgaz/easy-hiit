function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
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

const TimeView = () =>
  React.createElement(Time.Consumer, null, ({ seconds }) =>
    React.createElement(
      "div",
      { className: "time" },
      seconds < 10 ? "0" : "",
      seconds,
      React.createElement("small", null, "seconds")
    )
  );

const CommandView = () =>
  React.createElement(Time.Consumer, null, ({ isResting, isCountingDown }) =>
    React.createElement(
      "div",
      { className: "command" },
      isCountingDown ? (isResting ? "rest" : "work") : "ready?"
    )
  );

const StartButton = () =>
  React.createElement(Time.Consumer, null, ({ onStart, isCountingDown }) =>
    React.createElement(
      "button",
      {
        onClick: isCountingDown ? () => {} : onStart,
        disabled: isCountingDown
      },
      "start"
    )
  );

const StopButton = () =>
  React.createElement(Time.Consumer, null, ({ onStop, isCountingDown }) =>
    React.createElement(
      "button",
      {
        onClick: !isCountingDown ? () => {} : onStop,
        disabled: !isCountingDown
      },
      "stop"
    )
  );

const ResetButton = () =>
  React.createElement(
    Time.Consumer,
    null,
    ({ onReset, isCountingDown }) =>
      isCountingDown &&
      React.createElement("button", { onClick: onReset }, "reset")
  );

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(
      this,
      "countDown",

      () => {
        this.setState(
          ({ seconds, isResting }) => ({ seconds: seconds - 1 }),
          () =>
            this.state.seconds < 0 &&
            this.handleStop(
              this.state.isResting ? this.handleStart : this.handleRest
            )
        );
      }
    );
    _defineProperty(
      this,
      "handleRest",

      cb => {
        const callback = typeof cb === "function" ? cb : () => {};
        this.setState(
          {
            seconds: this.props.restSeconds || defaultRestTime,
            isResting: true,
            timer: setInterval(this.countDown, 1000)
          },
          callback
        );
      }
    );
    _defineProperty(
      this,
      "handleStart",

      cb => {
        const callback = typeof cb === "function" ? cb : () => {};
        if (!this.state.timer && this.state.seconds > 0) {
          this.setState({ timer: setInterval(this.countDown, 1000) }, callback);
        }
      }
    );
    _defineProperty(
      this,
      "handleStop",

      cb => {
        const callback = typeof cb === "function" ? cb : () => {};
        clearInterval(this.state.timer);
        this.setState(this.initialState, callback);
      }
    );
    _defineProperty(
      this,
      "handleReset",

      () => {
        const callback = typeof cb === "function" ? cb : () => {};
        this.handleStop(this.handleStart);
      }
    );
    this.initialState = {
      isResting: false,
      seconds: props.seconds || defaultTime,
      restSeconds: props.restSeconds || defaultRestTime,
      timer: null
    };
    this.state = this.initialState;
  }

  render() {
    const { children } = this.props;
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        Time.Provider,
        {
          value: {
            seconds: this.state.seconds,
            onStart: this.handleStart,
            onStop: this.handleStop,
            onReset: this.handleReset,
            isCountingDown: this.state.timer,
            isResting: this.state.isResting
          }
        },

        children
      )
    );
  }
}

class App extends React.Component {
  render() {
    return React.createElement(
      Countdown,
      null,
      React.createElement(CommandView, null),
      React.createElement(TimeView, null),
      React.createElement(
        "div",
        { className: "button-container" },
        React.createElement(StartButton, null),
        React.createElement(StopButton, null)
      ),

      React.createElement(
        "div",
        { className: "button-container" },
        React.createElement(ResetButton, null)
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector("#app"));
