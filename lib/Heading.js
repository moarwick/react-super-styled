var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, cssSpacing, basePropTypes, fontPropTypes, withFont, justifyPropTypes, withJustify, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Heading
 * Renders <h1> - <h4> tag
 */
var propTypes = _extends({
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}, basePropTypes, fontPropTypes, justifyPropTypes, mediaStylesPropTypes);

// prettier-ignore
var getCss = function getCss(props) {
  return css(['', ' ', ' ', '  ', ' ', ' ', ''], props.color && 'color: ' + props.color + ';', props.lineHeight && 'line-height: ' + props.lineHeight + ';', props.margin !== undefined && cssSpacing('margin', props), withFont(props, true), withJustify(props), withMediaStyles(props));
};

// NOTE: Not using withComponent(), because reasons..
var Heading = function Heading(props) {
  var hTag = ['h1', 'h2', 'h3', 'h4'].find(function (hTag) {
    return hTag in props;
  }) || 'h1';
  var H = styled[hTag].withConfig({
    displayName: 'Heading__H'
  })(['', ';'], getCss(addTheme(_extends({}, props)))); // had to clone, otherwise "object not extensible" error
  return React.createElement(
    H,
    null,
    props.children
  );
};
Heading.propTypes = propTypes;
var _default = Heading;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(propTypes, 'propTypes', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(getCss, 'getCss', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(Heading, 'Heading', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Heading.js');
}();

;