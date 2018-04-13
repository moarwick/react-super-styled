'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacingPropTypes = exports.mediaStylesPropTypes = exports.columnPropTypes = exports.gutterPropTypes = exports.justifyPropTypes = exports.fontPropTypes = exports.containerPropTypes = exports.displayPropTypes = exports.basePropTypes = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addTheme = addTheme;
exports.toCssUnits = toCssUnits;
exports.cssSize = cssSize;
exports.cssSpacing = cssSpacing;
exports.throttleEvent = throttleEvent;
exports.withContainer = withContainer;
exports.withFont = withFont;
exports.withJustify = withJustify;
exports.withRowGutters = withRowGutters;
exports.withColumns = withColumns;
exports.withMediaStyles = withMediaStyles;
exports.withSpacing = withSpacing;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _THEME = require('./THEME');

var _THEME2 = _interopRequireDefault(_THEME);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COL_PCT = 8.333333333333334;

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
function addTheme(props) {
  props.theme = props.theme ? _extends({}, _THEME2.default, props.theme) : _THEME2.default;
  return props;
}

/**
 * Return strings as-is, coerce numbers to 'px'
 */
function toCssUnits(val) {
  return typeof val === 'string' ? val : typeof val === 'number' ? val + 'px' : '';
}

/**
 * Parse an incoming string into a valid CSS size unit, e.g. 10px, 2.5em, 50%
 * If the string does not match known units, assume it is a SPACER multiplier
 *
 * Ex. cssSize('10px') --> '10px'
 *     cssSize('3')    --> '30px'
 */
