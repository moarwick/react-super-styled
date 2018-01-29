import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, displayPropTypes } from './utils';

function toDisplayCss(hide, show) {
  if (hide) return 'display: none;';
  if (!show || typeof show === 'boolean') show = 'block';
  return `display: ${show};`;
}

/**
 * Wrapper to show/hide contents based on media breakpoints
 * Renders <span> tag
 */
const propTypes = {
  ...basePropTypes,
  ...displayPropTypes,
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

    theme,
  } = props;

  const xsShow = !hide && (show || smHide || mdHide || lgHide);
  const xsHide = hide || (!xsShow && (smShow || mdShow || lgShow));
  const isSmRules = smHide || smShow;
  const isMdRules = mdHide || mdShow;
  const isLgRules = lgHide || lgShow;

  // prettier-ignore
  return css`
    ${xsHide && 'display: none;'}
    ${xsShow && toDisplayCss(false, show)}
    ${isSmRules && `${theme.MEDIA_XS_MIN} { ${toDisplayCss(smHide, smShow)} }`}
    ${isMdRules && `${theme.MEDIA_SM_MIN} { ${toDisplayCss(mdHide, mdShow)} }`}
    ${isLgRules && `${theme.MEDIA_MD_MIN} { ${toDisplayCss(lgHide, lgShow)} }`}
  `
};

const Display = styled.span`
  ${props => getCss(addTheme(props))};
`;
Display.propTypes = propTypes;
export default Display;
