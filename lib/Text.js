var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, cssSpacing, basePropTypes, fontPropTypes, withFont, justifyPropTypes, withJustify, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Text paragraph
 * Renders <p> tag
 */
var propTypes = _extends({}, basePropTypes, {
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}, fontPropTypes, justifyPropTypes, mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return css(['', ' ', ' ', '  ', ' ', ' ', ''], props.color && 'color: ' + props.color + ';', props.lineHeight && 'line-height: ' + props.lineHeight + ';', props.margin !== undefined && cssSpacing('margin', props), withFont(props), withJustify(props), withMediaStyles(props));
};

var Text = styled.p.withConfig({
  displayName: 'Text'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Text.propTypes = propTypes;
var _default = Text;
export default _default;
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