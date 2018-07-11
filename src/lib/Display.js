import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, displayPropTypes, toMediaObj } from './utils';

function toDisplayCss(hide, show) {
  if (hide) return 'display: none;';
  if (typeof show === 'boolean' || !show) show = 'inline';
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

export function getCss({ hide, show, theme }) {
  const { xs: xsHide, sm: smHide, md: mdHide, lg: lgHide, xl: xlHide } = toMediaObj(hide || false);
  const { xs: xsShow, sm: smShow, md: mdShow, lg: lgShow, xl: xlShow } = toMediaObj(show || false);
  const rules = [[smHide, smShow], [mdHide, mdShow], [lgHide, lgShow], [xlHide, xlShow]];

  let isHideFirst = Boolean(xsHide);
  if (!isHideFirst) {
    rules.some(([h, s]) => {
      if (h || s) {
        isHideFirst = !!s;
        return true;
      }
      return false;
    });
  }

  return css`
    ${xsShow ? toDisplayCss(false, xsShow) : isHideFirst ? 'display: none;' : null}
    ${(smHide || smShow) && `${theme.MEDIA_SM_UP} { ${toDisplayCss(smHide, smShow)} }`}
    ${(mdHide || mdShow) && `${theme.MEDIA_MD_UP} { ${toDisplayCss(mdHide, mdShow)} }`}
    ${(lgHide || lgShow) && `${theme.MEDIA_LG_UP} { ${toDisplayCss(lgHide, lgShow)} }`}
    ${(xlHide || xlShow) && `${theme.MEDIA_XL_UP} { ${toDisplayCss(xlHide, xlShow)} }`}
  `;
}

const Display = styled.span`
  ${props => getCss(addTheme(props))};
`;
Display.propTypes = propTypes;
export default Display;
