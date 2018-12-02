'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ICON_SIZE = exports.DEFAULT_VIEWBOX = exports.DEFAULT_VIEWBOX_SIZE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: inline-block;\n  position: relative;\n  font-size: 0;\n  height: ', ';\n  width: ', ';\n  ', ';\n'], ['\n  display: inline-block;\n  position: relative;\n  font-size: 0;\n  height: ', ';\n  width: ', ';\n  ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  position: absolute;\n  left: ', ';\n  top: ', ';\n  background-color: ', ';\n  ', '\n  ', '\n  box-sizing: border-box;\n  ', '\n  height: ', ';\n  width: ', ';\n  transition: all 0.25s ease;\n  z-index: 1;\n'], ['\n  display: inline-block;\n  position: absolute;\n  left: ', ';\n  top: ', ';\n  background-color: ', ';\n  ', '\n  ', '\n  box-sizing: border-box;\n  ', '\n  height: ', ';\n  width: ', ';\n  transition: all 0.25s ease;\n  z-index: 1;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: absolute;\n  left: ', ';\n  top: ', ';\n  cursor: ', ';\n  pointer-events: ', ';\n  transition: all 0.25s ease;\n  z-index: 2;\n'], ['\n  position: absolute;\n  left: ', ';\n  top: ', ';\n  cursor: ', ';\n  pointer-events: ', ';\n  transition: all 0.25s ease;\n  z-index: 2;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  ', ';\n'], ['\n  ', ';\n']);

exports.parseViewBoxRatio = parseViewBoxRatio;
exports.parseDimensions = parseDimensions;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// ----- CONSTANTS -----

var DEFAULT_VIEWBOX_SIZE = exports.DEFAULT_VIEWBOX_SIZE = 24;
var DEFAULT_VIEWBOX = exports.DEFAULT_VIEWBOX = '0 0 ' + DEFAULT_VIEWBOX_SIZE + ' ' + DEFAULT_VIEWBOX_SIZE;
var DEFAULT_ICON_SIZE = exports.DEFAULT_ICON_SIZE = 1.4;
var XMLNS = 'http://www.w3.org/2000/svg';

// ----- HELPER UTILS -----

/**
 * Calculate width-to-height aspect ratio from viewBox (default 1)
 */
function parseViewBoxRatio(viewBox) {
  var coords = (viewBox || DEFAULT_VIEWBOX).split(' ').map(function (val) {
    return (0, _utils.toNum)(val);
  });
  if (coords.length !== 4) return 1;

  var _coords = _slicedToArray(coords, 4),
      x1 = _coords[0],
      y1 = _coords[1],
      x2 = _coords[2],
      y2 = _coords[3];

  return (x2 - x1) / (y2 - y1) || 1;
}

/**
 * Derive height & width of SVG per its viewBox ratio (default DEFAULT_ICON_SIZE)
 */
function parseDimensions(width, height, viewBox) {
  var ratio = parseViewBoxRatio(viewBox);

  if (!width && !height) height = DEFAULT_ICON_SIZE;
  if (height && !width) width = (0, _utils.toNum)(height) * ratio;
  if (width && !height) height = (0, _utils.toNum)(width) / ratio;

  return [width, height];
}

// ----- SUB-COMPONENTS -----

var getWrapperCss = function getWrapperCss(props) {
  return (0, _styledComponents.css)(_templateObject, props.outerHeight, props.outerWidth, (0, _utils.withMediaStyles)(props));
};

var getBackgroundCss = function getBackgroundCss(props) {
  return (0, _styledComponents.css)(_templateObject2, props.left, props.top, props.bgColor || 'transparent', props.border ? 'border: ' + props.border + ';' : '', props.radius ? 'border-radius: ' + props.radius + ';' : '', props.onClick ? 'cursor: pointer;' : '', props.sizeX, props.sizeY);
};

var getSvgCss = function getSvgCss(props) {
  return (0, _styledComponents.css)(_templateObject3, props.left, props.top, props.cursor, props.pointerEvents);
};

var BasicSvg = _styledComponents2.default.svg(_templateObject4, function (props) {
  return (0, _utils.withMediaStyles)(props);
});

var Wrapper = _styledComponents2.default.span(_templateObject4, function (props) {
  return getWrapperCss(props);
});

var Background = _styledComponents2.default.span(_templateObject4, function (props) {
  return getBackgroundCss(props);
});

var Svg = _styledComponents2.default.svg(_templateObject4, function (props) {
  return getSvgCss(props);
});

// ----- MAIN COMPONENT -----

/**
 * SvgIcon
 *
 * An highly-configurable SVG content wrapper
 * Adapted from https://gist.github.com/moarwick/1229e9bd73ad52be73d54975cdac0d1e
 */
