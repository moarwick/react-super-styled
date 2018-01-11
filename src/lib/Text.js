import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  addTheme,
  cssSpacing,
  basePropTypes,
  fontPropTypes,
  withFont,
  justifyPropTypes,
  withJustify,
  mediaStylesPropTypes,
  withMediaStyles,
} from './utils';

/**
 * Text paragraph
 * Renders <p> tag
 */
const propTypes = {
  ...basePropTypes,
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ...fontPropTypes,
  ...justifyPropTypes,
  ...mediaStylesPropTypes,
};

// prettier-ignore
const getCss = props => css`
  ${props.color && `color: ${props.color};`}
  ${props.lineHeight && `line-height: ${props.lineHeight};`}
  ${props.margin !== undefined && cssSpacing('margin', props)} 
  ${withFont(props)}
  ${withJustify(props)}
  ${withMediaStyles(props)}
`

const Text = styled.p`
  ${props => getCss(addTheme(props))};
`;
Text.propTypes = propTypes;
export default Text;
