var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, displayPropTypes } from './utils';

function toDisplayCss(hide, show) {
  if (hide) return 'display: none;';
  if (!show || typeof show === 'boolean') show = 'block';
  return 'display: ' + show + ';';
}

/**
 * Wrapper to show/hide contents based on media breakpoints
 * Renders <span> tag
 */
var propTypes = _extends({}, basePropTypes, displayPropTypes);

var getCss = function getCss(props) {
  var hide = props.hide,
      smHide = props.smHide,
      mdHide = props.mdHide,
      lgHide = props.lgHide,
      xlHide = props.xlHide,
      show = props.show,
      smShow = props.smShow,
      mdShow = props.mdShow,
      lgShow = props.lgShow,
      xlShow = props.xlShow,
      theme = props.theme;


  var xsShow = !hide && (show || smHide || mdHide || lgHide || xlHide);
  var xsHide = hide || !xsShow && (smShow || mdShow || lgShow || xlShow);
  var isSmRules = smHide || smShow;
  var isMdRules = mdHide || mdShow;
  var isLgRules = lgHide || lgShow;
  var isXlRules = xlHide || xlShow;

  // prettier-ignore
  return css(['', ' ', ' ', ' ', ' ', ' ', ''], xsHide && 'display: none;', xsShow && toDisplayCss(false, show), isSmRules && theme.MEDIA_XS_MIN + ' { ' + toDisplayCss(smHide, smShow) + ' }', isMdRules && theme.MEDIA_SM_MIN + ' { ' + toDisplayCss(mdHide, mdShow) + ' }', isLgRules && theme.MEDIA_MD_MIN + ' { ' + toDisplayCss(lgHide, lgShow) + ' }', isXlRules && theme.MEDIA_LG_MIN + ' { ' + toDisplayCss(xlHide, xlShow) + ' }');
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

  __REACT_HOT_LOADER__.register(toDisplayCss, 'toDisplayCss', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(Display, 'Display', 'src/lib/Display.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Display.js');
}();

;