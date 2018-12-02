'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacingPropTypes = exports.mediaStylesPropTypes = exports.gutterPropTypes = exports.justifyPropTypes = exports.fontPropTypes = exports.containerPropTypes = exports.displayPropTypes = exports.columnPropTypes = exports.basePropTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    ', ': ', ';\n  '], ['\n    ', ': ', ';\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      margin-left: auto;\n      margin-right: auto;\n      max-width: ', 'px;\n    '], ['\n      margin-left: auto;\n      margin-right: auto;\n      max-width: ', 'px;\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    margin-left: auto;\n    margin-right: auto;\n    max-width: ', 'px;\n\n    ', ' { \n      max-width: ', 'px;\n    }\n    \n    ', ' { \n      max-width: ', 'px;\n    }\n  '], ['\n    margin-left: auto;\n    margin-right: auto;\n    max-width: ', 'px;\n\n    ', ' { \n      max-width: ', 'px;\n    }\n    \n    ', ' { \n      max-width: ', 'px;\n    }\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    ', '\n    ', '\n    font-size: ', '; \n    font-style: ', '; \n    font-weight: ', ';\n  '], ['\n    ', '\n    ', '\n    font-size: ', '; \n    font-style: ', '; \n    font-weight: ', ';\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    ', ';\n  '], ['\n    ', ';\n  ']),
    _templateObject6 = _taggedTemplateLiteral(['\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  '], ['\n    ', '\n    ', '\n    ', '\n    ', '\n    ', '\n  ']),
    _templateObject7 = _taggedTemplateLiteral(['', ''], ['', '']),
    _templateObject8 = _taggedTemplateLiteral(['\n    ', ' \n    ', '\n  '], ['\n    ', ' \n    ', '\n  ']);

exports.addTheme = addTheme;
exports.ensureSemi = ensureSemi;
exports.resolveUnits = resolveUnits;
exports.toCssString = toCssString;
exports.toCssUnits = toCssUnits;
exports.toMediaObj = toMediaObj;
exports.toNum = toNum;
exports.cssSpacing = cssSpacing;
exports.toMediaGuttersCss = toMediaGuttersCss;
exports.toMediaColumnCss = toMediaColumnCss;
exports.throttleEvent = throttleEvent;
exports.withContainer = withContainer;
exports.withFont = withFont;
exports.withJustify = withJustify;
exports.withMediaGutters = withMediaGutters;
exports.withMediaColumns = withMediaColumns;
exports.withMediaStyles = withMediaStyles;
exports.withSpacing = withSpacing;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _THEME = require('./THEME');

var _THEME2 = _interopRequireDefault(_THEME);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
function addTheme(props) {
  return _extends({}, props, { theme: props.theme ? _extends({}, _THEME2.default, props.theme) : _THEME2.default });
}

/**
 * Accept string, trim, return terminated with a semicolon
 * If input string contains all spaces or only ';', return empty string
 */
function ensureSemi(val) {
  val = val.trim();
  return val && val !== ';' ? val.slice(-1) === ';' ? val : val + ';' : '';
}

/**
 * Parse value to determine units, make default assumptions based on type (unless default passed in)
 * Return string: px|rem|em|%
 */
function resolveUnits(val) {
  var defaultUnits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var match = String(val).match(/px|rem|em|%/g);
  return match ? match[0] : defaultUnits || 'rem';
}

/**
 * Accept string or a list of strings (from SC), return a single string
 * Filter, trim, and ensure a semicolon delimiter
 */
function toCssString(val) {
  if (typeof val === 'string') return ensureSemi(val);
  if (!Array.isArray(val)) return '';
  return val.map(function (el) {
    return ensureSemi(el);
  }).join('').trim();
}

/**
 * Return strings as-is, coerce numbers to 'rem' (default '0rem')
 */
function toCssUnits(val) {
  var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rem';

  return typeof val === 'string' ? val : typeof val === 'number' ? '' + val + units : '0rem';
}

/**
 * Helper to ensure that value is a (media) object
 */
function toMediaObj(val) {
  if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') return { xs: val };
  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Object.keys(val).length) return val;
  return {};
}

/**
 * Parse input value into a number, with optional decimal precision
 * Always return a number, 0 if value cannot be parsed
 */
function toNum(value) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  value = parseFloat(value) || 0;
  return precision > 0 ? Number(value.toFixed(precision)) : value;
}

/**
 * Deliver CSS 'padding' or 'margin' rules derived from passed in prop
 * Numbers are assumed to be 'rem'
 */
