'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    color: ', ';\n    line-height: ', ';\n    ', ' \n    ', '\n    ', '\n    ', '\n  '], ['\n    color: ', ';\n    line-height: ', ';\n    ', ' \n    ', '\n    ', '\n    ', '\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Heading
 * Renders <h1> tag
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  color: _propTypes2.default.string,
  lineHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _utils.fontPropTypes, _utils.justifyPropTypes, _utils.mediaStylesPropTypes);

var getCss = function getCss(props) {
  return (
    // prettier-ignore
    (0, _styledComponents.css)(_templateObject, props.color, props.lineHeight, props.margin !== undefined && (0, _utils.cssSpacing)('margin', props), (0, _utils.withFont)(props), (0, _utils.withJustify)(props), (0, _utils.withMediaStyles)(props))
  );
};

var Heading = _styledComponents2.default.h1(_templateObject2, function (props) {
  return getCss((0, _utils.addTheme)(props));
});

Heading.propTypes = propTypes;
exports.default = Heading;