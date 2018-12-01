import React from 'react';
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
 * Heading
 * Renders <h1> - <h4> tag
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

const getCss = props =>
  // prettier-ignore
  css`
    color: ${props.color};
    line-height: ${props.lineHeight};
    ${props.margin !== undefined && cssSpacing('margin', props)} 
    ${withFont(props)}
    ${withJustify(props)}
    ${withMediaStyles(props)}
  `;

const Heading = styled.h1`
  ${props => getCss(addTheme(props))};
`;

Heading.propTypes = propTypes;
export default Heading;
