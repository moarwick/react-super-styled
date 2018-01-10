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
  withMediaStyles
} from './utils';

/**
 * Heading
 * Renders <h1> - <h4> tag
 */
const propTypes = {
  ...basePropTypes,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ...fontPropTypes,
  ...justifyPropTypes,
  ...mediaStylesPropTypes
};

const getCss = props => {
  // prettier-ignore
  return css`
    ${props.color && `color: ${props.color};`}
    ${props.lineHeight && `line-height: ${props.lineHeight};`}
    ${props.margin !== undefined && cssSpacing('margin', props)} 
    ${withFont(props, true)}
    ${withJustify(props)}
    ${withMediaStyles(props)}
  `
};

// NOTE: Not using withComponent(), because reasons..
const Heading = props => {
  const hTag = ['h1', 'h2', 'h3', 'h4'].find(hTag => hTag in props) || 'h1';
  const H = styled[hTag]`
    ${getCss(addTheme({ ...props }))};
  `; // had to clone, otherwise "object not extensible" error
  return <H>{props.children}</H>;
};
Heading.propTypes = propTypes;
export default Heading;
