var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, justifyPropTypes, withJustify, spacingPropTypes, withSpacing, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Block wrapper
 * Renders <div> tag
 */
var propTypes = _extends({}, basePropTypes, justifyPropTypes, spacingPropTypes, mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return css(['', ' ', ' ', ''], withJustify(props), withSpacing(props), withMediaStyles(props));
};

var Block = styled.div.withConfig({
  displayName: 'Block'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Block.propTypes = propTypes;
var _default = Block;
export default _default;
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