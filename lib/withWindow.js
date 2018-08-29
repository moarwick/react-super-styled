'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _THEME = require('./THEME');

var _THEME2 = _interopRequireDefault(_THEME);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getCurrentMedia(ranges) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var media = 'xs';
  Object.keys(ranges).some(function (key) {
    var _ranges$key = _slicedToArray(ranges[key], 2),
        min = _ranges$key[0],
        max = _ranges$key[1];

    if (width >= min && width <= max) {
      media = key;
      return true;
    }
    return false;
  });
  return media;
}

function getWindowSize() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width: width, height: height };
}

/**
 * withWindow
 * HOC to supply current 'window' sizing and 'media' breakpoint to the enhanced component
 * Value of 'media' will be one of: 'xs' (default), 'sm', 'md', 'lg', 'xl'
 */
var withWindow = function withWindow(EnhancedComponent) {
  var userTheme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _THEME$userTheme = _extends({}, _THEME2.default, userTheme),
      MEDIA_SM = _THEME$userTheme.MEDIA_SM,
      MEDIA_MD = _THEME$userTheme.MEDIA_MD,
      MEDIA_LG = _THEME$userTheme.MEDIA_LG,
      MEDIA_XL = _THEME$userTheme.MEDIA_XL;

  var mediaRanges = {
    xs: [0, MEDIA_SM - 1],
    sm: [MEDIA_SM, MEDIA_MD - 1],
    md: [MEDIA_MD, MEDIA_LG - 1],
    lg: [MEDIA_LG, MEDIA_XL - 1],
    xl: [MEDIA_XL, Infinity]
  };

  return function (_React$Component) {
    _inherits(_class2, _React$Component);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        media: '',
        window: { width: 0, height: 0 }
      }, _this.handleResize = function () {
        var window = getWindowSize();
        var media = getCurrentMedia(mediaRanges, window.width);
        _this.setState({ media: media, window: window });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (window) {
          (0, _utils.throttleEvent)('resize', 'throttledWindowResize', window);
          window.addEventListener('throttledWindowResize', this.handleResize);
          this.handleResize();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (window) {
          window.removeEventListener('throttledWindowResize', this.handleResize);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        if (window && !this.state.media) return null;
        return _react2.default.createElement(EnhancedComponent, _extends({
          media: this.state.media || 'xs',
          window: this.state.window
        }, this.props));
      }
    }, {
      key: '__reactstandin__regenerateByEval',
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
      }
    }]);

    return _class2;
  }(_react2.default.Component);
};

var _default = withWindow;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getCurrentMedia, 'getCurrentMedia', 'src/lib/withWindow.js');
  reactHotLoader.register(getWindowSize, 'getWindowSize', 'src/lib/withWindow.js');
  reactHotLoader.register(withWindow, 'withWindow', 'src/lib/withWindow.js');
  reactHotLoader.register(_default, 'default', 'src/lib/withWindow.js');
  leaveModule(module);
})();

;