'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n      border-top: ', ';\n      ', ' \n      ', ';\n    '], ['\n      border-top: ', ';\n      ', ' \n      ', ';\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    background: ', ';\n    height: ', '; \n    ', '\n    ', ';\n  '], ['\n    background: ', ';\n    height: ', '; \n    ', '\n    ', ';\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * A "smarter" <hr/>
 * Renders <div>
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  borderStyle: _propTypes2.default.string,
  color: _propTypes2.default.string,
  colorTo: _propTypes2.default.string,
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _utils.mediaStylesPropTypes);

var defaultProps = {
  borderStyle: 'solid',
  color: '#000',
  height: 0.1
};

var getCss = function getCss(props) {
  var borderStyle = props.borderStyle,
      color = props.color,
      height = props.height,
      margin = props.margin;


  var borderCss = borderStyle !== 'solid' ? (0, _utils.toCssUnits)(height) + ' ' + borderStyle + ' ' + color : '';

  if (borderCss) {
    // prettier-ignore
    return (0, _styledComponents.css)(_templateObject, borderCss, margin && (0, _utils.cssSpacing)('margin', props), (0, _utils.withMediaStyles)(props));
  }

  var colorTo = props.colorTo || color;
  var background = 'linear-gradient(to right, ' + color + ', ' + colorTo + ')';

  // prettier-ignore
  return (0, _styledComponents.css)(_templateObject2, background, (0, _utils.toCssUnits)(height), margin && (0, _utils.cssSpacing)('margin', margin), (0, _utils.withMediaStyles)(props));
};

var Rule = _styledComponents2.default.div(_templateObject3, function (props) {
  return getCss((0, _utils.addTheme)(props));
});
Rule.propTypes = propTypes;
Rule.defaultProps = defaultProps;
exports.default = Rule;