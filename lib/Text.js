'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Text paragraph
 * Renders <p> tag
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  color: _propTypes2.default.string,
  lineHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _utils.fontPropTypes, _utils.justifyPropTypes, _utils.mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return (0, _styledComponents.css)(['color:', ';line-height:', ';', '  ', ' ', ' ', ''], props.color, props.lineHeight, props.margin !== undefined && (0, _utils.cssSpacing)('margin', props), (0, _utils.withFont)(props), (0, _utils.withJustify)(props), (0, _utils.withMediaStyles)(props));
};

var Text = _styledComponents2.default.p.withConfig({
  displayName: 'Text'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});
Text.propTypes = propTypes;
var _default = Text;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Text.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Text.js');

  __REACT_HOT_LOADER__.register(Text, 'Text', 'src/lib/Text.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Text.js');
}();

;