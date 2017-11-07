var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, displayPropTypes } from './utils';

/**
 * Wrapper to show/hide contents based on media breakpoints
 * Renders <span> tag
 */
var propTypes = _extends({}, basePropTypes, displayPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  var mdHide = props.mdHide,
      smHide = props.smHide,
      xsHide = props.xsHide,
      mdShow = props.mdShow,
      smShow = props.smShow,
      xsShow = props.xsShow,
      mdShowInline = props.mdShowInline,
      smShowInline = props.smShowInline,
      xsShowInline = props.xsShowInline,
      mdShowInlineBlock = props.mdShowInlineBlock,
      smShowInlineBlock = props.smShowInlineBlock,
      xsShowInlineBlock = props.xsShowInlineBlock,
      theme = props.theme;

  // TODO: rework this, so it can act on multiple breakpoints per use

  var breakpoint = '';
  var displayType = '';

  if (mdShow || mdShowInline || mdShowInlineBlock || mdHide) {
    breakpoint = 'MD_MAX';
  }
  if (smShow || smShowInline || smShowInlineBlock || smHide) {
    breakpoint = 'SM_MAX';
  }
  if (xsShow || xsShowInline || xsShowInlineBlock || xsHide) {
    breakpoint = 'XS_MAX';
  }

  var isHide = mdHide || smHide || xsHide;
  var isShow = mdShow || smShow || xsShow || mdShowInline || smShowInline || xsShowInline || mdShowInlineBlock || smShowInlineBlock || xsShowInlineBlock;

  if (isShow) {
    if (mdShow || smShow || xsShow) {
      displayType = 'block';
    }
    if (mdShowInlineBlock || smShowInlineBlock || xsShowInlineBlock) {
      displayType = 'inline-block';
    }
    if (mdShowInline || smShowInline || xsShowInline) {
      displayType = 'inline';
    }
  }

  // prettier-ignore
  return css(['', ' ', ''], isShow && 'display: none; ' + theme['MEDIA_' + breakpoint] + ' { display: ' + displayType + ';', isHide && theme['MEDIA_' + breakpoint] + ' { display: none; }');
};

var Display = styled.span.withConfig({
  displayName: 'Display'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});
Display.propTypes = propTypes;
var _default = Display;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(Display, 'Display', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Display.js');
}();

;