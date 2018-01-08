import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, displayPropTypes } from './utils';

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
    mdHide,
    smHide,
    xsHide,
    mdShow,
    smShow,
    xsShow,
    mdShowInline,
    smShowInline,
    xsShowInline,
    mdShowInlineBlock,
    smShowInlineBlock,
    xsShowInlineBlock,
    theme,
  } = props;

  // TODO: rework this, so it can act on multiple breakpoints per use

  let breakpoint = '';
  let displayType = '';

  if (mdShow || mdShowInline || mdShowInlineBlock || mdHide) {
    breakpoint = 'MD_MAX';
  }
  if (smShow || smShowInline || smShowInlineBlock || smHide) {
    breakpoint = 'SM_MAX';
  }
  if (xsShow || xsShowInline || xsShowInlineBlock || xsHide) {
    breakpoint = 'XS_MAX';
  }

  const isHide = mdHide || smHide || xsHide;
  const isShow =
    mdShow ||
    smShow ||
    xsShow ||
    mdShowInline ||
    smShowInline ||
    xsShowInline ||
    mdShowInlineBlock ||
    smShowInlineBlock ||
    xsShowInlineBlock;

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
  return css`
    ${isShow && `display: none; ${theme['MEDIA_' + breakpoint]} { display: ${displayType};`}
    ${isHide && `${theme['MEDIA_' + breakpoint]} { display: none; }`}
  `
};

const Display = styled.span`
  ${props => getCss(addTheme(props))};
`;
Display.propTypes = propTypes;
export default Display;
