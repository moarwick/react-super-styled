'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Block wrapper
 * Renders <div> tag
 */
var propTypes = _extends({}, _utils.basePropTypes, _utils.containerPropTypes, _utils.justifyPropTypes, _utils.spacingPropTypes, _utils.mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return (0, _styledComponents.css)(['', ' ', ' ', ' ', ''], (0, _utils.withContainer)(props), (0, _utils.withJustify)(props), (0, _utils.withSpacing)(props), (0, _utils.withMediaStyles)(props));
};

var Block = _styledComponents2.default.div.withConfig({
  displayName: 'Block'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});
Block.propTypes = propTypes;
var _default = Block;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Block.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Block.js');

  __REACT_HOT_LOADER__.register(Block, 'Block', 'src/lib/Block.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Block.js');
}();

;