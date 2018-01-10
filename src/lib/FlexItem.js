import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  addTheme,
  basePropTypes,
  columnPropTypes,
  withColumns,
  spacingPropTypes,
  withSpacing,
  mediaStylesPropTypes,
  withMediaStyles
} from './utils';

/**
 * Flex item wrapper, with 12-column support, media breakpoints
 * Renders <div>
 * https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
 * https://www.w3.org/TR/styles-flexbox/#flex-common
 *
 * CSS Defaults:
 *   order: 0;
 *   align-self: auto;
 *   flex: 0 1 auto;      <-- recommended 'shorthand' for below props
 *
 *   flex-grow: 0;        <-- if any long-hands supplied, expects all three (do not mix)
 *   flex-shrink: 1;
 *   flex-basis: auto;
 */
const propTypes = {
  ...basePropTypes,
  alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: PropTypes.string,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  order: PropTypes.number,
  ...columnPropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes
};

function getCss({ flex, flexGrow, flexShrink, flexBasis, ...props }) {
  if (!flex) {
    flex =
      flexGrow || flexShrink || flexBasis
        ? `${flexGrow || 0} ${flexShrink || 1} ${flexBasis || 'auto'}`
        : 'initial'; // 0 1 auto
  }

  // prettier-ignore
  return css`
    box-sizing: border-box;
    flex: ${flex};
    align-self: ${props.alignSelf || 'auto'};
    order: ${props.order || 0}; 
    ${withColumns(props)}
    ${withSpacing(props)}
    ${withMediaStyles(props)}
  `
}

const FlexItem = styled.div`
  ${props => getCss(addTheme(props))};
`;
FlexItem.propTypes = propTypes;
export default FlexItem;
