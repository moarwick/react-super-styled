var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, containerPropTypes, withContainer, justifyPropTypes, withJustify, spacingPropTypes, withSpacing, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Section block wrapper
 * Renders <section> tag
 * NOTE: Could've used Block.extend`...` but it generates a wacky className (and may have more overhead)
 */
var propTypes = _extends({}, basePropTypes, containerPropTypes, justifyPropTypes, spacingPropTypes, mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return css(['', ' ', ' ', ' ', ''], withContainer(props), withJustify(props), withSpacing(props), withMediaStyles(props));
};

var Section = styled.section.withConfig({
  displayName: 'Section'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Section.propTypes = propTypes;
var _default = Section;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Section.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Section.js');

  __REACT_HOT_LOADER__.register(Section, 'Section', 'src/lib/Section.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Section.js');
}();

;