var propTypes = _extends({}, _utils.basePropTypes, {
  innerRef: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
  color: _propTypes2.default.string,
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  stroke: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  viewBox: _propTypes2.default.string,

  // complex, span-wrapped svg
  border: _propTypes2.default.string,
  bgColor: _propTypes2.default.string,
  inset: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  offsetX: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  offsetY: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onClick: _propTypes2.default.func,
  radius: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
}, _utils.mediaStylesPropTypes);

var defaultProps = {
  color: '#000',
  inset: 0,
  height: 0,
  width: 0,
  viewBox: DEFAULT_VIEWBOX,
  theme: {}
};

var SvgIcon = function SvgIcon(props) {
  props = (0, _utils.addTheme)(props);

  var _props = props,
      innerRef = _props.innerRef,
      inset = _props.inset,
      offsetX = _props.offsetX,
      offsetY = _props.offsetY,
      radius = _props.radius,
      border = _props.border,
      bgColor = _props.bgColor,
      children = _props.children,
      color = _props.color,
      onClick = _props.onClick,
      stroke = _props.stroke,
      viewBox = _props.viewBox,
      styles = _props.styles,
      attribs = _objectWithoutProperties(_props, ['innerRef', 'inset', 'offsetX', 'offsetY', 'radius', 'border', 'bgColor', 'children', 'color', 'onClick', 'stroke', 'viewBox', 'styles']);

  var units = (0, _utils.resolveUnits)(props.width + ' ' + props.height + ' ' + inset + ' ' + offsetX + ' ' + offsetY);

  var _parseDimensions = parseDimensions((0, _utils.toNum)(props.width), (0, _utils.toNum)(props.height), viewBox),
      _parseDimensions2 = _slicedToArray(_parseDimensions, 2),
      width = _parseDimensions2[0],
      height = _parseDimensions2[1];

  var widthPx = units === 'px' ? width : width * 10; // assume 1rem === 10px
  var heightPx = units === 'px' ? height : height * 10; // assume 1rem === 10px

  var isAdvanced = border || bgColor || radius || inset || offsetX || offsetY || onClick;

  // if "advanced" functionality not required, render a "basic" svg-only version
  if (!isAdvanced) {
    return React.createElement(
      BasicSvg,
      _extends({}, attribs, {
        ref: innerRef,
        height: heightPx,
        width: widthPx,
        viewBox: viewBox,
        xmlns: XMLNS,
        styles: styles
      }),
      React.createElement(
        'g',
        { fill: color, stroke: color, strokeWidth: (0, _utils.toCssUnits)(stroke) },
        children
      )
    );
  }

  // otherwise, render the full wrapper...
  inset = (0, _utils.toNum)(inset);
  offsetX = (0, _utils.toNum)(offsetX);
  offsetY = (0, _utils.toNum)(offsetY);

  var widthUnits = '' + width + units;
  var heightUnits = '' + height + units;
  var innerHeight = Math.max(0, height - inset * 2);
  var innerWidth = Math.max(0, width - inset * 2);
  var innerHeightPx = units === 'px' ? innerHeight : innerHeight * 10;
  var innerWidthPx = units === 'px' ? innerWidth : innerWidth * 10;

  if (radius) {
    var radiusUnits = (0, _utils.resolveUnits)(String(radius || ''));
    radius = '' + (0, _utils.toNum)(radius) + radiusUnits;
  }

  var isBackground = !!(bgColor || border || inset);

  return React.createElement(
    Wrapper,
    _extends({}, attribs, {
      ref: innerRef,
      outerHeight: heightUnits,
      outerWidth: widthUnits,
      styles: styles
    }),
    React.createElement('svg', { viewBox: viewBox, height: heightPx, width: widthPx, xmlns: XMLNS }),
    isBackground && React.createElement(Background, {
      bgColor: bgColor,
      border: border,
      sizeY: heightUnits,
      sizeX: widthUnits,
      left: '' + offsetX + units,
      top: '' + offsetY + units,
      onClick: onClick,
      radius: radius
    }),
    React.createElement(
      Svg,
      {
        height: innerHeightPx,
        width: innerWidthPx,
        viewBox: viewBox,
        xmlns: XMLNS,
        left: '' + (offsetX + inset) + units,
        top: '' + (offsetY + inset) + units,
        cursor: onClick && !isBackground ? 'pointer' : 'default',
        pointerEvents: onClick && isBackground ? 'none' : 'auto'
      },
      React.createElement(
        'g',
        { fill: color, stroke: color, strokeWidth: (0, _utils.toCssUnits)(stroke) },
        children
      )
    )
  );
};

SvgIcon.displayName = 'SvgIcon';
SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;
exports.default = SvgIcon;