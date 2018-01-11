import styled, { css } from 'styled-components';
import {
  addTheme,
  basePropTypes,
  containerPropTypes,
  withContainer,
  justifyPropTypes,
  withJustify,
  spacingPropTypes,
  withSpacing,
  mediaStylesPropTypes,
  withMediaStyles,
} from './utils';

/**
 * Block wrapper
 * Renders <div> tag
 */
const propTypes = {
  ...basePropTypes,
  ...containerPropTypes,
  ...justifyPropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes,
};

// prettier-ignore
const getCss = props => css`
  ${withContainer(props)}
  ${withJustify(props)}
  ${withSpacing(props)}
  ${withMediaStyles(props)}
`;

const Block = styled.div`
  ${props => getCss(addTheme(props))};
`;
Block.propTypes = propTypes;
export default Block;
