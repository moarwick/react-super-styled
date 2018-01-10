var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, columnPropTypes, withColumns, spacingPropTypes, withSpacing, mediaStylesPropTypes, withMediaStyles } from './utils';

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
var propTypes = _extends({
  alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: PropTypes.string,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  order: PropTypes.number
}, basePropTypes, columnPropTypes, spacingPropTypes, mediaStylesPropTypes);

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
  return css(['box-sizing:border-box;flex:', ';align-self:', ';order:', ';', ' ', ' ', ''], flex, props.alignSelf || 'auto', props.order || 0, withColumns(props), withSpacing(props), withMediaStyles(props));
}

var FlexItem = styled.div.withConfig({
  displayName: 'FlexItem'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
FlexItem.propTypes = propTypes;
var _default = FlexItem;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/FlexItem.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/FlexItem.js');

  __REACT_HOT_LOADER__.register(FlexItem, 'FlexItem', 'src/lib/FlexItem.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/FlexItem.js');
}();

;