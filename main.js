var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var App = function (_React$Component) {_inherits(App, _React$Component);function App() {_classCallCheck(this, App);return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));}_createClass(App, [{ key: "render", value: function render()
    {
      return (
        React.createElement(React.Fragment, null,
          React.createElement("h1", null, "EASY HIIT"),
          React.createElement("div", { className: "container" },
            React.createElement(Timer, null))));



    } }]);return App;}(React.Component);var


Motivation = function (_React$Component2) {_inherits(Motivation, _React$Component2);
  function Motivation(props) {_classCallCheck(this, Motivation);var _this2 = _possibleConstructorReturn(this, (Motivation.__proto__ || Object.getPrototypeOf(Motivation)).call(this,
    props));
    _this2.text = [
    "Go for it!",
    "Don't stop!",
    "Feel the burn!",
    "100%",
    "No pain, no gain",
    "Great job",
    "Keep it up",
    "Sweat through it"];return _this2;

  }_createClass(Motivation, [{ key: "render", value: function render()

    {
      return (
        React.createElement("div", { className: "motivation" },
          this.text[Math.floor(Math.random() * this.text.length)]));


    } }]);return Motivation;}(React.Component);var


Timer = function (_React$Component3) {_inherits(Timer, _React$Component3);
  function Timer(props) {_classCallCheck(this, Timer);var _this3 = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this,
    props));_this3.






    startTimer = function () {
      console.log(_this3.timer, _this3.state.seconds);
      if (!_this3.state.timer && _this3.state.seconds > 0) {
        _this3.setState({ timer: setInterval(_this3.countDown, 1000) });
      }
    };_this3.

    resetTimer = function () {
      _this3.clearTimer(_this3.startTimer);
    };_this3.

    clearTimer = function (cb) {
      clearInterval(_this3.state.timer);
      _this3.setState(
      { seconds: 60, timer: null },
      typeof cb === "function" ? cb : function () {return null;});

    };_this3.

    countDown = function () {
      console.log(_this3.state.seconds);
      // Remove one second, set state so a re-render happens.
      var seconds = _this3.state.seconds - 1;
      _this3.setState({
        seconds: seconds });


      // Check if we're at zero.
      if (seconds === 0) {
        _this3.clearTimer();
      }
    };_this3.state = { seconds: 60, timer: null };return _this3;}_createClass(Timer, [{ key: "render", value: function render()

    {
      return (
        React.createElement(React.Fragment, null,
          React.createElement("div", { className: "button-container" },
            React.createElement("button", {
                onClick: !this.state.timer ? this.startTimer : this.resetTimer },

              this.state.timer ? "Reset" : "Start"),

            this.state.timer ?
            React.createElement("button", { onClick: this.clearTimer }, "Stop") :
            null),

          this.state.seconds < 10 ?
          React.createElement("div", { className: "motivation final" }, "Almost there!") :
          null,
          React.createElement(Motivation, null),
          this.state.timer ? React.createElement("div", { className: "time" },
            this.state.seconds < 10 ? "0" : "",
            this.state.seconds, "s") :
          null));


    } }]);return Timer;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.querySelector("#app"));
