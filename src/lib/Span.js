import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  addTheme,
  basePropTypes,
  fontPropTypes,
  withFont,
  justifyPropTypes,
  withJustify,
  spacingPropTypes,
  withSpacing,
  mediaStylesPropTypes,
  withMediaStyles,
} from './utils';

/**
 * Non-block wrapper
 * Renders <span> tag
 */
const propTypes = {
  ...basePropTypes,
  color: PropTypes.string,
  block: PropTypes.bool,
  inlineBlock: PropTypes.bool,
  ...fontPropTypes,
  ...justifyPropTypes,
  ...spacingPropTypes,
  ...mediaStylesPropTypes,
};

// prettier-ignore
const getCss = props => css`
  color: ${props.color};
  ${props.block && 'display: block;'}
  ${props.inlineBlock && 'display: inline-block;'}
  ${withFont(props)}
  ${withJustify(props)}
  ${withSpacing(props)}
  ${withMediaStyles(props)}
`;

const Span = styled.span`
  ${props => getCss(addTheme(props))};
`;
Span.displayName = 'Span';
Span.propTypes = propTypes;
export default Span;
