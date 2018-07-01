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

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Flex item wrapper, with 12-column support, media breakpoints
 * Renders <div>
 * https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
 * https://www.w3.org/TR/styles-flexbox/#flex-common
 *
 * CSS Defaults:
 *   order: 0;
 *   align-self: auto;
 *   flex: 0 1 auto;      <-- recommended 'shorthand' for below props
 *
 *   flex-grow: 0;        <-- if any long-hands supplied, expects all three (do not mix)
 *   flex-shrink: 1;
 *   flex-basis: auto;
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  alignSelf: _propTypes2.default.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: _propTypes2.default.string,
  flexBasis: _propTypes2.default.string,
  flexGrow: _propTypes2.default.number,
  flexShrink: _propTypes2.default.number,
  order: _propTypes2.default.number
}, _utils.columnPropTypes, _utils.spacingPropTypes, _utils.mediaStylesPropTypes);

function getCss(_ref) {
  var flex = _ref.flex,
      flexGrow = _ref.flexGrow,
      flexShrink = _ref.flexShrink,
      flexBasis = _ref.flexBasis,
      props = _objectWithoutProperties(_ref, ['flex', 'flexGrow', 'flexShrink', 'flexBasis']);

  if (!flex) {
    flex = flexGrow || flexShrink || flexBasis ? (flexGrow || 0) + ' ' + (flexShrink || 1) + ' ' + (flexBasis || 'auto') : 'initial'; // 0 1 auto
  }

  // prettier-ignore
  return (0, _styledComponents.css)(['box-sizing:border-box;flex:', ';align-self:', ';order:', ';', ' ', ' ', ''], flex, props.alignSelf || 'auto', props.order || 0, (0, _utils.withColumns)(props), (0, _utils.withSpacing)(props), (0, _utils.withMediaStyles)(props));
}

var FlexItem = _styledComponents2.default.div.withConfig({
  displayName: 'FlexItem'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});
FlexItem.propTypes = propTypes;
FlexItem.displayName = 'FlexItem';
var _default = FlexItem;
exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(propTypes, 'propTypes', 'src/lib/FlexItem.js');
  reactHotLoader.register(getCss, 'getCss', 'src/lib/FlexItem.js');
  reactHotLoader.register(FlexItem, 'FlexItem', 'src/lib/FlexItem.js');
  reactHotLoader.register(_default, 'default', 'src/lib/FlexItem.js');
  leaveModule(module);
})();

;