import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  addTheme,
  basePropTypes,
  gutterPropTypes,
  withRowGutters,
  mediaStylesPropTypes,
  withMediaStyles,
  spacingPropTypes,
  withSpacing,
} from './utils';

/**
 * Flex "container", to wrap FlexItems
 * Renders <div>
 * https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties
 *
 * CSS Defaults:
 *   flex-direction: row;
 *   flex-wrap: nowrap;
 *   justify-content: flex-start;
 *   align-items: stretch;
 *   align-content: stretch;
 */
const propTypes = {
  ...basePropTypes,
  inline: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
  ]),
  alignItems: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  ...spacingPropTypes,
  ...gutterPropTypes,
  ...mediaStylesPropTypes,
};

// Change certain defaults for grid-like behavior
const defaultProps = {
  flexWrap: 'wrap',
};

// prettier-ignore
const getCss = props => css`
  display: ${props.inline ? 'inline-flex' : 'flex'};
  ${props.flexDirection && `flex-direction: ${props.flexDirection};`}
  ${props.flexWrap && `flex-wrap: ${props.flexWrap};`}
  ${props.justifyContent && `justify-content: ${props.justifyContent};`}
  ${props.alignItems && `align-items: ${props.alignItems};`}
  ${props.alignContent && `align-content: ${props.alignContent};`}
  ${withSpacing(props)}
  ${withMediaStyles(props)}
  ${withRowGutters(props)} // apply gutters last (overrides any prior left/right margins)
`

const FlexStyled = styled.div`
  ${props => getCss(addTheme(props))};
`;

// Pass down gutter props to any FlexItem children
function Flex(props) {
  const { children, gutter, smGutter, mdGutter, lgGutter } = props;

  const childrenWithGutterProps = React.Children.map(children, child => {
    return child.type && child.type.displayName === 'FlexItem'
      ? React.cloneElement(child, { gutter, smGutter, mdGutter, lgGutter })
      : child;
  });

  return <FlexStyled {...props}>{childrenWithGutterProps}</FlexStyled>;
}

Flex.propTypes = propTypes;
Flex.defaultProps = defaultProps;
export default Flex;
