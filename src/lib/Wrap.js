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
 * Renders <span> tag, as inline (default) or inline-block
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
  ${props.color && `color: ${props.color};`}  
  ${props.block && 'display: block;'}
  ${props.inlineBlock && 'display: inline-block;'}
  ${withFont(props)}
  ${withJustify(props)}
  ${withSpacing(props)}
  ${withMediaStyles(props)}
`

const Wrap = styled.span`
  ${props => getCss(addTheme(props))};
`;
Wrap.propTypes = propTypes;
export default Wrap;
