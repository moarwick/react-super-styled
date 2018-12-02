'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n  color: ', ';\n  ', '\n  ', '\n  ', '\n  ', '\n  ', '\n  ', '\n'], ['\n  color: ', ';\n  ', '\n  ', '\n  ', '\n  ', '\n  ', '\n  ', '\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Non-block wrapper
 * Renders <span> tag
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  color: _propTypes2.default.string,
  block: _propTypes2.default.bool,
  inlineBlock: _propTypes2.default.bool
}, _utils.fontPropTypes, _utils.justifyPropTypes, _utils.spacingPropTypes, _utils.mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return (0, _styledComponents.css)(_templateObject, props.color, props.block && 'display: block;', props.inlineBlock && 'display: inline-block;', (0, _utils.withFont)(props), (0, _utils.withJustify)(props), (0, _utils.withSpacing)(props), (0, _utils.withMediaStyles)(props));
};

var Span = _styledComponents2.default.span(_templateObject2, function (props) {
  return getCss((0, _utils.addTheme)(props));
});
Span.propTypes = propTypes;
exports.default = Span;