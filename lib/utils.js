var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import { css } from 'styled-components';
import THEME from './THEME';

/**
 * Extend the theme prop onto the base THEME, and return all props
 */
export function addTheme(props) {
  props.theme = props.theme ? _extends({}, THEME, props.theme) : THEME;
  return props;
}

/**
 * Parse column value (number or string) into a width rule
 */
function toColumnWidth(columns, spacer) {
  var colPct = 100 / 12;

  if (typeof columns === 'number') {
    return columns * colPct + '%';
  }

  var _columns$split$map = columns.split('|').map(function (str) {
    return Number(str);
  }),
      _columns$split$map2 = _slicedToArray(_columns$split$map, 2),
      col = _columns$split$map2[0],
      gutter = _columns$split$map2[1];

  return gutter ? 'calc(' + col * colPct + '% - ' + spacer * gutter / 2 + 'px)' : col * colPct + '%';
}

/**
 * Return strings as-is, coerce numbers to 'px'
 */
export function toCssUnits(val) {
  return typeof val === 'string' ? val : typeof val === 'number' ? val + 'px' : '';
}

/**
 * Parse an incoming string into a valid CSS size unit, e.g. 10px, 2.5em, 50%
 * If the string does not match known units, assume it is a SPACER multiplier
 *
 * Ex. cssSize('10px') --> '10px'
 * Ex. cssSize('3') --> '30px'
 */
export function cssSize(val, spacer) {
  // check if val matches legit pattern, e.g. 1px, 50%, 2.5em, or 'auto'
  // if true, return val as-is
  var isExplicit = /^[0-9.]+(px|em|rem|%)$/.test(val) || val === 'auto';
  if (isExplicit) return val;

  // otherwise, assume a SPACER multiplier, e.g. 1, 2.5, etc
  var multi = Number((val.match(/[0-9.]/g) || []).join(''));
  return multi * spacer + 'px';
}

/**
 * Deliver CSS 'padding' or 'margin' rules, derived from a shorthand string
 * Expect a space delimited string of up to 4 elems, in the CSS shorthand order "top right bottom left"
 * The values can be in known CSS units (10px), or numbers only (5) as SPACER multipliers (px)
 * If a dash is supplied for any direction, no rule is applied for it
 *
 * Ex. spacingCss('padding', '1 5px 10% -') -->
 *  'padding-top: 10px;
 *   padding-right: 5px;
 *   padding-bottom: 10%;
 */
export function cssSpacing(rule, props) {
  rule = ['margin', 'padding'].find(function (supportedRule) {
    return supportedRule === rule.trim();
  });

  if (!rule) return '';

  var values = props[rule];
  var top = void 0;
  var right = void 0;
  var bottom = void 0;
  var left = void 0;

  if (typeof values === 'number') {
    top = right = values + 'px';
  } else {
    ;
    // limit to 4 elems
    var _String$split$slice = String(values).split(' ').slice(0, 4);

    var _String$split$slice2 = _slicedToArray(_String$split$slice, 4);

    top = _String$split$slice2[0];
    right = _String$split$slice2[1];
    bottom = _String$split$slice2[2];
    left = _String$split$slice2[3];
  }

  var spacer = props.theme.SPACER;
  top = top && top !== '-' ? cssSize(top, spacer) : ''; // do not apply rule if '0'
  right = right !== '-' ? right ? cssSize(right, spacer) : top : ''; // if not supplied, apply 'top'
  bottom = bottom !== '-' ? bottom ? cssSize(bottom, spacer) : top : ''; // if not supplied, apply 'top'
  left = left !== '-' ? left ? cssSize(left, spacer) : right : ''; // if not supplied, apply 'right'

  return css(['', ' ', ' ', ' ', ';'], top && rule + '-top: ' + top + ';', right && rule + '-right: ' + right + ';', bottom && rule + '-bottom: ' + bottom + ';', left && rule + '-left: ' + left + ';');
}

/* ----- PROP TYPES & CSS METHODS ----- */

var basePropTypes = {
  children: PropTypes.node,
  innerRef: PropTypes.func,
  theme: PropTypes.object
};
export { basePropTypes };

var displayPropTypes = {
  mdHide: PropTypes.bool,
  smHide: PropTypes.bool,
  xsHide: PropTypes.bool,
  mdShow: PropTypes.bool,
  smShow: PropTypes.bool,
  xsShow: PropTypes.bool,
  mdShowInline: PropTypes.bool,
  smShowInline: PropTypes.bool,
  xsShowInline: PropTypes.bool,
  mdShowInlineBlock: PropTypes.bool,
  smShowInlineBlock: PropTypes.bool,
  xsShowInlineBlock: PropTypes.bool
};
export { displayPropTypes };

/**
 * Font-related CSS rules
 */