function cssSpacing(rule, value) {
  if (typeof value === 'number') value += 'rem';
  return (0, _styledComponents.css)(_templateObject, rule, value);
}

/**
 * Deliver negative left/right margin rules for FlexRow
 * This is to ensure outer columns (with gutters) are flush with the container
 */
function toMediaGuttersCss(breakpoint, gutter) {
  var units = resolveUnits(gutter);
  gutter = toNum(gutter);
  var rule = gutter ? 'margin-left: -' + gutter / 2 + units + '; margin-right: -' + gutter / 2 + units + ';' : 'margin-left: 0; margin-right: 0;';
  return breakpoint ? breakpoint + ' { ' + rule + ' }' : rule;
}

/**
 * Deliver correct column width and left/right margins, per the supplied props
 */
function toMediaColumnCss(breakpoint, col, offset, gutter) {
  var units = resolveUnits(gutter);
  gutter = toNum(gutter);
  col = toNum(col) * 100;
  offset = toNum(offset) * 100;
  var width = gutter ? 'calc(' + col + '% - ' + gutter + units + ')' : col + '%';
  var marginRight = gutter ? '' + gutter / 2 + units : '0';
  var marginLeft = offset && gutter ? 'calc(' + offset + '% + ' + gutter / 2 + units + ')' : offset && !gutter ? offset + '%' : gutter ? '' + gutter / 2 + units : '0';

  var rule = 'margin-left: ' + marginLeft + '; margin-right: ' + marginRight + '; width: ' + width + ';';
  return breakpoint ? breakpoint + ' { ' + rule + ' }' : rule;
}

/**
 * throttleEvent
 */
function throttleEvent(type, name, obj) {
  var isTriggered = false;
  var func = function func() {
    if (isTriggered) return;
    isTriggered = true;
    requestAnimationFrame(function () {
      obj.dispatchEvent(new CustomEvent(name));
      isTriggered = false;
    });
  };
  obj = obj || window;
  obj.addEventListener(type, func);
}

/* ----- PROP TYPES & CSS RULE SETS ----- */

var basePropTypes = {
  children: _propTypes2.default.node,
  theme: _propTypes2.default.object
};
exports.basePropTypes = basePropTypes;
var columnPropTypes = exports.columnPropTypes = {
  col: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]),
  offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]),
  gutter: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.object])
};

var displayPropTypes = {
  hide: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  show: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.object])
};
exports.displayPropTypes = displayPropTypes;

/**
 * withContainer
 */

var containerPropTypes = {
  container: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number])
};
exports.containerPropTypes = containerPropTypes;
function withContainer(props) {
  if (!props.container) return '';

  if (typeof props.container === 'number') return (0, _styledComponents.css)(_templateObject2, props.container);

  // passing in a 'boolean' behaves "just like Bootstrap"
  // prettier-ignore
  return (0, _styledComponents.css)(_templateObject3, props.theme.CONTAINER_SMALL, props.theme.MEDIA_MD_UP, props.theme.CONTAINER_MEDIUM, props.theme.MEDIA_LG_UP, props.theme.CONTAINER_LARGE);
}

/**
 * withFont
 */
var fontPropTypes = {
  inline: _propTypes2.default.bool,

  roman: _propTypes2.default.bool,
  italic: _propTypes2.default.bool,
  oblique: _propTypes2.default.bool,

  light: _propTypes2.default.bool,
  lighter: _propTypes2.default.bool,
  normal: _propTypes2.default.bool,
  bold: _propTypes2.default.bool,
  bolder: _propTypes2.default.bool,

  xxSmall: _propTypes2.default.bool,
  xSmall: _propTypes2.default.bool,
  small: _propTypes2.default.bool,
  medium: _propTypes2.default.bool,
  large: _propTypes2.default.bool,
  xLarge: _propTypes2.default.bool,
  xxLarge: _propTypes2.default.bool,
  larger: _propTypes2.default.bool,
  smaller: _propTypes2.default.bool,

  size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  underline: _propTypes2.default.bool
};
var FONT_SIZING = {
  xxSmall: 'xx-small',
  xSmall: 'x-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'x-large',
  xxLarge: 'xx-large',
  larger: 'larger',
  smaller: 'smaller'
};
exports.fontPropTypes = fontPropTypes;
function withFont(props) {
  var fontStyle = ['roman', 'italic', 'oblique'].find(function (style) {
    return style in props;
  }) || '';
  if (fontStyle === 'roman') fontStyle = 'normal';

  var fontWeight = ['light', 'lighter', 'normal', 'bold', 'bolder'].find(function (weight) {
    return weight in props;
  }) || '';

  var fontSize = props.size ? toCssUnits(props.size) : FONT_SIZING[Object.keys(FONT_SIZING).find(function (size) {
    return size in props;
  })] || '';

  // prettier-ignore
  return (0, _styledComponents.css)(_templateObject4, props.inline && 'display: inline;', props.underline && 'text-decoration: underline;', fontSize, fontStyle, fontWeight);
}

