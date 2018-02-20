var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, fontPropTypes, withFont, justifyPropTypes, withJustify, spacingPropTypes, withSpacing, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Non-block wrapper
 * Renders <span> tag
 */
var propTypes = _extends({}, basePropTypes, {
  color: PropTypes.string,
  block: PropTypes.bool,
  inlineBlock: PropTypes.bool
}, fontPropTypes, justifyPropTypes, spacingPropTypes, mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return css(['color:', ';', ' ', ' ', ' ', ' ', ' ', ''], props.color, props.block && 'display: block;', props.inlineBlock && 'display: inline-block;', withFont(props), withJustify(props), withSpacing(props), withMediaStyles(props));
};

var Span = styled.span.withConfig({
  displayName: 'Span'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Span.propTypes = propTypes;
var _default = Span;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Span.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Span.js');

  __REACT_HOT_LOADER__.register(Span, 'Span', 'src/lib/Span.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Span.js');
}();

;