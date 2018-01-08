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
 * Section block wrapper
 * Renders <section> tag
 * NOTE: Could've used Block.extend`...` but it generates a wacky className (and may have more overhead)
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

const Section = styled.section`
  ${props => getCss(addTheme(props))};
`;
Section.propTypes = propTypes;
export default Section;
