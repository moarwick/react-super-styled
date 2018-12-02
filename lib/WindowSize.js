'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _THEME2 = require('./THEME');

var _THEME3 = _interopRequireDefault(_THEME2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MEDIA_DEFAULT = 'xs';

function getCurrentMedia(ranges) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var media = MEDIA_DEFAULT;
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
 * WindowSize
 *
 * Wrapper component to supply current 'window' sizing and 'media' breakpoint to the wrapped component
 * Value of 'media' will be one of: 'xs' (default), 'sm', 'md', 'lg', 'xl'
 * Supports "children as a function"
 */
var propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]).isRequired,
  theme: _propTypes2.default.object // optional theme media overrides
};

var WindowSize = function (_React$Component) {
  _inherits(WindowSize, _React$Component);

  function WindowSize(props) {
    _classCallCheck(this, WindowSize);

    var _this = _possibleConstructorReturn(this, (WindowSize.__proto__ || Object.getPrototypeOf(WindowSize)).call(this, props));

    _this.handleResize = function () {
      var _getWindowSize = getWindowSize(),
          width = _getWindowSize.width,
          height = _getWindowSize.height;

      var media = getCurrentMedia(_this.mediaRanges, width);
      _this.setState({ width: width, height: height, media: media });
    };

    _this.state = {
      media: MEDIA_DEFAULT,
      height: 0,
      width: 0
    };

    var _THEME = _extends({}, _THEME3.default, props.theme || {}),
        MEDIA_SM = _THEME.MEDIA_SM,
        MEDIA_MD = _THEME.MEDIA_MD,
        MEDIA_LG = _THEME.MEDIA_LG,
        MEDIA_XL = _THEME.MEDIA_XL;

    _this.mediaRanges = {
      xs: [0, MEDIA_SM - 1],
      sm: [MEDIA_SM, MEDIA_MD - 1],
      md: [MEDIA_MD, MEDIA_LG - 1],
      lg: [MEDIA_LG, MEDIA_XL - 1],
      xl: [MEDIA_XL, Infinity]
    };
    return _this;
  }

  _createClass(WindowSize, [{
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
      var children = this.props.children;
      var _state = this.state,
          width = _state.width,
          height = _state.height,
          media = _state.media;


      var windowProps = {
        media: media,
        windowSize: { width: width, height: height }
      };

      if (typeof children === 'function') {
        return children(windowProps);
      }

      return _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, windowProps);
      });
    }
  }]);

  return WindowSize;
}(_react2.default.Component);

WindowSize.propTypes = propTypes;
exports.default = WindowSize;