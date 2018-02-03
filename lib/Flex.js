var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, basePropTypes, gutterPropTypes, withRowGutters, mediaStylesPropTypes, withMediaStyles, spacingPropTypes, withSpacing } from './utils';

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
var propTypes = _extends({}, basePropTypes, {
  inline: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  alignItems: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
  alignContent: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'])
}, spacingPropTypes, gutterPropTypes, mediaStylesPropTypes);

// change flexWrap default for more grid-like behavior
var defaultProps = {
  flexWrap: 'wrap'
};

// prettier-ignore
var getCss = function getCss(props) {
  return css(['display:', ';', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], props.inline ? 'inline-flex' : 'flex', props.flexDirection && 'flex-direction: ' + props.flexDirection + ';', props.flexWrap && 'flex-wrap: ' + props.flexWrap + ';', props.justifyContent && 'justify-content: ' + props.justifyContent + ';', props.alignItems && 'align-items: ' + props.alignItems + ';', props.alignContent && 'align-content: ' + props.alignContent + ';', withSpacing(props), withMediaStyles(props), withRowGutters(props));
};

var FlexStyled = styled.div.withConfig({
  displayName: 'Flex__FlexStyled'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});

function Flex(props) {
  var children = props.children,
      gutter = props.gutter,
      smGutter = props.smGutter,
      mdGutter = props.mdGutter,
      lgGutter = props.lgGutter;

  // pass gutter props to any FlexItem children

  var childrenWithGutterProps = React.Children.map(children, function (child) {
    return child && child.type && child.type.displayName === 'FlexItem' ? React.cloneElement(child, { gutter: gutter, smGutter: smGutter, mdGutter: mdGutter, lgGutter: lgGutter }) : child;
  });

  return React.createElement(
    FlexStyled,
    props,
    childrenWithGutterProps
  );
}

Flex.propTypes = propTypes;
Flex.defaultProps = defaultProps;
var _default = Flex;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Flex.js');

  __REACT_HOT_LOADER__.register(defaultProps, 'defaultProps', 'src/lib/Flex.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Flex.js');

  __REACT_HOT_LOADER__.register(FlexStyled, 'FlexStyled', 'src/lib/Flex.js');

  __REACT_HOT_LOADER__.register(Flex, 'Flex', 'src/lib/Flex.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Flex.js');
}();

;