function cssSize(val, spacer) {
  // check if val matches legit pattern, e.g. 1px, 50%, 2.5em, or 'auto'
  // if true, return val as-is
  var isExplicit = /^[-0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto';
  if (isExplicit) return val;

  // otherwise, assume a SPACER multiplier, e.g. -1, 2.5, etc
  var multi = Number((val.match(/[-0-9.]/g) || []).join('')); // negative multipliers ok
  return Number.isNaN(multi) ? '0px' : multi * spacer + 'px';
}

/**
 * Deliver CSS 'padding' or 'margin' rules derived from a shorthand string
 * Expect a space delimited string of up to 4 elems, in the CSS shorthand order "top right bottom left"
 * The values can be in known CSS units (12px), or numbers only (5) as SPACER multipliers (50px)
 * If a '*' is supplied for any direction, no rule is applied for it
 *
 * Ex. spacingCss('padding', '1 * -5px 10%') -->
 *   padding-top: 10px;
 *   padding-bottom: -5px;
 *   padding-left: 10%;
 */
function cssSpacing(rule, props) {
  // rule = ['margin', 'padding'].find(supportedRule => supportedRule === rule.trim());

  if (!rule) return '';

  var values = props[rule];
  var top = void 0;
  var right = void 0;
  var bottom = void 0;
  var left = void 0;

  if (typeof values === 'number') {
    top = values + 'px';
    right = values + 'px';
  } else {
    // limit to 4 elems
    var _String$split$slice = String(values).split(' ').slice(0, 4);

    var _String$split$slice2 = _slicedToArray(_String$split$slice, 4);

    top = _String$split$slice2[0];
    right = _String$split$slice2[1];
    bottom = _String$split$slice2[2];
    left = _String$split$slice2[3];
  }

  var spacer = props.theme.SPACER;
  top = top && top !== '*' ? cssSize(top, spacer) : ''; // do not apply rule if '0'
  right = right !== '*' ? right ? cssSize(right, spacer) : top : ''; // if not supplied, apply 'top'
  bottom = bottom !== '*' ? bottom ? cssSize(bottom, spacer) : top : ''; // if not supplied, apply 'top'
  left = left !== '*' ? left ? cssSize(left, spacer) : right : ''; // if not supplied, apply 'right'

  // prettier-ignore
  return (0, _styledComponents.css)(['', '-top:', ';', '-right:', ';', '-bottom:', ';', '-left:', ';'], rule, top, rule, right, rule, bottom, rule, left);
}

/**
 * Given the supplied gutter, deliver negative left/right margin rules for FlexRow
 * This is to ensure outer columns (with gutters) are flush with the container
 */
function toRowGuttersCss(gutter) {
  return 'margin-left: -' + gutter / 2 + 'px; margin-right: -' + gutter / 2 + 'px;';
}

/**
 * Deliver correct column width and left/right margins, per the supplied props
 */
function toColumnCss(col, offset, gutter) {
  var colWidthPct = col * COL_PCT;
  var width = gutter ? 'calc(' + colWidthPct + '% - ' + gutter + 'px)' : colWidthPct + '%';
  var marginRight = gutter ? gutter / 2 + 'px' : '0';
  var marginLeft = offset && gutter ? 'calc(' + offset * COL_PCT + '% + ' + gutter / 2 + 'px)' : offset && !gutter ? offset * COL_PCT + '%' : gutter ? gutter / 2 + 'px' : '0';

  return 'margin-left: ' + marginLeft + '; margin-right: ' + marginRight + '; width: ' + width + ';';
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
  innerRef: _propTypes2.default.func,
  theme: _propTypes2.default.object
};
exports.basePropTypes = basePropTypes;


var displayPropTypes = {
  hide: _propTypes2.default.bool, // xs, or when no media
  smHide: _propTypes2.default.bool,
  mdHide: _propTypes2.default.bool,
  lgHide: _propTypes2.default.bool,
  xlHide: _propTypes2.default.bool,

  show: _propTypes2.default.oneOf([true, false, 'inline', 'inline-block', 'block']), // xs, or when no media
  smShow: _propTypes2.default.oneOf([true, false, 'inline', 'inline-block', 'block']),
  mdShow: _propTypes2.default.oneOf([true, false, 'inline', 'inline-block', 'block']),
  lgShow: _propTypes2.default.oneOf([true, false, 'inline', 'inline-block', 'block']),
  xlShow: _propTypes2.default.oneOf([true, false, 'inline', 'inline-block', 'block'])
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

  if (typeof props.container === 'number') return (0, _styledComponents.css)(['margin-left:auto;margin-right:auto;max-width:', 'px;'], props.container);

  // passing in a 'boolean' behaves "just like Bootstrap"
  // prettier-ignore
  return (0, _styledComponents.css)(['margin-left:auto;margin-right:auto;max-width:', 'px;', '{max-width:', 'px;}', '{max-width:', 'px;}'], props.theme.CONTAINER_SMALL, props.theme.MEDIA_MD_MIN, props.theme.CONTAINER_MEDIUM, props.theme.MEDIA_LG_MIN, props.theme.CONTAINER_LARGE);
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
  return (0, _styledComponents.css)(['', ' ', ' font-size:', ';font-style:', ';font-weight:', ';'], props.inline && 'display: inline;', props.underline && 'text-decoration: underline;', fontSize, fontStyle, fontWeight);
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
  return (0, _styledComponents.css)(['', ';'], justify && 'text-align: ' + justify + ';');
}

/**
 * withRowGutters
 */
var gutterPropTypes = {
  gutter: _propTypes2.default.number, // xs, or when no media
  smGutter: _propTypes2.default.number,
  mdGutter: _propTypes2.default.number,
  lgGutter: _propTypes2.default.number,
  xlGutter: _propTypes2.default.number
};
exports.gutterPropTypes = gutterPropTypes;
function withRowGutters(_ref) {
  var gutter = _ref.gutter,
      smGutter = _ref.smGutter,
      mdGutter = _ref.mdGutter,
      lgGutter = _ref.lgGutter,
      xlGutter = _ref.xlGutter,
      theme = _ref.theme;

  // prettier-ignore
  return (0, _styledComponents.css)(['', ' ', ' ', ' ', ' ', ''], gutter && toRowGuttersCss(gutter), smGutter && theme.MEDIA_XS_MIN + ' { ' + toRowGuttersCss(smGutter) + ' }', mdGutter && theme.MEDIA_SM_MIN + ' { ' + toRowGuttersCss(mdGutter) + ' }', lgGutter && theme.MEDIA_MD_MIN + ' { ' + toRowGuttersCss(lgGutter) + ' }', xlGutter && theme.MEDIA_LG_MIN + ' { ' + toRowGuttersCss(xlGutter) + ' }');
}

/**
 * withColumns
 */
var columnPropTypes = _extends({
  col: _propTypes2.default.number, // xs, or when no media
  smCol: _propTypes2.default.number,
  mdCol: _propTypes2.default.number,
  lgCol: _propTypes2.default.number,
  xlCol: _propTypes2.default.number,

  offset: _propTypes2.default.number, // xs, or when no media
  smOffset: _propTypes2.default.number,
  mdOffset: _propTypes2.default.number,
  lgOffset: _propTypes2.default.number,
  xlOffset: _propTypes2.default.number

}, gutterPropTypes);
exports.columnPropTypes = columnPropTypes;
function withColumns(_ref2) {
  var col = _ref2.col,
      offset = _ref2.offset,
      gutter = _ref2.gutter,
      smCol = _ref2.smCol,
      smOffset = _ref2.smOffset,
      smGutter = _ref2.smGutter,
      mdCol = _ref2.mdCol,
      mdOffset = _ref2.mdOffset,
      mdGutter = _ref2.mdGutter,
      lgCol = _ref2.lgCol,
      lgOffset = _ref2.lgOffset,
      lgGutter = _ref2.lgGutter,
      xlCol = _ref2.xlCol,
      xlOffset = _ref2.xlOffset,
      xlGutter = _ref2.xlGutter,
      theme = _ref2.theme;

  // prettier-ignore
  return (0, _styledComponents.css)(['', ' ', ' ', ' ', ' ', ''], col && toColumnCss(col, offset, gutter), smCol && theme.MEDIA_XS_MIN + ' { ' + toColumnCss(smCol, smOffset, smGutter || gutter) + ' }', mdCol && theme.MEDIA_SM_MIN + ' { ' + toColumnCss(mdCol, mdOffset, mdGutter || gutter) + ' }', lgCol && theme.MEDIA_MD_MIN + ' { ' + toColumnCss(lgCol, lgOffset, lgGutter || gutter) + ' }', xlCol && theme.MEDIA_LG_MIN + ' { ' + toColumnCss(xlCol, xlOffset, xlGutter || gutter) + ' }');
}

var mediaStylesPropTypes = {
  styles: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]), // use when no media
  smStyles: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  mdStyles: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  lgStyles: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  xlStyles: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)])
};
exports.mediaStylesPropTypes = mediaStylesPropTypes;
function withMediaStyles(_ref3) {
  var styles = _ref3.styles,
      smStyles = _ref3.smStyles,
      mdStyles = _ref3.mdStyles,
      lgStyles = _ref3.lgStyles,
      xlStyles = _ref3.xlStyles,
      theme = _ref3.theme;

  // prettier-ignore
  return (0, _styledComponents.css)(['', ';', ' ', ' ', ' ', ''], styles && styles, smStyles && theme.MEDIA_XS_MIN + ' { ' + smStyles + ' }', mdStyles && theme.MEDIA_SM_MIN + ' { ' + mdStyles + ' }', lgStyles && theme.MEDIA_MD_MIN + ' { ' + lgStyles + ' }', xlStyles && theme.MEDIA_LG_MIN + ' { ' + xlStyles + ' }');
}