/**
 * withJustify
 */
var justifyPropTypes = {
  left: _propTypes2.default.bool,
  center: _propTypes2.default.bool,
  right: _propTypes2.default.bool
};
exports.justifyPropTypes = justifyPropTypes;
function withJustify(props) {
  var justify = ['center', 'right', 'left'].find(function (dir) {
    return dir in props;
  });
  return (0, _styledComponents.css)(_templateObject5, justify && 'text-align: ' + justify + ';');
}

/**
 * withMediaGutters
 */
var gutterPropTypes = {
  gutter: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object])
};
exports.gutterPropTypes = gutterPropTypes;
function withMediaGutters(_ref) {
  var gutter = _ref.gutter,
      theme = _ref.theme;

  gutter = toMediaObj(gutter);

  // prettier-ignore
  var result = (0, _styledComponents.css)(_templateObject6, 'xs' in gutter && toMediaGuttersCss(null, gutter.xs), 'sm' in gutter && toMediaGuttersCss(theme.MEDIA_SM_UP, gutter.sm), 'md' in gutter && toMediaGuttersCss(theme.MEDIA_MD_UP, gutter.md), 'lg' in gutter && toMediaGuttersCss(theme.MEDIA_LG_UP, gutter.lg), 'xl' in gutter && toMediaGuttersCss(theme.MEDIA_XL_UP, gutter.xl));

  return result;
}

/**
 * withMediaColumns
 */
function withMediaColumns(_ref2) {
  var col = _ref2.col,
      _ref2$offset = _ref2.offset,
      offset = _ref2$offset === undefined ? 0 : _ref2$offset,
      _ref2$gutter = _ref2.gutter,
      gutter = _ref2$gutter === undefined ? 0 : _ref2$gutter,
      theme = _ref2.theme;

  col = toMediaObj(col);
  offset = toMediaObj(offset);
  gutter = toMediaObj(gutter);

  // prettier-ignore
  return (0, _styledComponents.css)(_templateObject6, 'xs' in col && toMediaColumnCss(null, col.xs, offset.xs, gutter.xs), 'sm' in col && toMediaColumnCss(theme.MEDIA_SM_UP, col.sm, offset.sm, gutter.sm), 'md' in col && toMediaColumnCss(theme.MEDIA_MD_UP, col.md, offset.md, gutter.md), 'lg' in col && toMediaColumnCss(theme.MEDIA_LG_UP, col.lg, offset.lg, gutter.lg), 'xl' in col && toMediaColumnCss(theme.MEDIA_XL_UP, col.xl, offset.xl, gutter.xl));
}

/**
 * withMediaStyles
 */
var mediaStylesPropTypes = {
  styles: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.object])
};
exports.mediaStylesPropTypes = mediaStylesPropTypes;
function withMediaStyles(_ref3) {
  var styles = _ref3.styles,
      theme = _ref3.theme;

  if (Array.isArray(styles)) return styles;
  if (typeof styles === 'string') return (0, _styledComponents.css)(_templateObject7, toCssString(styles)); // prettier-ignore
  if ((typeof styles === 'undefined' ? 'undefined' : _typeof(styles)) === 'object') {
    // prettier-ignore
    return (0, _styledComponents.css)(_templateObject6, styles.xs && toCssString(styles.xs), styles.sm && theme.MEDIA_SM_UP + ' { ' + toCssString(styles.sm) + ' }', styles.md && theme.MEDIA_MD_UP + ' { ' + toCssString(styles.md) + ' }', styles.lg && theme.MEDIA_LG_UP + ' { ' + toCssString(styles.lg) + ' }', styles.xl && theme.MEDIA_XL_UP + ' { ' + toCssString(styles.xl) + ' }');
  }

  return [];
}

/**
 * withSpacing
 */
var spacingPropTypes = {
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  padding: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
exports.spacingPropTypes = spacingPropTypes;
function withSpacing(props) {
  // prettier-ignore
  return (0, _styledComponents.css)(_templateObject8, props.margin && cssSpacing('margin', props.margin), props.padding && cssSpacing('padding', props.padding));
}