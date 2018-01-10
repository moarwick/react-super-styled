import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, displayPropTypes } from './utils';

function toDisplayCss(hide, show, showInline) {
  if (hide) return 'display: none;';
  const display = show ? 'block' : showInline ? 'inline' : 'inline-block';
  return `display: ${display};`;
}

/**
 * Wrapper to show/hide contents based on media breakpoints
 * Renders <span> tag
 */
const propTypes = {
  ...basePropTypes,
  ...displayPropTypes
};

const getCss = props => {
  const {
    hide,
    smHide,
    mdHide,
    lgHide,

    show,
    smShow,
    mdShow,
    lgShow,

    showInline,
    smShowInline,
    mdShowInline,
    lgShowInline,

    showInlineBlock,
    smShowInlineBlock,
    mdShowInlineBlock,
    lgShowInlineBlock,

    theme
  } = props;

  const xsShow = !hide && (show || showInline || showInlineBlock || smHide || mdHide || lgHide);

  const xsHide =
    hide ||
    (!xsShow &&
      (smShow ||
        smShowInline ||
        smShowInlineBlock ||
        mdShow ||
        mdShowInline ||
        mdShowInlineBlock ||
        lgShow ||
        lgShowInline ||
        lgShowInlineBlock));

  const isSmRules = smHide || smShow || smShowInline || smShowInlineBlock;
  const isMdRules = mdHide || mdShow || mdShowInline || mdShowInlineBlock;
  const isLgRules = lgHide || lgShow || lgShowInline || lgShowInlineBlock;

  // prettier-ignore
  return css`
    ${xsHide && 'display: none;'}
    ${xsShow && toDisplayCss(false, show, showInline)}
    ${isSmRules && `${theme.MEDIA_XS_MIN} { ${toDisplayCss(smHide, smShow, smShowInline)} }`}
    ${isMdRules && `${theme.MEDIA_SM_MIN} { ${toDisplayCss(mdHide, mdShow, mdShowInline)} }`}
    ${isLgRules && `${theme.MEDIA_MD_MIN} { ${toDisplayCss(lgHide, lgShow, lgShowInline)} }`}
  `
};

const Display = styled.span`
  ${props => getCss(addTheme(props))};
`;
Display.propTypes = propTypes;
export default Display;