var spacingPropTypes = {
  margin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  padding: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
exports.spacingPropTypes = spacingPropTypes;
function withSpacing(props) {
  // we no-op only if 'undefined', to allow for number 0 to clear margins/padding
  // prettier-ignore
  return (0, _styledComponents.css)(['', '  ', ''], props.margin !== undefined && cssSpacing('margin', props), props.padding !== undefined && cssSpacing('padding', props));
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(COL_PCT, 'COL_PCT', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(addTheme, 'addTheme', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toCssUnits, 'toCssUnits', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(cssSize, 'cssSize', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(cssSpacing, 'cssSpacing', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toRowGuttersCss, 'toRowGuttersCss', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toColumnCss, 'toColumnCss', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(throttleEvent, 'throttleEvent', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(basePropTypes, 'basePropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(displayPropTypes, 'displayPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(containerPropTypes, 'containerPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withContainer, 'withContainer', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(fontPropTypes, 'fontPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(FONT_SIZING, 'FONT_SIZING', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withFont, 'withFont', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(justifyPropTypes, 'justifyPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withJustify, 'withJustify', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(gutterPropTypes, 'gutterPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withRowGutters, 'withRowGutters', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(columnPropTypes, 'columnPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withColumns, 'withColumns', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(mediaStylesPropTypes, 'mediaStylesPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withMediaStyles, 'withMediaStyles', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(spacingPropTypes, 'spacingPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withSpacing, 'withSpacing', 'src/lib/utils.js');
}();

;