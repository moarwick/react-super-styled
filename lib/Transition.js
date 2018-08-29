'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TRANSITION = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exiting'
};

/**
 * Transition (Beta)
 *
 * Wrapper component to handle transition states (alternative to react-transition-group)
 *
 * Listens on its 'trigger' prop changing (bool), passes down a 'transition' prop to any child(ren)
 *  - Whenever 'trigger' changes false -> true, 'transition' value is set to 'entering', followed by 'entered'
 *  - Whenever 'trigger' changes true -> false, 'transition' value is set to 'exiting', followed by 'exited'
 *
 *    The second value arrives after specified 'delay' (default ~1/60 sec)
 *
 * Plus:
 *  - Supports delayed unmounting of child(ren) via 'unmountAfterExit' prop
 *  - Supports "children as a function" (receives 'transition' arg)
 */
var propTypes = {
  children: _propTypes2.default.node,
  delay: _propTypes2.default.number,
  trigger: _propTypes2.default.bool,
  mountOnInit: _propTypes2.default.bool, // render 'children' initially even if 'trigger' is false
  unmountAfterExit: _propTypes2.default.number // delay before removing 'children' after exit (should match your css transition duration)
};

var Transition = function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props) {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, props));

    _this.state = {
      isRender: props.mountOnInit || props.trigger !== false,
      transition: props.trigger === true ? TRANSITION.ENTERING : ''
    };

    _this.durationTm = null;
    _this.removalTm = null;
    return _this;
  }

  _createClass(Transition, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var ENTERING = TRANSITION.ENTERING,
          ENTERED = TRANSITION.ENTERED,
          EXITING = TRANSITION.EXITING,
          EXITED = TRANSITION.EXITED;

      // if 'trigger' prop is changing to true, start an 'on' transition

      if (this.props.trigger === true && !prevProps.trigger && this.state.transition !== ENTERING) {
        this.setState({ isRender: true, transition: ENTERING });
      }

      // if 'trigger' prop is changing to false, start an 'off' transition
      if (this.props.trigger === false && prevProps.trigger && this.state.transition !== EXITING) {
        this.setState({ isRender: true, transition: EXITING });
      }

      // if enter/exit just started, begin delay to transition it
      var isInitEnter = this.state.transition === ENTERING && prevState.transition !== ENTERING;
      var isInitExit = this.state.transition === EXITING && prevState.transition !== EXITING;

      if (isInitEnter || isInitExit) {
        this.durationTm = window.setTimeout(function () {
          _this2.setState({ transition: _this2.state.transition === ENTERING ? ENTERED : EXITED });
        }, this.props.delay || 16); // ~1/60 sec

        // if exit started, begin delay to unmount children (if specified)
        if (this.state.transition === EXITING && this.props.unmountAfterExit) {
          this.removalTm = window.setTimeout(function () {
            _this2.setState({ isRender: false });
          }, this.props.unmountAfterExit);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.clearTimeout(this.durationTm);
      window.clearTimeout(this.removalTm);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.isRender) return null;

      var children = this.props.children;
      var transition = this.state.transition;


      return typeof children === 'function' ? children(transition) : React.Children.map(children, function (child) {
        return React.cloneElement(child, { transition: transition });
      });
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Transition;
}(React.Component);

Transition.propTypes = propTypes;
var _default = Transition;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TRANSITION, 'TRANSITION', 'src/lib/Transition.js');
  reactHotLoader.register(propTypes, 'propTypes', 'src/lib/Transition.js');
  reactHotLoader.register(Transition, 'Transition', 'src/lib/Transition.js');
  reactHotLoader.register(_default, 'default', 'src/lib/Transition.js');
  leaveModule(module);
})();

;