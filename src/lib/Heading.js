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
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ...fontPropTypes,
  ...justifyPropTypes,
  ...mediaStylesPropTypes,
};

const getCss = props => {
  // prettier-ignore
  return css`
    ${props.color && `color: ${props.color};`}
    ${props.lineHeight && `line-height: ${props.lineHeight};`}
    ${props.margin !== undefined && cssSpacing('margin', props)} 
    ${withFont(props)}
    ${withJustify(props)}
    ${withMediaStyles(props)}
  `;
};

const Heading1 = styled.h1`
  ${props => getCss(addTheme(props))};
`;

const Heading2 = styled.h2`
  ${props => getCss(addTheme(props))};
`;

const Heading3 = styled.h3`
  ${props => getCss(addTheme(props))};
`;

const Heading4 = styled.h4`
  ${props => getCss(addTheme(props))};
`;

const Heading5 = styled.h5`
  ${props => getCss(addTheme(props))};
`;

const Heading = props => {
  const hTag = ['h1', 'h2', 'h3', 'h4', 'h5'].find(hTag => hTag in props);
  switch (hTag) {
    case 'h5':
      return <Heading5 {...props}>{props.children}</Heading5>;
    case 'h4':
      return <Heading4 {...props}>{props.children}</Heading4>;
    case 'h3':
      return <Heading3 {...props}>{props.children}</Heading3>;
    case 'h2':
      return <Heading2 {...props}>{props.children}</Heading2>;
    default:
      return <Heading1 {...props}>{props.children}</Heading1>;
  }
};

Heading.propTypes = propTypes;
export default Heading;
