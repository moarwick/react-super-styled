import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  addTheme,
  basePropTypes,
  gutterPropTypes,
  withMediaGutters,
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

// change flexWrap default for more grid-like behavior
const defaultProps = {
  flexWrap: 'wrap',
};

// prettier-ignore
const getCss = props => css`
  display: ${props.inline ? 'inline-flex' : 'flex'};
  flex-direction: ${props.flexDirection};
  flex-wrap: ${props.flexWrap};
  justify-content: ${props.justifyContent};
  align-items: ${props.alignItems};
  align-content: ${props.alignContent};
  ${withSpacing(props)}
  ${withMediaStyles(props)}
  ${withMediaGutters(props)} // apply gutters last (overrides any prior left/right margins)
`

const FlexStyled = styled.div`
  ${props => getCss(addTheme(props))};
`;

function Flex(props) {
  const { children, gutter, smGutter, mdGutter, lgGutter } = props;

  // pass gutter props to any FlexItem children
  const childrenWithGutterProps = React.Children.map(children, child => {
    return child && child.type && child.type.displayName === 'FlexItem'
      ? React.cloneElement(child, { gutter, smGutter, mdGutter, lgGutter })
      : child;
  });

  return <FlexStyled {...props}>{childrenWithGutterProps}</FlexStyled>;
}

Flex.propTypes = propTypes;
Flex.defaultProps = defaultProps;
export default Flex;
