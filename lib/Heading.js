var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { addTheme, cssSpacing, basePropTypes, fontPropTypes, withFont, justifyPropTypes, withJustify, mediaStylesPropTypes, withMediaStyles } from './utils';

/**
 * Heading
 * Renders <h1> - <h4> tag
 */
var propTypes = _extends({}, basePropTypes, {
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  color: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}, fontPropTypes, justifyPropTypes, mediaStylesPropTypes);

var getCss = function getCss(props) {
  // prettier-ignore
  return css(['', ' ', ' ', '  ', ' ', ' ', ''], props.color && 'color: ' + props.color + ';', props.lineHeight && 'line-height: ' + props.lineHeight + ';', props.margin !== undefined && cssSpacing('margin', props), withFont(props, true), withJustify(props), withMediaStyles(props));
};

var Heading1 = styled.h1.withConfig({
  displayName: 'Heading__Heading1'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});

var Heading2 = styled.h2.withConfig({
  displayName: 'Heading__Heading2'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});

var Heading3 = styled.h3.withConfig({
  displayName: 'Heading__Heading3'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});

var Heading4 = styled.h4.withConfig({
  displayName: 'Heading__Heading4'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});

var Heading5 = styled.h5.withConfig({
  displayName: 'Heading__Heading5'
})(['', ';'], function (props) {
  return getCss(addTheme(props));
});

var Heading = function Heading(props) {
  var hTag = ['h1', 'h2', 'h3', 'h4', 'h5'].find(function (hTag) {
    return hTag in props;
  });
  switch (hTag) {
    case 'h5':
      return React.createElement(
        Heading5,
        props,
        props.children
      );
    case 'h4':
      return React.createElement(
        Heading4,
        props,
        props.children
      );
    case 'h3':
      return React.createElement(
        Heading3,
        props,
        props.children
      );
    case 'h2':
      return React.createElement(
        Heading2,
        props,
        props.children
      );
    default:
      return React.createElement(
        Heading1,
        props,
        props.children
      );
  }
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

  __REACT_HOT_LOADER__.register(Heading1, 'Heading1', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(Heading2, 'Heading2', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(Heading3, 'Heading3', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(Heading4, 'Heading4', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(Heading5, 'Heading5', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(Heading, 'Heading', 'src/lib/Heading.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/Heading.js');
}();

;