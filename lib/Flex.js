'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var propTypes = _extends({}, _utils.basePropTypes, {
  inline: _propTypes2.default.bool,
  flexDirection: _propTypes2.default.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: _propTypes2.default.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: _propTypes2.default.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  alignItems: _propTypes2.default.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
  alignContent: _propTypes2.default.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'])
}, _utils.spacingPropTypes, _utils.gutterPropTypes, _utils.mediaStylesPropTypes);

// change flexWrap default for more grid-like behavior
var defaultProps = {
  flexWrap: 'wrap'
};

// prettier-ignore
var getCss = function getCss(props) {
  return (0, _styledComponents.css)(['display:', ';flex-direction:', ';flex-wrap:', ';justify-content:', ';align-items:', ';align-content:', ';', ' ', ' ', ' '], props.inline ? 'inline-flex' : 'flex', props.flexDirection, props.flexWrap, props.justifyContent, props.alignItems, props.alignContent, (0, _utils.withSpacing)(props), (0, _utils.withMediaStyles)(props), (0, _utils.withRowGutters)(props));
};

var FlexStyled = _styledComponents2.default.div.withConfig({
  displayName: 'Flex__FlexStyled'
})(['', ';'], function (props) {
  return getCss((0, _utils.addTheme)(props));
});

function Flex(props) {
  var children = props.children,
      gutter = props.gutter,
      smGutter = props.smGutter,
      mdGutter = props.mdGutter,
      lgGutter = props.lgGutter;

  // pass gutter props to any FlexItem children

  var childrenWithGutterProps = _react2.default.Children.map(children, function (child) {
    return child && child.type && child.type.displayName === 'FlexItem' ? _react2.default.cloneElement(child, { gutter: gutter, smGutter: smGutter, mdGutter: mdGutter, lgGutter: lgGutter }) : child;
  });

  return _react2.default.createElement(
    FlexStyled,
    props,
    childrenWithGutterProps
  );
}

Flex.propTypes = propTypes;
Flex.defaultProps = defaultProps;
var _default = Flex;
exports.default = _default;
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