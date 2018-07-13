'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

/**
 * Heading
 * Renders <h1> - <h4> tag
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  h1: _propTypes2.default.bool,
  h2: _propTypes2.default.bool,
  h3: _propTypes2.default.bool,
  h4: _propTypes2.default.bool,
  h5: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  lineHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _utils.fontPropTypes, _utils.justifyPropTypes, _utils.mediaStylesPropTypes);

var getCss = function getCss(props) {
  // prettier-ignore
  return (0, _styledComponents.css)(['color:', ';line-height:', ';', '  ', ' ', ' ', ''], props.color, props.lineHeight, props.margin !== undefined && (0, _utils.cssSpacing)('margin', props), (0, _utils.withFont)(props), (0, _utils.withJustify)(props), (0, _utils.withMediaStyles)(props));
};

var Heading1 = _styledComponents2.default.h1.withConfig({
  displayName: 'Heading__Heading1'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});

var Heading2 = _styledComponents2.default.h2.withConfig({
  displayName: 'Heading__Heading2'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});

var Heading3 = _styledComponents2.default.h3.withConfig({
  displayName: 'Heading__Heading3'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});

var Heading4 = _styledComponents2.default.h4.withConfig({
  displayName: 'Heading__Heading4'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});

var Heading5 = _styledComponents2.default.h5.withConfig({
  displayName: 'Heading__Heading5'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});

var Heading = function Heading(props) {
  var hTag = ['h1', 'h2', 'h3', 'h4', 'h5'].find(function (hTag) {
    return hTag in props;
  });
  switch (hTag) {
    case 'h5':
      return _react2.default.createElement(
        Heading5,
        props,
        props.children
      );
    case 'h4':
      return _react2.default.createElement(
        Heading4,
        props,
        props.children
      );
    case 'h3':
      return _react2.default.createElement(
        Heading3,
        props,
        props.children
      );
    case 'h2':
      return _react2.default.createElement(
        Heading2,
        props,
        props.children
      );
    default:
      return _react2.default.createElement(
        Heading1,
        props,
        props.children
      );
  }
};

Heading.propTypes = propTypes;
var _default = Heading;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(propTypes, 'propTypes', 'src/lib/Heading.js');
  reactHotLoader.register(getCss, 'getCss', 'src/lib/Heading.js');
  reactHotLoader.register(Heading1, 'Heading1', 'src/lib/Heading.js');
  reactHotLoader.register(Heading2, 'Heading2', 'src/lib/Heading.js');
  reactHotLoader.register(Heading3, 'Heading3', 'src/lib/Heading.js');
  reactHotLoader.register(Heading4, 'Heading4', 'src/lib/Heading.js');
  reactHotLoader.register(Heading5, 'Heading5', 'src/lib/Heading.js');
  reactHotLoader.register(Heading, 'Heading', 'src/lib/Heading.js');
  reactHotLoader.register(_default, 'default', 'src/lib/Heading.js');
  leaveModule(module);
})();

;