var fontPropTypes = {
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  roman: PropTypes.bool,
  light: PropTypes.bool,
  normal: PropTypes.bool,
  bold: PropTypes.bool,
  small: PropTypes.bool,
  base: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xLarge: PropTypes.bool,
  xxLarge: PropTypes.bool
};
export { fontPropTypes };

export function withFont(props) {
  var isHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var fontSize = ['small', 'base', 'medium', 'large', 'xLarge', 'xxLarge'].find(function (size) {
    return size in props;
  }) || '';
  var fontStyle = ['italic', 'roman'].find(function (style) {
    return style in props;
  }) || '';
  var fontWeight = ['light', 'normal', 'bold'].find(function (weight) {
    return weight in props;
  }) || '';

  fontSize = toCssUnits(props.theme['FONT_' + fontSize.toUpperCase()]);
  if (fontStyle === 'roman') fontStyle = 'normal';
  fontWeight = props.theme[(isHeader ? 'FONT_H_' : 'FONT_') + fontWeight.toUpperCase()];

  // prettier-ignore
  return css(['', ' ', '  ', '  ', ''], props.inline && 'display: inline;', fontSize && 'font-size: ' + fontSize + ';', fontStyle && 'font-style: ' + fontStyle + ';', fontWeight && 'font-weight: ' + fontWeight + ';');
}

/**
 * Text align rules
 */
var justifyPropTypes = {
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool
};
export { justifyPropTypes };

export function withJustify(props) {
  var justify = ['center', 'right', 'left'].find(function (dir) {
    return dir in props;
  });
  return css(['', ';'], justify && 'text-align: ' + justify + ';');
}

/**
 * Helper to interpret media-based column props into CSS width rules
 * Calculated assuming a 12 column grid
 * Supports format: "column|gutter" (gutter is a SPACER multiplier)
 *
 * Ex. col={ 12 }   -> width: 100%
 *     xsCol="6|1"  -> width: calc(50% - 10px)
 */
var columnPropTypes = {
  col: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mdCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  smCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  xsCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export { columnPropTypes };
export function withColumns(_ref) {
  var xsCol = _ref.xsCol,
      smCol = _ref.smCol,
      mdCol = _ref.mdCol,
      col = _ref.col,
      theme = _ref.theme;

  var styles = '';

  if (xsCol) {
    styles += theme.MEDIA_XS_MIN + ' { width: ' + toColumnWidth(xsCol, theme.SPACER) + '; }';
  }
  if (smCol) {
    styles += theme.MEDIA_SM_MIN + ' { width: ' + toColumnWidth(smCol, theme.SPACER) + '; }';
  }
  if (mdCol) {
    styles += theme.MEDIA_MD_MIN + ' { width: ' + toColumnWidth(mdCol, theme.SPACER) + '; }';
  }
  if (col) {
    styles += theme.MEDIA_LG_MIN + ' { width: ' + toColumnWidth(col, theme.SPACER) + '; }';
  }

  return css(['', ';'], styles);
}

/**
 * Passed-in CSS, with media-based breakpoint support
 */
var mediaStylesPropTypes = {
  mdStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  smStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  xsStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  styles: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
export { mediaStylesPropTypes };
export function withMediaStyles(_ref2) {
  var styles = _ref2.styles,
      mdStyles = _ref2.mdStyles,
      smStyles = _ref2.smStyles,
      xsStyles = _ref2.xsStyles,
      theme = _ref2.theme;

  // prettier-ignore
  return css(['', ' ', ' ', ' ', ''], xsStyles && theme.MEDIA_XS_MIN + ' { ' + xsStyles + ' }', smStyles && theme.MEDIA_SM_MIN + ' { ' + smStyles + ' }', mdStyles && theme.MEDIA_MD_MIN + ' { ' + mdStyles + ' }', styles && styles);
}

/**
 * Deliver css for margin and padding
 */
var spacingPropTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export { spacingPropTypes };
export function withSpacing(props) {
  // prettier-ignore
  // we noop only if 'undefined', to allow for number 0 to clear margins/padding
  return css(['', '  ', ';'], props.margin !== undefined && cssSpacing('margin', props), props.padding !== undefined && cssSpacing('padding', props));
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(addTheme, 'addTheme', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toColumnWidth, 'toColumnWidth', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(toCssUnits, 'toCssUnits', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(cssSize, 'cssSize', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(cssSpacing, 'cssSpacing', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(basePropTypes, 'basePropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(displayPropTypes, 'displayPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(fontPropTypes, 'fontPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withFont, 'withFont', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(justifyPropTypes, 'justifyPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withJustify, 'withJustify', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(columnPropTypes, 'columnPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withColumns, 'withColumns', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(mediaStylesPropTypes, 'mediaStylesPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withMediaStyles, 'withMediaStyles', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(spacingPropTypes, 'spacingPropTypes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(withSpacing, 'withSpacing', 'src/lib/utils.js');
}();

;