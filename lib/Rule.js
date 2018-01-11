var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, cssSpacing, toCssUnits, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * A "smarter" <hr/>
 * Renders <div>
 */
var propTypes = _extends({}, basePropTypes, {
  borderStyle: PropTypes.string,
  color: PropTypes.string,
  colorTo: PropTypes.string,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}, mediaStylesPropTypes);

var defaultProps = {
  borderStyle: 'solid',
  color: '#000',
  height: 1
};

var getCss = function getCss(props) {
  var borderStyle = props.borderStyle,
      color = props.color,
      height = props.height,
      margin = props.margin;


  var borderCss = borderStyle !== 'solid' ? toCssUnits(height) + ' ' + borderStyle + ' ' + color : '';

  if (borderCss) {
    // prettier-ignore
    return css(['border-top:', ';', '  ', ';'], borderCss, margin && cssSpacing('margin', props), withMediaStyles(props));
  }

  var colorTo = props.colorTo || color;
  var background = 'linear-gradient(to right, ' + color + ', ' + colorTo + ')';
  // prettier-ignore
  return css(['background:', ';height:', ';', ' ', ';'], background, toCssUnits(height), margin && cssSpacing('margin', props), withMediaStyles(props));
};

var Rule = styled.div.withConfig({
  displayName: 'Rule'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Rule.propTypes = propTypes;
Rule.defaultProps = defaultProps;
var _default = Rule;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Rule.js');

  __REACT_HOT_LOADER__.register(defaultProps, 'defaultProps', 'src/lib/Rule.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Rule.js');

  __REACT_HOT_LOADER__.register(Rule, 'Rule', 'src/lib/Rule.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Rule.js');
}();

;