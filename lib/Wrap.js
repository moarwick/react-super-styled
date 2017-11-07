var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, fontPropTypes, withFont, justifyPropTypes, withJustify, spacingPropTypes, withSpacing, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Non-block wrapper
 * Renders <span> tag, as inline (default) or inline-block
 */
var propTypes = _extends({
  color: PropTypes.string,
  inlineBlock: PropTypes.bool
}, basePropTypes, fontPropTypes, justifyPropTypes, spacingPropTypes, mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return css(['', '   ', ' ', ' ', ' ', ' ', ''], props.color && 'color: ' + props.color + ';', props.inlineBlock && 'display: inline-block;', withFont(props), withJustify(props), withSpacing(props), withMediaStyles(props));
};

var Wrap = styled.span.withConfig({
  displayName: 'Wrap'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Wrap.propTypes = propTypes;
var _default = Wrap;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Wrap.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Wrap.js');

  __REACT_HOT_LOADER__.register(Wrap, 'Wrap', 'src/lib/Wrap.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Wrap.js');
}();

;